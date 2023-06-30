const mongoose = require('mongoose');
const Advert = require("../AdvertModel");
const Schema = mongoose.Schema;
const ResidenceSchema = new mongoose.Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    odaSayisi: { type: String, required: true },
    binaYasi: { type: String, required: true },
    katSayisi: { type: String, required: true },
    isitma: { type: String, required: true },
    banyoSayisi: { type: Number, required: true },
    balkon: { type: String, required: true },
    esyali: { type: String, required: true },
    siteIcerisinde: { type: String, required: true },
    aidatBilgileri: { type: String, required: true },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      }]
    });
    const Residence = Advert.discriminator("Residence", ResidenceSchema);
    module.exports = Residence;