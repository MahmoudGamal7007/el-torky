

const db = require('../database')
const router = require('express').Router()

router.get('/', (req, res) => {

  // Connect Database
  db.query(`INSERT INTO comments(body, user_id, prod_id) VALUES(?,?,?)`, [req.query.body, req.query.user_id, req.query.prod_id], (err, result) => {
    if (err) {
      throw err
    } else {
      if (result) {
        console.log(req.query);
        res.json({code: "add comment route"})
      }
    }
  })
})

module.exports = router