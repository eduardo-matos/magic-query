# Query Parser
[![Build Status](https://travis-ci.org/eduardo-matos/query-parser.svg?branch=master)](https://travis-ci.org/eduardo-matos/query-parser)
[![Coverage Status](https://coveralls.io/repos/github/eduardo-matos/query-parser/badge.svg?branch=master)](https://coveralls.io/github/eduardo-matos/query-parser?branch=master)

Parses url encoded parameters to useful JavaScript objects.

## Getting started

### Basic

```js
const { queryParser, Type } = require('query-parser');
const app = require('express')();

// configure fields
const middleware = queryParser({
  id: Type.int(),
  name: Type.string(),
  height: Type.float(),
  valid: Type.boolean(),
  birth: Type.date(),
});

// GET /?id=4&name=John&height=1.78&valid=no&birth=1987-01-16
app.get('/', middleware, (req, res) => {
  console.log(req.q); // {id: 4, name: 'John', height: 1.78, valid: false, birth: Date(1987, 0, 16)}
});
```

### Custom types

```js
const middleware = queryParser({
  height: value => parseFloat(value) * 3.28084, // meters to feet
});

// GET /?height=1.78
app.get('/', middleware, (req, res) => {
  console.log(req.q); // {height: 5.8398952}
});
```

### Getting values from other fields

```js
const middleware = queryParser({
  billingStart: function() {
    moment(this.billing, 'DD-MM-YYYY').format('YYYY-MM-DD 00:00:00');
  },
  billingEnd: function(value) {
    moment(this.billing, 'DD-MM-YYYY').format('YYYY-MM-DD 23:59:59');
  },
});

// GET /?billing=01-02-2003
app.get('/', middleware, (req, res) => {
  console.log(req.q); // {billingStart: '2003-02-01 00:00:00', billingEnd: '2003-02-01 23:59:59'}
});
```

### Configure default value

```js
const middleware = queryParser({
  name: Type.string({ default: 'unknown' }),
  dateCreated: Type.date({ default: () => new Date() }),
});

// GET /?
app.get('/', middleware, (req, res) => {
  console.log(req.q); // {name: 'unknown', dateCreated: Date(...)}
});
```

## Native parsers

1. `Type.integer`
    * default: `0`

1. `Type.string`
    * default: `''`

1. `Type.float`
    * default: `0.0`

1. `Type.boolean`
    * default: `false`

1. `Type.date`
    * default: `undefined`
    * format: `YYYY-MM-DD`
