const router = require('express').Router();

/**
 * log the user out of the current session
 */
router.post('/', (req, res) => {
  res.json({code: 200});
})


module.exports = router
