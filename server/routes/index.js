const router = require('express').Router();

// The routes are added to the router - users
router.use('/users', require('./users'));
router.use('/passwords', require('./passwords'));

module.exports = router;