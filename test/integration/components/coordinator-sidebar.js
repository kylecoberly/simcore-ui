/* global describe, beforeEach, it */
/* eslint */
import { shallowMount } from '@vue/test-utils'
import assert from 'assert'
import CoordinatorSidebar from '../../components/CoordinatorSidebar'

xdescribe('CoordinatorSidebar', () => {
  beforeEach(() => {
    this.component = shallowMount(CoordinatorSidebar, {
      propsData: {
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.find('*').exists())
  })
})
