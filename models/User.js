const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

const userSchema = new Schema({
    // String is shorthand for {type: String}
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        trim: true,
        lowercase: true,
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
        }
    },
    firstName: String,
    lastName: String,
}, {
    // add the createAt and modifiedAt columns
    timestamps: true
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

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        email: login,
    });
    if (!user) {
        user = await this.findOne({ email: login });
    }
    return user;
};
userSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await User.findOne({ [`${field}`]: value });
    return checkField;
};

// To use our schema definition, we need to convert our userSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model('User', userSchema);

module.exports = User;