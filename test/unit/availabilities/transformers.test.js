/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

import * as transformers from '../../../data/availabilities/transformers'

test('returnContiguousTimeBlocksForUsersInADay', () => {
  const userAvailabilitiesForADate =
    {
      '1': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 1 },
      '2': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 2 },
      '3': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 3 },
      '4': { 'user_ids': ['1220', '7475'], 'startTime': 4 },
      '5': { 'user_ids': ['1220', '7475'], 'startTime': 5 },
      '6': { 'user_ids': ['1220', '7475'], 'startTime': 6 },
      '7': { 'user_ids': ['1220', '7475'], 'startTime': 7 },
      '8': { 'user_ids': ['1220'], 'startTime': 8 },
      '9': { 'user_ids': ['1220'], 'startTime': 9 },
      '28': { 'user_ids': ['4112'], 'startTime': 28 },
      '29': { 'user_ids': ['4112'], 'startTime': 29 },
      '30': { 'user_ids': ['4112'], 'startTime': 30 },
      '31': { 'user_ids': ['4112'], 'startTime': 31 },
      '32': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 32 },
      '33': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 33 },
      '34': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 34 },
      '35': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 35 },
      '36': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 36 },
      '37': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 37 },
    }

  const expectedContiguousTimeBlocks = {
    '0.5': {
      startTime: 0.5,
      endTime: 5,
      duration: 4.5,
      startSegment: 1,
      endSegment: 9,
      numberOfSegments: 9,
      uniqueInstructorIds: ['1220', '4112', '7475'],
      numberOfInstructors: 3,
      segments: {
        '1': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 1 },
        '2': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 2 },
        '3': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 3 },
        '4': { 'user_ids': ['1220', '7475'], 'startTime': 4 },
        '5': { 'user_ids': ['1220', '7475'], 'startTime': 5 },
        '6': { 'user_ids': ['1220', '7475'], 'startTime': 6 },
        '7': { 'user_ids': ['1220', '7475'], 'startTime': 7 },
        '8': { 'user_ids': ['1220'], 'startTime': 8 },
        '9': { 'user_ids': ['1220'], 'startTime': 9 },
      }
    },
    '14': {
      startTime: 14,
      endTime: 19,
      duration: 5,
      startSegment: 28,
      endSegment: 37,
      numberOfSegments: 10,
      uniqueInstructorIds: ['4112', '3726', '6630', '7475'],
      numberOfInstructors: 4,
      segments: {
        '28': { 'user_ids': ['4112'], 'startTime': 28 },
        '29': { 'user_ids': ['4112'], 'startTime': 29 },
        '30': { 'user_ids': ['4112'], 'startTime': 30 },
        '31': { 'user_ids': ['4112'], 'startTime': 31 },
        '32': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 32 },
        '33': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 33 },
        '34': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 34 },
        '35': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 35 },
        '36': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 36 },
        '37': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 37 },
      },
    }
  }

  const actualContiguousTimeBlocks = transformers.groupSegmentsByContiguousTime(
    userAvailabilitiesForADate
  )

  expect(actualContiguousTimeBlocks).toEqual(expectedContiguousTimeBlocks)
})

test('groupingUserSegmentsStartingAtZeroShouldReturnAContiguousBlock', () => {
  const userAvailabilitiesForADate =
    {
      '0': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 0 },
      '1': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 1 },
      '2': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 2 },
      '3': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 3 },
      '4': { 'user_ids': ['1220', '7475'], 'startTime': 4 },
      '5': { 'user_ids': ['1220', '7475'], 'startTime': 5 },
      '6': { 'user_ids': ['1220', '7475'], 'startTime': 6 },
      '7': { 'user_ids': ['1220', '7475'], 'startTime': 7 },
      '8': { 'user_ids': ['1220'], 'startTime': 8 },
      '9': { 'user_ids': ['1220'], 'startTime': 9 },
    }

  const expectedContiguousTimeBlocks = {
    '0': {
      startTime: 0,
      endTime: 5,
      duration: 5,
      startSegment: 0,
      endSegment: 9,
      numberOfSegments: 10,
      uniqueInstructorIds: ['1220', '4112', '7475'],
      numberOfInstructors: 3,
      segments: {
        '0': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 0 },
        '1': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 1 },
        '2': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 2 },
        '3': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 3 },
        '4': { 'user_ids': ['1220', '7475'], 'startTime': 4 },
        '5': { 'user_ids': ['1220', '7475'], 'startTime': 5 },
        '6': { 'user_ids': ['1220', '7475'], 'startTime': 6 },
        '7': { 'user_ids': ['1220', '7475'], 'startTime': 7 },
        '8': { 'user_ids': ['1220'], 'startTime': 8 },
        '9': { 'user_ids': ['1220'], 'startTime': 9 },
      }
    },
  }

  const actualContiguousTimeBlocks = transformers.groupSegmentsByContiguousTime(
    userAvailabilitiesForADate
  )

  expect(actualContiguousTimeBlocks).toEqual(expectedContiguousTimeBlocks)
})

test('contiguousTimeBlocksForASingleUserSegmentStartingAtZeroShouldReturnASingleSet', () => {
  const userAvailabilitiesForADate =
    {
      '0': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 0 },
    }

  const expectedContiguousTimeBlocks = {
    '0': {
      startTime: 0,
      endTime: 0.5,
      duration: 0.5,
      startSegment: 0,
      endSegment: 0,
      numberOfSegments: 1,
      uniqueInstructorIds: ['1220', '4112', '7475'],
      numberOfInstructors: 3,
      segments: {
        '0': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 0 },
      }
    },
  }

  const actualContiguousTimeBlocks = transformers.groupSegmentsByContiguousTime(
    userAvailabilitiesForADate
  )

  expect(actualContiguousTimeBlocks).toEqual(expectedContiguousTimeBlocks)
})

// TODO: REFACTOR - Isolate the actual filter. Currently this works as a loop. - Chad
// TODO: Rename for what's being tested, not the function being called. - Chad
// test('getBlocksClusteredForStartAndDuration', () => {
//   const expectedAvailabilityBlocks =
//     {
//       '2017-12-19': {
//         '26': {
//           'startTime': 13,
//           'duration': 6,
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755']
//         }
//       },
//       '2017-12-20': {
//         '0': { 'startTime': 0, 'duration': 5, 'user_ids': ['1220', '4112', '7475'] },
//         '28': { 'startTime': 14, 'duration': 5.5, 'user_ids': ['4112'] }
//       },
//       '2017-12-21': {
//         '0': { 'startTime': 0, 'duration': 3, 'user_ids': ['7755'] },
//         '16': { 'startTime': 8, 'duration': 4, 'user_ids': ['7475'] },
//         '28': { 'startTime': 14, 'duration': 5, 'user_ids': ['3726'] }
//       },
//       '2017-12-22': {
//         '16': { 'startTime': 8, 'duration': 4, 'user_ids': ['7475'] },
//         '28': { 'startTime': 14, 'duration': 4, 'user_ids': ['3726', '4112', '7755'] }
//       },
//       '2017-12-24': {
//         '24': {
//           'startTime': 12,
//           'duration': 8,
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755']
//         }
//       },
//       '2017-12-25': {
//         '6': {
//           'startTime': 3,
//           'duration': 2,
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755']
//         },
//         '16': { 'startTime': 8, 'duration': 12, 'user_ids': ['1220', '3726', '6630', '7475', '7755'] }
//       }
//     }
//
//   const actualAvailabilityBlocks =
//     availabilities.getBlocksClusteredForStartAndDuration(
//       mock.segmentsGroupedByDate
//     )
//
//   expect(actualAvailabilityBlocks).toEqual(expectedAvailabilityBlocks)
// })

// TODO: REFACTOR - Isolate the actual filter. Currently this works as a loop. - Chad
// TODO: Rename for what's being tested, not the function being called. - Chad
// test('getBlocksClusteredForStartAndDurationAndKeyedByDate', () => {
//   const expectedAvailabiltyBlocks =
//     {
//       '2017-12-19': [
//         {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 26
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 27
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 28
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 29
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 30
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 31
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 32
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 33
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 34
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 35
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 36
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 37 }
//       ],
//       '2017-12-20': [
//         {
//           'user_ids': ['1220', '4112', '7475'],
//           'startTime': 0
//         }, {
//           'user_ids': ['1220', '4112', '7475'],
//           'startTime': 1
//         }, {
//           'user_ids': ['1220', '4112', '7475'],
//           'startTime': 2
//         }, { 'user_ids': ['1220', '4112', '7475'], 'startTime': 3 }, {
//           'user_ids': ['1220', '7475'],
//           'startTime': 4
//         }, { 'user_ids': ['1220', '7475'], 'startTime': 5 }, {
//           'user_ids': ['1220', '7475'],
//           'startTime': 6
//         }, { 'user_ids': ['1220', '7475'], 'startTime': 7 }, {
//           'user_ids': ['1220'],
//           'startTime': 8
//         }, { 'user_ids': ['1220'], 'startTime': 9 }, {
//           'user_ids': ['4112'],
//           'startTime': 28
//         }, { 'user_ids': ['4112'], 'startTime': 29 }, {
//           'user_ids': ['4112'],
//           'startTime': 30
//         }, { 'user_ids': ['4112'], 'startTime': 31 }, {
//           'user_ids': ['3726', '4112', '6630', '7475'],
//           'startTime': 32
//         }, {
//           'user_ids': ['3726', '4112', '6630', '7475'],
//           'startTime': 33
//         }, {
//           'user_ids': ['3726', '4112', '6630', '7475'],
//           'startTime': 34
//         }, {
//           'user_ids': ['3726', '4112', '6630', '7475'],
//           'startTime': 35
//         }, {
//           'user_ids': ['3726', '4112', '6630', '7475'],
//           'startTime': 36
//         }, { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 37 }, {
//           'user_ids': ['7475'],
//           'startTime': 38
//         }
//       ],
//       '2017-12-21': [
//         { 'user_ids': ['7755'], 'startTime': 0 }, {
//           'user_ids': ['7755'],
//           'startTime': 1
//         }, { 'user_ids': ['7755'], 'startTime': 2 }, {
//           'user_ids': ['7755'],
//           'startTime': 3
//         }, { 'user_ids': ['7755'], 'startTime': 4 }, {
//           'user_ids': ['7755'],
//           'startTime': 5
//         }, { 'user_ids': ['7475'], 'startTime': 16 }, {
//           'user_ids': ['7475'],
//           'startTime': 17
//         }, { 'user_ids': ['7475'], 'startTime': 18 }, {
//           'user_ids': ['7475'],
//           'startTime': 19
//         }, { 'user_ids': ['7475'], 'startTime': 20 }, {
//           'user_ids': ['7475'],
//           'startTime': 21
//         }, { 'user_ids': ['7475'], 'startTime': 22 }, {
//           'user_ids': ['7475'],
//           'startTime': 23
//         }, { 'user_ids': ['3726'], 'startTime': 28 }, {
//           'user_ids': ['3726'],
//           'startTime': 29
//         }, { 'user_ids': ['3726'], 'startTime': 30 }, {
//           'user_ids': ['3726'],
//           'startTime': 31
//         }, { 'user_ids': ['1220', '3726'], 'startTime': 32 }, {
//           'user_ids': ['1220', '3726'],
//           'startTime': 33
//         }, { 'user_ids': ['1220', '3726'], 'startTime': 34 }, {
//           'user_ids': ['1220', '3726'],
//           'startTime': 35
//         }, { 'user_ids': ['1220'], 'startTime': 36 }, { 'user_ids': ['1220'], 'startTime': 37 }
//       ],
//       '2017-12-22': [
//         { 'user_ids': ['7475'], 'startTime': 16 }, {
//           'user_ids': ['7475'],
//           'startTime': 17
//         }, { 'user_ids': ['7475'], 'startTime': 18 }, {
//           'user_ids': ['7475'],
//           'startTime': 19
//         }, { 'user_ids': ['7475'], 'startTime': 20 }, {
//           'user_ids': ['7475'],
//           'startTime': 21
//         }, { 'user_ids': ['7475'], 'startTime': 22 }, {
//           'user_ids': ['7475'],
//           'startTime': 23
//         }, {
//           'user_ids': ['3726', '4112', '7755'],
//           'startTime': 28
//         }, {
//           'user_ids': ['3726', '4112', '7755'],
//           'startTime': 29
//         }, {
//           'user_ids': ['3726', '4112', '7755'],
//           'startTime': 30
//         }, {
//           'user_ids': ['3726', '4112', '7755'],
//           'startTime': 31
//         }, {
//           'user_ids': ['1220', '3726', '4112', '7755'],
//           'startTime': 32
//         }, {
//           'user_ids': ['1220', '3726', '4112', '7755'],
//           'startTime': 33
//         }, {
//           'user_ids': ['1220', '3726', '4112', '7755'],
//           'startTime': 34
//         }, { 'user_ids': ['1220', '3726', '4112', '7755'], 'startTime': 35 }
//       ],
//       '2017-12-24': [
//         {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 24
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 25
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 26
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 27
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 28
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 29
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 30
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 31
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 32
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 33
//         }, {
//           'user_ids': ['1220', '3726', '4112', '7755'],
//           'startTime': 34
//         }, {
//           'user_ids': ['1220', '3726', '4112', '7755'],
//           'startTime': 35
//         }, { 'user_ids': ['1220', '7755'], 'startTime': 36 }, {
//           'user_ids': ['1220', '7755'],
//           'startTime': 37
//         }, { 'user_ids': ['1220'], 'startTime': 38 }, { 'user_ids': ['1220'], 'startTime': 39 }
//       ],
//       '2017-12-25': [
//         {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 6
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 7
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 8
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 9
//         }, {
//           'user_ids': ['1220', '3726', '6630', '7475', '7755'],
//           'startTime': 16
//         }, {
//           'user_ids': ['1220', '3726', '6630', '7475', '7755'],
//           'startTime': 17
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 18
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 19
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 20
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 21
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 22
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 23
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7755'],
//           'startTime': 24
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7755'],
//           'startTime': 25
//         }, {
//           'user_ids': ['1220', '4112', '6630', '7755'],
//           'startTime': 26
//         }, {
//           'user_ids': ['1220', '4112', '6630', '7755'],
//           'startTime': 27
//         }, {
//           'user_ids': ['1220', '4112', '6630', '7475', '7755'],
//           'startTime': 28
//         }, {
//           'user_ids': ['1220', '4112', '6630', '7475', '7755'],
//           'startTime': 29
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 30
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 31
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 32
//         }, {
//           'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 33
//         }, { 'user_ids': ['3726'], 'startTime': 34 }, {
//           'user_ids': ['3726'],
//           'startTime': 35
//         }, { 'user_ids': ['3726'], 'startTime': 36 }, {
//           'user_ids': ['3726'],
//           'startTime': 37
//         }, { 'user_ids': ['3726'], 'startTime': 38 }, { 'user_ids': ['3726'], 'startTime': 39 }]
//     }
//
//   const actualAvailabilityBlocks =
//     availabilities.getBlocksClusteredForStartAndDurationAndKeyedByDate(
//       mock.segmentsGroupedByDate
//     )
//
//   expect(actualAvailabilityBlocks).toEqual(expectedAvailabiltyBlocks)
// })
