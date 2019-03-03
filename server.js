'use strict';

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();

const RouteController = require('./src/routes');
const port = process.env.REST_PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', new RouteController().getRouter());

app.listen(port, function() {
  console.log('Server has been started on /api @ port ' + port + '.');
});
