/* global before, describe, it */

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import EventScheduler from '../../../components/EventScheduler'

dayjs.extend(advancedFormat)

describe('Event Scheduler', () => {
  before(() => {
    this.component = shallowMount(EventScheduler, {
      propsData: {
        event: {
          time: dayjs('2018-07-01 01:00:00'),
          duration: 1.5,
          title: 'A Title',
          description: 'A Description',
          department: 'A Department',
        },
        categories: [{
          id: 1,
          label: 'A',
        }, {
          id: 2,
          label: 'B',
        }, {
          id: 3,
          label: 'C',
        }],
      },
    })
  })
  describe('header', () => {
    it('shows the title as New Event', () => {
      const title = this.component.find('h3').text()
      assert.equal(title, 'New Event')
    })
    it('displays the date', () => {
      const date = this.component.find('.event-date').text()
      assert.equal(date, 'Sunday, July 1st, 2018')
    })
    it('displays the time', () => {
      const date = this.component.find('.event-time').text()
      assert.equal(date, '1am – 2:30am')
    })
  })
  describe('Event Information', () => {
    it('displays a saved title', () => {
      const title = this.component.find('#title').element.value
      assert.equal(title, 'A Title')
    })
    it('displays a saved description', () => {
      const description = this.component.find('#description').element.value
      assert.equal(description, 'A Description')
    })
    it('displays a list of categories', () => {
      const categories = this.component.findAll('#category option')
      assert.equal(categories.length, 3)
    })
    xit('displays a selected department', () => {
      const department = this.component.find('#department input').element.value
      assert.equal(department, 'A Department')
    })
  })
})
