const buildRequest = require('./build-request');
const makePost = require('./make-post');
const { ES_ENDPOINT:endpoint } = process.env;

if (!endpoint) throw new Error('ES_ENDPOINT is missing');

module.exports = (body) => function *() {
    const requestParams = buildRequest(endpoint, body);
    yield makePost(requestParams);
};
