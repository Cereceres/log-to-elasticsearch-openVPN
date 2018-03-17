const zlib = require('zlib');

const data = {
    awslogs:{
        data:zlib.gzipSync(JSON.stringify({}))
    }
};


module.exports = data;
