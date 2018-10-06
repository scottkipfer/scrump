const logger = require('morgan');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

require('./core/db');

let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(2700);
console.log('listening on port 2700...');
