const express = require('express');
const router = express.Router();
const userSchema = require('../models/users.model')
const multer = require('multer')
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });

  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

router.post('/create', upload.single('profile'), (req, res, next) => {
  const url = 'http://localhost:8081/';//req.protocol + '://' + req.get('host')
  const user = new userSchema({
    // _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    profile: url + req.file.filename
  });
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "success",
      data:'User Created'
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})
router.get("/getUsers", (req, res, next) => {
    userSchema.find().then(data => {
      res.status(200).json({
        message: "success",
        users: data
      });
    });
  })

router.delete('/deleteUser/:Id', async (req, res)=>{
    console.log(req.params.Id);
    try {
    var users = await userSchema.remove({_id :req.params.Id});
    res.json(users);
    } catch(err) {
       res.send(err)
    }
 })
 router.post('/update',upload.single('profile'), async (req, res)=>{
     
    console.log(req.body.id);
    try {
        const url = 'http://localhost:8081/';//req.protocol + '://' + req.get('host')
        var posts = await userSchema.updateOne({_id:req.body.id},{$set:
            {firstName:req.body.firstName, 
            lastName:req.body.lastName,
            email:req.body.email,
            phone:req.body.phone,
            profile: url + req.file.filename,
        }
            
        });
        res.json(posts);
        } catch(err) {
           res.send(err)
        }
 })
module.exports = router;