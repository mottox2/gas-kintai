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