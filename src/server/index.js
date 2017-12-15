const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// use morgan logging middleware
app.use(morgan('dev'));

// use body-parser middleware
app.use(bodyParser.json()); // parse JSON requests
app.use(bodyParser.urlencoded({
  extended: true
})); // parse URL requests

// static routing for /client/ path
app.use(express.static(path.join(__dirname, '..', 'client')));


app.use(express.static(__dirname + './../../')); //serves the index.html
app.listen(3000, () => console.log(`I hear something rustling on port 3000`));

// Error handling
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal sever error.')
);
