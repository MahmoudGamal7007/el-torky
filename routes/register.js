

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../database');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')



router.post('/', (req, res) => {

  // check the email to make sure it's not exist in the database 
  db.query(`SELECT email from users where email=?`, req.body.email, (err, result) => {
    if (err) {
      res.status(401).send("something went wrong wehn selecting the email colmn in our database ")
    }
    if (result.length >= 1) { // Means that there is an exist email
      res.status(401).send("Sorry, the email you have entered is already registered before now")
    } else {
      if (req.body.passwordConfirmation != req.body.password) { // Means that the password doesn't == passwordConfirmation
        res.status(403).send('the password doesn\'t equal password confirmation')
      } else {

        // Generate the salt of the password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err
          } else {

            // hash the password with the generated salt
            bcrypt.hash('password', salt, (err, hash) => {
              if (err) {
                throw err
              } else {

                // Now .. the time to insert the data in our database 
                db.query(`INSERT INTO users(firstname, lastname, email, password, role, status) VALUES (?,?,?,?,?,?)`, [req.body.firstName, req.body.lastName, req.body.email, hash, "user", 'deactivated'], (err) => {
                  if (err) {
                    throw err
                  } else {
                    db.query(`SELECT LAST_INSERT_ID() AS auth_id`, (err, result) => {
                      let payload = { subject: result[0].auth_id }
                      let token = jwt.sign(payload, "jimmyneutroon007@gmail.com")
                      user = {
                        "id": result[0].auth_id,
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "email": req.body.email
                      }


                      // async..await is not allowed in global scope, must use a wrapper
                      function main() {

                        // Generate test SMTP service account from ethereal.email
                        // Only needed if you don't have a real mail account for testing

                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                          host: "smtp.mailtrap.io",
                          port: 2525,
                          auth: {
                            user: "858abd682e9474",
                            pass: "4484b5849b040c"
                          }
                        });// true for 465, false for other ports

                        // send mail with defined transport object
                        let info = transporter.sendMail({
                          from: '"Test Server" <test@example.com>', // sender address
                          to: `${user.email}`, // list of receivers
                          subject: "verify your email", // Subject line
                          text: "verify an email", // plain text body
                          // html: "<b>Hello world?</b>" // html body
                          html: `<span>click the next verify link, </span><a href="http://localhost:3000/verifyEmail?token=${token}&payload=${user.id}&email=${user.email}">click</a>`,
                        });

                        console.log("Message sent: %s", info.messageId);
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                      }

                      console.log(result[0].auth_id)
                      res.status(200).send({ user, token });
                    })
                  }
                })
              }
            })
          }
        })
      }
    }
  })
})

module.exports = router;