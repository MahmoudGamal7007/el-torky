

const db = require('../database')
const router = require('express').Router();

router.get('/', (req, res) => {

  // Connect To DB to get Comments
  db.query(`SELECT * FROM comments WHERE prod_id=?`, [req.query.prod_id], (err, results) => {
    if(err) {
      res.status(401).send("334 Error")
    } else {
      if(results){
        console.log(results)
        res.send(results)
      }
    }
  })
})


module.exports = router;