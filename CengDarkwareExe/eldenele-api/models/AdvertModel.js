const mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
   /* userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },*/
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categoryName: {
        type: String,
        ref: "Category",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    }],
    dateCreated: {
        type: String,
        default: () => new Date().toLocaleDateString()
    }
});
const Advert = mongoose.model("Advert", AdvertSchema);

module.exports = Advert;