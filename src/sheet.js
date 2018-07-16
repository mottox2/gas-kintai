var columns = [
  'date', 'start', 'end'
]

function getSheet() {
  const properties = getProperties()
  const spreadsheet = SpreadsheetApp.openById(properties.SHEET_ID);
  return spreadsheet.getSheets()[0];
}

function addRecord(record) {
  const sheet = getSheet()
  sheet.appendRow([
    record.date, record.start, ''
  ])
}

function updateLastRecord(record) {
  const sheet = getSheet()
  const range = sheet.getRange(sheet.getLastRow(), 3, 1, 1)
  range.setValue(record.end);
}

function getLastRecord() {
  const sheet = getSheet()
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