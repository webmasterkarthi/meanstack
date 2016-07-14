
var  User=require('../models/userModel').User;
var multiparty = require('multiparty');
var fs=require('fs');

var saveUser=function(req, res) {

	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		var newuser = new User({
			fname: fields['fname'][0],
			lname: fields['lname'][0],
			email:fields['email'][0],
			password:fields['pass'][0],
			img:{data:fs.readFileSync(files['file'][0]['path']),contentType:'image/png'}
		});
		newuser.save(function(err) {
			if (err) throw err;

			res.json({"message":"success"});
		});
				//console.log(files);

			//console.log(fields['fname']);
			//console.log(files['file'][0]['path']);
	});

	/*var newuser = new User({
	  fname: req.body.fname,
	  lname: req.body.lname,
	  email: req.body.email,
	  password:req.body.pass 
	});
	console.log(req.form);
	//console.log(req.body.file);
	res.end();
	/*newuser.save(function(err) {
		if (err) throw err;
		
	res.json({"message":"success"});		
	});*/
}
var updateUser=function(req,res){
	User.findOneAndUpdate({_id:req.body._id}, req.body, function (err, place) {
		res.send({"message":"success"});
	});;
}
var getUser=function(req, res) {
	var uid=req.body.uid;
	User.findById(uid, function (err, doc){
		var thumb = new Buffer(doc.img.data).toString('base64');
		doc.img=thumb;
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
