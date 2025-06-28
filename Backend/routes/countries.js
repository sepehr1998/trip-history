// routes/countries.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const Country = require("../models/Country");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + "-" + file.originalname;
        cb(null, unique);
    },
});
const upload = multer({ storage });

// GET single country
router.get("/:code", async (req, res) => {
    try {
        const country = await Country.findOne({ code: req.params.code.toUpperCase() });
        if (!country) return res.status(404).json({ error: "Country not found" });
        res.json(country);
    } catch {
        res.status(500).json({ error: "Server error" });
    }
});

// POST new country (initial setup)
router.post("/", upload.array("images", 10), async (req, res) => {
    const { code, name, description } = req.body;
    const imageUrls = req.files.map((file) => `uploads/${file.filename}`);

    try {
        const newCountry = await Country.findOneAndUpdate(
            { code: code.toUpperCase() },
            {
                name,
                description,
                $setOnInsert: { trips: [] },
            },
            { upsert: true, new: true }
        );
        res.json(newCountry);
    } catch (err) {
        res.status(500).json({ error: "Failed to save country" });
    }
});

// POST new trip for a country
router.post("/:code/trips", upload.array("images", 10), async (req, res) => {
    const { startDate, endDate, summary } = req.body;
    const imagePaths = req.files.map((file) => `uploads/${file.filename}`);

    try {
        const country = await Country.findOne({ code: req.params.code.toUpperCase() });
        if (!country) return res.status(404).json({ error: "Country not found" });

        country.trips.push({ startDate, endDate, summary, images: imagePaths });
        await country.save();
        res.status(201).json(country);
    } catch (err) {
        res.status(500).json({ error: "Failed to add trip" });
    }
});

module.exports = router;
