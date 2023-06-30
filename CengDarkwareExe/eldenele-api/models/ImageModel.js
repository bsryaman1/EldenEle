const mongoose = require('mongoose');
const Advert = require('./AdvertModel');
const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
});
  const Image = mongoose.model("Image", ImageSchema);
  module.exports = Image;