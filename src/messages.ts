const notFoundEndMessage = () => [
  {
    color: '#D10D20',
    text: '前回の完了記録が見つかりませんでした'
  }
]

const notFoundStartMessage = () => [
  {
    color: '#D10D20',
    text: '開始記録が見つかりませんでした'
  }
]

const startMessage = ({ spreadsheet, userName }: any) => [
  {
    author_name: '勤怠記録',
    author_link: authorLink(spreadsheet, userName),
    footer: userName,
    color: '#36a64f'
  }
]

const endMessage = ({ spreadsheet, record, userName }: any) => [
  {
    author_name: '勤怠記録',
    author_link: authorLink(spreadsheet, userName),
    fields: [
      {
        title: '開始時間',
        value: Moment.moment(record.startedAt).format('MM/DD HH:mm'),
        short: true
      },
      {
        title: '終了時間',
        value: Moment.moment(record.endedAt).format('MM/DD HH:mm'),
        short: true
      }
    ],
    footer: userName,
    color: '#36a64f'
  }
]
