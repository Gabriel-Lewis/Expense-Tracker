const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const {db} = require('./db/db');
const port = process.env.PORT || 3000

const user = require('./db/models/user');
// const Expense = require('./db/models/expense');
// const Report = require('./db/models/report');
require('../config/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const staticPath = (path.join(__dirname, '../static'));

app.use(express.static(__dirname + '/static'))
app.use('/css',express.static(path.join(staticPath, '/stylesheets')));
app.use('/js',express.static(path.join(staticPath, '/js')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.get('/', function(req, res) {
//   res.sendFile(path.join(staticPath + '/index.html'));
// });

app.get('/', function (request, response){
    response.sendFile(path.resolve(staticPath, 'index.html'))
})

app.use(require('./routes'));

app.listen(port)

module.exports = {
  app
}
