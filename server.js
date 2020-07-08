// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
// https://github.com/motdotla/dotenv
require("dotenv").config();

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
// https://github.com/expressjs/cors
const cors = require('cors');

const flash = require('connect-flash');

// Fast, unopinionated, minimalist web framework for node. 
// https://github.com/expressjs/express
const express = require('express');

// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
// https://github.com/Automattic/mongoose || https://mongoosejs.com/
const mongoose = require("mongoose");

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
// https://github.com/expressjs/cookie-parser
const cookieParser = require('cookie-parser');

// HTTP request logger middleware for node.js
// https://github.com/expressjs/morgan
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// If there is a port number avaible on the enviroment variable it will be used other we use 3001
const PORT = process.env.PORT || 3001;

// If MONGO_URI environmnet variable is avaiable the URI will be set to that one otherwise it will use localhost
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

// We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    // Callback function to check if there was an error conenction to the database
    if (err) {
        console.log(err)
    }
    else {
        console.log('Connect to database succesfully')
    }
});

app.use(cors())

// If we are in developemnt mode use dev mode output for morgan, which shows helpful information for developers otherwise show minimal output
// Learn more here for other predefined formats https://github.com/expressjs/morgan#predefined-formats
app.use(logger(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// https://expressjs.com/en/5x/api.html#express.json
app.use(express.json());

// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
// https://expressjs.com/en/5x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Passport setup
const passport = require("./passport/local");
app.use(require('express-session')({ secret: process.env.SESSION_SECRET || 'this-is-secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, function () {
    console.log(`🌎 ==> API server now listening on port ${PORT}!`);
});

