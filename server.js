require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('./passport/local');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const PORT = process.env.PORT || 3001;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

mongoose.connect(
	MONGO_URI,
	{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Connect to database succesfully');
		}
	}
);

app.use(cors());

app.use(logger(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	require('express-session')({
		secret: process.env.SESSION_SECRET || 'this-is-secret',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));
	app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, './client/build', 'index.html'));
	});
}else{
	app.use('/', indexRouter);
}

app.use('/users', usersRouter);

app.listen(PORT, function () {
	console.log(`🌎 ==> API server now listening on port ${PORT}!`);
});
