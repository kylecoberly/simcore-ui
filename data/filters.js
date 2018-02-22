import _ from 'lodash'
import availabilities from '../external/availabilities'

export const sortBlocks =
  (blocks, key) => {
    return _.sortBy(blocks, (block) => {
      return block[key]
    })
  }

export const isThisFilterWithinTheOriginalDataSet =
  (sortedBlocks, startTime, duration) => {
    const startOrEndTimeIsOutOfBounds =
      (startTime < _.first(sortedBlocks).start)
      ||
      ((startTime + duration) > _.last(sortedBlocks).start)

    return !startOrEndTimeIsOutOfBounds
  }

export const getAvailableInstructorsWithinATimeRange =
  (sortedBlocks, startTime, duration) => {
    return duration
  }

function createADefaultTimeBlockWithStartSegmentAndStartTime(startSegment, startTime) {
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

export const groupInstructorSegmentsForADayByContiguousTime =
  (segments) => {
    const timeBlocks = {}

    let currentBlockStartTime     = null
    let currentBlockStartSegment  = null
    let previousSegment           = null
    _.each(segments, (instructorAvailabilitySegments, instructorAvailabilitySegmentsStart) => {
      const segment   = parseInt(instructorAvailabilitySegmentsStart, 10)
      const startTime = availabilities.convertToDecimal(segment)

      if (
        currentBlockStartTime === null
        || previousSegment === null
        || (previousSegment + 1) !== segment
      ) {
        currentBlockStartTime     = parseFloat(startTime)
        currentBlockStartSegment  = segment
      }

      if (!timeBlocks[currentBlockStartTime]) {
        timeBlocks[currentBlockStartTime] =
          createADefaultTimeBlockWithStartSegmentAndStartTime(segment, startTime)
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

      // QUESTION for Chad: why was this startTime and not start?
      // It was breaking instructor view for adding availability
      timeBlocks[currentBlockStartTime].start =
        availabilities.convertToDecimal(currentBlockStartSegment)
      timeBlocks[currentBlockStartTime].startTime =
        availabilities.convertToDecimal(currentBlockStartSegment)
      timeBlocks[currentBlockStartTime].endTime   =
        availabilities.convertToDecimal(currentBlockStartSegment + numberOfSegments)
      timeBlocks[currentBlockStartTime].duration  =
        availabilities.convertToDecimal(numberOfSegments)

      timeBlocks[currentBlockStartTime].uniqueInstructorIds = uniqueInstructorIds
      timeBlocks[currentBlockStartTime].numberOfInstructors = uniqueInstructorIds.length

      previousSegment = segment
    })

    return timeBlocks
  }

export const groupAllInstructorAvailabilityBlocksByDate =
  (segments) => {
    const allBlocksFromInstructorAvailabilitySegments = {}
    _.each(segments,
      (availabilitySegment, date) => {
        const blocks = groupInstructorSegmentsForADayByContiguousTime(availabilitySegment)

        allBlocksFromInstructorAvailabilitySegments[date] = blocks
      })

    return allBlocksFromInstructorAvailabilitySegments
  }
