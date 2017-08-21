// This is the user model that I will be using for all auth
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `This is not a valid email`
    }
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// Instance method (small u user)
UserSchema.methods.generateAuthToken = function() {
  let user = this;

  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(),
                        access}, 'secretval').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

// Method on big U User
// Returns only properties given (to avoid including password, token, and other sensitive info)
UserSchema.methods.toJSON = function() {
  let user = this;

  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};
