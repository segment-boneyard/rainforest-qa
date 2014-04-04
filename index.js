var request = require('superagent');

/**
 * Create a new Rainforest client
 */

module.exports = Rainforest;

/**
 * Create a new rainforest client with our token.
 */

function Rainforest(token){
  if (!(this instanceof Rainforest)) return new Rainforest(token);
  this.token = token;
  this.tests = 'all';
}

/**
 * Specify a test to run
 *
 * @param {String} id
 */

Rainforest.prototype.test = function(id){
  if (typeof tests === 'string') this.tests = [];
  this.tests.push(id);
  return this;
}

/**
 * Run our tests
 *
 * @param {Function} fn
 */

Rainforest.prototype.run = function(fn){
  request
    .post('https://app.rainforestqa.com/api/1/runs')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send({ tests: this.tests })
    .end(fn);
  return this;
};

