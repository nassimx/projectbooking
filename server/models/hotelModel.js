const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types; //
// const { ObjectId } = mongoose.Schema; //

//
const hotelSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
    },
    content: {
      type: String,
      required: 'Content is required',
      maxlength: 1000,
    },
    location: {
      type: String,
    },

    price: {
      type: Number,
      required: 'Price is required',
      trim: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    bed: {
      type: Number,
      required: 'Title is required',
    },
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
