const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    timestamps: true
});

userSchema.virtual('fullName').get(function () {
    let fullName = '';
    if (this.firstName && this.lastName) {
        fullName = this.firstName + ', ' + this.lastName
    }
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
const User = mongoose.model('User', userSchema);

module.exports = User;