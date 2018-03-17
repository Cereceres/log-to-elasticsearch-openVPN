module.exports = function isValidJson(message) {
    try {
        JSON.parse(message);
    } catch (e) {
        return false;
    }
    return true;
};
