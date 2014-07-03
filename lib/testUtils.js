var fs = require('fs');

if (process.env.REKUIRIFY_COV && process.env.REKUIRIFY_COV == 1) {
    var nodeRekuirify = require('../lib-cov/node-rekuirify.js');

} else {
    var nodeRekuirify = require('../lib/node-rekuirify.js');
}


var browserify = require('browserify');
var logger = require('log4js').getLogger('rekuirify-test');

function getBuilder(rootPath, fileNam) {
    var fileName = fileNam.replace('test_', '');
    logger.debug('Builder ' + rootPath + fileName);
    var b = browserify();
    b.add(rootPath + fileName);
    return b;
}

function handle(error) {
    logger.debug('Handle error ');
    logger.debug(error);
    if (error) {
        throw error;
    }
}

// Generate a file with the specified path using Browserify and the Rekuirify transformation
function generateFile(rootPath, outputFilePath, options, callback) {
    // use console output if there is no specified output file path

    var writeFileStream = process.output;
    try {
        if (outputFilePath) {
            writeFileStream = fs.createWriteStream(rootPath + outputFilePath);
        }

        // create a builder with default js file to browserify
        var builder = getBuilder(rootPath, outputFilePath);

        var trans = nodeRekuirify;

        if (!options) {
            options = {};
        }

        builder.transform(trans, options).on('error', handle).bundle()
            .on('error', handle).pipe(writeFileStream)
            .on('finish', function () {
                if (callback) {
                    callback();
                }
            });
    } catch (error) {
        logger.error('Cannot Rekuirify: ' + error);
    }

}

//Call the callback method with the file content as a string parameter
function getFileDataAsString(rootPath, fileName, callback) {
    try {
        var filePath = rootPath + fileName;
        var r = fs.createReadStream(filePath);
        r.on('readable', function () {
            var chunk;
            var str = '';
            while (null !== (chunk = r.read())) {
                str += chunk.toString();
            }
            if (callback) {
                callback(str);
            }
        });
    } catch (error) {
        logger.error('Cannot get file data: ' + error);
    }

}

function testFile(rootPath, testedFileName, test, options) {
    // first step, get the expected file content as string
    getFileDataAsString(rootPath + 'references/', testedFileName, function (referencedContent) {
        // next, apply Rekuirify
        generateFile(rootPath, 'test_' + testedFileName, options, function () {
            // Rekuirify is applied, get its content to compare with the expected one
            getFileDataAsString(rootPath, 'test_' + testedFileName, function (generatedContent) {
                // remove the generated file, we don't need it anymore

                // remove \n\r to avoid issue between Window and Linux
                /*logger.info('Compare files :' + rootPath + testedFileName + ' with ' + rootPath + 'test_' + testedFileName);
                logger.debug('---------------------------------------- Reference ----------------------------------------');
                logger.debug(referencedContent);
                logger.debug('---------------------------------------- Generated ----------------------------------------');
                logger.debug(generatedContent);
                logger.debug('----------------------------------------');
*/
                test.equal(referencedContent.replace(/[\n\r]/g, ''), generatedContent.replace(/[\n\r]/g, ''), 'File content should be equal');
                test.done();
                //fs.unlink(rootPath + 'test_' + testedFileName);

            });
        });
    });
}

module.exports = {
    testFile: testFile,
    getFileDataAsString: getFileDataAsString,
    generateFile: generateFile,
    getBuilder: getBuilder
};