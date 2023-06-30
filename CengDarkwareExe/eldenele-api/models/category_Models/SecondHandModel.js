const mongoose = require("mongoose");
const Advert = require("../AdvertModel");
const Schema = mongoose.Schema;
const SecondHandSchema = new mongoose.Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  durumu: { type: String, required: true },
  takas: { type: String, required: true },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  }]
});

const SecondHand = Advert.discriminator("SecondHand", SecondHandSchema);

module.exports = SecondHand;
