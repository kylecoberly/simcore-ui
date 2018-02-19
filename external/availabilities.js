import _ from 'lodash'

import * as filters from '../data/filters'

// TODO: Refactor formatting from filtering. - Chad
export default {
  getSegmentsBetweenStartAndEnd(start, end) {
    return 0
  },
  getDurationFromStartAndEnd(start, end) {
    if (end > start) {
      return (end - start)
    }

    return 'Error: The end must come after the start.'
  },
  convertToDecimal(whole) {
    return (whole / 2)
  },

  aggregateInstructorAvailabilityKeyedByDateAndStartTime(instructors) {
    const lessLameData = _.reduce(instructors, (resultSoFar, userDates, userId) => {
      _.each(userDates, (date) => {
        const key = Object.keys(date)
        const dateOnlyKey = key[0].slice(0, -9)

        if (!resultSoFar[dateOnlyKey]) {
          resultSoFar[dateOnlyKey] = []
        }

        (resultSoFar[dateOnlyKey][date[key[0]].start] || (resultSoFar[dateOnlyKey][date[key[0]].start] = []))
          .push({ user: userId, duration: date[key[0]].duration, start: date[key[0]].start })
      })

      return resultSoFar
    }, {})

    feFiFoUmmm('aggregateInstructorAvailabilityKeyedByDateAndStartTime', lessLameData, expectedLittleLameData)

    return lessLameData
  },
  groupInstructorAvailabilitiesKeyedByDateAndStartTime(instructors) {
    const blocksByDate = {}

    _.each(instructors, (userDates, userId) => {
      _.each(userDates, (date) => {
        const key = Object.keys(date)
        const dateOnlyKey = key[0].slice(0, -9)

        const startOffset = date[key[0]].start * 2

        const durationOffset = (date[key[0]].duration * 2)
        for (
          let currentBlock = startOffset;
          currentBlock < (startOffset + durationOffset);
          currentBlock += 1
        ) {
          if (!blocksByDate[dateOnlyKey]) {
            blocksByDate[dateOnlyKey] = {}
          }

          if (!blocksByDate[dateOnlyKey][currentBlock]) {
            blocksByDate[dateOnlyKey][currentBlock] = {}
          }

          if (!blocksByDate[dateOnlyKey][currentBlock].user_ids) {
            blocksByDate[dateOnlyKey][currentBlock].user_ids = []
          }

          if (!blocksByDate[dateOnlyKey][currentBlock].start) {
            blocksByDate[dateOnlyKey][currentBlock].start = currentBlock
          }

          if (!_.includes(blocksByDate[dateOnlyKey][currentBlock].user_ids, userId)) {
            blocksByDate[dateOnlyKey][currentBlock].user_ids.push(userId)
          }
        }
      })
    })

    return blocksByDate
  },
  getOnlyTheBlocksWhichContainAllTheUsers(blocks, totalUserCount) {
    return _.pickBy(blocks, (block) => {
      return block.user_ids.length === totalUserCount
    })
  },
  getOnlyTheBlocksWhichContainAllTheUsersAcrossMultipleDays(blocks, totalUserCount) {
    const onlyTheBlocksWhichContainExactlyAllTheUsers = {}

    _.each(blocks, (blocksForDay, key) => {
      onlyTheBlocksWhichContainExactlyAllTheUsers[key] = _.pickBy(blocksForDay, (block) => {
        return block.user_ids.length === totalUserCount
      })
    })

    return onlyTheBlocksWhichContainExactlyAllTheUsers
  },
  getOnlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart(blocks) {
    const onlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart = {}
    _.each(blocks, (blocksForDay, key) => {
      onlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart[key] = _.orderBy(blocksForDay, ['start'])
    })

    return onlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart
  },
  getBlocksClusteredForStartAndDuration(blocks) {
    const clusteredBlocksForStartAndDuration = {}
    _.each(blocks, (blocksForDay, key) => {
      let previousBlock = null
      let currentSpanStart = null

      _.each(blocksForDay, (block) => {
        if (previousBlock === null) {
          currentSpanStart = block.start
          if (!clusteredBlocksForStartAndDuration[key]) {
            clusteredBlocksForStartAndDuration[key] = {}
          }

          clusteredBlocksForStartAndDuration[key][currentSpanStart] = {
            start: (block.start / 2),
            duration: 0.5,
            user_ids: block.user_ids,
          }
        } else {
          if (previousBlock + 1 === block.start) {
            clusteredBlocksForStartAndDuration[key][currentSpanStart].duration += 0.5
          } else {
            currentSpanStart = block.start
            if (!clusteredBlocksForStartAndDuration[key]) {
              clusteredBlocksForStartAndDuration[key] = {}
            }

            clusteredBlocksForStartAndDuration[key][currentSpanStart] = {
              start: (block.start / 2),
              duration: 0.5,
              user_ids: block.user_ids,
            }
          }
        }

        previousBlock = block.start
      })
    })

    return clusteredBlocksForStartAndDuration
  },
  getBlocksClusteredForStartAndDurationAndKeyedByDate(blocks) {
    const clusteredBlocksForStartAndDurationAndKeyedByDate = {}
    _.each(blocks, (blocksForDay, key) => {
      clusteredBlocksForStartAndDurationAndKeyedByDate[key] = _.toArray(blocksForDay)
    })

    return clusteredBlocksForStartAndDurationAndKeyedByDate
  },
  aggregateInstructorAvailabilityKeyedByDateWhereAllIntersect(instructors) {
    const totalUserCount = instructors.length
    const blocksByDate = this.groupInstructorAvailabilitiesKeyedByDateAndStartTime(instructors)

    const onlyTheBlocksWhichContainExactlyAllTheUsers =
      this.getOnlyTheBlocksWhichContainAllTheUsersAcrossMultipleDays(blocksByDate, totalUserCount)

    // TODO: Refactor for chaining. - Chad
    const onlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart =
      this.getOnlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart(onlyTheBlocksWhichContainExactlyAllTheUsers)

    const clusteredBlocksForStartAndDuration =
      this.getBlocksClusteredForStartAndDuration(onlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart)

    // // TODO: Refactor for chaining. - Chad
    const clusteredBlocksForStartAndDurationAndKeyedByDate =
      this.getBlocksClusteredForStartAndDurationAndKeyedByDate(clusteredBlocksForStartAndDuration)

    return clusteredBlocksForStartAndDurationAndKeyedByDate
  },
  aggregateInstructorAvailabilityKeyedByDate(instructors) {
    const lessLameData = _.reduce(instructors, (resultSoFar, userDates, userId) => {
      _.each(userDates, (date) => {
        const key = Object.keys(date)
        const dateOnlyKey = key[0].slice(0, -9)

        if (!resultSoFar[dateOnlyKey]) {
          resultSoFar[dateOnlyKey] = {}
        }

        if (!resultSoFar[dateOnlyKey][date[key[0]].start]) {
          resultSoFar[dateOnlyKey][date[key[0]].start] = {}
        }

        if (!resultSoFar[dateOnlyKey][date[key[0]].start][date[key[0]].duration]) {
          resultSoFar[dateOnlyKey][date[key[0]].start][date[key[0]].duration] = {}
        }

        if (!resultSoFar[dateOnlyKey][date[key[0]].start][date[key[0]].duration].user_ids) {
          resultSoFar[dateOnlyKey][date[key[0]].start][date[key[0]].duration].user_ids = []
        }

        resultSoFar[dateOnlyKey][date[key[0]].start][date[key[0]].duration].duration = date[key[0]].duration
        resultSoFar[dateOnlyKey][date[key[0]].start][date[key[0]].duration].start = date[key[0]].start
        resultSoFar[dateOnlyKey][date[key[0]].start][date[key[0]].duration].user_ids.push(userId)
      })

      return resultSoFar
    }, {})

    // Flatten all duration blocks. (Also remove any blocks where all people aren't inside? Also limit blocks to the total overlap of time instead of all times...?
    const someOkData = {}
    _.each(lessLameData, (date, key) => {
      someOkData[key] = []

      _.each(date, (startTimes) => {
        _.each(startTimes, (durationBlocks) => {
          someOkData[key].push(durationBlocks)
        })
      })
    })

    feFiFoUmmm('aggregateInstructorAvailabilityKeyedByDate', someOkData, expectedLittleLameDataFlattened)

    return someOkData
  },
  getInstructorAvailabilitiesFromAListOfInstructorIds(totalInstructorSet, instructorsToFilterFrom) {
    return _.pickBy(totalInstructorSet, (instructor, instructorId) => {
      return instructorsToFilterFrom.includes(parseInt(instructorId, 10))
    })
  },
  getSpecificInstructorAvailabilityBlocksFromAListOfInstructorIds(
    totalInstructorAvailabilityBlocks,
    instructorsToFilterFrom,
  ) {
    const filteredInstructorAvailabilityBlocks = {}
    _.each(totalInstructorAvailabilityBlocks, (availabilityBlock, key) => {
      const segmentsIncludingAllRequiredInstructors =
        _.pickBy(availabilityBlock.segments, (segments) => {
          const instructorIntegerIds = _.map(segments.user_ids, (id) => { return parseInt(id, 10) })

          return _.difference(instructorsToFilterFrom, instructorIntegerIds).length <= 0
        })

      // Unfortunately, the spread operator isn't working so... here's this.
      if (!_.isEmpty(segmentsIncludingAllRequiredInstructors)) {
        const filteredBlock     = availabilityBlock
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

        const numberOfSegments  = _.size(segmentsIncludingAllRequiredInstructors)

        filteredBlock.numberOfSegments = numberOfSegments

        let startSegment
        let endSegment    = 0
        _.each(segmentsIncludingAllRequiredInstructors, (availabilitySegment) => {
          if (!startSegment) {
            startSegment = availabilitySegment.start
          } else if (availabilitySegment.start < startSegment) {
            startSegment = availabilitySegment.start
          }

          if (availabilitySegment.start > endSegment) {
            endSegment = availabilitySegment.start
          }
        })

        filteredBlock.startSegment  = startSegment
        filteredBlock.endSegment    = endSegment

        // filteredBlock.startTime = this.convertToDecimal(startSegment)
        filteredBlock.start     = this.convertToDecimal(startSegment)
        filteredBlock.endTime   = this.convertToDecimal(startSegment + numberOfSegments)
        filteredBlock.duration  = this.convertToDecimal(numberOfSegments)

        filteredBlock.uniqueInstructorIds = uniqueInstructorIds
        filteredBlock.numberOfInstructors = uniqueInstructorIds.length

        filteredInstructorAvailabilityBlocks[key] = filteredBlock
      }
    })

    return filteredInstructorAvailabilityBlocks
  },
  getInstructorAvailabilityBlocksWithAMinimumNumberOfInstructors(
    instructorAvailabilityBlocks,
    instructorMinimum,
  ) {
    return _.pickBy(instructorAvailabilityBlocks, (availabilityBlock) => {
      return availabilityBlock.numberOfInstructors >= instructorMinimum
    })
  },

  getAllInstructorAvailabilitiesForADate(blocks, date) {
    return blocks[date]
  },
  filterBlocksWithinATimeRange(blocks, startTime, duration) {
    return _.pickBy(blocks, (block, startTimeKey) => {
      return (startTimeKey >= startTime) && (startTimeKey <= (startTime + duration))
    })
  },
  filterBlocksForATimeRange(blocks, startTime, duration) {
    return _.pickBy(blocks, (block, startTimeKey) => {
      return (startTimeKey >= startTime) && (startTimeKey <= (startTime + duration))
    })
  },
  filterBlocksByDuration(blocks, minimumDuration) {
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
  },
  transform(availabilities, filtersToApply) {
    if (!filtersToApply) {
      filtersToApply = {
        minimumDuration: 2,
        filteredInstructors: [],
      }
    }

    // Reducing availability set.
    let aggregateInstructorsFromFilter = availabilities
    if (filtersToApply.filteredInstructors.length > 0) {
      aggregateInstructorsFromFilter = this.getInstructorAvailabilitiesFromAListOfInstructorIds(
        aggregateInstructorsFromFilter,
        filtersToApply.filteredInstructors,
      )
    }

    // Transforming availability set.
    const instructorAvailabilityBlocksByDate =
      this.aggregateInstructorAvailabilityKeyedByDateWhereAllIntersect(aggregateInstructorsFromFilter)

    // Filter blocks by duration.
    const instructorAvailabilityBlocksByDateWithinDuration =
      this.filterBlocksByDuration(instructorAvailabilityBlocksByDate, filtersToApply.minimumDuration)

    return instructorAvailabilityBlocksByDateWithinDuration
  },

  filterInstructorAvailabilityBlocks(
    instructorsWithAvailabilityBlocks,
    allInstructorAvailabilityBlocks,
    filtersToApply,
  ) {
    // 1. specificInstructors = Reduce all instructors to 'specific instructors' list
    // (only if 'specific instructors' has 0 'any available' slots)

    // where in (filter.facilities)
    // where in (filter.departments)
    // where in (filter.professionalTitles
    let instructorAvailabilityBlocks
    if (filtersToApply.instructorSlots.totalCount > 0) {
      if (
        filtersToApply.instructorSlots.specificInstructorIds.length
        === filtersToApply.instructorSlots.totalCount
      ) {
        // Get only exactly the specific instructors.
        // This will by far be the fastest option when possible.
        const specificAndExactInstructors =
          this.getInstructorAvailabilitiesFromAListOfInstructorIds(
            instructorsWithAvailabilityBlocks,
            filtersToApply.instructorSlots.specificInstructorIds,
          )

        const allSegmentsFromInstructorAvailabilityBlocks =
          this.groupInstructorAvailabilitiesKeyedByDateAndStartTime(specificAndExactInstructors)

        const groupedInstructorBlocks =
          filters.groupAllInstructorAvailabilityBlocksByDate(
            allSegmentsFromInstructorAvailabilityBlocks,
          )

        const allBlocksWithAllInstructorsForAllDays = {}
        _.each(groupedInstructorBlocks, (instructorBlock, key) => {
          const onlyBlocksWithAllInstructors =
            this.getSpecificInstructorAvailabilityBlocksFromAListOfInstructorIds(
              instructorBlock,
              filtersToApply.instructorSlots.specificInstructorIds,
            )
          allBlocksWithAllInstructorsForAllDays[key] = onlyBlocksWithAllInstructors
        })

        instructorAvailabilityBlocks = allBlocksWithAllInstructorsForAllDays
      } else if (filtersToApply.instructorSlots.specificInstructorIds.length > 0) {
        // 2b. minimumInstructors = Reduce 'specificInstructors' to sets >= the minimum length
        // const instructorAvailabilityBlocksWithAMinimumNumberOfInstructors =
        //   this.getInstructorAvailabilityBlocksWithAMinimumNumberOfInstructors(
        //     allInstructorAvailabilityBlocks,
        //     filtersToApply.instructorSlots.totalCount,
        //   )

        const instructorAvailabilityBlocksWithAMinimumNumberOfInstructors = {}
        _.each(allInstructorAvailabilityBlocks, (instructorBlocks, key) => {
          const onlyBlocksWithAllInstructors =
            this.getInstructorAvailabilityBlocksWithAMinimumNumberOfInstructors(
              instructorBlocks,
              filtersToApply.instructorSlots.totalCount,
            )

          instructorAvailabilityBlocksWithAMinimumNumberOfInstructors[key] =
            onlyBlocksWithAllInstructors
        })

        instructorAvailabilityBlocks =
          this.getSpecificInstructorAvailabilityBlocksFromAListOfInstructorIds(
            instructorAvailabilityBlocksWithAMinimumNumberOfInstructors,
            filtersToApply.instructorSlots.specificInstructorIds,
          )
      } else {
        const instructorAvailabilityBlocksWithAMinimumNumberOfInstructors = {}
        _.each(allInstructorAvailabilityBlocks, (instructorBlocks, key) => {
          const onlyBlocksWithAllInstructors =
            this.getInstructorAvailabilityBlocksWithAMinimumNumberOfInstructors(
              instructorBlocks,
              filtersToApply.instructorSlots.totalCount,
            )

          instructorAvailabilityBlocksWithAMinimumNumberOfInstructors[key] =
            onlyBlocksWithAllInstructors
        })

        instructorAvailabilityBlocks = instructorAvailabilityBlocksWithAMinimumNumberOfInstructors
      }
    } else {
      instructorAvailabilityBlocks = allInstructorAvailabilityBlocks
    }

    // Event Length
    const blocksFilteredByDuration = this.filterBlocksByDuration(
      instructorAvailabilityBlocks,
      filtersToApply.eventLength,
    )

    return blocksFilteredByDuration
  },
}
