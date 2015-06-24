
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

  it('should initialize a base with default value', function() {
    var rainforest = Rainforest(null, null);
    assert.equal(rainforest.base, 'https://app.rainforestqa.com');
  });

  it('should initialize an array of tests', function() {
    var rainforest = Rainforest(null, null);
    assert.deepEqual(rainforest.tests, ['all']);
  });
});

describe('Rainforest#test()', function() {
  it('should add to the array of tests', function() {
    var rainforest = Rainforest(null, null);
    rainforest.test('foo');
    assert.deepEqual(rainforest.tests, ['all', 'foo']);
  });
});

describe('Rainforest#foo()', function() {
  var rainforest;
  this.timeout(4000);

  beforeEach(function() {
    rainforest = Rainforest('1a32ff6d44b9957f069648a34b8a2c52', 'https://app.rnfrst.com/');
  });

  describe('#getTests()', function() {
    it('should get all the tests', function(done) {
      rainforest
        .getTests(function(err, res) {
          if (err) return done(err);
          assert(res.text);
          done();
        });
    });
  });
  
  describe('Rainforest#createTest()', function() {
    it('should create the test', function(done) {
      var data = {
        start_uri: '/login',
        title: 'Login',
        elements: [],
        site_id: 9
      };

      rainforest.createTest(data, function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 201);
        var response = JSON.parse(res.text);
        var id = response.id;
        assert(id);
        rainforest.removeTests([response.id], function(err, res) {
          if (err) return done(err);
          done();
        });
      });
    });
  });

  describe('Rainforest#updateTest()', function() {
    it('should update the test', function(done) {
      var data = {
        start_uri: '/login',
        title: 'Login',
        elements: [],
        site_id: 9
      };
      
      rainforest.createTest(data, function(err, res) {
        if (err) return done(err);
        var response = JSON.parse(res.text);
        rainforest.updateTest(response.id, data, function(err, res) {
          if (err) return done(err);
          assert.equal(res.status, 200);
          assert(res.text);
          rainforest.removeTests([response.id], function(err, res) {
            if (err) return done(err);
            done();
          });
        });
      });
    });
  });

  describe('Rainforest#removeTests()', function() {
    it('should remove the test', function(done) {
      var data = {
        start_uri: '/login',
        title: 'Login',
        elements: [],
        site_id: 9
      };
      
      rainforest.createTest(data, function(err, res) {
        if (err) return done(err);
        var createResponse = JSON.parse(res.text);
        rainforest.updateTest(createResponse.id, data, function(err, res) {
          if (err) return done(err);
          rainforest.removeTests([createResponse.id], function(err, res) {
            if (err) return done(err);
            assert.equal(res.status, 200);
            var removeResponse = JSON.parse(res.text);
            assert.deepEqual(removeResponse, { "ok": true, "count": 0 });
            done();
          });
        });
      });
    });
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
});
