interface Block {
  type: string
  text?: any
  elements?: any[]
}

const notFoundEndBlocks: (args: { record: TimeRecord }) => Block[] = ({ record }) => [
  {
    type: 'section',
    text: {
      type: 'plain_text',
      text: ':warning: 前回の完了記録が見つかりませんでした',
      emoji: true
    }
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `前回の開始時刻: ${Moment.moment(record.startedAt).format('MM/DD HH:mm')}`
      }
    ]
  }
]

const notFoundStartBlocks: (args: { record: TimeRecord }) => Block[] = ({ record }) => [
  {
    type: 'section',
    text: {
      type: 'plain_text',
      text: ':warning: 開始記録が見つかりませんでした',
      emoji: true
    }
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `前回の終了時刻: ${Moment.moment(record.endedAt).format('MM/DD HH:mm')}`
      }
    ]
  }
]

const startBlocks: (args: any) => Block[] = ({ userName }: any) => {
  return [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: `${userName} の開始時刻を入力しました`,
        emoji: true
      }
    }
  ]
}

const endBlocks: (args: any) => Block[] = ({ spreadsheet, record, userName }: any) => {
  const startedAt = Moment.moment(record.startedAt).format('MM/DD HH:mm')
  const endedAt = Moment.moment(record.endedAt).format('MM/DD HH:mm')
  return [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: `${userName} の終了時刻を入力しました`,
        emoji: true
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*${startedAt}〜${endedAt}* （<${authorLink(spreadsheet, userName)}|詳細>）`
        }
      ]
    }
  ]
}

const textBlock: (text: string) => Block = text => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text
  }
})

const dividerBlock: () => Block = () => ({
  type: 'divider'
})
