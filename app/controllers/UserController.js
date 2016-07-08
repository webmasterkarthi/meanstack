
var  User=require('../models/userModel').User;

var saveUser=function(req, res) {
	
	var newuser = new User({
	  fname: req.body.fname,
	  lname: req.body.lname,
	  email: req.body.email,
	  password:req.body.pass 
	});
	newuser.save(function(err) {
		if (err) throw err;
		
	res.json({"message":"success"});		
	});
}
var getUser=function(req, res) {
	var uid=req.uid;
	User.findById(uid, function (err, doc){
		res.json(doc);
	});
}
var deleteUser=function(req, res) {
	var uid=req.uid;
	User.findById(uid, function (err, doc){
		res.json(doc);
	});
}
var listUsers=function(req, res) {
	
		User.find({},function(err,doc){
			res.json(doc);
		});
	
}
module.exports={saveUser,getUser,deleteUser,listUsers};
