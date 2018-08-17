/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */

const assert = require('assert')
const {
  groupUserAvailabilitiesByDate,
  filterDurationLessThan,
  expandAvailabilitiesByDuration,
  expandAvailability,
  addUserToTotalAvailability,
} = require('../../../utilities/filter-availabilities')

describe('NetAvailabilities', () => {
  // groupUserDays
  xdescribe('#groupUserAvailabilitiesByDate', () => {
    it('returns an empty array if given an empty array', () => {
      assert.deepEqual(groupUserAvailabilitiesByDate([], {}), [])
    })
    it('combines two dates', () => {
      assert.deepEqual(groupUserAvailabilitiesByDate([{
        '2018-07-01 10:30:00': {
          'startTime': 10,
          'duration': 1,
        }
      }, {
        '2018-07-01 03:00:00': {
          'startTime': 3,
          'duration': 1,
        }
      }], {}), [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 10,
          duration: 1,
        }, {
          startTime: 3,
          duration: 1,
        }],
      }])
    })
  })

  xdescribe('#filterDurationLessThan', () => {
    it('keeps all availabilities if all are more than duration', () => {
      assert.deepEqual(filterDurationLessThan([{
        duration: 2,
      }, {
        duration: 2,
      }], 1), [{
        duration: 2,
      }, {
        duration: 2,
      }])
    })
    it('removes all availabilities if none are greater than or equal to duration', () => {
      assert.deepEqual(filterDurationLessThan([{
        duration: 2,
      }, {
        duration: 2,
      }], 3), [])
    })
  })

  xdescribe('#expandAvailabilitiesByDuration', () => {
    it('keeps availabilities the minimum duration untouched', () => {
      assert.deepEqual(expandAvailabilitiesByDuration([{
        availabilities: [{
          startTime: 10,
          duration: 1,
        }, {
          startTime: 3,
          duration: 1,
        }],
      }], 1), [{
        availabilities: [{
          startTime: 10,
          duration: 1,
        }, {
          startTime: 3,
          duration: 1,
        }],
      }])
    })
    it('splits a double availability in 2', () => {
      assert.deepEqual(expandAvailabilitiesByDuration([{
        availabilities: [{
          startTime: 10,
          duration: 1,
        }],
      }], 0.5), [{
        availabilities: [{
          startTime: 10,
          duration: 0.5,
        }, {
          startTime: 10.5,
          duration: 0.5,
        }],
      }])
    })
    it('splits availabilities and leaves minimum duration availabilities', () => {
      assert.deepEqual(expandAvailabilitiesByDuration([{
        availabilities: [{
          startTime: 10,
          duration: 1,
        }, {
          startTime: 12,
          duration: 0.5,
        }],
      }], 0.5), [{
        availabilities: [{
          startTime: 10,
          duration: 0.5,
        }, {
          startTime: 10.5,
          duration: 0.5,
        }, {
          startTime: 12,
          duration: 0.5,
        }],
      }])
    })
    it('splits availabilities and leaves minimum duration availabilities for multiple days', () => {
      assert.deepEqual(expandAvailabilitiesByDuration([{
        availabilities: [{
          startTime: 10,
          duration: 1,
        }, {
          startTime: 12,
          duration: 0.5,
        }],
      }, {
        availabilities: [{
          startTime: 10,
          duration: 1,
        }],
      }], 0.5), [{
        availabilities: [{
          startTime: 10,
          duration: 0.5,
        }, {
          startTime: 10.5,
          duration: 0.5,
        }, {
          startTime: 12,
          duration: 0.5,
        }],
      }, {
        availabilities: [{
          startTime: 10,
          duration: 0.5,
        }, {
          startTime: 10.5,
          duration: 0.5,
        }],
      }])
    })
  })

  describe('#expandAvailability', () => {
    it('keeps a minimum duration availability untouched', () => {
      assert.deepEqual(expandAvailability({
        startTime: 1,
        duration: 1
      }, 1), [{
        startTime: 1,
        duration: 1
      }])
    })
  })

  xdescribe('#addUserToTotalAvailability', () => {
    it('adds a single user availability to a new total availability', () => {
      assert.deepEqual(addUserToTotalAvailability(1, [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 10,
        }, {
          startTime: 10.5,
        }],
      }], []), [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 10,
          users: [1],
        }, {
          startTime: 10.5,
          users: [1],
        }],
      }])
    })
    it('adds multiple user availabilities to a new total availability', () => {
      assert.deepEqual(addUserToTotalAvailability(1, [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 10,
        }, {
          startTime: 10.5,
        }],
      }, {
        date: '2018-07-02',
        availabilities: [{
          startTime: 10,
        }, {
          startTime: 10.5,
        }],
      }], []), [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 10,
          users: [1],
        }, {
          startTime: 10.5,
          users: [1],
        }],
      }, {
        date: '2018-07-02',
        availabilities: [{
          startTime: 10,
          users: [1],
        }, {
          startTime: 10.5,
          users: [1],
        }],
      }])
    })
    it('adds multiple days to an existing availabilities list', () => {
      assert.deepEqual(addUserToTotalAvailability(3, [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 1,
        }],
      }, {
        date: '2018-07-02',
        availabilities: [{
          startTime: 1,
        }, {
          startTime: 2,
        }],
      }], [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 1,
          users: [1],
        }],
      }, {
        date: '2018-07-02',
        availabilities: [{
          startTime: 1,
          users: [1],
        }, {
          startTime: 3,
          users: [2],
        }],
      }, {
        date: '2018-07-03',
        availabilities: [{
          startTime: 1,
          users: [1],
        }],
      }]), [{
        date: '2018-07-01',
        availabilities: [{
          startTime: 1,
          users: [1, 3],
        }],
      }, {
        date: '2018-07-02',
        availabilities: [{
          startTime: 1,
          users: [1, 3],
        }, {
          startTime: 2,
          users: [3],
        }, {
          startTime: 3,
          users: [2],
        }],
      }, {
        date: '2018-07-03',
        availabilities: [{
          startTime: 1,
          users: [1],
        }],
      }])
    })
  })
})
