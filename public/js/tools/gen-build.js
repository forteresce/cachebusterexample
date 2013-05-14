var pkg = require('../../../package.json'),
    fs = require('fs'),
    path = require('path'),
    build = require('./build.json'); /* NOTE: You will need to use JSON.parse if you are not using node js above 0.8 */

build.dir += '/v' + pkg.version;

fs.writeFileSync(path.join(__dirname, 'build.js'), JSON.stringify(build, null, '\t'));
