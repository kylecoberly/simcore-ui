/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */


import * as mock from '../fixtures/mock'
import * as mockLarge from '../fixtures/mock-large'
import _ from 'lodash'

const {
  getInstructorAvailabilitiesFromAListOfInstructorIds,
  getOnlyTheBlocksWhichContainAllTheUsers,
  getSpecificBlocksFromAListOfInstructorIds,
  getBlocksWithAMinimumNumberOfInstructors,
  getSegmentsWithMinimumInstructorsForACompleteDuration,
  filterMinimumUsersWithACompleteDuration,
  getBlocksWithAMinimumNumberOfInstructorsForAMinimumDuration,
  filterBlocksByDuration,
  filterBlocksWithinATimeRange,
  filterBlocksForATimeRange,
  getAllInstructorAvailabilitiesForADate
} = require('../../../data/availabilities/filters')

const assert = require('assert')

describe('Filters', function(){
  describe('#getInstructorAvailabilitiesFromAListOfInstructorIds', () => {
    before(() => {
      // NOTE: The response will be sorted by the key. (eg: In this case, 4112 comes before 7475.)
      this.expectedFilteredInstructorAvailability = require('../fixtures/filtered-instructor-availability')

      this.filteredInstructorAvailability = getInstructorAvailabilitiesFromAListOfInstructorIds(
        mock.allInstructorAvailability, [7475, 4112, 7755, 'any', 'any']
      )
    })

    it('only returns availability times for instructors in the filter', () => {
      assert.deepEqual(this.filteredInstructorAvailability, this.expectedFilteredInstructorAvailability)
    })
  })

  describe('#getOnlyTheBlocksWhichContainAllTheUsers', () => {
    describe('for a single day', () => {
      before(() => {
        this.expectedInstructorAvailabilityBlocks = require('../fixtures/instructor-availability-blocks').setOne

        this.actualInstructorAvailabilityBlocks = getOnlyTheBlocksWhichContainAllTheUsers(
          mock.allUserAvailabilitiesForADate, 4
        )
      })
      it('only returns blocks that contain all the users', () => {
        assert.deepEqual(this.actualInstructorAvailabilityBlocks, this.expectedInstructorAvailabilityBlocks)
      })
    })

    describe('for multiple days', () => {
      before(() => {
        const totalInstructorCount = mock.allInstructorIds.length
        this.expectedInstructorAvailabilityBlocks = require('../fixtures/instructor-availability-blocks-empty-days')
        this.actualInstructorAvailabilityBlocks = {}

        // TODO - This is an implementation, not a test - Kyle
        _.each(this.expectedInstructorAvailabilityBlocks, (blocksForDay, key) => {

          // TODO - This doesn't actually do anything - Kyle
          this.actualInstructorAvailabilityBlocks[key] =
            getOnlyTheBlocksWhichContainAllTheUsers(blocksForDay, totalInstructorCount)
        })
      })
      it('returns nothing when no instructors are available', () => {
        assert.deepEqual(this.actualInstructorAvailabilityBlocks, this.expectedInstructorAvailabilityBlocks)
      })
    })
  })

  describe('#getBlocksWithAMinimumNumberOfInstructors', () => {
    before(() => {
      const {contiguousBlocks, contiguousBlocksMinimumInstructors} = require('../fixtures/time-blocks')
      this.contiguousBlocksMinimumInstructors = contiguousBlocksMinimumInstructors

      this.actualAvailabilityBlocks = getBlocksWithAMinimumNumberOfInstructors(contiguousBlocks, 4)
    })
    it('gets only the blocks with a minimum number of instructors', () => {
      assert.deepEqual(this.actualAvailabilityBlocks, this.contiguousBlocksMinimumInstructors)
    })
  })

  describe('#getSegmentsWithMinimumInstructorsForACompleteDuration', () => {
    describe('with 4 instructors', () => {
      before(() => {
        this.expectedStartTimes = mockLarge.expectedSegmentsWithFourInstructorsForThreeHours
        this.actualStartTimes = getSegmentsWithMinimumInstructorsForACompleteDuration(
          mockLarge.unfilteredSingleDaySegments, 4, 6
        )
      })
      it('gets segment start times with enough instructors for a minimum duration', () => {
        assert.deepEqual(this.actualStartTimes, this.expectedStartTimes)
      })
    })

    describe('with 1 instructor', () => {
      before(() => {
        this.expectedStartTimes = mockLarge.unfilteredSingleDaySegments
        this.actualStartTimes = filterMinimumUsersWithACompleteDuration(
          mockLarge.unfilteredSingleDaySegments, 1, 1
        )
      })
      it('keeps the starting set if the segment starts times have at least one instructor for at least half an hour', () => {
        assert.deepEqual(this.actualStartTimes, this.expectedStartTimes)
      })
    })
    describe('with 2 instructors', () => {
      before(() => {
        this.expectedStartTimes = mockLarge.unfilteredSingleDaySegments
        this.actualStartTimes = filterMinimumUsersWithACompleteDuration(
          mockLarge.unfilteredSingleDaySegments, 2, 1
        )
      })
      it('keeps the starting set if the segment starts times have at least two instructors for at least half an hour', () => {
        assert.deepEqual(this.actualStartTimes, this.expectedStartTimes)
      })
    })
  })
  describe('#filterMinimumUsersWithACompleteDuration', () => {
    before(() => {
      this.expectedStartTimes = mockLarge.expectedSegmentsWithTheSameFourInstructorsForThreeHours
      this.actualStartTimes = filterMinimumUsersWithACompleteDuration(
        mockLarge.unfilteredSingleDaySegments, 4, 6
      )
    })

    it('gets start times with enough of the same instructors for a minimum duration', () => {
      assert.deepEqual(this.actualStartTimes, this.expectedStartTimes)
    })
  })


  describe('#getSpecificBlocksFromAListOfInstructorIds', () => {
    const startingContiguousTimeBlocks = require('../fixtures/time-blocks').contiguousBlocksSixUniqueInstructors
    this.expectedContiguousTimeBlocks = require('../fixtures/time-blocks').filteredContiguousBlocksSixInstructors

    this.actualBlocks = getSpecificBlocksFromAListOfInstructorIds(
      startingContiguousTimeBlocks, [4112, 7475]
    )

    it('returns only the blocks with at least all the users', () => {
      assert.deepEqual(this.actualBlocks, this.expectedContiguousTimeBlocks)
    })
  })

  describe('#getAllInstructorAvailabilitiesForADate', () => {
    before(() => {
      this.expectedUserAvailabilitiesForADate = require('../fixtures/time-blocks').userAvailabilities
      this.actualUserAvailabilitiesForADate =
        getAllInstructorAvailabilitiesForADate(mock.segmentsGroupedByDate, '2017-12-20')
    })

    it('returns only user availabilities for a single date', () => {
      assert.deepEqual(this.actualUserAvailabilitiesForADate, this.expectedUserAvailabilitiesForADate)
    })
  })

  describe('#filterBlocksWithinATimeRange', () => {
    it('should return an empty set if there are no users available between a start time and a duration', () => {
      const actualUserAvailabilitiesWithinARange =
        filterBlocksWithinATimeRange(mock.allUserAvailabilitiesForADate, 0, 1)
      const expectedUserAvailabilitiesWithinARange = {}
      assert.deepEqual(actualUserAvailabilitiesWithinARange, expectedUserAvailabilitiesWithinARange)
    })
    it('returns availability times only for users available between a start time and for a duration', () => {
      const expectedUserAvailabilitiesWithinARange = require('../fixtures/instructor-availability-blocks').setTwo
      const actualUserAvailabilitiesWithinARange =
        filterBlocksWithinATimeRange(mock.allUserAvailabilitiesForADate, 2, 31)

      assert.deepEqual(actualUserAvailabilitiesWithinARange, expectedUserAvailabilitiesWithinARange)
    })
  })

  describe('#getOnlyTheBlocksWhichContainAllTheUsers', () => {
    before(() => {
      this.expectedUserAvailabilitiesWithinARange = {
        '32': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 32 },
        '33': { 'user_ids': ['3726', '4112', '6630', '7475'], 'startTime': 33 },
      }
      const userAvailabilitiesWithinARange =
        filterBlocksForATimeRange(mock.allUserAvailabilitiesForADate, 2, 31)

      this.actualUserAvailabilitiesForAnEntireRange = getOnlyTheBlocksWhichContainAllTheUsers(
        userAvailabilitiesWithinARange,
        4,
      )
    })
    it('returns availability only for users available for a start time and for the duration', () => {
      assert.deepEqual(this.actualUserAvailabilitiesForAnEntireRange, this.expectedUserAvailabilitiesWithinARange)
    })
  })
})
