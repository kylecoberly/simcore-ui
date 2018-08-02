/* global describe, beforeEach, it */
/* eslint */
import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import moment from 'moment'
import CalendarBody from '../../components/CalendarBody'

xdescribe('CalendarBody', () => {
  beforeEach(() => {
    this.component = shallowMount(CalendarBody, {
      propsData: {
        selectedDate: moment('2018-07-01'),
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.find('*').exists())
  })
  it('#startOffset')
  it('#endOffset')
  it('#daysInCurrentMonth')
  it('#toggleExpandedWeek')
  it('#setDate')
  it('#updateAvailabilities')
  it('#getAvailabilitiesForDay')
  it('#isSelected')
  it('#inActiveWeek')
})
