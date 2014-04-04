var assert = require('assert');
var Rainforest = require('../');
var token = require('./auth').token;

describe('Rainforest', function(){
  it('should be able to run the tests', function(done){
    var rainforest = Rainforest(token)
      .run(function (err, res) {
        assert(!err);
        done();
      });
  });
});