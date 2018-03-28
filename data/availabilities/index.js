import _ from 'lodash'

import {
  groupByDate,
  groupByDateAndStartTime,
} from './cleansers'

import {
  filterMinimumUsersWithACompleteDuration,
  getBlocksWithAMinimumNumberOfInstructors,
  getInstructorAvailabilitiesFromAListOfInstructorIds,
} from './filters'

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

  return groupedInstructorBlocks
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

  return blocksWithAMinimumNumberOfInstructors
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
        allInstructorAvailabilityBlocks,
        filtersToApply,
      )
    } else {
      instructorAvailabilityBlocks = allInstructorAvailabilityBlocks
    }
  } else {
    instructorAvailabilityBlocks = allInstructorAvailabilityBlocks
  }

  const minimumWithDuration = {}
  if (filtersToApply.eventLength < 1) {
    console.log(filtersToApply)
  }
  _.forEach(instructorAvailabilityBlocks, (block, date) => {
    const segments = {}
    _.forEach(_.keys(block), (key) => {
      _.assign(segments, block[key].segments)
    })


    const minimumWithDurations = filterMinimumUsersWithACompleteDuration(
      segments,
      filtersToApply.instructorSlots.totalCount,
      filtersToApply.eventLength * 2,
    )

    minimumWithDuration[date] = minimumWithDurations
  })
  console.log('filtered')

  return minimumWithDuration
}
