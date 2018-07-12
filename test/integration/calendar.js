/* global describe, before, it */
/* eslint */
import moment from 'moment'
import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import Calendar from '../../components/Calendar'

describe('Calendar', () => {
  before(() => {
    this.monthDays = {
      '1970-01-01': {
        someValue: 'Some Value',
      },
    }
  })
  describe('#currentDay', () => {
    describe('default', () => {
      before(() => {
        this.defaultCurrentDay = {
          eventBlocks: [],
          pendingEventBlocks: [],
          currentUserAvailabilityBlocks: [],
          aggregateUserAvailabilityBlocks: [],
          allBlocks: [],
          aggregateUserAvailabilitySegments: [],
          allSegments: [],
        }
      })
      it('returns a default day if none is defined', () => {
        this.component = shallowMount(Calendar, {
          propsData: {
            activeMoment: moment('1970-01-01'),
          },
        })
        assert.deepEqual(this.component.vm.currentDay, this.defaultCurrentDay)
      })
      it('returns the default date if there isn\'t a match', () => {
        this.component = shallowMount(Calendar, {
          propsData: {
            activeMoment: moment('1970-01-02'),
            monthDays: this.monthDays,
            date: moment('1970-01-01'),
            dateFormat: 'YYYY-MM-DD',
          },
        })
        assert.deepEqual(this.component.vm.currentDay, {
          someValue: 'Some Value',
        })
      })
    })
    describe('correct value', () => {
      before(() => {
        this.component = shallowMount(Calendar, {
          propsData: {
            activeMoment: moment('1970-01-01'),
            monthDays: this.monthDays,
            date: moment('1970-01-01'),
            dateFormat: 'YYYY-MM-DD',
          },
        })
      })
      it('returns a matched date', () => {
        assert.deepEqual(this.component.vm.currentDay, {
          someValue: 'Some Value',
        })
      })
    })
  })
})
