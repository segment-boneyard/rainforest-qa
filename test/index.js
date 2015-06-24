
/**
 * Dependencies.
 */

var Rainforest = require('../');
var assert = require('assert');

/**
 * Tests.
 */

describe('Rainforest()', function() {
  it('should be a function', function() {
    assert.equal(typeof Rainforest, 'function');
  });

  it('should be a constructor', function() {
    var rainforest = new Rainforest();
    assert(rainforest instanceof Rainforest);
  });

  it('should not require the new keyword', function() {
    var rainforest = Rainforest();
    assert(rainforest instanceof Rainforest);
  });

  it('should initialize a token', function() {
    var token = 'abc123';
    var rainforest = Rainforest(token);
    assert.equal(rainforest.token, token);
  });

  it('should initialize a base', function() {
    var base = 'http://example.com/';
    var rainforest = Rainforest(null, base);
    assert.equal(rainforest.base, base);
  });
});

describe('Rainforest#test()', function() {
  
});

describe('Rainforest#run()', function() {
  
});

describe('Rainforest#getTests()', function() {
  
});

describe('Rainforest#createTest()', function() {
  
});

describe('Rainforest#updateTest()', function() {
  
});

describe('Rainforest#removeTests()', function() {
  
});

describe('Rainforest#getGenerators()', function() {
  
});

describe('Rainforest#createGenerator()', function() {
  
});

describe('Rainforest#updateGenerator()', function() {
  
});

describe('Rainforest#removeGenerator()', function() {
  
});

describe('Rainforest#getGeneratorRows()', function() {
  
});

describe('Rainforest#createGeneratorRow()', function() {
  
});

describe('Rainforest#updateGeneratorRow()', function() {
  
});

describe('Rainforest#removeGeneratorRow()', function() {
  
});
