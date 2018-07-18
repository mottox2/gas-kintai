var columns = [
  'eventName', 'stampedAt', 'result'
]

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
  const lastRow = sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn())
  const values = lastRow.getValues()

  const record = values[0]
  var result = {}
  getColumns().forEach(function (column, index) {
    result[column] = record[index]
  })
  Logger.log(result)
  return result
}