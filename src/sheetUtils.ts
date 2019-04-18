function addRecord(payload: any) {
  const sheet = findOrCreateSheetByName(payload.userName)
  sheet!.appendRow([
    payload.eventName, payload.stampedAt, payload.result || ''
  ])
}

function getLastRecord(sheetName: string) {
  const sheet = findOrCreateSheetByName(sheetName)
  const lastRow = sheet!.getLastRow()
  const lastRecord = sheet!.getRange(lastRow, 1, 1, sheet!.getLastColumn())
  const values = lastRecord.getValues()

  const record = values[0]
  var result : any = {} //TODO
  result.row = lastRow
  getColumns().forEach(function (column, index) {
    result[column] = record[index]
  })
  return result
}