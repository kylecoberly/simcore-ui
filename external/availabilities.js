import _ from 'lodash'
import axios from 'axios'

const endpoint = 'users'
const action = 'purview_availabilities'
// TODO: Refactor formatting from filtering. - Chad
export default {
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
  getAvailabilities(baseUrl, userId, startDate, endDate) {
    return axios.get(`${baseUrl}${endpoint}/${userId}/${action}?start_date=${startDate}&end_date=${endDate}&key_by=user_id`)
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
  transform(availabilities, filters) {
    if (!filters) {
      filters = {
        minimumDuration: 2,
        filteredInstructors: [],
      }
    }

    // Reducing availability set.
    let aggregateInstructorsFromFilter = availabilities
    if (filters.filteredInstructors.length > 0) {
      aggregateInstructorsFromFilter = this.getInstructorAvailabilitiesFromAListOfInstructorIds(
        aggregateInstructorsFromFilter,
        filters.filteredInstructors,
      )
    }

    // Transforming availability set.
    const instructorAvailabilityBlocksByDate =
      this.aggregateInstructorAvailabilityKeyedByDateWhereAllIntersect(aggregateInstructorsFromFilter)

    // Filter blocks by duration.
    const instructorAvailabilityBlocksByDateWithinDuration =
      this.filterBlocksByDuration(instructorAvailabilityBlocksByDate, filters.minimumDuration)

    return instructorAvailabilityBlocksByDateWithinDuration
  },
  availabilities(filters) {
    if (!filters) {
      filters = {
        minimumDuration: 2,
        filteredInstructors: [],
      }
    }

    // Reducing availability set.
    let aggregateInstructorsFromFilter = littleLameData
    if (filters.filteredInstructors.length > 0) {
      aggregateInstructorsFromFilter = this.getInstructorAvailabilitiesFromAListOfInstructorIds(
        aggregateInstructorsFromFilter,
        filters.filteredInstructors,
      )
    }

    // Transforming availability set.
    const instructorAvailabilityBlocksByDate = this.aggregateInstructorAvailabilityKeyedByDateWhereAllIntersect(aggregateInstructorsFromFilter)

    // Filter blocks by duration.
    const instructorAvailabilityBlocksByDateWithinDuration = {}
    _.each(instructorAvailabilityBlocksByDate, (instructorAvailabilityBlocksForDate, date) => {
      const blocksWithinDuration = _.filter(instructorAvailabilityBlocksForDate, (availabilityBlock) => {
        return availabilityBlock.duration >= parseFloat(filters.minimumDuration)
      })

      if (blocksWithinDuration.length > 0) {
        instructorAvailabilityBlocksByDateWithinDuration[date] = blocksWithinDuration
      }
    })

    // feFiFoUmmm('instructorAvailabilityBlocksByDateWithinDuration', instructorAvailabilityBlocksByDateWithinDuration, expectedBlocksFilteredByTwoHours)

    return instructorAvailabilityBlocksByDateWithinDuration
  },
}
