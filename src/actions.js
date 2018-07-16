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
  const m = Moment.moment().utc().add(9, 'hours')
  const message = payload.userName + ': ' + m.format('HH:mm')
  switch(event) {
    case ADD_START_RECORD:
      addRecord({
        date: m.format('L'),
        start: m.format('HH:mm'),
        userName: payload.userName
      })
      postToSlack('[START] ' + message)
      break
    case ADD_END_RECORD:
      updateLastRecord({
        end: m.format('HH:mm'),
        userName: payload.userName
      })
      postToSlack('[END] ' + message)
      break;
    default:
      throw 'イベント(' + event + ')が見つかりませんでした。'
  }
}