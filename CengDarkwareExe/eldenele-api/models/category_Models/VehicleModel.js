const mongoose = require("mongoose");
const Advert = require("../AdvertModel");
const Schema = mongoose.Schema;
const VehicleSchema = new mongoose.Schema({
  category: { 
    type: Schema.Types.ObjectId, 
    ref: "Category" },
  marka: { 
    type: String, 
    required: true },
  seri: { 
    type: String, 
    required: true },
  model: { 
    type: String, 
    required: true },
  yil: { 
    type: String, 
    default: () => Date, required: true },
  vites: { 
    type: String, 
    required: true },
  agirhasarkayit: { 
    type: String, 
    required: true },
  kasatipi: { 
    type: String, 
    required: true },
  motorgucu: { 
    type: Number, 
    required: true },
  motorhacmi: { 
    type: Number, 
    required: true },
  renk: { 
    type: String, 
    required: true },
  durumu: { 
    type: String, 
    required: true },
  garanti: { 
    type: String, 
    required: true },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  }]
});

const Vehicle = Advert.discriminator("Vehicle", VehicleSchema);

module.exports = Vehicle;
