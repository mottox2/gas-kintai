function addRecord(record) {
  const sheet = findOrCreateSheetByName('kintai')
  sheet.appendRow([
    record.date, record.start, ''
  ])
}

function updateLastRecord(record) {
  const sheet = findOrCreateSheetByName('kintai')
  const range = sheet.getRange(sheet.getLastRow(), 3, 1, 1)
  range.setValue(record.end);
}

function getLastRecord() {
  const sheet = findOrCreateSheetByName('kintai')
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