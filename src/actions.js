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

function doAction(event, args) {
  // with TimeZone
  const m = Moment.moment().utc().add(9, 'hours')
  switch(event) {
    case ADD_START_RECORD:
      addRecord({
        date: m.format('L'),
        start: m.format('HH:mm')
      })
      postToSlack('STARTしました: ' + m.format('HH:mm'))
      break
    case ADD_END_RECORD:
      updateLastRecord({
        end: m.format('HH:mm')
      })
      postToSlack('ENDしました: ' + m.format('HH:mm'))
      break;
    default:
      throw 'Event is not found: ' + event
  }
}