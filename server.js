require('dotenv').config();  // Load environment variables
require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

// Check if environment variables are loaded
console.log('DB Host:', process.env.DB_HOST);  // Should log 'localhost'

// Your existing setup code
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/api-docs', require('_helpers/swagger'));
app.use(errorHandler);
app.use('/forgot-password', require('./accounts/forgot-password.controller'));
app.use('/reset-password', require('./accounts/reset-password.controller'));

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));