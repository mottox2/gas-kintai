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

function runCommand(payload: Payload) {
  const now = Moment.moment().format('YYYY/MM/DD HH:mm')
  const spreadsheet = getSpreadsheet()
  const record = getLastRecord(spreadsheet, payload.userName)
  Logger.log(record.row)
  const command = removePrefix(payload.text)
  switch (command) {
    case 'start':
    case 'はじめ':
    case 'restart':
    case '再開':
      if (!record.isComplete()) {
        return buildMessage(notFoundEndBlocks({ record }))
      }
      const newRecord = new TimeRecord(record.row + 1, now, '')
      updateRecord(spreadsheet, payload.userName, newRecord)
      return buildMessage(startBlocks({ userName: payload.userName }))
    case 'end':
    case 'おわり':
    case '休憩':
    case 'stop':
      if (record.isComplete()) {
        return buildMessage(notFoundStartBlocks({ record }))
      }
      record.endedAt = now
      updateRecord(spreadsheet, payload.userName, record)
      return buildMessage(endBlocks({ spreadsheet, record, userName: payload.userName }))
    case 'ping':
      return buildMessage([textBlock('pong')], ephemeralOption)
    case 'debug':
      return buildMessage([textBlock(JSON.stringify(payload))], ephemeralOption)
    default:
      return buildMessage(
        [
          textBlock(`:warning: *コマンドが見つかりませんでした。*
コマンド例: \`kintai start\`, \`kintai end\`, \`kintai stop\`, \`kintai restart\``),
          dividerBlock(),
          textBlock(record.isComplete() ? '現在 *退勤中* です。' : '現在 *勤務中* です。')
        ],
        ephemeralOption
      )
  }
}
