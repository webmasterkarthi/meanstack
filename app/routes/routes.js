var express        = require('express'); 
var router = express.Router();
var path= require("path");


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/../../public/index1.html'));
	
});

router.post('/saveuser', require('../controllers/UserController').saveUser);

router.post('/updateUser', require('../controllers/UserController').updateUser);

router.post('/getUser', require('../controllers/UserController').getUser);

router.get('/listUsers', require('../controllers/UserController').listUsers);

router.post('/deleteUser', require('../controllers/UserController').deleteUser);

module.exports=router;