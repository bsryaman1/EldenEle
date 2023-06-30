const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new mongoose.Schema({
  categoryName: { 
    type: String, 
    required: true },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;