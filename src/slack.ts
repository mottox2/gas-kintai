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
