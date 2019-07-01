function doPost(e: any) {
  const params = e.parameter
  doCommand({
    userName: params.user_name,
    text: params.text
  })
}

function getProperties() {
  const properties = PropertiesService.getScriptProperties()
  const SHEET_ID = properties.getProperty('SHEET_ID')
  const SLACK_WEBHOOK_URL = properties.getProperty('SLACK_WEBHOOK_URL')
  const SLACK_CHANNEL = properties.getProperty('SLACK_CHANNEL')
  return {
    SHEET_ID: SHEET_ID,
    SLACK_WEBHOOK_URL: SLACK_WEBHOOK_URL,
    SLACK_CHANNEL: SLACK_CHANNEL
  }
}
