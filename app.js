// Initializing Express Application
const express = require('express');
const app = new express();

// Importing Security Middlewares
const bodyParser = require('body-parser');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitizer = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// Implimenting BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Implimenting Security Middlewares
app.use(hpp());
app.use(cors());
app.use(helmet());
app.use(mongoSanitizer());

// Limiting Access --> 1000 Requests per 2 minutes
const limiter = rateLimit({ windowMs: 2 * 60 * 1000, max: 1000 });
app.use(limiter);

// Database Connection
const mongoose = require('mongoose');
const URI = 'mongodb+srv://<username>:<password>@clusterstudentregistry.n1prebl.mongodb.net/StudentsRegistry';
const OPTIONS = { user: 'itzthorxd', pass: 'Thor7291', autoIndex: true };

mongoose
   .connect(URI, OPTIONS)
   .then(res => console.log('Mongoose Connect Success'))
   .catch(err => console.log('Mongoose Connect Failure'));

// App Routing Endpoints
const router = require('./src/routes/api');
app.use('/api', router);

app.use('*', (req, res) => {
   res.status(400).json({ status: 'Failed', data: 'Data Not Found' });
});

module.exports = app;
