
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
var updateUser=function(req,res){
	User.findOneAndUpdate({_id:req.body._id}, req.body, function (err, place) {
		res.send({"message":"success"});
	});;
}
var getUser=function(req, res) {
	var uid=req.body.uid;
	User.findById(uid, function (err, doc){
		res.json(doc);
	});
}
var deleteUser=function(req, res) {
	var uid=req.body.uid;
	User.find({ _id:uid }).remove().exec();
	res.json({"message":"success"});
}
var listUsers=function(req, res) {
	
		User.find({},function(err,doc){
			res.json({"users":doc});
		});
	
}
module.exports={saveUser:saveUser,updateUser:updateUser,getUser:getUser,deleteUser:deleteUser,listUsers:listUsers};
