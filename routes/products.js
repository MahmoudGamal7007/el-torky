
const express = require('express')
const router = express.Router();
const db = require('../database')


router.get('/', (req, res) => {
  db.query(`select * from prods ORDER BY RAND() LIMIT 8`, (err, result, fields) => {
    if (err) {
      console.log(err)
      res.status(401).send(err)
    } else {
      res.json({products:result})
    }
  })
})

module.exports = router