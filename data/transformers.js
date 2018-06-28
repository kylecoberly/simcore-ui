import _ from 'lodash'

import * as timeBlock from './availabilities/timeBlock'

export const transformBlock = (instructorBlock, segments) => {
  const startSegment      = parseInt(_.first(_.keys(segments)), 10)
  const endSegment        = parseInt(_.last(_.keys(segments)), 10)
  const numberOfSegments  = _.size(segments)

  const transformedBlock = Object.assign({}, instructorBlock)

  transformedBlock.numberOfSegments  = numberOfSegments
  transformedBlock.startTime    = timeBlock.convertToDecimal(startSegment)
  transformedBlock.endTime      = timeBlock.convertToDecimal(startSegment + numberOfSegments)
  transformedBlock.startSegment = startSegment
  transformedBlock.endSegment   = endSegment
  transformedBlock.duration     = timeBlock.convertToDecimal(numberOfSegments)
  transformedBlock.segments     = segments

  return transformedBlock
}
