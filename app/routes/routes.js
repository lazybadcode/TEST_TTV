const router = require('express').Router();

router.use('/api', require('./api.route'));

module.exports = router;