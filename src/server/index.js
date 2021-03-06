const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db');

const app = express();
module.exports = app;

// use morgan logging middleware
app.use(morgan('dev'));

// use body-parser middleware
app.use(bodyParser.json()); // parse JSON requests
app.use(bodyParser.urlencoded({
  extended: true
})); // parse URL requests

// api routes
app.use('/api', require('./api'));

// static routing for /client/ path
app.use(express.static(path.join(__dirname, '..', 'client')));


app.use(express.static(__dirname + './../../')); //serves the index.html

db.sync()
  .then(() => {
    console.log('db synced')
    app.listen(3000, () => console.log(`I hear something rustling on port 3000`));
  })
  .catch(err => console.log(err));
