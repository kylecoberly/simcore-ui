/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

import _ from 'lodash'

import * as mock from './mock'

import * as filters from '../../data/availabilities/filters'

test('onlyInstructorsInTheFilterShouldReturnAvailabilityTimes', () => {
  const instructorIdsToFilter = [7475, 4112, 7755, 'any', 'any']

  // NOTE: The response will be sorted by the key. (eg: In this case, 4112 comes before 7475.)
  const expectedFilteredInstructorAvailability = {
    '4112': [
      { '2017-12-20 00:00:00': { 'duration': 3, 'startTime': 16 } },
      { '2017-12-20 00:00:00': { 'duration': 2, 'startTime': 0 } },
      { '2017-12-20 05:00:00': { 'duration': 4, 'startTime': 14 } },
      { '2017-12-22 05:00:00': { 'duration': 4, 'startTime': 14 } },
      { '2017-12-24 00:00:00': { 'duration': 6, 'startTime': 12 } },
      { '2017-12-19 00:00:00': { 'duration': 6, 'startTime': 13 } },
      { '2017-12-25 00:00:00': { 'duration': 2, 'startTime': 3 } },
      { '2017-12-25 00:00:00': { 'duration': 5, 'startTime': 9 } },
      { '2017-12-25 00:00:00': { 'duration': 3, 'startTime': 14 } }
    ],
    '7475': [
      { '2017-12-20 00:00:00': { 'duration': 3.5, 'startTime': 16 } },
      { '2017-12-20 00:00:00': { 'duration': 4, 'startTime': 0 } },
      { '2017-12-21 01:30:00': { 'duration': 4, 'startTime': 8 } },
      { '2017-12-22 01:30:00': { 'duration': 4, 'startTime': 8 } },
      { '2017-12-24 00:00:00': { 'duration': 5, 'startTime': 12 } },
      { '2017-12-19 00:00:00': { 'duration': 6, 'startTime': 13 } },
      { '2017-12-25 00:00:00': { 'duration': 2, 'startTime': 3 } },
      { '2017-12-25 00:00:00': { 'duration': 4, 'startTime': 8 } },
      { '2017-12-25 00:00:00': { 'duration': 3, 'startTime': 14 } }
    ],
    '7755': [
      { '2017-12-24 00:00:00': { 'duration': 3, 'startTime': 16 } },
      { '2017-12-19 00:00:00': { 'duration': 6, 'startTime': 13 } },
      { '2017-12-25 00:00:00': { 'duration': 2, 'startTime': 3 } },
      { '2017-12-25 00:00:00': { 'duration': 5, 'startTime': 8 } },
      { '2017-12-25 00:00:00': { 'duration': 4, 'startTime': 13 } },
      { '2017-12-21 00:00:00': { 'duration': 3, 'startTime': 0 } },
      { '2017-12-22 05:00:00': { 'duration': 4, 'startTime': 14 } },
      { '2017-12-24 00:00:00': { 'duration': 6, 'startTime': 12 } }
    ]
  }

  const filteredInstructorAvailability =
    filters.getInstructorAvailabilitiesFromAListOfInstructorIds(
      mock.allInstructorAvailability,
      instructorIdsToFilter,
    )

  expect(filteredInstructorAvailability).toEqual(expectedFilteredInstructorAvailability)
})

// Specific User Filtering
// TODO: Rename for what's being tested, not the function being called. - Chad
test('getOnlyTheBlocksWhichContainAllTheUsers', () => {
  const totalInstructorCount = ['3726', '4112', '6630', '7475'].length

  const expectedInstructorAvailabilityBlocks =
    {
      '32': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 32 },
      '33': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 33 },
      '34': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 34 },
      '35': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 35 },
      '36': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 36 },
      '37': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 37 },
    }

  const actualInstructorAvailabilityBlocks =
    filters.getOnlyTheBlocksWhichContainAllTheUsers(
      mock.allUserAvailabilitiesForADate,
      totalInstructorCount
    )

  expect(actualInstructorAvailabilityBlocks).toEqual(expectedInstructorAvailabilityBlocks)
})

// TODO: Rename for what's being tested, not the function being called. - Chad
test('getOnlyTheBlocksWhichContainAllTheUsersAcrossMultipleDays', () => {
  const totalInstructorCount = mock.allInstructorIds.length

  const expectedInstructorAvailabilityBlocks =
    {
      '2017-12-19': {
        '26': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 26 },
        '27': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 27 },
        '28': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 28 },
        '29': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 29 },
        '30': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 30 },
        '31': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 31 },
        '32': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 32 },
        '33': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 33 },
        '34': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 34 },
        '35': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 35 },
        '36': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 36 },
        '37': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 37 }
      },
      '2017-12-20': {},
      '2017-12-21': {},
      '2017-12-22': {},
      '2017-12-24': {
        '24': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 24 },
        '25': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 25 },
        '26': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 26 },
        '27': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 27 },
        '28': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 28 },
        '29': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 29 },
        '30': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 30 },
        '31': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 31 },
        '32': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 32 },
        '33': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 33 }
      },
      '2017-12-25': {
        '6': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 6 },
        '7': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 7 },
        '8': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 8 },
        '9': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 9 },
        '18': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 18 },
        '19': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 19 },
        '20': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 20 },
        '21': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 21 },
        '22': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 22 },
        '23': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 23 },
        '30': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 30 },
        '31': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 31 },
        '32': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 32 },
        '33': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 33 }
      }
    }

  const actualInstructorAvailabilityBlocks = {}

  _.each(expectedInstructorAvailabilityBlocks, (blocksForDay, key) => {
    actualInstructorAvailabilityBlocks[key] =
      filters.getOnlyTheBlocksWhichContainAllTheUsers(blocksForDay, totalInstructorCount)
  })

  expect(actualInstructorAvailabilityBlocks).toEqual(expectedInstructorAvailabilityBlocks)
})

// // TODO: REFACTOR - Isolate the actual filter. Currently this works as a loop. - Chad
// // TODO: Rename for what's being tested, not the function being called. - Chad
// test('getOnlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart', () => {
//   const expectedInstructorAvailabilityBlocks =
//     {
//       '2017-12-19': [
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 26 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 27 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 28 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 29 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 30 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 31 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 32 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 33 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 34 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 35 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 36 },
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 37 }
//       ],
//       '2017-12-20': [
//         { 'user_ids': ['1220', '4112', '7475'], 'startTime': 0 },
//         { 'user_ids': ['1220', '4112', '7475'], 'startTime': 1 },
//         { 'user_ids': ['1220', '4112', '7475'], 'startTime': 2 },
//         { 'user_ids': ['1220', '4112', '7475'], 'startTime': 3 },
//         { 'user_ids': ['1220', '7475'], 'startTime': 4 },
//         { 'user_ids': ['1220', '7475'], 'startTime': 5 },
//         { 'user_ids': ['1220', '7475'], 'startTime': 6 },
//         { 'user_ids': ['1220', '7475'], 'startTime': 7 },
//         { 'user_ids': ['1220'], 'startTime': 8 },
//         { 'user_ids': ['1220'], 'startTime': 9 },
//         { 'user_ids': ['4112'], 'startTime': 28 },
//         { 'user_ids': ['4112'], 'startTime': 29 },
//         { 'user_ids': ['4112'], 'startTime': 30 },
//         { 'user_ids': ['4112'], 'startTime': 31 },
//         { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 32 },
//         { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 33 },
//         { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 34 },
//         { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 35 },
//         { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 36 },
//         { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 37 },
//         { 'user_ids': ['7475'], 'startTime': 38 }
//       ],
//       '2017-12-21': [
//         { 'user_ids': ['7755'], 'startTime': 0 },
//         { 'user_ids': ['7755'], 'startTime': 1 },
//         { 'user_ids': ['7755'], 'startTime': 2 },
//         {
//           'user_ids': ['7755'],
//           'startTime': 3
//         },
//         { 'user_ids': ['7755'],
//           'startTime': 4 },
//         {
//           'user_ids': ['7755'],
//           'startTime': 5
//         },
//         { 'user_ids': ['7475'], 'startTime': 16 },
//         {
//           'user_ids': ['7475'],
//           'startTime': 17
//         },
//         { 'user_ids': ['7475'], 'startTime': 18 },
//         {
//           'user_ids': ['7475'],
//           'startTime': 19
//         },
//         { 'user_ids': ['7475'], 'startTime': 20 },
//         {
//           'user_ids': ['7475'],
//           'startTime': 21
//         },
//         { 'user_ids': ['7475'], 'startTime': 22 },
//         {
//           'user_ids': ['7475'],
//           'startTime': 23
//         },
//         { 'user_ids': ['3726'], 'startTime': 28 },
//         {
//           'user_ids': ['3726'],
//           'startTime': 29
//         },
//         { 'user_ids': ['3726'], 'startTime': 30 },
//         {
//           'user_ids': ['3726'], 'startTime': 31
//         },
//         { 'user_ids': ['1220', '3726'], 'startTime': 32 },
//         {
//           'user_ids': ['1220', '3726'],
//           'startTime': 33
//         },
//         { 'user_ids': ['1220', '3726'], 'startTime': 34 },
//         {
//           'user_ids': ['1220', '3726'],
//           'startTime': 35
//         },
//         { 'user_ids': ['1220'], 'startTime': 36 },
//         { 'user_ids': ['1220'], 'startTime': 37 }
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
//         { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 24
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 25
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 26
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 27
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 28
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 29
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 30
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 31
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 32
//         }, { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
//           'startTime': 33
//         }, { 'user_ids': ['1220', '3726', '4112', '7755'],
//           'startTime': 34
//         }, { 'user_ids': ['1220', '3726', '4112', '7755'],
//           'startTime': 35
//         }, { 'user_ids': ['1220', '7755'],
//           'startTime': 36
//         }, { 'user_ids': ['1220', '7755'],
//           'startTime': 37
//         }, { 'user_ids': ['1220'],
//           'startTime': 38
//         }, { 'user_ids': ['1220'],
//           'startTime': 39
//         }
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
//         }, { 'user_ids': ['3726'], 'startTime': 38 },
//         { 'user_ids': ['3726'], 'startTime': 39 }
//       ]
//     }
//
//   const actualInstructorAvailabilityBlocks =
//     availabilities.getOnlyTheBlocksWhichContainExactlyAllTheUsersSortedByStart(
//       mock.segmentsGroupedByDate
//     )
//
//   expect(expectedInstructorAvailabilityBlocks)
//     .toEqual(actualInstructorAvailabilityBlocks)
// })

test('getOnlyTheBlocksWithAMinimumNumberOfInstructors', () => {
  const startingContiguousTimeBlocks = {
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

  const expectedContiguousTimeBlocks = {
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

  const actualAvailabilityBlocks =
    filters.getBlocksWithAMinimumNumberOfInstructors(
      startingContiguousTimeBlocks,
      4
    )

  expect(actualAvailabilityBlocks).toEqual(expectedContiguousTimeBlocks)
})

test('getOnlyTheBlocksWithAtLeastAllTheUsers', () => {
  const specificUserIds = [4112, 7475]

  const startingContiguousTimeBlocks = {
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

  const expectedContiguousTimeBlocks = {
    '0.5': {
      startTime: 0.5,
      endTime: 2,
      duration: 1.5,
      startSegment: 1,
      endSegment: 3,
      numberOfSegments: 3,
      uniqueInstructorIds: ['1220', '4112', '7475'],
      numberOfInstructors: 3,
      segments: {
        '1': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 1 },
        '2': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 2 },
        '3': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 3 },
      }
    },
    '16': {
      startTime: 16,
      endTime: 19,
      duration: 3,
      startSegment: 32,
      endSegment: 37,
      numberOfSegments: 6,
      uniqueInstructorIds: ['3726', '4112', '6630', '7475'],
      numberOfInstructors: 4,
      segments: {
        '32': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 32 },
        '33': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 33 },
        '34': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 34 },
        '35': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 35 },
        '36': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 36 },
        '37': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 37 },
      },
    }
  }

  const actualAvailabilityBlocks =
    filters.getSpecificBlocksFromAListOfInstructorIds(
      startingContiguousTimeBlocks,
      specificUserIds,
    )

  expect(actualAvailabilityBlocks).toEqual(expectedContiguousTimeBlocks)
})

test('onlyUserAvailabilitiesForASingleDateShouldBeReturned', () => {
  const expectedUserAvailabilitiesForADate =
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
      '38': { 'user_ids': ['7475'], 'startTime': 38 }
    }

  const actualUserAvailabilitiesForADate =
    filters.getAllInstructorAvailabilitiesForADate(
      mock.segmentsGroupedByDate,
      '2017-12-20',
    )

  expect(actualUserAvailabilitiesForADate).toEqual(expectedUserAvailabilitiesForADate)
})

test('noUsersAvailableBetweenAStartTimeAndDurationShouldReturnAnEmptySet', () => {
  const expectedUserAvailabilitiesWithinARange = {}

  const actualUserAvailabilitiesWithinARange =
    filters.filterBlocksWithinATimeRange(mock.allUserAvailabilitiesForADate, 0, 1)

  expect(
    actualUserAvailabilitiesWithinARange)
    .toEqual(expectedUserAvailabilitiesWithinARange)
})

test('onlyUsersAvailableBetweenAStartTimeAndDurationShouldReturnAvailabilityTimes', () => {
  const expectedUserAvailabilitiesWithinARange =
    {
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
    }

  const actualUserAvailabilitiesWithinARange =
    filters.filterBlocksWithinATimeRange(mock.allUserAvailabilitiesForADate, 2, 31)

  expect(
    actualUserAvailabilitiesWithinARange)
    .toEqual(expectedUserAvailabilitiesWithinARange)
})

test('onlyUsersAvailableForAStartTimeAndDurationShouldReturnAvailabilityTimes', () => {
  const instructorCount = ['3726', '4112', '6630', '7475'].length

  const expectedUserAvailabilitiesWithinARange =
    {
      '32': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 32 },
      '33': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 33 },
    }

  const userAvailabilitiesWithinARange =
    filters.filterBlocksForATimeRange(mock.allUserAvailabilitiesForADate, 2, 31)

  const actualUserAvailabilitiesForAnEntireRange =
    filters.getOnlyTheBlocksWhichContainAllTheUsers(
      userAvailabilitiesWithinARange,
      instructorCount,
    )

  expect(
    actualUserAvailabilitiesForAnEntireRange)
    .toEqual(expectedUserAvailabilitiesWithinARange)
})

// test('returnAnyUsersIfTheFilterStartsInsideTheTimeRange', () => {
//   const sortedUsersAvailableForADate = filters.sortBlocks(mock.allUserAvailabilitiesForADate)
//
//   const expectedState = true
//   const actualState = filters
//     .isThisFilterWithinTheOriginalDataSet(
//       sortedUsersAvailableForADate,
//       2,
//       1,
//     )
//
//   expect(actualState).toEqual(expectedState)
// })
//
// test('returnAnyUsersIfTheFilterEndsInsideTheTimeRange', () => {
//   const sortedUsersAvailableForADate = filters.sortBlocks(mock.allUserAvailabilitiesForADate)
//
//   const expectedState = true
//   const actualState = filters
//     .isThisFilterWithinTheOriginalDataSet(
//       sortedUsersAvailableForADate,
//       2,
//       36,
//     )
//
//   expect(actualState).toEqual(expectedState)
// })
//
// test('doNotReturnAnyUsersIfTheFilterIsGreaterThanTheTimeRange', () => {
//   const sortedUsersAvailableForADate = filters.sortBlocks(mock.allUserAvailabilitiesForADate)
//
//   const expectedState = false
//   const actualState = filters
//     .isThisFilterWithinTheOriginalDataSet(
//       sortedUsersAvailableForADate,
//       2,
//       39,
//     )
//
//   expect(actualState).toEqual(expectedState)
// })
//
// test('doNotReturnAnyUsersIfTheFilterIsLessThanTheStartTime', () => {
//   const sortedUsersAvailableForADate = filters.sortBlocks(mock.allUserAvailabilitiesForADate)
//
//   const expectedState = false
//   const actualState = filters
//     .isThisFilterWithinTheOriginalDataSet(
//       sortedUsersAvailableForADate,
//       0,
//       31,
//     )
//
//   expect(actualState).toEqual(expectedState)
// })
