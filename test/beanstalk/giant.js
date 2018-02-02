const passingColor = '#00C176'
const failingColor = '#BD5532'
const highlightColor = '#fff000'
const whiteColor = '#ffffff'

export const introduce = (message, passingTestCount = 0, totalTestsRun) => {
  const failingTestsCount = totalTestsRun - passingTestCount

  const overallStatusColor = (passingTestCount === totalTestsRun) ? passingColor : failingColor
  const spacerFormatting = 'width: 10%;'
  const labelFormatting = `color: ${highlightColor}; background: #222; padding: .3em; width: 10%; text-align: center; font-size: 1.3em; letter-spacing: 0.5em; border-bottom: 1px solid #888`
  const messageFormatting = `color: ${overallStatusColor}; background: #222; padding: .3em; width: 85%; text-align: center; font-size: 1.3em; letter-spacing: 0.5em; border-bottom: 1px solid #888`

  const totalCountColor = (passingTestCount === totalTestsRun) ? whiteColor : highlightColor
  const failingCountFormatting = `width: 30%; color: ${failingColor}; text-align: center; font-weight: bold; font-size: 1.3em;`
  const passingCountFormatting = `width: 30%; color: ${passingColor}; text-align: center; font-weight: bold; font-size: 1.3em;`
  const totalCountFormatting = `width: 25%; color: ${totalCountColor}; text-align: center; font-weight: bold; font-size: 1.3em;`

  const messageStatus = (passingTestCount === totalTestsRun) ?
    { before: 'All', after: 'tests passed.' } : { before: 'Some', after: 'tests failed.' }
  const messageWithStatus = `${messageStatus.before} ${message} ${messageStatus.after}`

  console.log(
    `%c status %c${messageWithStatus}`,
    labelFormatting,
    messageFormatting,
  )
  console.log(
    `%c %c✔ ${passingTestCount} passed %cｘ ${failingTestsCount} failed %c${totalTestsRun} total tests run.`,
    spacerFormatting,
    passingCountFormatting,
    failingCountFormatting,
    totalCountFormatting,
  )
}

export const say = (caller, testDidPass) => {
  const testMessage = testDidPass ? 'YES! :)' : 'SAD. :('
  const testMessageColor = testDidPass ? passingColor : failingColor

  const callerMessageFormatting = `color: ${testMessageColor}; background: #222; padding: .3em; width: 85%; text-align: left; font-size: 1.3em; letter-spacing: 0.5em`
  const resultMessageFormatting = `background: ${testMessageColor}; color: #222; padding: .3em; width: 10%; text-align: center; font-size: 1.3em; font-weight: bold; letter-spacing: 0.06em`

  const callerAsATitle = caller.charAt(0).toUpperCase() + caller.slice(1).split(/(?=[A-Z])/).join(' ')
  // TODO: Make every word except the first lowercase. - Chad

  console.log(
    `%c${testMessage} %c${callerAsATitle}.`,
    resultMessageFormatting,
    callerMessageFormatting,
  )
}
