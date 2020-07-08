const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

const userSchema = new Schema({
    // String is shorthand for {type: String}
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        minlength: 5,
        maxlength: 30
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        validate: {
            validator: (pass) => { return pass.length > 5 },
            message: "Password should be at least 6 characters long"
        },
        minlength: 6,
        maxlength: 12
    },
    firstName: String,
    lastName: String,
});

// userSchema.methods.findUserByEmail = function (cb, email) {
//     return mongoose.model('User').find({ email: email }, cb);
// };

// Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. 
userSchema.virtual('fullName').get(function () {
    let fullName = '';
    // check if the first name and the last name exist 
    if (this.firstName && this.lastName) {
        fullName = this.firstName + ', ' + this.lastName
    }
    // if first name or last name is empty we override fullname with ''
    if (!this.firstName || !this.lastName) {
        fullName = '';
    }
    return fullName;
});

// To use our schema definition, we need to convert our userSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model('User', userSchema);

module.exports = User;