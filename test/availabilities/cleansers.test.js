/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

import * as mock from './mock'

import * as cleansers from '../../data/availabilities/cleansers'

// TODO: REFACTOR - Isolate the actual filter. Currently this works as a loop. - Chad
// TODO: Rename for what's being tested, not the function being called. - Chad
test('groupByDateAndStartTime', () => {
  const expectedGroupedInstructorAvailability = {
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
    '2017-12-20': {
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
    },
    '2017-12-21': {
      '0': { 'user_ids': ['7755'], 'startTime': 0 },
      '1': { 'user_ids': ['7755'], 'startTime': 1 },
      '2': { 'user_ids': ['7755'], 'startTime': 2 },
      '3': { 'user_ids': ['7755'], 'startTime': 3 },
      '4': { 'user_ids': ['7755'], 'startTime': 4 },
      '5': { 'user_ids': ['7755'], 'startTime': 5 },
      '16': { 'user_ids': ['7475'], 'startTime': 16 },
      '17': { 'user_ids': ['7475'], 'startTime': 17 },
      '18': { 'user_ids': ['7475'], 'startTime': 18 },
      '19': { 'user_ids': ['7475'], 'startTime': 19 },
      '20': { 'user_ids': ['7475'], 'startTime': 20 },
      '21': { 'user_ids': ['7475'], 'startTime': 21 },
      '22': { 'user_ids': ['7475'], 'startTime': 22 },
      '23': { 'user_ids': ['7475'], 'startTime': 23 },
      '28': { 'user_ids': ['3726'], 'startTime': 28 },
      '29': { 'user_ids': ['3726'], 'startTime': 29 },
      '30': { 'user_ids': ['3726'], 'startTime': 30 },
      '31': { 'user_ids': ['3726'], 'startTime': 31 },
      '32': { 'user_ids': ['1220', '3726'], 'startTime': 32 },
      '33': { 'user_ids': ['1220', '3726'], 'startTime': 33 },
      '34': { 'user_ids': ['1220', '3726'], 'startTime': 34 },
      '35': { 'user_ids': ['1220', '3726'], 'startTime': 35 },
      '36': { 'user_ids': ['1220'], 'startTime': 36 },
      '37': { 'user_ids': ['1220'], 'startTime': 37 }
    },
    '2017-12-22': {
      '16': { 'user_ids': ['7475'], 'startTime': 16 },
      '17': { 'user_ids': ['7475'], 'startTime': 17 },
      '18': { 'user_ids': ['7475'], 'startTime': 18 },
      '19': { 'user_ids': ['7475'], 'startTime': 19 },
      '20': { 'user_ids': ['7475'], 'startTime': 20 },
      '21': { 'user_ids': ['7475'], 'startTime': 21 },
      '22': { 'user_ids': ['7475'], 'startTime': 22 },
      '23': { 'user_ids': ['7475'], 'startTime': 23 },
      '28': { 'user_ids': ['3726', '4112', '7755'], 'startTime': 28 },
      '29': { 'user_ids': ['3726', '4112', '7755'], 'startTime': 29 },
      '30': { 'user_ids': ['3726', '4112', '7755'], 'startTime': 30 },
      '31': { 'user_ids': ['3726', '4112', '7755'], 'startTime': 31 },
      '32': { 'user_ids': ['1220', '3726', '4112', '7755'], 'startTime': 32 },
      '33': { 'user_ids': ['1220', '3726', '4112', '7755'], 'startTime': 33 },
      '34': { 'user_ids': ['1220', '3726', '4112', '7755'], 'startTime': 34 },
      '35': { 'user_ids': ['1220', '3726', '4112', '7755'], 'startTime': 35 }
    },
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
      '33': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 33 },
      '34': { 'user_ids': ['1220', '3726', '4112', '7755'], 'startTime': 34 },
      '35': { 'user_ids': ['1220', '3726', '4112', '7755'], 'startTime': 35 },
      '36': { 'user_ids': ['1220', '7755'], 'startTime': 36 },
      '37': { 'user_ids': ['1220', '7755'], 'startTime': 37 },
      '38': { 'user_ids': ['1220'], 'startTime': 38 },
      '39': { 'user_ids': ['1220'], 'startTime': 39 }
    },
    '2017-12-25': {
      '6': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 6 },
      '7': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 7 },
      '8': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 8 },
      '9': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 9 },
      '16': { 'user_ids': ['1220', '3726', '6630', '7475', '7755'], 'startTime': 16 },
      '17': { 'user_ids': ['1220', '3726', '6630', '7475', '7755'], 'startTime': 17 },
      '18': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 18 },
      '19': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 19 },
      '20': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 20 },
      '21': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 21 },
      '22': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 22 },
      '23': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 23 },
      '24': { 'user_ids': ['1220', '3726', '4112', '6630', '7755'], 'startTime': 24 },
      '25': { 'user_ids': ['1220', '3726', '4112', '6630', '7755'], 'startTime': 25 },
      '26': { 'user_ids': ['1220', '4112', '6630', '7755'], 'startTime': 26 },
      '27': { 'user_ids': ['1220', '4112', '6630', '7755'], 'startTime': 27 },
      '28': { 'user_ids': ['1220', '4112', '6630', '7475', '7755'], 'startTime': 28 },
      '29': { 'user_ids': ['1220', '4112', '6630', '7475', '7755'], 'startTime': 29 },
      '30': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 30 },
      '31': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 31 },
      '32': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 32 },
      '33': { 'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'], 'startTime': 33 },
      '34': { 'user_ids': ['3726'], 'startTime': 34 },
      '35': { 'user_ids': ['3726'], 'startTime': 35 },
      '36': { 'user_ids': ['3726'], 'startTime': 36 },
      '37': { 'user_ids': ['3726'], 'startTime': 37 },
      '38': { 'user_ids': ['3726'], 'startTime': 38 },
      '39': { 'user_ids': ['3726'], 'startTime': 39 }
    }
  }

  const actualGroupedInstructorAvailability =
    cleansers.groupByDateAndStartTime(
      mock.allInstructorAvailability
    )

  expect(actualGroupedInstructorAvailability).toEqual(expectedGroupedInstructorAvailability)
})

test('returnAllContiguousTimeBlocksForUsersAcrossMultipleDays', () => {
  const expectedContiguousTimeBlocksAcrossMultipleDays = {
    '2017-12-19': {
      '13': {
        'startSegment': 26,
        'endSegment': 37,
        'startTime': 13,
        'endTime': 19,
        'numberOfSegments': 12,
        'duration': 6,
        'uniqueInstructorIds': ['1220', '3726', '4112', '6630', '7475', '7755'],
        'numberOfInstructors': 6,
        'segments': {
          '26': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 26
          },
          '27': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 27
          },
          '28': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 28
          },
          '29': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 29
          },
          '30': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 30
          },
          '31': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 31
          },
          '32': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 32
          },
          '33': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 33
          },
          '34': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 34
          },
          '35': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 35
          },
          '36': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 36
          },
          '37': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 37
          }
        }
      }
    },
    '2017-12-20': {
      '0': {
        'startSegment': 0,
        'endSegment': 9,
        'startTime': 0,
        'endTime': 5,
        'numberOfSegments': 10,
        'duration': 5,
        'uniqueInstructorIds': ['1220', '4112', '7475'],
        'numberOfInstructors': 3,
        'segments': {
          '0': {
            'user_ids': ['1220', '4112', '7475'],
            'startTime': 0
          },
          '1': {
            'user_ids': ['1220', '4112', '7475'],
            'startTime': 1
          },
          '2': {
            'user_ids': ['1220', '4112', '7475'],
            'startTime': 2
          },
          '3': {
            'user_ids': ['1220', '4112', '7475'],
            'startTime': 3
          },
          '4': {
            'user_ids': ['1220', '7475'],
            'startTime': 4
          },
          '5': {
            'user_ids': ['1220', '7475'],
            'startTime': 5
          },
          '6': {
            'user_ids': ['1220', '7475'],
            'startTime': 6
          },
          '7': {
            'user_ids': ['1220', '7475'],
            'startTime': 7
          },
          '8': {
            'user_ids': ['1220'],
            'startTime': 8
          },
          '9': {
            'user_ids': ['1220'],
            'startTime': 9
          }
        }
      },
      '14': {
        'startSegment': 28,
        'endSegment': 38,
        'startTime': 14,
        'endTime': 19.5,
        'numberOfSegments': 11,
        'duration': 5.5,
        'uniqueInstructorIds': ['4112', '3726', '6630', '7475'],
        'numberOfInstructors': 4,
        'segments': {
          '28': {
            'user_ids': ['4112'],
            'startTime': 28
          },
          '29': {
            'user_ids': ['4112'],
            'startTime': 29
          },
          '30': {
            'user_ids': ['4112'],
            'startTime': 30
          },
          '31': {
            'user_ids': ['4112'],
            'startTime': 31
          },
          '32': {
            'user_ids': ['3726', '4112', '6630', '7475'],
            'startTime': 32
          },
          '33': {
            'user_ids': ['3726', '4112', '6630', '7475'],
            'startTime': 33
          },
          '34': {
            'user_ids': ['3726', '4112', '6630', '7475'],
            'startTime': 34
          },
          '35': {
            'user_ids': ['3726', '4112', '6630', '7475'],
            'startTime': 35
          },
          '36': {
            'user_ids': ['3726', '4112', '6630', '7475'],
            'startTime': 36
          },
          '37': {
            'user_ids': ['3726', '4112', '6630', '7475'],
            'startTime': 37
          },
          '38': {
            'user_ids': ['7475'],
            'startTime': 38
          }
        }
      }
    },
    '2017-12-21': {
      '0': {
        'startSegment': 0,
        'endSegment': 5,
        'startTime': 0,
        'endTime': 3,
        'numberOfSegments': 6,
        'duration': 3,
        'uniqueInstructorIds': ['7755'],
        'numberOfInstructors': 1,
        'segments': {
          '0': {
            'user_ids': ['7755'],
            'startTime': 0
          },
          '1': {
            'user_ids': ['7755'],
            'startTime': 1
          },
          '2': {
            'user_ids': ['7755'],
            'startTime': 2
          },
          '3': {
            'user_ids': ['7755'],
            'startTime': 3
          },
          '4': {
            'user_ids': ['7755'],
            'startTime': 4
          },
          '5': {
            'user_ids': ['7755'],
            'startTime': 5
          }
        }
      },
      '8': {
        'startSegment': 16,
        'endSegment': 23,
        'startTime': 8,
        'endTime': 12,
        'numberOfSegments': 8,
        'duration': 4,
        'uniqueInstructorIds': ['7475'],
        'numberOfInstructors': 1,
        'segments': {
          '16': {
            'user_ids': ['7475'],
            'startTime': 16
          },
          '17': {
            'user_ids': ['7475'],
            'startTime': 17
          },
          '18': {
            'user_ids': ['7475'],
            'startTime': 18
          },
          '19': {
            'user_ids': ['7475'],
            'startTime': 19
          },
          '20': {
            'user_ids': ['7475'],
            'startTime': 20
          },
          '21': {
            'user_ids': ['7475'],
            'startTime': 21
          },
          '22': {
            'user_ids': ['7475'],
            'startTime': 22
          },
          '23': {
            'user_ids': ['7475'],
            'startTime': 23
          }
        }
      },
      '14': {
        'startSegment': 28,
        'endSegment': 37,
        'startTime': 14,
        'endTime': 19,
        'numberOfSegments': 10,
        'duration': 5,
        'uniqueInstructorIds': ['3726', '1220'],
        'numberOfInstructors': 2,
        'segments': {
          '28': {
            'user_ids': ['3726'],
            'startTime': 28
          },
          '29': {
            'user_ids': ['3726'],
            'startTime': 29
          },
          '30': {
            'user_ids': ['3726'],
            'startTime': 30
          },
          '31': {
            'user_ids': ['3726'],
            'startTime': 31
          },
          '32': {
            'user_ids': ['1220', '3726'],
            'startTime': 32
          },
          '33': {
            'user_ids': ['1220', '3726'],
            'startTime': 33
          },
          '34': {
            'user_ids': ['1220', '3726'],
            'startTime': 34
          },
          '35': {
            'user_ids': ['1220', '3726'],
            'startTime': 35
          },
          '36': {
            'user_ids': ['1220'],
            'startTime': 36
          },
          '37': {
            'user_ids': ['1220'],
            'startTime': 37
          }
        }
      }
    },
    '2017-12-22': {
      '8': {
        'startSegment': 16,
        'endSegment': 23,
        'startTime': 8,
        'endTime': 12,
        'numberOfSegments': 8,
        'duration': 4,
        'uniqueInstructorIds': ['7475'],
        'numberOfInstructors': 1,
        'segments': {
          '16': {
            'user_ids': ['7475'],
            'startTime': 16
          },
          '17': {
            'user_ids': ['7475'],
            'startTime': 17
          },
          '18': {
            'user_ids': ['7475'],
            'startTime': 18
          },
          '19': {
            'user_ids': ['7475'],
            'startTime': 19
          },
          '20': {
            'user_ids': ['7475'],
            'startTime': 20
          },
          '21': {
            'user_ids': ['7475'],
            'startTime': 21
          },
          '22': {
            'user_ids': ['7475'],
            'startTime': 22
          },
          '23': {
            'user_ids': ['7475'],
            'startTime': 23
          }
        }
      },
      '14': {
        'startSegment': 28,
        'endSegment': 35,
        'startTime': 14,
        'endTime': 18,
        'numberOfSegments': 8,
        'duration': 4,
        'uniqueInstructorIds': ['3726', '4112', '7755', '1220'],
        'numberOfInstructors': 4,
        'segments': {
          '28': {
            'user_ids': ['3726', '4112', '7755'],
            'startTime': 28
          },
          '29': {
            'user_ids': ['3726', '4112', '7755'],
            'startTime': 29
          },
          '30': {
            'user_ids': ['3726', '4112', '7755'],
            'startTime': 30
          },
          '31': {
            'user_ids': ['3726', '4112', '7755'],
            'startTime': 31
          },
          '32': {
            'user_ids': ['1220', '3726', '4112', '7755'],
            'startTime': 32
          },
          '33': {
            'user_ids': ['1220', '3726', '4112', '7755'],
            'startTime': 33
          },
          '34': {
            'user_ids': ['1220', '3726', '4112', '7755'],
            'startTime': 34
          },
          '35': {
            'user_ids': ['1220', '3726', '4112', '7755'],
            'startTime': 35
          }
        }
      }
    },
    '2017-12-24': {
      '12': {
        'startSegment': 24,
        'endSegment': 39,
        'startTime': 12,
        'endTime': 20,
        'numberOfSegments': 16,
        'duration': 8,
        'uniqueInstructorIds': ['1220', '3726', '4112', '6630', '7475', '7755'],
        'numberOfInstructors': 6,
        'segments': {
          '24': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 24
          },
          '25': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 25
          },
          '26': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 26
          },
          '27': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 27
          },
          '28': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 28
          },
          '29': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 29
          },
          '30': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 30
          },
          '31': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 31
          },
          '32': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 32
          },
          '33': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 33
          },
          '34': {
            'user_ids': ['1220', '3726', '4112', '7755'],
            'startTime': 34
          },
          '35': {
            'user_ids': ['1220', '3726', '4112', '7755'],
            'startTime': 35
          },
          '36': {
            'user_ids': ['1220', '7755'],
            'startTime': 36
          },
          '37': {
            'user_ids': ['1220', '7755'],
            'startTime': 37
          },
          '38': {
            'user_ids': ['1220'],
            'startTime': 38
          },
          '39': {
            'user_ids': ['1220'],
            'startTime': 39
          }
        }
      }
    },
    '2017-12-25': {
      '3': {
        'startSegment': 6,
        'endSegment': 9,
        'startTime': 3,
        'endTime': 5,
        'numberOfSegments': 4,
        'duration': 2,
        'uniqueInstructorIds': ['1220', '3726', '4112', '6630', '7475', '7755'],
        'numberOfInstructors': 6,
        'segments': {
          '6': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 6
          },
          '7': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 7
          },
          '8': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 8
          },
          '9': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 9
          }
        }
      },
      '8': {
        'startSegment': 16,
        'endSegment': 39,
        'startTime': 8,
        'endTime': 20,
        'numberOfSegments': 24,
        'duration': 12,
        'uniqueInstructorIds': ['1220', '3726', '6630', '7475', '7755', '4112'],
        'numberOfInstructors': 6,
        'segments': {
          '16': {
            'user_ids': ['1220', '3726', '6630', '7475', '7755'],
            'startTime': 16
          },
          '17': {
            'user_ids': ['1220', '3726', '6630', '7475', '7755'],
            'startTime': 17
          },
          '18': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 18
          },
          '19': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 19
          },
          '20': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 20
          },
          '21': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 21
          },
          '22': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 22
          },
          '23': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 23
          },
          '24': {
            'user_ids': ['1220', '3726', '4112', '6630', '7755'],
            'startTime': 24
          },
          '25': {
            'user_ids': ['1220', '3726', '4112', '6630', '7755'],
            'startTime': 25
          },
          '26': {
            'user_ids': ['1220', '4112', '6630', '7755'],
            'startTime': 26
          },
          '27': {
            'user_ids': ['1220', '4112', '6630', '7755'],
            'startTime': 27
          },
          '28': {
            'user_ids': ['1220', '4112', '6630', '7475', '7755'],
            'startTime': 28
          },
          '29': {
            'user_ids': ['1220', '4112', '6630', '7475', '7755'],
            'startTime': 29
          },
          '30': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 30
          },
          '31': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 31
          },
          '32': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 32
          },
          '33': {
            'user_ids': ['1220', '3726', '4112', '6630', '7475', '7755'],
            'startTime': 33
          },
          '34': {
            'user_ids': ['3726'],
            'startTime': 34
          },
          '35': {
            'user_ids': ['3726'],
            'startTime': 35
          },
          '36': {
            'user_ids': ['3726'],
            'startTime': 36
          },
          '37': {
            'user_ids': ['3726'],
            'startTime': 37
          },
          '38': {
            'user_ids': ['3726'],
            'startTime': 38
          },
          '39': {
            'user_ids': ['3726'],
            'startTime': 39
          }
        }
      }
    }
  }

  const actualContiguousTimeBlocksAcrossMultipleDays =
    cleansers.groupByDate(mock.segmentsGroupedByDate)

  expect(actualContiguousTimeBlocksAcrossMultipleDays)
    .toEqual(expectedContiguousTimeBlocksAcrossMultipleDays)
})
