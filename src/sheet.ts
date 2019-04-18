var columns = ['eventName', 'stampedAt', 'result']

function getSpreadsheet(sheetId?: string | null): GoogleAppsScript.Spreadsheet.Spreadsheet {
  return sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActive()
}

function createSheetByName(name: string) {
  const properties = getProperties()
  const spreadsheet = getSpreadsheet(properties.SHEET_ID)
  const newSheet = spreadsheet.insertSheet()
  newSheet.setName(name)
  newSheet.appendRow(columns)
  return newSheet
}

function findOrCreateSheetByName(name: string) {
  const properties = getProperties()
  const spreadsheet = getSpreadsheet(properties.SHEET_ID)
  const sheet = spreadsheet.getSheetByName(name)
  if (sheet) {
    return sheet
  }
  return createSheetByName(name)
}

function getColumns() {
  return columns
}
