const mongoose = require("mongoose");
const Advert = require("../AdvertModel");
const Schema = mongoose.Schema;
const HomeAndGardenSchema = new mongoose.Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  malzeme: { type: String, required: true },
  turu: { type: String, required: true },
  marka: { type: String, required: true },
  renk: { type: String, required: true },
  durumu: { type: String, required: true },
  garanti: { type: String, required: true },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  }]
});

const HomeAndGarden = Advert.discriminator("HomeAndGarden",HomeAndGardenSchema);
module.exports = HomeAndGarden;