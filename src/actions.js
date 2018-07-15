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
  switch(event) {
    case ADD_START_RECORD:
      addRecord('START')
      postToSlack('STARTしました')
      break
    case ADD_END_RECORD:
      addRecord('END')
      postToSlack('ENDしました')
      break;
    default:
      throw 'Event is not found: ' + event
  }
}