var START_EVENT = 'start'
var END_EVENT = 'end'
const PING_EVENT = 'ping'

var triggers = {
  start: START_EVENT,
  はじめ: START_EVENT,
  再開: START_EVENT,
  restart: START_EVENT,
  end: END_EVENT,
  おわり: END_EVENT,
  休憩: END_EVENT,
  stop: END_EVENT,
  ping: PING_EVENT
}

declare const Moment: any

type TriggerKeys = keyof typeof triggers

function getActionType(text: TriggerKeys) {
  return triggers[text]
}

const authorLink = (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, sheetName: string) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheet.getId()}#gid=${spreadsheet
    .getSheetByName(sheetName)
    .getSheetId()}`

function doAction(event: any, payload: any) {
  const now = Moment.moment().format('YYYY/MM/DD HH:mm')
  const lastRecord = getLastRecord(payload.userName)
  const spreadsheet = getSpreadsheet()
  Logger.log(lastRecord.row)
  switch (event) {
    case START_EVENT:
      if (!lastRecord.isComplete()) {
        postToSlack(`前回の完了記録が見つかりません。`)
        break
      }
      const newRecord = new TimeRecord(lastRecord.row + 1, now, '')
      updateRecord(payload.userName, newRecord)
      postToSlack('開始時刻を記録しました。', [
        {
          author_name: '勤怠記録',
          author_link: authorLink(spreadsheet, payload.userName),
          footer: payload.userName,
          color: '#36a64f'
        }
      ])
      break
    case END_EVENT:
      if (lastRecord.isComplete()) {
        postToSlack(`開始記録が見つかりませんでした`)
        break
      }
      lastRecord.endedAt = now
      updateRecord(payload.userName, lastRecord)
      postToSlack('お疲れ様です。終了時刻を記録しました。', [
        {
          author_name: '勤怠記録',
          author_link: authorLink(spreadsheet, payload.userName),
          fields: [
            {
              title: '開始時間',
              value: Moment.moment(lastRecord.startedAt).format('MM/DD HH:mm'),
              short: true
            },
            {
              title: '終了時間',
              value: Moment.moment(lastRecord.endedAt).format('MM/DD HH:mm'),
              short: true
            }
          ],
          footer: payload.userName,
          color: '#36a64f'
        }
      ])
      break
    case PING_EVENT:
      postToSlack('pong')
      break
    default:
      postToSlack(`*コマンドが見つかりませんでした。*
コマンド例: \`kintai start\`, \`kintai end\`, \`kintai stop\`, \`kintai restart\``)
  }
}
