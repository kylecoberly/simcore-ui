import _ from 'lodash'

import availabilities from '../external/availabilities'

export const transformBlock = (instructorBlock, segments) => {
  const startSegment      = parseInt(_.first(_.keys(segments)), 10)
  const endSegment        = parseInt(_.last(_.keys(segments)), 10)
  const numberOfSegments  = _.size(segments)

  const transformedBlock = Object.assign({}, instructorBlock)

  transformedBlock.numberOfSegments  = numberOfSegments
  // start is DEPRECATED. Use startTime instead.
  transformedBlock.start        = availabilities.convertToDecimal(startSegment)
  transformedBlock.startTime    = availabilities.convertToDecimal(startSegment)
  transformedBlock.endTime      = availabilities.convertToDecimal(startSegment + numberOfSegments)
  transformedBlock.startSegment = startSegment
  transformedBlock.endSegment   = endSegment
  transformedBlock.duration     = availabilities.convertToDecimal(numberOfSegments)
  transformedBlock.segments     = segments

  return transformedBlock
}
