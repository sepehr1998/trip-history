const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: String,
    description: String,
    images: [String], // array of image URLs
});

module.exports = mongoose.model("Country", CountrySchema);
