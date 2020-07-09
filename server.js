require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require("./passport/local");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const PORT = process.env.PORT || 3001;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('Connect to database succesfully')
    }
});

app.use(cors())

app.use(logger(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('express-session')({ secret: process.env.SESSION_SECRET || 'this-is-secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, function () {
    console.log(`🌎 ==> API server now listening on port ${PORT}!`);
});

