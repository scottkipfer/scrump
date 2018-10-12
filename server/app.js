const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const socketio = require('socket.io');

require('./core/db');

let app = express();
app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

// Set up routes
require('./core/router')(app);

const server = app.listen(2700);
global.io = require('./core/socket')(server);

require ('./commands');

console.log('listening on port 2700...');





