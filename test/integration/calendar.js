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
            date: moment('1970-01-01'),
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
  describe('#componentClasses', () => {
    before(() => {
      this.component = shallowMount(Calendar, {
        propsData: {
          activeMoment: moment('1970-01-01'),
          monthDays: this.monthDays,
          date: moment('1970-02-01'),
          dateFormat: 'YYYY-MM-DD',
        },
      })
    })
    it('returns a simple class string', () => {
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context')
    })
    it('returns a class string with the current month when its the current month', () => {
      this.component.setProps({
        date: moment('1970-01-01'),
        showExpandedWeek: false,
        bubbleIsOpen: false,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-current-month')
    })
    it('returns a class string with an expansion when showExpandedWeek is true', () => {
      this.component.setProps({
        date: moment('1970-02-01'),
        showExpandedWeek: true,
        bubbleIsOpen: false,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-expanded')
    })
    it('returns a class string with an expansion when bubbleIsOpen is true', () => {
      this.component.setProps({
        date: moment('1970-02-01'),
        showExpandedWeek: false,
        bubbleIsOpen: true,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-expanded')
    })
    it('returns a class string with an expansion and the current when both match', () => {
      this.component.setProps({
        date: moment('1970-01-01'),
        showExpandedWeek: true,
        bubbleIsOpen: false,
      })
      assert.equal(this.component.vm.componentClasses, 'is-instructor-context is-current-month is-expanded')
    })
  })
  describe('#isCurrentMonth', () => {
    before(() => {
      this.component = shallowMount(Calendar, {
        propsData: {
          activeMoment: moment('1970-01-01'),
          monthDays: this.monthDays,
          dateFormat: 'YYYY-MM-DD',
          date: moment('1970-01-01'),
        },
      })
    })
    it('returns true when it is the current month', () => {
      this.component.setProps({
        date: moment('1970-01-01'),
      })
      assert.ok(this.component.vm.isCurrentMonth)
    })
    it('returns false when it isn\'t the current month', () => {
      this.component.setProps({
        date: moment('1970-02-01'),
      })
      assert.ok(!this.component.vm.isCurrentMonth)
    })
  })
})
