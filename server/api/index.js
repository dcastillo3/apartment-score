const router = require('express').Router();
const { errorMessages } = require('../utils/consts');

//Auth route
router.use('/auth', require('./auth/auth'));

//User route
router.use('/user', require('./user/user'));

router.use((req, res, next) => {
    // Create error with custom status property
    const error = new Error(errorMessages.notFound);

    error.status = 404;

    next(error);
});

module.exports = router;