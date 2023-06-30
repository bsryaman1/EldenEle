const mongoose = require("mongoose");
const Advert = require("../AdvertModel");
const Schema = mongoose.Schema;
const FashionSchema = new mongoose.Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  marka: { type: String, required: true },
  turu: { type: String, required: true },
  renk: { type: String, required: true },
  tarz: { type: String, required: true },
  malzeme: { type: String, required: true },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  }]
});

const Fashion = Advert.discriminator("Fashion", FashionSchema);

module.exports = Fashion;