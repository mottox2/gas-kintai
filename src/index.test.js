function testStart() {
  const e = {
    parameter: {
      text: 'kintai start',
      user_name: 'test'
    }
  }
  doPost(e)
}

function testEnd() {
  const e = {
    parameter: {
      text: 'kintai end',
      user_name: 'test'
    }
  }
  doPost(e)
}