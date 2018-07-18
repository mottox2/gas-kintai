var ADD_START_RECORD = 'start'
var ADD_END_RECORD = 'end'

var triggers = {
  'start': ADD_START_RECORD,
  'はじめ': ADD_START_RECORD,
  'end': ADD_END_RECORD,
  'おわり': ADD_END_RECORD,
}

function getActionType(text) {
  return triggers[text]
}

function doAction(event, payload) {
  const now = Moment.moment().format("YYYY/MM/DD HH:mm")
  const message = payload.userName + ': ' + now
  switch (event) {
    case ADD_START_RECORD:
      addRecord({
        eventName: ADD_START_RECORD,
        stampedAt: now,
        userName: payload.userName
      })
      postToSlack('[START] ' + message)
      break
    case ADD_END_RECORD:
      const lastRecord = getLastRecord(payload.userName)
      if (lastRecord.eventName !== ADD_START_RECORD) {
        postToSlack(payload.userName + 'さんの開始記録がみつかりませんでした')
        return
      }
      const lastRow = lastRecord.row
      addRecord({
        eventName: ADD_END_RECORD,
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