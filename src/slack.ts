function postToSlack(message: string) {
  const properties = getProperties()
  const payload = {
    "text": message,
    "channel": properties.SLACK_CHANNEL,
    "username": "kintai",
    "icon_emoji": ":+1:"
  }
  const url = properties.SLACK_WEBHOOK_URL
  const response = UrlFetchApp.fetch(url!, {
    method: "post",
    payload: JSON.stringify(payload)
  });
  const content = response.getContentText("UTF-8");
  Logger.log(content)
}