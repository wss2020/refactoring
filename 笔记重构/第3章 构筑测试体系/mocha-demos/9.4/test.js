var expect = require('chai').expect;
const assert = require('assert');

class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }

  equals(other) {
    if (!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode && this.number === other.number;
  }

  get areaCode() {
    return this._areaCode;
  }

  set areaCode(arg) {
    this._areaCode = arg;
  }

  get number() {
    return this._number;
  }

  set number(arg) {
    this._number = arg;
  }
}

//对其进行测试很重要：
describe('类对象相等测试：', function() {
  it('telephone equals', function () {
    assert(new TelephoneNumber("312", "555-0142").equals(new TelephoneNumber("312", "555-0149")));
  });
});



