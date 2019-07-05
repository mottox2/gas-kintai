function doPost(e: any) {
  const params = e.parameter
  const payload = runCommand({ userName: params.user_name, text: params.text ,...params)
  Logger.log(payload)
  // outgoing webhooks経由であればwebhook URLにpostする
  if (!params.command && !params.actions) {
    sendMessage(payload)
  }

  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function getProperties() {
  const properties = PropertiesService.getScriptProperties()
  const SLACK_WEBHOOK_URL = properties.getProperty('SLACK_WEBHOOK_URL')
  const SLACK_CHANNEL = properties.getProperty('SLACK_CHANNEL')
  return {
    SLACK_WEBHOOK_URL: SLACK_WEBHOOK_URL,
    SLACK_CHANNEL: SLACK_CHANNEL
  }
}
