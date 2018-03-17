
const proxyquire = require('proxyquire');
const AwsTest = require('aws-lambda-testing');
const awsTest = new AwsTest();
const event = require('./fixture');
process.env.LAMBDA_TO_GET_ES_ENDPOINT = 'testing';
const stub = {
    './lib/trasform': () => JSON.stringify({})
};
const { handler } = proxyquire('../index', stub);
awsTest.setHandler(handler);

describe('test to handler', () => {
    it('should call the function to get endpoint', async() => {
        await awsTest.exec(event);
    });
});
