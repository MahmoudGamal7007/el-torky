const router = require('express').Router();
const db = require('../database');
const jwt = require('jsonwebtoken');
const path = require('path')


router.get('/', (req, res) => {

  // get the token query in the url 
  let token = req.query.token

  // get the payload query in the url
  let payload = { subject: req.query.payload };

  // get the email query in the url
  let email = req.query.email

  // verify the coming token in the url then compare the decoded 
  // payload with the coming payload in the url
  jwt.verify(token, "jimmyneutroon007@gmail.com", (err, decoded) => {
    if (err) {
      res.status(401).send("هذا الرابط غير صالحا")
    } else {

      // compare the payoad with decoded object
      if (decoded.subject == payload.subject) {

        // if the compiler get here , it means that the user has valid token and payload 
        // now , the time to check the payload.subject (i.e the id of this user in our DB) 
        db.query(`SELECT id FROM users WHERE email=?`, [email], (err, result, fields) => {

          if (err) {
            res.status(401).send("هذا الرابط غير صالح")
          } else {
            if (result[0].id == payload.subject) {

              // redirect the user to index page and update his status in the database
              // then redirect the user to another page with a congrates Message
              db.query(`UPDATE users SET status='activated' WHERE users.id=?`, [result[0].id], (err) => {
                if (err) {

                  // return an error with 401 status if the updating process has failed
                  res.status(401).send("هذا الرابط غير صالح")
                }
                
                // if every thing is ok , Now is the time to congrate the user 
                console.log(path.resolve(__dirname))
                res.sendFile(path.resolve("dist/el-torky/index.html"))
              })
            } else {

              // if the user has manipulated the url of this page 
              // i.e the result[0].id != payload.subject 
              res.status(401).send("هذا الرابط غير صالح")
            }
          }
        })
      } else {
        res.status(401).send("هذا الرابط غير صالح")
      }
    }
  })

})

module.exports = router