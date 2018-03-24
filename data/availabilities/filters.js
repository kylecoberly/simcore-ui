/* eslint max-len: 0 */

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
  // console.log(instructorContiguousSegmentTally)
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
      // TODO: Reduce the instructors in each confirmed segment to only those with enough segments.
      const confirmedSegmentsWithOnlyValidInstructors = filterSegmentUsers(segments.confirmed, minimumDuration)

      segments.final = _.concat(segments.final, confirmedSegmentsWithOnlyValidInstructors)
    }
    segments.confirmed = []
  }

  return segments
}

function confirmAndResetSegments(segments, minimumDuration) {
  return confirmSegments(segments, minimumDuration, true)
}

function verifyAllCurrentInstructors(
  instructorsNoLongerInTheRunning,
  allUniqueInstructorIds,
  segments,
  minimumDuration,
  instructorMinimum,
  ) {
  // update any unconfirmed segments, removing any users not in the instructorsWithAtLeastAsManySegmentsAsTheCurrentRun array
  // remove any 'unconfirmed segments' if, after updating its users, it no longer has enough instructors ('instructor minimum')
  const unconfirmedSegments = []
  let instructorTally       = resetInstructorSegmentTally(allUniqueInstructorIds)
  _.forEach(segments.unconfirmed, (unconfirmedSegment) => {
    const minimumTallyLimit = (_.size(unconfirmedSegments) + 1 < minimumDuration) ? _.size(unconfirmedSegments) + 1 : minimumDuration

    instructorTally = tallyInstructorSegments(instructorTally, unconfirmedSegment.user_ids, minimumTallyLimit)
    const instructorsWithAtLeastAsManySegmentsAsTheCurrentTally = getInstructorsWithAtLeastAsManySegmentsAsALimit(
        instructorTally,
        minimumTallyLimit,
      )

    const instructorIdsWithAllSegments = _.pickBy(instructorsWithAtLeastAsManySegmentsAsTheCurrentTally,
      (instructor, key) => {
        return !_.includes(instructorsNoLongerInTheRunning, key.toString())
      })

    if (_.size(instructorIdsWithAllSegments) >= instructorMinimum) {
      const unconfirmedSegmentWithOnlyUsersWithAllSegments    = Object.assign({}, unconfirmedSegment)
      unconfirmedSegmentWithOnlyUsersWithAllSegments.user_ids = _.keys(instructorIdsWithAllSegments)

      unconfirmedSegments.push(unconfirmedSegmentWithOnlyUsersWithAllSegments)
    } else {
      console.log('remove this segment.')
    }
  })

  segments.unconfirmed = unconfirmedSegments

  return segments
}

function filterSegmentUsers(segments, minimumDuration) {
  let instructorTallies = {}

  let increment = 0
  let previousSegmentKey
  _.forEach(segments, (segment) => {
      const startTime = segment.startTime
    _.forEach(segment.user_ids, (instructorId) => {
      if (!instructorTallies[instructorId]) {
        instructorTallies[instructorId] = {
          runs: {
            [startTime]: { segments: { [startTime]: 1 }, tally: 1 },
          },
          lastAddedSegment: startTime,
          currentRun: startTime,
        }
      } else if (instructorTallies[instructorId].lastAddedSegment === previousSegmentKey) {
        const currentRun  = instructorTallies[instructorId].currentRun
        const newTally    = instructorTallies[instructorId].runs[currentRun].segments[previousSegmentKey] + 1

        instructorTallies[instructorId].runs[currentRun].segments[startTime] = newTally
        instructorTallies[instructorId].runs[currentRun].tally = newTally

        instructorTallies[instructorId].lastAddedSegment = startTime
      } else if (instructorTallies[instructorId].lastAddedSegment !== previousSegmentKey || increment + 1 === _.size(segments)) {
        instructorTallies[instructorId].runs[startTime] = { segments: { [startTime]: 1 }, tally: 1 }
        instructorTallies[instructorId].currentRun = startTime
      }
    })

    previousSegmentKey = startTime
    increment += 1
  })

  const newSegments = {}
  _.forEach(instructorTallies, (instructor, instructorId) => {
    _.forEach(instructor.runs, (run) => {
      if (run.tally >= minimumDuration) {
        _.forEach(run.segments, (segment, segmentStartTime) => {
          if (newSegments[segmentStartTime]) {
            newSegments[segmentStartTime].user_ids.push(instructorId)
          } else {
            newSegments[segmentStartTime] = { user_ids: [instructorId], startTime: parseInt(segmentStartTime, 10) }
          }
        })
      }
    })
  })

  const newSegmentArray = _.values(newSegments)

  return newSegmentArray
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

      const minimumContiguousTallyLimit = (contiguousSegmentTally < minimumDuration) ? contiguousSegmentTally : minimumDuration
      const instructorsWithAtLeastAsManySegmentsAsTheCurrentRun = getInstructorsWithAtLeastAsManySegmentsAsALimit(instructorContiguousSegmentCounts, minimumContiguousTallyLimit)

      // any currently unconfirmed instructors NOT in the current run now?
      const keysOfInstructorsWithAllSegments = _.keys(instructorsWithAtLeastAsManySegmentsAsTheCurrentRun)
      const instructorsNoLongerInTheRunning = _.pickBy(unconfirmedInstructors, (unconfirmedInstructor) => {
        return !_.includes(keysOfInstructorsWithAllSegments, unconfirmedInstructor)
      })

      // if this segment's valid instructor count (without said instructor) < 'instructor minimum'
      if (_.size(instructorsNoLongerInTheRunning) > 0) {
        segments = verifyAllCurrentInstructors(
          instructorsNoLongerInTheRunning,
          allUniqueInstructorIds,
          segments,
          minimumDuration,
          instructorMinimum,
        )

        contiguousSegmentTally  = _.size(segments.unconfirmed)
      }

      unconfirmedInstructors  = _.keys(instructorsWithAtLeastAsManySegmentsAsTheCurrentRun)
      segments                = confirmSegments(segments, minimumDuration)
    }

    previousSegment = segment
  })

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
