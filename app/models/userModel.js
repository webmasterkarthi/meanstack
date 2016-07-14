// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
<<<<<<< HEAD
  created_at: Date,
  img:{ data: Buffer, contentType: String }
=======
  created_at: Date
>>>>>>> 192d0e20fcf627d522346717de50ea9f44077216
});

// the schema is useless so far
// we need to create a model using it
var User= mongoose.model('User', userSchema);

module.exports={
  User: User
}
