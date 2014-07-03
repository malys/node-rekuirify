/*jshint node: true */
'use strict';


var t = require('../lib/testUtils');

var options = {};
options.alias = {
    'testAliasRek': 'test/usecase/1/2/3/4/5/testBrow.js'
};
options.ignore = ['test/usecase/ignore', 'test/usecase/references'];
options.importNotModule = true;


exports.testRekuire = function (test) {
    test.expect(1);
    var compareRoot = './test/usecase/';
    var testedFileName = 'testRekuire.js';
    t.testFile(compareRoot, testedFileName, test, options);
};

exports.testIgnore = function (test) {
    var compareRoot = './test/usecase/';
    var testedFileName = 'testIgnore.js';

    test.throws(t.testFile(compareRoot, testedFileName, options));
    test.done();


};

exports.testAlias = function (test) {
    test.expect(1);
    var compareRoot = './test/usecase/';
    var testedFileName = 'testAlias.js';
    t.testFile(compareRoot, testedFileName, test, options);
};