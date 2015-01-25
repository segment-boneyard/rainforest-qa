
/**
 * Module dependencies.
 */

var request = require('superagent');

/**
 * Create a new Rainforest client
 */

module.exports = Rainforest;

/**
 * Create a new rainforest client with our token.
 */

function Rainforest(token, base) {
  if (!(this instanceof Rainforest)) return new Rainforest(token, base);
  this.token = token;
  this.tests = [ 'all' ];
  this.base = base || 'https://app.rainforestqa.com';
}

/**
 * Specify a test to run
 *
 * @param {String} id
 * @return {Rainforest} this
 * @api public
 */

Rainforest.prototype.test = function(id){
  this.tests.push(id);
  return this;
};

/**
 * Run our tests
 *
 * @param {Function} fn
 * @return {Rainforest} this
 * @api public
 */

Rainforest.prototype.run = function(fn){
  request
    .post(this.base + '/api/1/runs')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send({ tests: this.tests })
    .end(fn);
  return this;
};

/**
 * Get all tests.
 *
 * @param {Function} fn
 * @api public
 */

Rainforest.prototype.getTests = function(fn){
  request
    .get(this.base + '/api/1/tests?page_size=100') // ?query=&page_size=7
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .end(function(res){
      fn(null, res);
    });
};

/**
 * Create a test.
 *
 * Steps look like this:
 *
 *   {
 *     type: "step",
 *     element: {
 *       action: "Click the login button",
 *       response: "Are you at the login page?"
 *     }
 *   }
 *
 * @param {Object} data
 *   @property {String} [title] Defaults to "Unnamed Test"
 *   @property {Array} [elements] Array of steps
 *   @property {String} [start_uri]
 *   @property {Integer} [site_id]
 * @param {Function} fn
 * @api public
 */

Rainforest.prototype.createTest = function(data, fn){
  request
    .post(this.base + '/api/1/tests')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send(data)
    .end(function(res){
      fn(null, res);
    });
};

/**
 * Update test.
 *
 * @param {Array} ids
 * @param {Function} fn
 * @api public
 */

Rainforest.prototype.updateTest = function(id, entireTest, fn){
  request
    .put(this.base + '/api/1/tests/' + id)
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send(entireTest)
    .end(function(res){
      fn(null, res);
    });
};

/**
 * Remove tests.
 *
 * @param {Array} ids
 * @param {Function} fn
 * @api public
 */

Rainforest.prototype.removeTests = function(ids, fn){
  request
    .del(this.base + '/api/1/tests')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send({ tests: ids })
    .end(function(res){
      fn(null, res);
    });
};
