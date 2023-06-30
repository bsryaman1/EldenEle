const mongoose = require("mongoose");
const Advert = require("../AdvertModel");
const Schema = mongoose.Schema;
const ElectronicSchema = new mongoose.Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    marka: { type: String, required: true },
    model: { type: String, required: true },
    turu: { type: String, required: true },
    renk: { type: String, required: true },
    garanti: { type: String, required: true },
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    }]
  });
  
  const Electronic = Advert.discriminator("Electronic", ElectronicSchema);
  
  module.exports = Electronic;