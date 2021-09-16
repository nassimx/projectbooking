const expressJwt = require('express-jwt');
const Hotel = require('../models/hotelModel');

// req.user
exports.requireSignin = expressJwt({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

exports.hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send('Unauthorized');
  }
  next();
};
