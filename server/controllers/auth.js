const User = require('../models/userModel');
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // console.log(req.body);
    // eslint-disable-next-line no-unused-vars
    const { firstname, lastname, email, password, adresse, phone } = req.body;
    //validation
    if (!firstname) return res.status(400).send('Name is required');
    if (!password || password.length < 6)
      return res
        .status(400)
        .send('Password is required and should be min 6 characters long');
    let userExists = await User.findOne({ email }).exec();
    if (userExists) return res.status(400).send('Email is taken');
    //register
    const user = new User(req.body);
    await user.save();
    // console.log('USER CREATED', user);
    return res.json({ ok: true });
  } catch (err) {
    // console.log('CREATE USER FAILED', err);
    return res.status(400).send('Error. Try again.');
  }
};
//
exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if user with that email exist
    let user = await User.findOne({ email }).exec();
    // console.log("USER EXIST", user);
    if (!user) return res.status(400).send('User with that email not found');
    // compare password
    user.comparePassword(password, (err, match) => {
      // console.log('COMPARE PASSWORD IN LOGIN ERR', err);
      if (!match || err) return res.status(400).send('Wrong password');
      // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT

      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.json({
        token,
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          adresse: user.adresse,
          phone: user.phone,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSessions: user.stripeSessions,
        },
      });
    });
  } catch (err) {
    // console.log('LOGIN ERROR', err);
    res.status(400).send('Signin failed');
  }
};

exports.getallUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};
exports.getuserbyId = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send('user deleted');
};
exports.editUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { ...req.body });
  res.send('user updated');
};
