type RowTimeRecord = [Date, Date | '', string]

class TimeRecord {
  public startedAt: Date
  public endedAt: Date | ''
  public row: number

  static fromArray(row: number, array: RowTimeRecord) {
    return new this(row, array[0], array[1])
  }

  constructor(row: number, startedAt: Date, endedAt: Date | '') {
    this.row = row
    this.startedAt = startedAt
    this.endedAt = endedAt
  }

  isComplete() {
    return this.endedAt
  }

  toArray(): RowTimeRecord {
    // 集計用関数、スプレッドシードのものを用いる
    const sumFunc = `= IF(B${this.row} <> "", B${this.row} - A${this.row}, 0)`
    return [this.startedAt, this.endedAt, sumFunc]
  }
}

function updateRecord(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  sheetName: string,
  record: TimeRecord
) {
  const sheet = findOrCreateSheetByName(spreadsheet, sheetName)
  const range = sheet!.getRange(record.row, 1, 1, sheet!.getLastColumn())
  range.setValues([record.toArray()])
}

function getLastRecord(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  sheetName: string
): TimeRecord {
  const sheet = findOrCreateSheetByName(spreadsheet, sheetName)
  const rowNum = sheet!.getLastRow()
  const range = sheet!.getRange(rowNum, 1, 1, sheet!.getLastColumn())
  const record = TimeRecord.fromArray(rowNum, range.getValues()[0] as RowTimeRecord)
  return record
}
