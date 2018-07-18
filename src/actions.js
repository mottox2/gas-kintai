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
  // with TimeZone
  // const now = Moment.moment().utc().add(9, 'hours')
  const now = Moment.moment()
  const message = payload.userName + ': ' + now.format('HH:mm')
  switch (event) {
    case ADD_START_RECORD:
      addRecord({
        eventName: 'start',
        stampedAt: now.format("YYYY/MM/DD HH:mm"),
        userName: payload.userName
      })
      postToSlack('[START] ' + message)
      break
    case ADD_END_RECORD:
      const lastRecord = getLastRecord(payload.userName)
      const startedAt = Moment.moment(lastRecord.stampedAt)
      const diff = (now - startedAt) / 1000 / 3600 / 24
      addRecord({
        eventName: 'end',
        stampedAt: now.format("YYYY/MM/DD HH:mm"),
        result: '=B16-B17',
        userName: payload.userName
      })
      postToSlack('[END] ' + message)
      break;
    default:
      throw 'イベント(' + event + ')が見つかりませんでした。'
  }
}