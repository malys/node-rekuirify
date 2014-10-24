/*
 * node-rekuirify
 * https://github.com/malys/node-rekuirify.git
 *
 * Copyright (c) 2014 malys
 * Licensed under the MIT license.
 */

/*jshint node: true */
'use strict';
var through = require('through');
var rek = require('rekuire');


module.exports = function rekuirify(file, options) {
    var source = '';
    if (options) {
        if (options.ignore) {
            rek.ignoreArray(options.ignore);
        }

        if (options.alias) {
            //Modules aliases
            rek.alias(options.alias);
        }

        if (options.importNotModule) {
            //Excluded modules
            rek.importNotModule(options.importNotModule);
        }

        if (options.ambiguousResolve) {
            // Function to resolve ambiguous situation
            rek.ambiguousResolve(options.ambiguousResolve);
        }

    }

    function transform(match, p1, p2) {
        if (p2.substring(0, 1) === '@') {
            return 'require("' + require('path').relative(file, rek.path(p2.substring(1))).replace(/\\/g, '\\\\') + '"';
        } else {
            return match;
        }
    }

    function read(chunk) {
        source += chunk;
    }

    function end() {
        var regex = new RegExp('require[(]([\'"])([^\'"]*)([^\'"]*)([\'"])', 'g');
        source = source.replace(regex, transform);
        /* jshint ignore:start */
        this.queue(source);
        this.queue(null);
        /* jshint ignore:end */

    }

    return through(read, end);
};
