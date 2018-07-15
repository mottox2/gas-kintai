function addRecord(record) {
  const properties = getProperties()
  const spreadsheet = SpreadsheetApp.openById(properties.SHEET_ID);
  const sheet = spreadsheet.getSheets()[0];
  // const data = sheet.getSheetValues(1, 1, sheet.getLastRow(), 1);

  sheet.getRange(sheet.getLastRow(), 1).setValue("new Value");
}