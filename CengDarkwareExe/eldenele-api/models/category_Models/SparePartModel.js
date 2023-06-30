const mongoose = require("mongoose");
const Advert = require("../AdvertModel");
const Schema = mongoose.Schema;
const SparePartSchema = new mongoose.Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    marka: { type: String, required: true },
    model: { type: String, required: true },
    parcaAdi: { type: String, required: true },
    parcaNumarasi: { type: String, required: true },
    durumu: { type: String, required: true },
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    }]
  });
  
  const SparePart = Advert.discriminator("SparePart", SparePartSchema);
  
  module.exports = SparePart;