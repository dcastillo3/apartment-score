const serverless = require('serverless-http');
const app = require('../../server');

// Wrap Express app with serverless-http
const handler = serverless(app);

module.exports.handler = async (event, context) => {
    // Prevent Lambda from waiting for empty event loop
    context.callbackWaitsForEmptyEventLoop = false;
    
    // Handle the request
    const result = await handler(event, context);
    return result;
};