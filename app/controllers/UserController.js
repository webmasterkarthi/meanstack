
var  User=require('../models/userModel').User;
var multiparty = require('multiparty');
var fs=require('fs');
var qs = require('querystring');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanstudy');
var conn = mongoose.connection;


var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var gfs = Grid(conn.db);

/*Write File to grid */
/*
var writestream = gfs.createWriteStream({
	filename: 'mongo_file.txt'
});
fs.createReadStream('/home/etech/sourcefile.txt').pipe(writestream);

writestream.on('close', function (file) {
	// do something with `file`
	console.log(file.filename + 'Written To DB');
}); */


var saveUser=function(req, res) {

	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {



		var writestream = gfs.createWriteStream({
			filename: files['docs'][0]['originalFilename']
		});
		fs.createReadStream(files['docs'][0]['path']).pipe(writestream);

		writestream.on('close', function (file) {
			var newuser = new User({
				fname: fields['user[fname]'][0],
				lname: fields['user[lname]'][0],
				email: fields['user[email]'][0],
				password:fields['user[pass]'][0],
				img:{data:fs.readFileSync(files['file'][0]['path']),contentType:'image/png'},
				docs:{docid:file._id,docname:files['docs'][0]['originalFilename']}
			});
			newuser.save(function(err) {
				if (err) throw err;
				res.json({"message":"success"});
			});
		});


				//console.log(files);

			//console.log(fields['fname']);
			//console.log(files['file'][0]['path']);
			//console.log(files['docs'][0]['path']);


		//console.log(fields['user[fname]'][0]);
		//console.log(files['docs']['originalFilename']);
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
	
		User.find({},'-img',function(err,doc){
			res.json({"users":doc});
		});
	
}
module.exports={saveUser:saveUser,updateUser:updateUser,getUser:getUser,deleteUser:deleteUser,listUsers:listUsers};
