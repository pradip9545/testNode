const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    profile:{type:String, required:true},
 },{
    collection: 'users'
  })
 module.exports = mongoose.model('users',userSchema)