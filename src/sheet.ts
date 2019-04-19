var columns = ['startedAt', 'endedAt', 'result']

function getSpreadsheet(sheetId?: string | null): GoogleAppsScript.Spreadsheet.Spreadsheet {
  return sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActive()
}

function createSheetByName(name: string) {
  const properties = getProperties()
  const spreadsheet = getSpreadsheet(properties.SHEET_ID)
  const newSheet = spreadsheet.insertSheet()
  newSheet.setName(name)
  newSheet.appendRow(columns)
  // NOTE: 集計用の列は時間表記
  newSheet.getRange('C:C').setNumberFormat('hh:mm')
  return newSheet
}

function findOrCreateSheetByName(name: string) {
  const properties = getProperties()
  const spreadsheet = getSpreadsheet(properties.SHEET_ID)
  const sheet = spreadsheet.getSheetByName(name)
  return sheet || createSheetByName(name)
}
