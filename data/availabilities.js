import _ from 'lodash'

export const transformFromUsersToDates = (instructors) => {
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

  console.log('transform users to dates keys')

  return blocksByDate
}

export const transformAUsersToDates = () => {
  console.log('transform users to dates keys')
}
