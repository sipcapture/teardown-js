var should = require('chai').should,
    expect = require('chai').expect,
    module = require('../index'),
    teardown = module.teardown;

describe('#escape', function() {
  it('TEARDOWN BYE', function() {
    expect( teardown('toUser','domain:5060','127.0.0.1','c7a0cha9','xxfrom','xxto','"some user"','"some target"')).to.be.a('string');
  });

});
