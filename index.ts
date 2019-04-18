function doPost(e: any) {
  const params = e.parameter
  const actionName : any = removePrefix(params.text)
  const action = getActionType(actionName)
  doAction(action, {
    userName: params.user_name,
    text: params.text
  })
}

function removePrefix(text: string) {
  return text.replace(/kintai\ ?/, '') || null
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
