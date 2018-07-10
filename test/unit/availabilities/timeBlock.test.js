const assert = require('assert')
const {
  create,
  convertToDecimal,
  convertFromDecimal
} = require('../../../data/availabilities/timeBlock')

describe('timeBlock', function(){
  describe('#convertToDecimal', () => {
    it('converts 0 to 0', () => {
      assert.equal(convertToDecimal(0), 0)
    })
    it('converts an even whole number to half of the original number', () => {
      assert.equal(convertToDecimal(6), 3)
    })
    it('coverts an odd number of segments to a decimal', () => {
      assert.equal(convertToDecimal(3), 1.5)
    })
    it('converts an odd whole number to half of the original number', () => {
      assert.equal(convertToDecimal(7), 3.5)
    })
    it('coverts a 1 to 0.5', () => {
      assert.equal(convertToDecimal(1), 0.5)
    })
  })
  describe('#convertFromDecimal', () => {
    it('converts a 0 duration to 0 segments', () => {
      assert.equal(convertFromDecimal(0), 0)
    })
    it('converts a duration of 0.5 to 1 segment', () => {
      assert.equal(convertFromDecimal(0.5), 1)
    })
    it('converts a duration greater than 1 to twice the duration', () => {
      assert.equal(convertFromDecimal(1.5), 3)
    })
  })
})
