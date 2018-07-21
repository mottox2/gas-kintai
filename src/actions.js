var START_EVENT = 'start'
var END_EVENT = 'end'

var triggers = {
  'start': START_EVENT,
  'はじめ': START_EVENT,
  '再開': START_EVENT,
  'end': END_EVENT,
  'おわり': END_EVENT,
  '休憩': END_EVENT,
}

function getActionType(text) {
  return triggers[text]
}

function doAction(event, payload) {
  const now = Moment.moment().format("YYYY/MM/DD HH:mm")
  const message = payload.userName + ': ' + now
  switch (event) {
    case START_EVENT:
      addRecord({
        eventName: START_EVENT,
        stampedAt: now,
        userName: payload.userName
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
      addRecord({
        eventName: END_EVENT,
        stampedAt: now,
        result: '=B' + (lastRow + 1) + '-B' + lastRow,
        userName: payload.userName
      })
      postToSlack('[END] ' + message)
      break;
    default:
      throw 'イベント(' + event + ')が見つかりませんでした。'
  }
}