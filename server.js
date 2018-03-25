'use strict'

//Import dependecy and create instance
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _DataSchema = require('./src/model/dataSchema');

var app = express();
var router = express.Router();

//setting up port
var port = process.env.API_PORT || 3001;

//DB config and MLAB setup
//example url is like 
var mongoDB = 'xxx';
mongoose.connect(mongoDB,{
    useMongoClient:true
});
var db = mongoose.connection;
db.on('ERROR',console.error.bind(console,'MongoDB Connection Failed!'));

//bodyParser config and look for JSON data in the body
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//To prevent CORS Error
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//now  we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({
      message: 'API Initialized!'
    });
  });

//adding the /comments route and getting data from DB
router.route('/users')
  .get(function (req, res) {
    //looks at our Comment Schema
    _DataSchema.find(function (err, comments) {
      if (err)
        res.send(err);
      res.json(comments)
    });
  })
  .post(function(req,res){
    let localDataSchema = new _DataSchema();
    (req.body.empid) ? localDataSchema.empid = req.body.empid : null;
    (req.body.empname) ? localDataSchema.empname = req.body.empname : null;
    
    localDataSchema.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'User successfully added!' });
    });
  })
  
//Updating and deleting Data
router.route('/users/:user_id')
  .put(function(req, res) {
    let localDataSchema1 = new _DataSchema();
    console.log(req.params);
    console.log(req.body);
    let updateDatas = req.body;
    _DataSchema.findOneAndUpdate({ _id: req.params.user_id },updateDatas, {new: true }, function(err, comment) {
      if (err)
        res.send(err);
        return res.status(200).send(comment)
    });
  })
  .delete(function(req, res) {
    _DataSchema.remove({ _id: req.params.user_id }, function(err, comment) {
      if (err)
        res.send(err);
      res.json({ message: 'User deleted' })
    })
  });
//Use our router configuration when we call /api
app.use('/api', router);


//starts the server and listens for requests
app.listen(port, function () {
    console.log(`api running on port ${port}`);
})