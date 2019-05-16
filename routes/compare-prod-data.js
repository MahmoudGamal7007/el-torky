
const router = require('express').Router()
const db = require('../database')
router.get('/', (req, res) => {

  // get the url as an array
  let url = req.originalUrl.split('/').filter(item => {
    return item.length > 1
  })

  // get the name of the product coming in the url
  let name = url[1]

  // get the id in the coming url
  let id = url[2]


  db.query(`SELECT name from prods WHERE id=?`, [id], (err, result, fields) => {
    if (err) {
      res.send(false);
    } else {
      if (result[0] == undefined) {
        console.log("We sent false")
        res.send(false);
      } 
      else if(result[0].name == name){
        res.send(true)
      } else {
        res.send(false)
      }
    }
  })
})

module.exports = router