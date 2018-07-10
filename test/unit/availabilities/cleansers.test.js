/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

const assert = require('assert')

const mock = require('../fixtures/mock')
const cleansers = require('../../../data/availabilities/cleansers')

describe('Cleansers', function(){
  // TODO: REFACTOR - Isolate the actual filter. Currently this works as a loop. - Chad
  // TODO: Rename for what's being tested, not the function being called. - Chad
  describe('#groupByDateAndStartTime', function(){
    before(() => {
      this.expectedInstructorAvailabilities = require('../fixtures/instructor-availabilities')
      this.actualGroupedInstructorAvailability = cleansers
        .groupByDateAndStartTime(mock.allInstructorAvailability)
    })

    it('matches actual and expected instructor availability', () => {
      assert.deepEqual(
        this.actualGroupedInstructorAvailability,
        this.expectedInstructorAvailabilities
      )
    })
  })

  describe('#groupByDate', () => {
    before(() => {
      this.expectedContiguousTimeBlocksAcrossMultipleDays = require('../fixtures/time-blocks').sixDays
      this.actualContiguousTimeBlocksAcrossMultipleDays =
        cleansers.groupByDate(mock.segmentsGroupedByDate)
    })

    it('returns all contiguous time blocks for users across multiple days', () => {
      assert.deepEqual(
        this.actualContiguousTimeBlocksAcrossMultipleDays,
        this.expectedContiguousTimeBlocksAcrossMultipleDays
      )
    })
  })
})
