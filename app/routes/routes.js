var express        = require('express'); 
var router = express.Router();
var path= require("path");


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/../../public/index1.html'));
	
});

router.post('/saveuser', require('../controllers/UserController').saveUser);

router.get('/getUser', require('../controllers/UserController').getUser);

router.get('/listUsers', require('../controllers/UserController').listUsers);

router.get('/deleteUser', require('../controllers/UserController').deleteUser);

module.exports=router;