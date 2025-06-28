const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    summary: String,
    images: [String], // File paths
});

const CountrySchema = new mongoose.Schema({
    code: String,
    name: String,
    trips: [TripSchema],
});

module.exports = mongoose.model("Country", CountrySchema);
