const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email address'
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

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() { // regular function to bind this
  let user = this;
  let access = 'auth';
  let token = jwt.sign(
    {_id: user._id.toHexString(),
      access
    }, process.env.JWT_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token) {
  //$pull -- removes items from array that match criteria
  let user = this;

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
  // pulls all tokens off if tokens.token matches token passed into fn
};

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({
    email
  }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let hashedPassword = user.password;

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  }).catch((err) => {
    return reject();
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token, /// quotes required when . is in value
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function(next) {
  let user = this;

  // Check if PW has been modified
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    });
  } else {
    next();
  }

  // next(); // next must be provided and called or else the fn will never complete
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};
