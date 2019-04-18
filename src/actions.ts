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
  switch (event) {
    case START_EVENT:
      addRecord(payload.userName, {
        eventName: START_EVENT,
        stampedAt: now
      })
      postToSlack('[START] ' + message)
      break
    case END_EVENT:
      const lastRecord = getLastRecord(payload.userName)
      if (lastRecord.eventName !== START_EVENT) {
        postToSlack(payload.userName + 'さんの開始記録がみつかりませんでした')
        return
      }
      const lastRow = lastRecord.row
      addRecord(payload.userName, {
        eventName: END_EVENT,
        stampedAt: now,
        result: '=B' + (lastRow + 1) + '-B' + lastRow
      })
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
