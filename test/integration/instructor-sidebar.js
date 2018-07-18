/* global describe, before, beforeEach, it */
/* eslint */
import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import moment from 'moment'
import InstructorSidebar from '../../components/InstructorSidebar'

describe('InstructorSidebar', () => {
  describe('#dateString', () => {
    it('returns a formatted date string', () => {
      const component = shallowMount(InstructorSidebar, {
        propsData: {
          date: moment('2018-07-01'),
          monthDays: {},
        },
      })
      assert.equal(component.vm.dateString, '2018-07-01')
    })
  })
  describe('#currentDay', () => {
    describe('default', () => {
      it('returns a default day if none is defined', () => {
        const component = shallowMount(InstructorSidebar, {
          propsData: {
            date: moment('2018-07-01'),
            monthDays: {},
          },
        })
        assert.deepEqual(component.vm.currentDay, component.vm.defaultCurrentDay)
      })
      it('returns the default date if there isn\'t a match', () => {
        const component = shallowMount(InstructorSidebar, {
          propsData: {
            date: moment('2018-07-01'),
            monthDays: {
              '2018-07-02': false,
            },
          },
        })
        assert.deepEqual(component.vm.currentDay, component.vm.defaultCurrentDay)
      })
    })
    describe('correct value', () => {
      before(() => {
        this.component = shallowMount(InstructorSidebar, {
          propsData: {
            date: moment('2018-07-01'),
            monthDays: {
              '2018-07-01': { someValue: 'Some Value' },
            },
          },
        })
      })
      it('returns a matched date', () => {
        assert.deepEqual(this.component.vm.currentDay, { someValue: 'Some Value' })
      })
    })
  })
})
