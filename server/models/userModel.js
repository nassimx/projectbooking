const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, 'FirstName is required'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'LastName is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 32,
    },
    adresse: {
      type: String,
      trim: true,
      required: [true, 'Adresse is required'],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, 'Phone number is required'],
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSessions: {},
  },
  { timestamps: true }
);

/// pre midleware for password hashing (creation & update)
userSchema.pre('save', function (next) {
  let user = this;
  // hash password only if user is changing the password or registering for the first time
  // make sure to use this otherwise each time user.save() is executed, password
  // will get auto updated and you can't login with original password
  if (user.isModified('password')) {
    // @ts-ignore
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        // console.log('bcrypt hash error', err);
        return next(err);
      }
      // @ts-ignore
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});
// compare password

userSchema.methods.comparePassword = function (password, next) {
  // @ts-ignore
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      // console.log('COMPARE PASSWORD ERR', err);
      return next(err, false);
    }
    // if no err, we get null
    // console.log('MATCH PASSWORD', match);
    return next(null, match); // true
  });
};

module.exports = mongoose.model('User', userSchema);
