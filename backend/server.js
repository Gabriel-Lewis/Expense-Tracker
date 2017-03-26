const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('../config/index');
const app = express();
const { db } = require('./db/db');
const port = process.env.PORT || 3000;

const user = require('./db/models/user');
const Expense = require('./db/models/expense');
const Report = require('./db/models/report');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(require('./routes'));
app.use(express.static(path.resolve(__dirname , '../static')));
app.get('/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});


app.listen(port);

module.exports = { app };
