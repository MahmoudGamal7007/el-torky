const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../database');
const jwt = require('jsonwebtoken');



router.post("/", (req, res) => {
  let userData = req.body

  // Check that the emial is exist in db
  db.query(`SELECT email FROM users WHERE email=?`, [userData.email], (err, result) => {
    if (err) {
      res.status(401).send("something going wrong right now")
    } else {

      // if there is an exist email , the compiler will proceed to verify the password !
      if (result[0]) {
        db.query(`SELECT * FROM users WHERE email=?`, [userData.email], (err, result) => {
          let user = result[0]
          if (err) {
            res.status(404).send("Invalid Password")
          } else {
            /**
            * compare the password of the user with the hash in our database 
            * 
            * @param userData.password is the data from the view
            * 
            * @param user.password is the hash in the database 
            */
            bcrypt.compare(userData.password, user.password, (err, success) => {
              if (err) {
                res.status(401).send("Invalid or Mistaken Password");
              } else {
                /**
                * @var token is the token that will be applied on the id that is stored in db of the user               
                */
                let token = jwt.sign({subject: user.id}, "jimmyneutroon007@gmail.com")
                res.status(200).send({ token,user })
              }
            })
          }
        })
      }
    }
  })
});


/**
 * 
 * a middleware function to verify the token of the expected request 
 * @param req is a parameter , an instance for `Request` Object
 * @param res is a parameter , an instance for `Response` Object
 * @param next is a parameter , used to transform the process to the next prameter in the main function
 */
function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send("Unauthorized request")
  } else {
    let token = req.headers.authorization.split(' ')[1]
    if(token === null){
      return res.status(401).send("Unauthorized Request 2");
    } else {
      let payload = jwt.verify(token, "jimmyneutroon007@gmail.com")
      if(!payload){
        return res.status(401).send("Unauthorized Request 3");
      } else {
        req.user_id = payload.subject
        console.log(req.user_id)
        console.log(req.cookies)
        next()
      }
    }
  }
}


module.exports = router