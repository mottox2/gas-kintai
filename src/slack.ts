function postToSlack(text: string, attachments?: any[]) {
  const properties = getProperties()
  const payload = {
    text,
    attachments,
    channel: properties.SLACK_CHANNEL,
    username: 'kintai',
    icon_emoji: ':timer_clock:'
  }
  const url = properties.SLACK_WEBHOOK_URL
  const response = UrlFetchApp.fetch(url!, {
    method: 'post',
    payload: JSON.stringify(payload)
  })
  const content = response.getContentText('UTF-8')
  Logger.log(content)
}
