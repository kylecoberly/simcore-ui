import _ from 'lodash'

import * as giant from '../beanstalk/giant'

import filters from '../data/filters'

export default class Beans {
  static buildTests() {
    return [filters]
  }

  static run() {
    const testsToRun = Beans.buildTests()

    console.clear()
    _.each(testsToRun, (test) => {
      const testResponse = test.run()

      Beans.output(testResponse)
    })
  }

  static output(testResponse) {
    let numberOfPassingTests = 0

    _.each(testResponse.results, (result) => {
      if (result.testDidPass) {
        numberOfPassingTests += 1
      }
    })

    giant.introduce(testResponse.name, numberOfPassingTests, testResponse.results.length)

    _.each(testResponse.results, (result) => {
      giant.say(result.caller, result.testDidPass)
    })
  }

  static setExpectedTestResponse(expectedData, shouldRenderInTheDOM = false) {
    console.log(JSON.stringify(expectedData))

    if (shouldRenderInTheDOM) {
      const element = document.createElement('div')
      document.body.appendChild(element)

      element.innerHTML = JSON.stringify(expectedData)
    }
  }

  static equals(caller, actualData, expectedData) {
    const testDidPass = (JSON.stringify(actualData) === JSON.stringify(expectedData))

    return { caller, testDidPass }
  }
}
