const router = require('express').Router();
module.exports = router;

// company router routes
router.use('/company', require('./company'))

// employee router routes
router.use('/employee', require('./employee'))

// Error Handeling
router.use(( req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})
