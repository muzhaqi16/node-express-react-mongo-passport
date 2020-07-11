require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models').User;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('password', salt);
let userSeed = [
	{
		email: 'test@user.com',
		password: hash,
		firstName: 'John',
		lastName: 'Doe'
	},
];

User.deleteMany({})
	.then(() => User.collection.insertMany(userSeed))
	.then(data => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
