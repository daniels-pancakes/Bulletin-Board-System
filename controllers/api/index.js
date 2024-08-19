const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
