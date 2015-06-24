[![Circle CI](https://circleci.com/gh/segmentio/rainforest-qa.svg?style=svg)](https://circleci.com/gh/segmentio/rainforest-qa)

# rainforest-qa

  Client for the Rainforest QA API

## Usage

```js
var Rainforest = require('rainforest-qa');

var rainforest = Rainforest('35nsfhshesrsfsjsjfs');

rainforest
  .test(102420402)
  .test(105353535)
  .run(function(err, res){
    // whoo.
  });
```

## API

### new Rainforest(token)

  Creates a new Rainforest client

### .test(id)

  Adds a particular test to be run. By default, all tests will be run if this method is not called

### .run(fn)

  Runs the tests and calls back with the response

## License

(The MIT License)

Copyright (c) 2014 Segment.io &lt;team@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.