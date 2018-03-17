module.exports = function extractErrorMessage(message) {
    const indexStart = message.indexOf('VPN Auth Failed');
    const indexEnd = message.indexOf('[\'');
    try{
        return JSON.parse(`{${message.substring(indexStart, indexEnd)}}`.replace('VPN Auth Failed', '\"VPN Auth Failed\"').replace(/\'/g, '\"'));
    }catch(e) {
        return !e;
    }
};
