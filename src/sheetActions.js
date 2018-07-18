function addRecord(payload) {
  const sheet = findOrCreateSheetByName(payload.userName)
  sheet.appendRow([
    payload.eventName, payload.stampedAt, payload.result || ''
  ])
}

function getLastRow(sheetName) {
  const sheet = findOrCreateSheetByName(sheetName)
  return sheet.getLastRow()
}

function getLastRecord(sheetName) {
  const sheet = findOrCreateSheetByName(sheetName)
  const lastRow = sheet.getLastRow()
  const lastRecord = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn())
  const values = lastRecord.getValues()

  const record = values[0]
  var result = {}
  result.row = lastRow
  getColumns().forEach(function (column, index) {
    result[column] = record[index]
  })
  return result
}