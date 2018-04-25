// import _ from 'lodash'
// import availabilities from '../external/availabilities'

// export const sortBlocks =
//   (blocks, key) => {
//     return _.sortBy(blocks, (block) => {
//       return block[key]
//     })
//   }

// export const isThisFilterWithinTheOriginalDataSet =
//   (sortedBlocks, startTime, duration) => {
//     const startOrEndTimeIsOutOfBounds =
//       (startTime < _.first(sortedBlocks).start)
//       ||
//       ((startTime + duration) > _.last(sortedBlocks).start)
//
//     return !startOrEndTimeIsOutOfBounds
//   }
//
// export const getAvailableInstructorsWithinATimeRange =
//   (sortedBlocks, startTime, duration) => {
//     return duration
//   }

// function createADefaultTimeBlockWithStartSegmentAndStartTime(startSegment, startTime) {
//   return {
//     startSegment,
//     endSegment: startSegment,
//     startTime,
//     endTime: startTime,
//     numberOfSegments: 0,
//     duration: 0,
//     segments: {},
//   }
// }
