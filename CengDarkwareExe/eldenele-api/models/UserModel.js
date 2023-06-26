const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Boş bırakılamaz"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  ad: {
    type: String,
    default : "",
    unique: false,
  },
  soyad: {
    type: String,
    default : "",
    unique: false,
  },
  kullaniciAdi: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Boş bırakılamaz"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,

  },
  telefon: {
    type: String,
    default: "",
    trim: true,
  },
  password: {
    type: String,
    default: "",
    trim: true,
    select: false,
  },
  hash: String,
  salt: String,
  likedposts: Array,

});

module.exports = mongoose.model("users", userSchema);