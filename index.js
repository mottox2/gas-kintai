function doPost(e) {
  const params = e.parameter
  const action = getActionType(removePrefix(params.text))
  addRecord(params.text)
  doAction(action, {
    text: params.text
  })
}

function removePrefix(text) {
  return text.replace(/kintai\ ?/, '')
}

function getProperties() {
  const properties = PropertiesService.getScriptProperties();
  const SHEET_ID = properties.getProperty('SHEET_ID');
  const SLACK_WEBHOOK_URL = properties.getProperty('SLACK_WEBHOOK_URL');
  const SLACK_CHANNEL = properties.getProperty('SLACK_CHANNEL');
  return {
    SHEET_ID: SHEET_ID,
    SLACK_WEBHOOK_URL: SLACK_WEBHOOK_URL,
    SLACK_CHANNEL: SLACK_CHANNEL
  }
}
