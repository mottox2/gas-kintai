interface MessageOptions {
  response_type?: string
}

function buildMessage(blocks: Block[], options: MessageOptions = {}) {
  const payload = {
    text: '',
    response_type: options.response_type || 'in_channel',
    blocks
  }
  return payload
}

function sendMessage(payload: any) {
  const properties = getProperties()
  const url = properties.SLACK_WEBHOOK_URL
  const response = UrlFetchApp.fetch(url!, {
    method: 'post',
    payload: JSON.stringify(payload)
  })
  const content = response.getContentText('UTF-8')
  Logger.log(content)
}
