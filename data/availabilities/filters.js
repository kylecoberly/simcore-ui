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

export const getBlocksWithAMinimumNumberOfInstructorsForAMinimumDuration = (
  instructorAvailabilityBlocks,
  instructorMinimum,
  minimumDuration,
) => {
  const allUniqueInstructorIds = _.reduce(instructorAvailabilityBlocks, (uniqueInstructorIds, block) => {
    uniqueInstructorIds = _.uniq(_.concat(uniqueInstructorIds, block.uniqueInstructorIds))

    return uniqueInstructorIds
  }, {})

  const segmentsWithAMinimumNumberOfInstructors = getSegmentsFromBlocksWithAMinimumNumberOfInstructors(instructorAvailabilityBlocks, instructorMinimum)

  let finalSegments = []
  let unconfirmedSegments = []
  let confirmedSegments = []
  // Reset the contiguous segment count for instructors.
  let instructorContiguousSegmentCounts = _.reduce(allUniqueInstructorIds, (instructorCounts, instructorId) => {
    instructorCounts[instructorId] = 0

    return instructorCounts
  }, {})

  let previousSegment
  _.forEach(segmentsWithAMinimumNumberOfInstructors, (segment) => {
    if (previousSegment && segment.startTime !== previousSegment.startTime + 1) {
      // This segment is not contiguous.
      unconfirmedSegments = []
      if (_.size(confirmedSegments) > 0) {
        if (_.size(confirmedSegments) >= minimumDuration) {
          finalSegments = _.concat(finalSegments, confirmedSegments)
        }
        confirmedSegments = []
      }

      instructorContiguousSegmentCounts = _.reduce(allUniqueInstructorIds, (instructorCounts, instructorId) => {
        instructorCounts[instructorId] = 0

        return instructorCounts
      }, {})
    }

    // Increase the block's instructor contiguous segment counts.
    _.forEach(instructorContiguousSegmentCounts, (count, instructorId) => {
      const userIds = _.invert(segment.user_ids)

      if (_.has(userIds, instructorId)) {
        instructorContiguousSegmentCounts[instructorId] += 1
      } else if (_.has(userIds, instructorId) < minimumDuration) {
        // If this id isn't in this segment AND this count is less than the minimum, start over.
        instructorContiguousSegmentCounts[instructorId] = 0
      }
    })

    const continuousInstructorTotal                     = _.filter(instructorContiguousSegmentCounts, (instructorCount) => { return instructorCount >= _.size(unconfirmedSegments) })
    const continuousInstructorTotalWithMinimumDuration  = _.filter(instructorContiguousSegmentCounts, (instructorCount) => { return instructorCount >= minimumDuration })

    if (_.size(continuousInstructorTotal) < instructorMinimum) {
      // We DON'T have enough instructors.
      unconfirmedSegments = []
      if (_.size(confirmedSegments) > 0) {
        if (_.size(confirmedSegments) >= minimumDuration) {
          finalSegments = _.concat(finalSegments, confirmedSegments)
        }
        confirmedSegments = []
      }
    } else if (_.size(continuousInstructorTotalWithMinimumDuration) >= instructorMinimum) {
      // We DO have enough instructors AND enough contiguous segments.
      unconfirmedSegments.push(segment)

      confirmedSegments = _.concat(confirmedSegments, unconfirmedSegments)
      unconfirmedSegments = []
      // }
    } else {
      // We DO have enough instructors BUT NOT enough contiguous segments.
      unconfirmedSegments.push(segment)

      if (_.size(confirmedSegments) > 0) {
        if (_.size(confirmedSegments) >= minimumDuration) {
          finalSegments = _.concat(finalSegments, confirmedSegments)
        }
        confirmedSegments = []
      }
    }

    previousSegment = segment
  })

  if (_.size(confirmedSegments) > 0) {
    if (_.size(confirmedSegments) >= minimumDuration) {
      finalSegments = _.concat(finalSegments, confirmedSegments)
    }
    confirmedSegments = []
  }

  const sortedSegments = _.sortBy(finalSegments, (segment) => { return segment.startTime })
  const sortedSegmentsKeyedByStartTime = _.reduce(sortedSegments, (keyedSegments, segment) => {
    keyedSegments[segment.startTime] = segment

    return keyedSegments
  }, {})

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
