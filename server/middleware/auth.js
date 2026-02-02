const { formatResponseData } = require('../utils/utils');
const { errorMessages } = require('./middlewareConsts');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    
    return res.status(401).json(formatResponseData(false, null, errorMessages.unauthorized));
};

module.exports = {
    ensureAuthenticated
};
