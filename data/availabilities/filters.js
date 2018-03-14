import _ from 'lodash'

import * as transformers from './transformers'

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

export const getBlocksWithAMinimumNumberOfInstructors = (
  instructorAvailabilityBlocks,
  instructorMinimum,
) => {
  return _.pickBy(instructorAvailabilityBlocks, (availabilityBlock) => {
    return availabilityBlock.numberOfInstructors >= instructorMinimum
  })
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
