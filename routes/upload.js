const multer = require('multer');
const app = require('express');
const router = app.Router();
const path = require('path');
const db = require('../database');
const jimp = require('jimp');
const fs = require('fs');


// Set storage engine 
const storage = multer.diskStorage({
  destination: "./dist/el-torky/assets/temp",
  filename: (req, file, cb) => {
    filePath = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    cb(null, filePath)
  }
})

// Init Upload
const upload = multer({ storage });



// initialize routes
router.post('/', upload.single('myImage'), (req, res) => {
  // pd stands for `product data`
  let pd = req.body;
  let name = pd.name.replace(" ", "_")
  jimp.read(`./dist/el-torky/assets/temp/${filePath}`).then(image => {

      if (image.getHeight() < 1000) {
        fs.unlink(`./dist/el-torky/assets/temp/${filePath}`, (err) => { if (err) { res.status(401).json({message: err.message}) } }) // delete the imagein temp folder if it has height less than 1000 px
        res.status(401).json({ message: "لابد ان يكون ارتفاع الصورة لايقل عن 1000 بكسل" }); // return response
      }

      else {
        return image
          .resize(jimp.AUTO, 1200)
          .quality(75)

          // write the large size
          .write(`./dist/el-torky/assets/uploads/_1200-${filePath}`, (err) => {
            if (err) {
              res.status(401).json({ message: "Permission Error" })
            }
          })
          .resize(jimp.AUTO, 576)

          // write the middle size
          .write(`./dist/el-torky/assets/uploads/_576-${filePath}`, (err) => {
            if (err) {
              res.status(401).json({ message: "Permission Error" })
            }
          })
          .resize(jimp.AUTO, 256)

          // write the small size
          .write(`./dist/el-torky/assets/uploads/_256-${filePath}`, (err) => {
            if (err) { res.status(401).json({ message: "Permission Error" }) }
            else {

              fs.unlink(`./dist/el-torky/assets/temp/${filePath}`, (err) => {if(err) throw err})
              // an attempt to enter this data into database
              db.query(`insert into prods
              (name,price,material,category,description,lg_image,md_image,sm_image) 
              values(?,?,?,?,?,?,?,?)`, [
                  name, pd.price, pd.material, pd.category, pd.description, `_1500-${filePath}`, `_576-${filePath}`, `_256-${filePath}` // filePath is A global Variable coming from multer object
                ], (err) => {

                  // Log the errors if there are some
                  if (err) {
                    fs.unlink(`./dist/el-torky/assets/uploads/_1200-${filePath}`, (err) => {if(err) {throw err}})
                    fs.unlink(`./dist/el-torky/assets/uploads/_576-${filePath}`, (err) => {if(err) {throw err}})
                    fs.unlink(`./dist/el-torky/assets/uploads/_256-${filePath}`, (err) => {if(err) {throw err}})
                    res.status(401).json({ message: "اسم المنتج الذي أدخلته موجود بالفعل فى قاعدة بياناتنا , يرجى تغييره الى اسم آخر" }) // throw err
                  } else {
                    res.json({ code: 200 }) // A dummy object for testing
                  }
                })
            }
          })
      }
    })
    .catch(error => {
      res.status(401).json({ message: "there anonymous Error" });
    })


})
module.exports = router