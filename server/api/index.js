const router = require('express').Router();

//Data route
router.use('/data', require('./data/data'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    
    error.status = 404;
    next(error);
});

module.exports = router;