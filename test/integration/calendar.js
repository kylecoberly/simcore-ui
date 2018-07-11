import { mount } from '@vue/test-utils'
import assert from 'assert'
import Vue from 'vue'
import Vuex from 'vuex'
import Calendar from '../../components/Calendar'

Vue.use(Vuex)

describe('Calendar', () => {
  it('renders', () => {
    const store = new Vuex.Store()
    const component = mount(Calendar, {
      store,
    })
    assert.ok(component)
  })
})
