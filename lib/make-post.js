const https = require('https');


module.exports = (requestParams) => new Promise((resolve) => https
    .request(requestParams, (response) => {
        let responseBody = '';
        response.on('data', (chunk) => {
            responseBody = responseBody + chunk;
        });
        response.on('end', () => {
            const info = JSON.parse(responseBody);
            let failedItems;
            let success;

            if (response.statusCode >= 200 && response.statusCode < 299) {
                failedItems = info.items.filter((x) => x.index.status >= 300);

                success = {
                    attemptedItems: info.items.length,
                    successfulItems: info.items.length - failedItems.length,
                    failedItems: failedItems.length
                };
            }

            const error = response.statusCode !== 200 || info.errors === true ? {
                statusCode: response.statusCode,
                responseBody
            } : null;

            resolve({ error, success, statusCode:response.statusCode, failedItems });
        });
    })
    .on('error', (e) => resolve({ error:e }))
    .end(requestParams.body));
