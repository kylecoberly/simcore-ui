import _ from 'lodash'

import * as transformers from './transformers'
import { groupSegmentsByContiguousTime } from './transformers'

export const getInstructorAvailabilitiesFromAListOfInstructorIds = (
  totalInstructorSet,
  instructorsToFilterFrom,
) => {
  return _.pickBy(totalInstructorSet, (instructor, instructorId) => {
    return instructorsToFilterFrom.includes(parseInt(instructorId, 10))
  })
}

export const getOnlyTheBlocksWhichContainAllTheUsers = (blocks, totalUserCount) => {
  return _.pickBy(blocks, (block) => {
    return block.user_ids.length === totalUserCount
  })
}

export const getSpecificBlocksFromAListOfInstructorIds = (
  totalInstructorAvailabilityBlocks,
  instructorsToFilterFrom,
) => {
  const filteredInstructorAvailabilityBlocks = {}
  _.each(totalInstructorAvailabilityBlocks, (availabilityBlock) => {
    const segmentsIncludingAllRequiredInstructors =
      _.pickBy(availabilityBlock.segments, (segments) => {
        const instructorIntegerIds = _.map(segments.user_ids, (id) => { return parseInt(id, 10) })

        return _.difference(instructorsToFilterFrom, instructorIntegerIds).length <= 0
      })

    // Unfortunately, the spread operator isn't working so... here's this.
    if (!_.isEmpty(segmentsIncludingAllRequiredInstructors)) {
      const filteredBlock     = Object.assign({}, availabilityBlock)
      filteredBlock.segments  = segmentsIncludingAllRequiredInstructors

      const uniqueInstructorIds = []
      _.each(segmentsIncludingAllRequiredInstructors, (availabilitySegment) => {
        _.each(availabilitySegment, (userIds) => {
          _.each(userIds, (userId) => {
            if (!uniqueInstructorIds.includes(userId)) {
              uniqueInstructorIds.push(userId)
            }
          })
        })
      })

      const groupedBlocks =
        transformers.groupSegmentsByContiguousTime(segmentsIncludingAllRequiredInstructors)

      _.each(groupedBlocks, (block, blockKey) => {
        filteredInstructorAvailabilityBlocks[blockKey] = groupedBlocks[blockKey]
      })
    }
  })

  return filteredInstructorAvailabilityBlocks
}

function getSegmentsFromBlocksWithAMinimumNumberOfInstructors(
  instructorAvailabilityBlocks,
  instructorMinimum,
) {
  let allSegmentsWithMinimums = {}
  _.forEach(instructorAvailabilityBlocks, (availabilityBlock) => {
    const blockSegmentsWithMinimums = _.pickBy(availabilityBlock.segments, (segment) => {
      return segment.user_ids.length >= instructorMinimum
    })

    allSegmentsWithMinimums = _.merge(allSegmentsWithMinimums, blockSegmentsWithMinimums)
  })

  return allSegmentsWithMinimums
}

export const getBlocksWithAMinimumNumberOfInstructors = (
  instructorAvailabilityBlocks,
  instructorMinimum,
) => {
  const segmentsWithMinimums = getSegmentsFromBlocksWithAMinimumNumberOfInstructors(
    instructorAvailabilityBlocks,
    instructorMinimum,
  )

  return transformers.groupSegmentsByContiguousTime(segmentsWithMinimums)
}

function tallyInstructorSegments(instructorContiguousSegmentTally, segmentInstructorIds) {
  const userIds = _.invert(segmentInstructorIds)
  _.forEach(instructorContiguousSegmentTally, (count, instructorId) => {
    if (_.has(userIds, instructorId)) {
      instructorContiguousSegmentTally[instructorId] += 1
    } else {
      instructorContiguousSegmentTally[instructorId] = 0
    }
  })

  return instructorContiguousSegmentTally
}

function areThereEnoughSegments(currentSegmentIndex, minimumSegmentCount) {
  return currentSegmentIndex >= minimumSegmentCount
}

function getInstructorsWithAtLeastAsManySegmentsAsALimit(instructorContiguousSegmentTally, limit) {
  console.log(instructorContiguousSegmentTally)
  return _.pickBy(instructorContiguousSegmentTally,
    (instructorSegmentTally) => {
      return instructorSegmentTally >= limit
    })
}

function doEnoughInstructorsHaveTheMinimumDuration(instructorContiguousSegmentTally, minimumInstructorCount, minimumSegmentCount) {
  const continuousInstructorTotalWithMinimumDuration = getInstructorsWithAtLeastAsManySegmentsAsALimit(instructorContiguousSegmentTally, minimumSegmentCount)

  return _.size(continuousInstructorTotalWithMinimumDuration) >= minimumInstructorCount
}

function doEnoughInstructorsHaveAtLeastAsManySegmentsAsTheCurrentRun(instructorContiguousSegmentTally, minimumInstructorCount, currentSegmentCount) {
  const continuousInstructorTotal = getInstructorsWithAtLeastAsManySegmentsAsALimit(instructorContiguousSegmentTally, _.size(currentSegmentCount))

  return _.size(continuousInstructorTotal) >= minimumInstructorCount
}

function resetInstructorSegmentTally(allUniqueInstructorIds) {
  return _.reduce(allUniqueInstructorIds, (instructorCounts, instructorId) => {
    instructorCounts[instructorId] = 0

    return instructorCounts
  }, {})
}

function keySortedSegments(sortedSegments, keyBy = 'startTime') {
  return _.reduce(sortedSegments, (keyedSegments, segment) => {
    keyedSegments[segment[keyBy]] = segment

    return keyedSegments
  }, {})
}

function confirmSegments(segments, minimumDuration, shouldReset = false) {
  if (shouldReset) {
    segments.unconfirmed = []
  }

  if (_.size(segments.confirmed) > 0) {
    if (_.size(segments.confirmed) >= minimumDuration) {
      segments.final = _.concat(segments.final, segments.confirmed)
    }
    segments.confirmed = []
  }

  return segments
}

function confirmAndResetSegments(segments, minimumDuration) {
  return confirmSegments(segments, minimumDuration, true)
}

export const getBlocksWithAMinimumNumberOfInstructorsForAMinimumDuration = (
  instructorAvailabilityBlocks,
  instructorMinimum,
  minimumDuration,
) => {
  const allUniqueInstructorIds = _.reduce(instructorAvailabilityBlocks, (uniqueInstructorIds, block) => {
    uniqueInstructorIds = _.uniq(_.concat(uniqueInstructorIds, block.uniqueInstructorIds))

    return uniqueInstructorIds
  }, {})

  // const unconfirmedInstructorLog = []
  // const instructorTallyLog = []
  // const segmentLog = []

  // currentTally
  // duration

  // unconfirmedInstructors
  // instructorTallies

  // instructorMinimum
  // unconfirmedSegments

  // while currentTally < duration, if any unconfirmedInstructor's instructor.tally < currentTally:
  //    remove them from the 'unconfirmedInstructors' list.
  //    if that segment's valid instructor count (without said instructor) < 'instructor minimum'
  //        remove any 'unconfirmed segments'
  //        reset current tally to 0 from that segment

  // once currentTally === duration... (confirm...? and?)


  let segments = {
    final: [],
    unconfirmed: [],
    confirmed: [],
  }
  let unconfirmedInstructors            = []
  let instructorContiguousSegmentCounts = resetInstructorSegmentTally(allUniqueInstructorIds)

  const segmentsWithAMinimumNumberOfInstructors = getSegmentsFromBlocksWithAMinimumNumberOfInstructors(instructorAvailabilityBlocks, instructorMinimum)

  let contiguousSegmentTally = 0
  let previousSegment
  _.forEach(segmentsWithAMinimumNumberOfInstructors, (segment) => {
    if (previousSegment && segment.startTime !== previousSegment.startTime + 1) {
      // This segment is not contiguous.
      segments = confirmAndResetSegments(segments, minimumDuration)

      instructorContiguousSegmentCounts = resetInstructorSegmentTally(allUniqueInstructorIds)
    }

    // Increase the block's instructor contiguous segment counts.
    instructorContiguousSegmentCounts = tallyInstructorSegments(instructorContiguousSegmentCounts, segment.user_ids, contiguousSegmentTally)

    if (!doEnoughInstructorsHaveAtLeastAsManySegmentsAsTheCurrentRun(
      instructorContiguousSegmentCounts,
      instructorMinimum,
      contiguousSegmentTally + 1,
    )) {
      // We DON'T have enough instructors.
      segments = confirmAndResetSegments(segments, minimumDuration)
    } else if (doEnoughInstructorsHaveTheMinimumDuration(
        instructorContiguousSegmentCounts,
        instructorMinimum,
        minimumDuration,
      )
    ) {
      // We DO have enough instructors AND enough contiguous segments.
      segments.unconfirmed.push(segment)

      segments.confirmed       = _.concat(segments.confirmed, segments.unconfirmed)
      segments.unconfirmed     = []

      contiguousSegmentTally  += 1
    } else {
      // We DO have enough instructors BUT NOT enough contiguous segments.
      segments.unconfirmed.push(segment)
      contiguousSegmentTally += 1

      const instructorsWithAtLeastAsManySegmentsAsTheCurrentRun = getInstructorsWithAtLeastAsManySegmentsAsALimit(instructorContiguousSegmentCounts, contiguousSegmentTally)
      // any currently unconfirmed instructors NOT in the current run now?

      const keysOfInstructorsWithAllSegments = _.keys(instructorsWithAtLeastAsManySegmentsAsTheCurrentRun)
      const instructorsNoLongerInTheRunning = _.pickBy(unconfirmedInstructors, (unconfirmedInstructor) => {
        return !_.includes(keysOfInstructorsWithAllSegments, unconfirmedInstructor)
      })

      // if this segment's valid instructor count (without said instructor) < 'instructor minimum'
      if (_.size(instructorsNoLongerInTheRunning) > 0) {
        // update any unconfirmed segments, removing any users not in the instructorsWithAtLeastAsManySegmentsAsTheCurrentRun array
        // remove any 'unconfirmed segments' if, after updating its users, it no longer has enough instructors ('instructor minimum')
        // reset the tally and repeat.
        let unconfirmedSegmentTally = 0
        const unconfirmedSegments = []
        _.forEach(segments.unconfirmed, (unconfirmedSegment) => {
          let instructorsWithAtLeastAsManySegmentsAsTheCurrentTally = instructorsWithAtLeastAsManySegmentsAsTheCurrentRun
          if (unconfirmedSegmentTally > 0) {
            instructorsWithAtLeastAsManySegmentsAsTheCurrentTally = getInstructorsWithAtLeastAsManySegmentsAsALimit(instructorContiguousSegmentCounts, unconfirmedSegmentTally)
          }

          const userIdsWithAllSegments = _.pickBy(instructorsWithAtLeastAsManySegmentsAsTheCurrentTally, (instructor, key) => {
            const instructorString = key.toString()
            return !_.includes(instructorsNoLongerInTheRunning, instructorString)
          })
          if (_.size(userIdsWithAllSegments) >= instructorMinimum) {
            const unconfirmedSegmentWithOnlyUsersWithAllSegments    = Object.assign({}, unconfirmedSegment)
            unconfirmedSegmentWithOnlyUsersWithAllSegments.user_ids = _.keys(userIdsWithAllSegments)

            unconfirmedSegments.push(unconfirmedSegmentWithOnlyUsersWithAllSegments)
            unconfirmedSegmentTally += 1
          } else {
            // reset current tally to 0 from that segment
            unconfirmedSegmentTally = 1
          }
        })

        contiguousSegmentTally  = _.size(unconfirmedSegments)

        segments.unconfirmed = unconfirmedSegments
      }

      unconfirmedInstructors = _.keys(instructorsWithAtLeastAsManySegmentsAsTheCurrentRun)
      segments = confirmSegments(segments, minimumDuration)
    }

    // unconfirmedInstructorLog.push(JSON.stringify(unconfirmedInstructors))
    // instructorTallyLog.push(JSON.stringify(instructorContiguousSegmentCounts))
    // segmentLog.push(JSON.stringify(segments))

    previousSegment = segment
  })

  // console.log(segmentLog)

  segments = confirmSegments(segments, minimumDuration)

  const sortedSegments                  = _.sortBy(segments.final, (segment) => { return segment.startTime })
  const sortedSegmentsKeyedByStartTime  = keySortedSegments(sortedSegments)

  const blocks = groupSegmentsByContiguousTime(sortedSegmentsKeyedByStartTime)

  return blocks
}

export const filterBlocksByDuration = (blocks, minimumDuration) => {
  const instructorAvailabilityBlocksByDateWithinDuration = {}
  _.each(blocks, (instructorAvailabilityBlocksForDate, date) => {
    const blocksWithinDuration =
      _.filter(instructorAvailabilityBlocksForDate, (availabilityBlock) => {
        return availabilityBlock.duration >= parseFloat(minimumDuration)
      })

    if (blocksWithinDuration.length > 0) {
      instructorAvailabilityBlocksByDateWithinDuration[date] = blocksWithinDuration
    }
  })

  return instructorAvailabilityBlocksByDateWithinDuration
}

export const filterBlocksWithinATimeRange = (blocks, startTime, duration) => {
  return _.pickBy(blocks, (block, startTimeKey) => {
    return (startTimeKey >= startTime) && (startTimeKey <= (startTime + duration))
  })
}

export const filterBlocksForATimeRange = (blocks, startTime, duration) => {
  return _.pickBy(blocks, (block, startTimeKey) => {
    return (startTimeKey >= startTime) && (startTimeKey <= (startTime + duration))
  })
}

export const getAllInstructorAvailabilitiesForADate = (blocks, date) => {
  return blocks[date]
}
