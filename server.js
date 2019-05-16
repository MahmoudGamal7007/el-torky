
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const app = express()
require('dotenv').config()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
// app.use(express.static(__dirname + "/dist/"))


// parse application/json
app.use(bodyParser.json())


// register Routes
app.use('/register',require('./routes/register'))

// login Routes
.use('/login', require('./routes/login'))

// logout route
.use('/logout', require('./routes/logout'))

// upload routes
.use('/product/upload',require('./routes/upload'))

// products route
.use('/getProducts', require('./routes/products'))

// verify email route
.use('/verifyEmail', require('./routes/verifyEmail'))

// check the product data from url
.use('/product/:name/:id', require('./routes/compare-prod-data'))

// Add new comment
.use('/addComment', require('./routes/add-comment'))

// get comments to products view page
.use('/getComments', require('./routes/get-comments'))



app.get('/test', verifyToken, (req, res)=>{
  console.log('h')
})

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

app.get('', function (req, res) {
  let payload = {code: "200"};
  let secretKet = "I6IkpXVCJ9.eyJjb2RlIjoiMjAwIiwiaWF0I"
  token = jwt.sign(payload, secretKet, function(err, token){
    if (err) {throw err}
    res.send(token)
  })
})

app.listen(PORT, () => {
  console.log(`We listen to port: ${PORT}`)
})
