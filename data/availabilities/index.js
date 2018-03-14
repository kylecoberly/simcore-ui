import _ from 'lodash'

import {
  groupByDate,
  groupByDateAndStartTime,
} from './cleansers'

import {
  filterBlocksByDuration,
  getBlocksWithAMinimumNumberOfInstructors,
  getInstructorAvailabilitiesFromAListOfInstructorIds,
  getSpecificBlocksFromAListOfInstructorIds,
} from './filters'

import {
  groupSegmentsByContiguousTime,
} from './transformers'

// Get only exactly the specific instructors.
// This will by far be the fastest option when possible.
function filterOnlySpecificInstructors(instructorsWithAvailabilityBlocks, filtersToApply) {
  const specificAndExactInstructors =
    getInstructorAvailabilitiesFromAListOfInstructorIds(
      instructorsWithAvailabilityBlocks,
      filtersToApply.instructorSlots.specificInstructorIds,
    )

  const allSegmentsFromInstructorAvailabilityBlocks =
    groupByDateAndStartTime(specificAndExactInstructors)

  const groupedInstructorBlocks =
    groupByDate(
      allSegmentsFromInstructorAvailabilityBlocks,
    )

  const allBlocksWithAllInstructorsForAllDays = {}
  _.each(groupedInstructorBlocks, (instructorBlock, key) => {
    const onlyBlocksWithAllInstructors =
      getSpecificBlocksFromAListOfInstructorIds(
        instructorBlock,
        filtersToApply.instructorSlots.specificInstructorIds,
      )
    allBlocksWithAllInstructorsForAllDays[key] = onlyBlocksWithAllInstructors
  })

  return allBlocksWithAllInstructorsForAllDays
}


function filterSpecificAndNonSpecificInstructors(allInstructorAvailabilityBlocks, filtersToApply) {
  const blocksWithAMinimumNumberOfInstructors = {}
  _.each(allInstructorAvailabilityBlocks, (instructorBlocks, key) => {
    const onlyBlocksWithAllInstructors =
      getBlocksWithAMinimumNumberOfInstructors(
        instructorBlocks,
        filtersToApply.instructorSlots.totalCount,
      )

    if (_.size(onlyBlocksWithAllInstructors) > 0) {
      blocksWithAMinimumNumberOfInstructors[key] =
        onlyBlocksWithAllInstructors
    }
  })

  const blocksReducedBySegmentsWithAMinimumNumberOfInstructors = {}
  _.each(blocksWithAMinimumNumberOfInstructors, (instructorBlocks, key) => {
    _.each(instructorBlocks, (instructorBlock) => {
      const segmentsWithAMinimumNumberOfInstructors = _.pickBy(instructorBlock.segments, (segment) => {
        return segment.user_ids.length >= filtersToApply.instructorSlots.totalCount
      })

      const groupedBlocks =
        groupSegmentsByContiguousTime(segmentsWithAMinimumNumberOfInstructors)

      const blocksWithAllInstructors = getSpecificBlocksFromAListOfInstructorIds(
        groupedBlocks,
        filtersToApply.instructorSlots.specificInstructorIds,
      )

      blocksReducedBySegmentsWithAMinimumNumberOfInstructors[key] = Object.assign(
        blocksReducedBySegmentsWithAMinimumNumberOfInstructors[key] || {},
        blocksWithAllInstructors,
      )
    })
  })

  return blocksReducedBySegmentsWithAMinimumNumberOfInstructors
}

function filterByMinimumRequiredInstructors(allInstructorAvailabilityBlocks, filtersToApply) {
  const instructorAvailabilityBlocksWithAMinimumNumberOfInstructors = {}
  _.each(allInstructorAvailabilityBlocks, (instructorBlocks, key) => {
    const onlyBlocksWithAllInstructors =
      getBlocksWithAMinimumNumberOfInstructors(
        instructorBlocks,
        filtersToApply.instructorSlots.totalCount,
      )

    if (_.size(onlyBlocksWithAllInstructors) > 0) {
      instructorAvailabilityBlocksWithAMinimumNumberOfInstructors[key] =
        onlyBlocksWithAllInstructors
    }
  })

  const instructorBlocksReducedToSegmentsWithAMinimumNumberOfInstructors = {}
  _.each(instructorAvailabilityBlocksWithAMinimumNumberOfInstructors, (instructorBlocks, key) => {
    _.each(instructorBlocks, (instructorBlock) => {
      const segmentsWithAMinimumNumberOfInstructors = _.pickBy(instructorBlock.segments, (segment) => {
        return segment.user_ids.length >= filtersToApply.instructorSlots.totalCount
      })

      const groupedBlocks =
        groupSegmentsByContiguousTime(segmentsWithAMinimumNumberOfInstructors)

      instructorBlocksReducedToSegmentsWithAMinimumNumberOfInstructors[key] = Object.assign(
        instructorBlocksReducedToSegmentsWithAMinimumNumberOfInstructors[key] || {},
        groupedBlocks,
      )
    })
  })

  return instructorBlocksReducedToSegmentsWithAMinimumNumberOfInstructors
}

export default (
  instructorsWithAvailabilityBlocks,
  allInstructorAvailabilityBlocks,
  filtersToApply,
) => {
  // TODO: where in (filter.facilities)
  // TODO: where in (filter.departments)
  // TODO: where in (filter.professionalTitles)
  let instructorAvailabilityBlocks

  if (filtersToApply.instructorSlots.totalCount > 0) {
    if (
      filtersToApply.instructorSlots.specificInstructorIds.length
      === filtersToApply.instructorSlots.totalCount
    ) {
      instructorAvailabilityBlocks = filterOnlySpecificInstructors(
        instructorsWithAvailabilityBlocks,
        filtersToApply,
      )
    } else if (filtersToApply.instructorSlots.specificInstructorIds.length > 0) {
      instructorAvailabilityBlocks = filterSpecificAndNonSpecificInstructors(
        instructorsWithAvailabilityBlocks,
        filtersToApply,
      )
    } else {
      instructorAvailabilityBlocks = filterByMinimumRequiredInstructors(
        instructorsWithAvailabilityBlocks,
        filtersToApply,
      )
    }
  } else {
    instructorAvailabilityBlocks = allInstructorAvailabilityBlocks
  }

  // Event Length
  return filterBlocksByDuration(
    instructorAvailabilityBlocks,
    filtersToApply.eventLength,
  )
}
