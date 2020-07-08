require("dotenv").config();
let mongoose = require("mongoose");
let db = require("../models");

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

let userSeed = [
  {
    email: 'test@user.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe'
  },
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
