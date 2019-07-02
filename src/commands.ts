declare const Moment: any

const authorLink = (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, sheetName: string) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheet.getId()}#gid=${spreadsheet
    .getSheetByName(sheetName)
    .getSheetId()}`

interface Payload {
  userName: string
  text: string
}

function removePrefix(text: string) {
  return text.replace(/kintai\ ?/, '') || null
}

// slash commandsの結果を自分だけが見る場合付与
const ephemeralOption = {
  response_type: 'ephemeral'
}

function doCommand(payload: Payload) {
  const now = Moment.moment().format('YYYY/MM/DD HH:mm')
  const spreadsheet = getSpreadsheet()
  const lastRecord = getLastRecord(spreadsheet, payload.userName)
  Logger.log(lastRecord.row)
  const command = removePrefix(payload.text)
  switch (command) {
    case 'start':
    case 'はじめ':
    case 'restart':
    case '再開':
      if (!lastRecord.isComplete()) {
        return buildMessage(notFoundEndBlocks())
      }
      const newRecord = new TimeRecord(lastRecord.row + 1, now, '')
      updateRecord(spreadsheet, payload.userName, newRecord)
      return buildMessage(startBlocks({ userName: payload.userName }))
    case 'end':
    case 'おわり':
    case '休憩':
    case 'stop':
      if (lastRecord.isComplete()) {
        return buildMessage(notFoundStartBlocks())
      }
      lastRecord.endedAt = now
      updateRecord(spreadsheet, payload.userName, lastRecord)
      return buildMessage(
        endBlocks({ spreadsheet, record: lastRecord, userName: payload.userName })
      )
    case 'ping':
      return buildMessage(textBlocks('pong'), ephemeralOption)
    default:
      return buildMessage(
        textBlocks(`:warning: *コマンドが見つかりませんでした。*
コマンド例: \`kintai start\`, \`kintai end\`, \`kintai stop\`, \`kintai restart\``),
        ephemeralOption
      )
  }
}
