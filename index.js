
/**
 * Module dependencies.
 */

var debug = require('debug')('rainforest');
var request = require('superagent');
var assert = require('assert');

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
      fn(null, log(res));
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
      fn(null, log(res));
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
      fn(null, log(res));
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
      fn(null, log(res));
    });
};

/**
 * Get all generators.
 */

Rainforest.prototype.getGenerators = function(fn){
  request
    .get(this.base + '/api/1/generators')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .end(function(res){
      fn(null, log(res));
    });
};

/**
 * Create generator (CSV template variables).
 *
 * @see  https://github.com/rainforestapp/rainforest-cli/blob/master/lib/rainforest/cli/csv_importer.rb
 * @see  https://app.rainforestqa.com/docs#!/generators
 * @param {Object} generator
 *   @property {String} name
 *   @property {String} description
 *   @property {Array} columns Array of column names
 *     [ { name: foo }, { name: bar }, ... ]
 */

Rainforest.prototype.createGenerator = function(generator, fn){
  assert(generator.name, 'Generator needs a `name`.');
  assert(generator.columns.length, 'Generator needs at least 1 column in `columns`.');

  request
    .post(this.base + '/api/1/generators')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send(generator)
    .end(function(res){
      fn(null, log(res));
    });
};

/**
 * Update generator.
 */

Rainforest.prototype.updateGenerator = function(id, updates, fn){
  request
    .put(this.base + '/api/1/generators/' + id)
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send(updates)
    .end(function(res){
      fn(null, log(res));
    });
};

/**
 * Remove generator.
 */

Rainforest.prototype.removeGenerator = function(id, fn){
  request
    .del(this.base + '/api/1/generators/' + id)
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .end(function(res){
      fn(null, log(res));
    });
};

/**
 * Get all rows for generator.
 */

Rainforest.prototype.getGeneratorRows = function(generatorId, fn){
  request
    .get(this.base + '/api/1/generators/' + generatorId + '/rows')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .end(function(res){
      fn(null, log(res));
    });
};

/**
 * Create generator row (record for CSV template).
 *
 * @param {String} generatorId
 * @param {Array} row Array of values
 * @param {Array} columns Array of columns with `id` property
 * @param {Function} fn
 */

Rainforest.prototype.createGeneratorRow = function(generatorId, row, columns, fn){
  request
    .post(this.base + '/api/1/generators/' + generatorId + '/rows')
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send({ data: data(row, columns) })
    .end(function(res){
      // { id: 89248,
      //  data:
      //   { '822': 'somevalue',
      //     '823': 'another',
      //     '824': 'another',
      //     '825': 'and another' } }
      fn(null, log(res));
    });
};

/**
 * Update generator row.
 */

Rainforest.prototype.updateGeneratorRow = function(generatorId, rowId, row, columns, fn){
  request
    .put(this.base + '/api/1/generators/' + generatorId + '/rows/' + rowId)
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .send({ data: data(row, columns) })
    .end(function(res){
      fn(null, log(res));
    });
};

/**
 * Delete generator row.
 *
 * @param {String} generatorId
 * @param {String} rowId
 * @param {Function} fn
 */

Rainforest.prototype.removeGeneratorRow = function(generatorId, rowId, fn){
  request
    .del(this.base + '/api/1/generators/' + generatorId + '/rows/' + rowId)
    .set('CLIENT_TOKEN', this.token)
    .type('json')
    .end(function(res){
      fn(null, log(res));
    });
};

/**
 * Build Row data.
 *
 * @param {Array} row
 * @param {Array} columns
 * @return {Object} data
 */

function data(row, columns) {
  return columns.reduce(function(result, column, i){
    result[column.id] = row[i];
    return result;
  }, {});
}

/**
 * Debug response.
 *
 * @param {Object} res
 * @return {Object} res
 */

function log(res) {
  var req = res.req;
  var path = req.path;
  var method = req.method;
  var body = JSON.stringify(res.error || res.body || res.text, null, 2)
    .split('\n')
    .map(function(line){
      return '               ' + line;
    })
    .join('\n');
  debug('%s %s\n%s', method, path, body);
  return res;
}
