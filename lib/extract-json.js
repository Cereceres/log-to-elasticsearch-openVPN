const isValidJson = require('./is-valid-json');

module.exports = function extractJson(message) {
    // The parser is updated to get all json object JECD
    const jsonStart = message.indexOf('{');
    const jsonEnd = message.lastIndexOf('}');
    if (jsonStart < 0 || jsonEnd < 0 || jsonStart > jsonEnd) return null;
    const jsonSubString = message.substring(jsonStart, jsonEnd + 1).replace(/\u'/g, '\'').replace(/\'/g, '\"');
    return isValidJson(jsonSubString) ? jsonSubString : null;
    // =======================JECD==================
};
