const crypto = require('crypto');


module.exports = function hash(str, encoding) {
    return crypto.createHash('sha256').update(str, 'utf8').digest(encoding);
};
