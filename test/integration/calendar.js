import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import Calendar from '../../components/Calendar'

describe('Calendar', () => {
  it('renders', () => {
    const component = shallowMount(Calendar, {
      defaultProps: {
        activeMoment: new Date(0),
      },
    })
    assert.ok(component)
  })
})
