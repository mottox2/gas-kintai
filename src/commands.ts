declare const Moment: any

const authorLink = (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, sheetName: string) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheet.getId()}#gid=${spreadsheet
    .getSheetByName(sheetName)
    .getSheetId()}`

interface Payload {
  userName: string
  text: string
}

function removePrefix(text: string) {
  return text.replace(/kintai\ ?/, '') || null
}

function doCommand(payload: Payload) {
  const now = Moment.moment().format('YYYY/MM/DD HH:mm')
  const lastRecord = getLastRecord(payload.userName)
  const spreadsheet = getSpreadsheet()
  Logger.log(lastRecord.row)
  const command = removePrefix(payload.text)
  switch (command) {
    case 'start':
    case 'はじめ':
    case 'restart':
    case '再開':
      if (!lastRecord.isComplete()) {
        return postToSlack(``, notFoundEndMessage())
      }
      const newRecord = new TimeRecord(lastRecord.row + 1, now, '')
      updateRecord(payload.userName, newRecord)
      return postToSlack(
        '開始時刻を記録しました。',
        startMessage({ spreadsheet, userName: payload.userName })
      )
    case 'end':
    case 'おわり':
    case '休憩':
    case 'stop':
      if (lastRecord.isComplete()) {
        return postToSlack(``, notFoundStartMessage())
      }
      lastRecord.endedAt = now
      updateRecord(payload.userName, lastRecord)
      return postToSlack(
        'お疲れ様です。終了時刻を記録しました。',
        endMessage({ spreadsheet, record: lastRecord, userName: payload.userName })
      )
    case 'ping':
      return postToSlack('pong')
    default:
      postToSlack(`*コマンドが見つかりませんでした。*
コマンド例: \`kintai start\`, \`kintai end\`, \`kintai stop\`, \`kintai restart\``)
  }
}
