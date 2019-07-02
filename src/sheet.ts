var columns = ['startedAt', 'endedAt', 'result']

function getSpreadsheet(sheetId?: string | null): GoogleAppsScript.Spreadsheet.Spreadsheet {
  return sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActive()
}

function createSheetByName(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, name: string) {
  const newSheet = spreadsheet.insertSheet()
  newSheet.setName(name)
  newSheet.appendRow(columns)
  // NOTE: 集計用の列は時間表記
  newSheet.getRange('C:C').setNumberFormat('hh:mm')
  return newSheet
}

function findOrCreateSheetByName(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  name: string
) {
  const sheet = spreadsheet.getSheetByName(name)
  return sheet || createSheetByName(spreadsheet, name)
}
