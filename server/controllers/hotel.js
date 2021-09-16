const Hotel = require('../models/hotelModel');
const fs = require('fs');

exports.create = async (req, res) => {
  //   console.log('req.fields', req.fields);
  //   console.log('req.files', req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;
    // handle image
    if (files.image) {
      // @ts-ignore
      hotel.image.data = fs.readFileSync(files.image.path);
      // @ts-ignore
      hotel.image.contentType = files.image.type;
    }
    hotel.save((err, result) => {
      if (err) {
        console.log('saving hotel err => ', err);
        res.status(400).send('Error saving');
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.hotels = async (req, res) => {
  let all = await Hotel.find({})
    .select('-image.data')
    .populate('postedBy', '_id firstname')
    .exec();
  // console.log(all);
  res.json(all);
};
exports.image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set('Content-Type', hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};
exports.sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.user._id })
    .select('-image.data')
    .populate('postedBy', '_id firstname')
    .exec();
  console.log(all);
  res.send(all);
};

exports.remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select('-image.data')
    .exec();
  res.json(removed);
};

exports.read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate('postedBy', '_id firstname')
    .select('-image.data')
    .exec();
  // console.log('SINGLE HOTEL', hotel);
  res.json(hotel);
};
