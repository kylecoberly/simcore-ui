export const create = (startSegment, startTime) => {
  return {
    startSegment,
    endSegment: startSegment,
    startTime,
    endTime: startTime,
    numberOfSegments: 0,
    duration: 0,
    segments: {},
  }
}

export const convertToDecimal = (whole) => {
  return (whole / 2)
}

export const convertFromDecimal = (decimal) => {
  return (decimal * 2)
}
