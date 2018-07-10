/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

import * as transformers from '../../../data/availabilities/transformers'

const assert = require('assert');

describe('transformers', function(){
  describe('#groupSegmentsByContiguousTime', () => {
    describe("a", () => {
      before(() => {
        this.userAvailabilitiesForADate = require('../fixtures/user-availabilities').forADate
        this.expectedContiguousTimeBlocks = require('../fixtures/user-availabilities').contiguousTimeBlocks
      })
      it('groups segments by time', () => {
        const actualContiguousTimeBlocks = transformers.groupSegmentsByContiguousTime(
          this.userAvailabilitiesForADate
        )
        assert.deepEqual(actualContiguousTimeBlocks, this.expectedContiguousTimeBlocks)
      })
    })
    describe("b", () => {
      before(() => {
        const userAvailabilitiesForADate = require('../fixtures/user-availabilities').forADate;

        this.expectedContiguousTimeBlocks = require('../fixtures/user-availabilities').contiguousTimeBlocks;
        this.actualContiguousTimeBlocks = transformers.groupSegmentsByContiguousTime(
          userAvailabilitiesForADate
        )
      })
      it('groups user segments starting at zero into a contiguous block', () => {
        assert.deepEqual(this.actualContiguousTimeBlocks, this.expectedContiguousTimeBlocks);
      })
    })
    describe("c", () => {
      before(() => {
        const userAvailabilitiesForADate = {
          '0': { 'user_ids': ['1220', '4112', '7475'], 'startTime': 0 }
        }

        this.expectedContiguousTimeBlocks = {
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

        this.actualContiguousTimeBlocks =
          transformers.groupSegmentsByContiguousTime(userAvailabilitiesForADate)
      })
      it('returns a single set for contiguous time blocks for a single user segment starting at 0', () => {
        assert.deepEqual(this.actualContiguousTimeBlocks, this.expectedContiguousTimeBlocks)
      })
    })
  })
})
