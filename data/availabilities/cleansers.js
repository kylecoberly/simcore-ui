// Raw data from an external source (API, etc.) might not be ready for use in the application.
// Cleansing will:
// Normalize data.
// Remove extraneous data.

import _ from 'lodash'
import { groupSegmentsByContiguousTime } from './transformers'

export const groupByDateAndStartTime = (instructors) => {
  const blocksByDate = {}

  _.each(instructors, (userDates, userId) => {
    _.each(userDates, (date) => {
      const key         = Object.keys(date)[0]
      // TODO: Replace this with simpler timestamps when Rick's update is done. - Chad
      const dateOnlyKey = key.slice(0, -9)

      const startOffset     = date[key].startTime * 2
      const durationOffset  = (date[key].duration * 2)
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

        if (!blocksByDate[dateOnlyKey][currentBlock].startTime) {
          blocksByDate[dateOnlyKey][currentBlock].startTime = currentBlock
        }

        if (!_.includes(blocksByDate[dateOnlyKey][currentBlock].user_ids, userId)) {
          blocksByDate[dateOnlyKey][currentBlock].user_ids.push(userId)
        }
      }
    })
  })

  return blocksByDate
}

export const groupByDate = (segments) => {
  const blocksFromSegments = {}
  _.each(segments,
    (segment, date) => {
      const blocks = groupSegmentsByContiguousTime(segment)

      blocksFromSegments[date] = blocks
    })

  return blocksFromSegments
}
