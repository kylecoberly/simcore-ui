import _ from 'lodash'

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

export const groupInstructorsForADayByContiguousTime =
  (blocks) => {
    const actualContiguousTimeBlocks = {}

    let currentContiguousBlockStartTime = null
    let mostRecentStartTime = null
    _.each(blocks, (userAvailabilities, userAvailabilitiesStartTime) => {
      const startTime = parseInt(userAvailabilitiesStartTime, 10)

      if (
        (!currentContiguousBlockStartTime && !mostRecentStartTime)
        ||
        ((mostRecentStartTime + 1) !== startTime)
      ) {
        currentContiguousBlockStartTime = startTime
      }

      mostRecentStartTime = startTime

      if (!actualContiguousTimeBlocks[currentContiguousBlockStartTime]) {
        actualContiguousTimeBlocks[currentContiguousBlockStartTime] = {
          start: currentContiguousBlockStartTime,
          end: currentContiguousBlockStartTime,
          duration: 1,
          timeBlocks: {},
        }
      }

      actualContiguousTimeBlocks[currentContiguousBlockStartTime].start =
        currentContiguousBlockStartTime
      actualContiguousTimeBlocks[currentContiguousBlockStartTime].end = startTime
      actualContiguousTimeBlocks[currentContiguousBlockStartTime].timeBlocks[startTime] =
        userAvailabilities
      actualContiguousTimeBlocks[currentContiguousBlockStartTime].duration =
       Object.keys(actualContiguousTimeBlocks[currentContiguousBlockStartTime].timeBlocks).length
    })

    return actualContiguousTimeBlocks
  }
