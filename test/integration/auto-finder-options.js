/* global describe, beforeEach, it */
/* eslint */

import assert from 'assert'
import { shallowMount } from '@vue/test-utils'
import AutoFinderOptions from '../../components/AutoFinderOptions'

describe('AutoFinderOptions', () => {
  beforeEach(() => {
    this.component = shallowMount(AutoFinderOptions, {
      propsData: {
        matchingOptions: [{
          id: 1,
          label: 'a',
        }, {
          id: 2,
          label: 'b',
        }],
      },
    })
  })
  it('renders', () => {
    assert.ok(this.component.exists())
  })
  describe('#hasMatchingOptions', () => {
    it('indicates matching options when there are still options', () => {
      assert.ok(this.component.vm.hasMatchingOptions)
    })
    it('indicates no matching options when there are still options', () => {
      this.component = shallowMount(AutoFinderOptions, {
        propsData: {
          matchingOptions: [],
        },
      })
      assert.ok(!this.component.vm.hasMatchingOptions)
    })
  })
  describe('#setHighlightedOption', () => {
    it('sets the highlighted option to an id', () => {
      this.component.vm.setHighlightedOption(5)
      assert.equal(this.component.emitted().setHighlightedOption[1][0], 5)
    })
  })
  describe('#selectOption', () => {
    it('selects options', () => {
      this.component.vm.selectOption(1)
      assert.equal(this.component.emitted().selectOption[0][0], 1)
    })
  })
  describe('selecting an option', () => {
    it('selects options', () => {
      this.component.find('li:nth-child(2)').trigger('mousedown')
      assert.equal(this.component.emitted().selectOption[0][0], 2)
    })
  })
  describe('highlighting options', () => {
    it('highlights an option when moused over', () => {
      this.component.find('li:nth-child(2)').trigger('mouseenter')
      assert.equal(this.component.emitted().setHighlightedOption[1][0], 2)
    })
  })
})
