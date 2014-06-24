# node-rekuirify [![Build Status](https://secure.travis-ci.org/malys/node-rekuirify.png?branch=master)](http://travis-ci.org/malys/node-rekuirify)

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


```
file
	- 
var sample=require('@sample');
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
see CHANGELOG.md

## License
Copyright (c) 2014 malys. Licensed under the MIT license.
