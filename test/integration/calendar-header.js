/* global describe, beforeEach, it */
/* eslint */
import { mount } from '@vue/test-utils'
import assert from 'assert'
import CalendarHeader from '../../components/CalendarHeader'

describe('CalendarHeader', () => {
  beforeEach(() => {
    this.component = mount(CalendarHeader, {
      propsData: {
        displayDate: 'Friday, July 13th',
        context: false,
        canScheduleEvents: true,
      },
    })
  })
  it('displays the date', () => {
    assert.equal(this.component.find('.load-current-month').text(), 'Friday, July 13th')
  })
  it('goes to the previous month', () => {
    this.component.find('.load-previous-month').trigger('click')
    assert.deepEqual(this.component.emitted().loadPreviousMonth[0], {})
  })
  it('goes to the current month', () => {
    this.component.find('.load-current-month').trigger('click')
    assert.deepEqual(this.component.emitted().setTheActiveDateToToday[0], {})
  })
  it('goes to the next month', () => {
    this.component.find('.load-next-month').trigger('click')
    assert.deepEqual(this.component.emitted().loadNextMonth[0], {})
  })
  it('goes to the previous day', () => {
    this.component.find('.load-previous-day').trigger('click')
    assert.deepEqual(this.component.emitted().loadPrevDay[0], {})
  })
  it('goes to the current day', () => {
    this.component.find('.load-today').trigger('click')
    assert.deepEqual(this.component.emitted().setTheActiveDateToToday[0], {})
  })
  it('goes to the next day', () => {
    this.component.find('.load-next-day').trigger('click')
    assert.deepEqual(this.component.emitted().loadNextDay[0], {})
  })
  it('hides the toggle if the user can\'t schedule events', () => {
    this.component.setData({ canScheduleEvents: false })
    assert.ok(!this.component.find('.sim-calendar--header--mode').exists())
  })
})
