var express = require('express');
var path = require('path');

var app = express();

app.use('/css',express.static(path.join(__dirname, 'src/static/css')));
