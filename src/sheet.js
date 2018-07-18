var columns = [
  'eventName', 'stampedAt', 'result'
]

function createSheetByName(name) {
  const properties = getProperties()
  const spreadsheet = SpreadsheetApp.openById(properties.SHEET_ID);
  const newSheet = spreadsheet.insertSheet()
  newSheet.setName(name)
  newSheet.appendRow(columns)
  return newSheet
}

function findOrCreateSheetByName(name) {
  const properties = getProperties()
  const spreadsheet = SpreadsheetApp.openById(properties.SHEET_ID);
  const sheet = spreadsheet.getSheetByName(name)
  if (sheet) {
    return sheet
  }
  return createSheetByName(name)
}

function getColumns() {
  return columns
}