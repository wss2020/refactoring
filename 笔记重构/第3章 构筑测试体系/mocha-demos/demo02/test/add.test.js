var add = require('../src/add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('2 加 3 应该等于 5', function() {
    expect(add(2, 3)).to.be.equal(5);
  });

  it('任何数加0应该等于自身', function() {
    expect(add(1, 0)).to.be.equal(1);
  });
});
