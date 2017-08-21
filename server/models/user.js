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

// Instance methods (small u user)
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

// Returns only properties given (to avoid including password, token, and other sensitive info)
UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Model Methods on big U User
UserSchema.statics.findByToken = function(token) {
  let User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'secretval');
  } catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

let User = mongoose.model('User', UserSchema);

module.exports = {User};
