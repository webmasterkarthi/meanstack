// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  created_at: Date,
  img:{ data: Buffer, contentType: String }
});

// the schema is useless so far
// we need to create a model using it
var User= mongoose.model('User', userSchema);

module.exports={
  User: User
}
