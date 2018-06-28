import _ from 'lodash'

import * as timeBlock from './timeBlock'

export const groupSegmentsByContiguousTime =
  (segments) => {
    const timeBlocks = {}

    let currentBlockStartTime     = null
    let currentBlockStartSegment  = null
    let previousSegment           = null
    _.each(segments, (instructorAvailabilitySegments, instructorAvailabilitySegmentsStart) => {
      const segment   = parseInt(instructorAvailabilitySegmentsStart, 10)
      const startTime = timeBlock.convertToDecimal(segment)

      if (
        currentBlockStartTime === null
        || previousSegment === null
        || (previousSegment + 1) !== segment
      ) {
        currentBlockStartTime     = parseFloat(startTime)
        currentBlockStartSegment  = segment
      }

      if (!timeBlocks[currentBlockStartTime]) {
        timeBlocks[currentBlockStartTime] = timeBlock.create(segment, startTime)
      }

      timeBlocks[currentBlockStartTime].segments[segment] = instructorAvailabilitySegments

      const uniqueInstructorIds = (timeBlocks[currentBlockStartTime].uniqueInstructorIds)
        ? timeBlocks[currentBlockStartTime].uniqueInstructorIds
        : []

      _.each(instructorAvailabilitySegments, (availabilitySegment) => {
        _.each(availabilitySegment, (userId) => {
          if (!uniqueInstructorIds.includes(userId)) {
            uniqueInstructorIds.push(userId)
          }
        })
      })

      const numberOfSegments  = Object.keys(timeBlocks[currentBlockStartTime].segments).length
      const endSegment        = segment

      timeBlocks[currentBlockStartTime].numberOfSegments    = numberOfSegments
      timeBlocks[currentBlockStartTime].startSegment        = currentBlockStartSegment
      timeBlocks[currentBlockStartTime].endSegment          = endSegment

      timeBlocks[currentBlockStartTime].startTime =
        timeBlock.convertToDecimal(currentBlockStartSegment)
      timeBlocks[currentBlockStartTime].endTime   =
        timeBlock.convertToDecimal(currentBlockStartSegment + numberOfSegments)
      timeBlocks[currentBlockStartTime].duration  =
        timeBlock.convertToDecimal(numberOfSegments)

      timeBlocks[currentBlockStartTime].uniqueInstructorIds = uniqueInstructorIds
      timeBlocks[currentBlockStartTime].numberOfInstructors = uniqueInstructorIds.length

      previousSegment = segment
    })

    return timeBlocks
  }
