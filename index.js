function doPost(e) {
  const params = e.parameter
  addRecord('new record!')
  // postToSlack(params.text)
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

function doGet(e) {
  postToSlack('Message')
  const payload = JSON.stringify({
    text: 'Test Response'
  })
  const res = ContentService.createTextOutput();
  res.setMimeType(ContentService.MimeType.JSON);
  res.setContent(payload);
  return res;
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