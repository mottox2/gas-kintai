var columns = [
  'eventName', 'stampedAt', 'result'
]

function createSheetByName(name: string) {
  const properties = getProperties()
  if (properties.SHEET_ID == null) return
  const spreadsheet = SpreadsheetApp.openById(properties.SHEET_ID);
  const newSheet = spreadsheet.insertSheet()
  newSheet.setName(name)
  newSheet.appendRow(columns)
  return newSheet
}

function findOrCreateSheetByName(name: string) {
  const properties = getProperties()
  if (properties.SHEET_ID == null) return
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