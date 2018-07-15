function doPost(e) {
  const params = e.parameter
  const action = getAction(removePrefix(params.text))
  addRecord(params.text)
  dispatch(action, {
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

function Test() {
  const params = {
    text: 'kintai おはよう'
  }
  const action = getAction(removePrefix(params.text))
  addRecord(params.text)
  dispatch(action, {
    text: params.text
  })
}

function postToSlack(message) {
  const properties = getProperties()
  const payload = {
    "text": message,
    "channel": properties.SLACK_CHANNEL,
    "username": "kintai",
    "icon_emoji": ":+1:"
  }
  const options = {
    "method": "POST",
    "payload": JSON.stringify(payload)
  }
  const url = properties.SLACK_WEBHOOK_URL
  const response = UrlFetchApp.fetch(url, options);
  const content = response.getContentText("UTF-8");
  Logger.log(content)
}