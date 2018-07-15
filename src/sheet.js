function addRecord(record) {
  const properties = getProperties()
  const spreadsheet = SpreadsheetApp.openById(properties.SHEET_ID);
  const sheet = spreadsheet.getSheets()[0];
  sheet.getRange(sheet.getLastRow() + 1, 1).setValue(record);
}