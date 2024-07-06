const rateLimit = require('express-rate-limit');
const { rateLimiterMessages } = require('./middlewareConsts');

const rateLimiter = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    max: 50, // 50 requests per windowMs
    message: rateLimiterMessages.rateLimitExceeded,
});

module.exports = {
    rateLimiter
};