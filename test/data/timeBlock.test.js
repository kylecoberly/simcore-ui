// ---- DURATION/SEGMENT CONVERSIONS ----
import * as timeBlock from '../../data/availabilities/timeBlock'

test('convertingAnEvenWholeNumberToDecimalReturnsHalfTheOriginalWholeNumber', () => {
  const wholeNumber     = 6

  const expectedDecimal = 3
  const actualDecimal = timeBlock.convertToDecimal(wholeNumber)

  expect(actualDecimal).toEqual(expectedDecimal)
})

test('convertingAnOddWholeNumberToDecimalReturnsHalfTheOriginalWholeNumber', () => {
  const wholeNumber     = 7

  const expectedDecimal = 3.5
  const actualDecimal = timeBlock.convertToDecimal(wholeNumber)

  expect(actualDecimal).toEqual(expectedDecimal)
})

// --- DURATIONS TO SEGMENTS ---
test('convertingADurationOfZeroToANumberOfSegmentsShouldBeZero', () => {
  const duration = 0

  const expectedNumberOfSegments = 0

  const actualNumberOfSegments = timeBlock.convertFromDecimal(duration)

  expect(actualNumberOfSegments).toEqual(expectedNumberOfSegments)
})

test('convertingADurationOfOneHalfToANumberOfSegmentsShouldBeOne', () => {
  const duration = 0.5

  const expectedNumberOfSegments = 1

  const actualNumberOfSegments = timeBlock.convertFromDecimal(duration)

  expect(actualNumberOfSegments).toEqual(expectedNumberOfSegments)
})

test('convertingADurationGreaterThanOneToANumberOfSegmentsShouldBeTwiceTheDuration', () => {
  const duration = 1.5

  const expectedNumberOfSegments = 3

  const actualNumberOfSegments = (duration * 2)

  expect(actualNumberOfSegments).toEqual(expectedNumberOfSegments)
})

// --- SEGMENTS TO DURATIONS (DONE, JUST NEED NAMING) ---
test('convertingZeroSegmentsToADurationShouldBeZero', () => {
  const numberOfSegments = 0

  const expectedDuration = 0

  const actualDuration = timeBlock.convertToDecimal(numberOfSegments)

  expect(actualDuration).toEqual(expectedDuration)
})

test('convertingAnOddNumberOfSegmentsToADurationShouldResultInADecimal', () => {
  const numberOfSegments = 3

  const expectedDuration = 1.5

  const actualDuration = timeBlock.convertToDecimal(numberOfSegments)

  expect(actualDuration).toEqual(expectedDuration)
})

test('convertingASegmentStartTimeOfZeroToADurationStartTimeShouldBeZero', () => {
  const startTimeWhole = 0
  const expectedStartTimeDecimal = 0

  const actualStartTimeDecimal = timeBlock.convertToDecimal(startTimeWhole)

  expect(actualStartTimeDecimal).toEqual(expectedStartTimeDecimal)
})

test('convertingASegmentStartTimeGreaterThanZeroToADurationStartTimeShouldBeHalfTheSegmentStartTime', () => {
  const startTimeWhole = 1
  const expectedStartTimeDecimal = 0.5

  const actualStartTimeDecimal = timeBlock.convertToDecimal(startTimeWhole)

  expect(actualStartTimeDecimal).toEqual(expectedStartTimeDecimal)
})
