const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');

require('./core/db');

let app = express();
app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

const server = http.createServer().listen(2701);
require('./core/socket').setup(server);

// Set up routes
require('./core/router')(app);
require ('./commands')(app);

app.listen(2700);

console.log('listening on port 2700...');
