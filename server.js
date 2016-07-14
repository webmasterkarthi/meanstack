/*Required Packages */

var express        = require('express');
var path = require('path');
var bodyParser= require('body-parser'); 
var mongoose = require('mongoose');

var app            = express();

/*Connect to db*/

mongoose.connect('mongodb://localhost:27017/meanstudy');

/*Get Static Content from Public folder */

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

/*Handle Request (Routes)*/

app.use('/',require('./app/routes/routes'));


/*Handle invalid routes */
//app.use()

app.listen(8080);

module.exports = app;
<<<<<<< HEAD
=======

>>>>>>> 192d0e20fcf627d522346717de50ea9f44077216
