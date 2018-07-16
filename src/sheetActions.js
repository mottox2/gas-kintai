function addRecord(payload) {
  const sheet = findOrCreateSheetByName(payload.userName)
  sheet.appendRow([
    payload.date, payload.start, ''
  ])
}

function updateLastRecord(payload) {
  const sheet = findOrCreateSheetByName(payload.userName)
  const range = sheet.getRange(sheet.getLastRow(), 3, 1, 1)
  range.setValue(payload.end);
}

function getLastRecord() {
  const sheet = findOrCreateSheetByName(record.userName)
  const lastRow = sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn())
  const values = lastRow.getValues()

  const record = values[0]
  var result = {}
  columns.forEach(function(column, index) {
    result[column] = record[index]
  })
  Logger.log(result)
  return result
}