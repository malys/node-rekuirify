# Rekuirify [![NPM version](https://badge.fury.io/js/rekuirify.png)](http://badge.fury.io/js/rekuirify)
[![Build Status](https://travis-ci.org/malys/node-rekuirify.png)](https://travis-ci.org/malys/node-rekuirify)
[![Coverage Status](https://coveralls.io/repos/malys/node-rekuirify/badge.png)](https://coveralls.io/r/malys/node-rekuirify)


'rekuire' transform for Browserify . 'rekuire' is basically node's 'require' without the relative paths (https://github.com/nadav-dav/rekuire).

## Getting Started
Install the module with: `npm install node-rekuirify`

```javascript
'use strict'
var rekuirify = require('../lib');
var browserify = require('browserify');

var builder = browserify({
    entries: [
        ...
    ],
    debug: true
});

builder.transform(htify).bundle()
    .on('error', handle).pipe(process.stdout);

function handle(error) {
    throw error;
}
```

## Examples
Use Grunt Browserify.

``` js
transform: ['rekuirify']
```

Folders description:
```
	- src
        - one
            - two -> sample.js
```
Require definition:
``` js
var sample=require('@sample.js'); // Compute relative path
```
equivalent to 
``` js
var sample=require('src/one/two/sample.js'); // Define relative path

```

## Release History
see CHANGELOG.md

## License
Copyright (c) 2014 malys. Licensed under the MIT license.
