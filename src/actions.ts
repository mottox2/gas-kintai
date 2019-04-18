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

function doAction(event: any, payload: any) {
  const now = Moment.moment().format('YYYY/MM/DD HH:mm')
  const message = payload.userName + ': ' + now
  const lastRecord = getLastRecord(payload.userName)
  Logger.log(lastRecord.row)
  switch (event) {
    case START_EVENT:
      if (!lastRecord.isComplete()) {
        postToSlack(`前回の完了記録が見つかりません。`)
        break
      }
      const newRecord = new TimeRecord(lastRecord.row + 1, now, '')
      updateRecord(payload.userName, newRecord)
      postToSlack('[START] ' + message)
      break
    case END_EVENT:
      if (lastRecord.isComplete()) {
        postToSlack(`開始記録が見つかりませんでした`)
        break
      }
      lastRecord.endedAt = now
      updateRecord(payload.userName, lastRecord)
      postToSlack('[END] ' + message)
      break
    case PING_EVENT:
      postToSlack('pong')
      break
    default:
      postToSlack(`*コマンドが見つかりませんでした。*
コマンド例: \`kintai start\`, \`kintai end\`, \`kintai stop\`, \`kintai restart\``)
  }
}
