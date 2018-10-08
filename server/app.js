const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

require('./core/db');

let app = express();
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

// Set up routes
require('./core/router')(app);

app.listen(2700);
console.log('listening on port 2700...');
