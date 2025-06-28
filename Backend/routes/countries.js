const express = require("express");
const multer = require("multer");
const path = require("path");
const Country = require("../models/Country");

const router = express.Router();

// Setup multer storage for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ------------------------------------------
// GET /api/countries/:code
// ------------------------------------------
router.get("/:code", async (req, res) => {
    try {
        const country = await Country.findOne({ code: req.params.code.toUpperCase() });
        if (!country) return res.status(404).json({ error: "Country not found" });
        res.json(country);
    } catch (err) {
        console.error("GET country error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ------------------------------------------
// POST /api/countries
// Add trip to existing or new country
// ------------------------------------------
router.post("/", upload.array("images", 10), async (req, res) => {
    const { code, startDate, endDate, summary } = req.body;
    const imageUrls = req.files.map((file) => `uploads/${file.filename}`);

    try {
        const trip = {
            startDate,
            endDate,
            summary,
            images: imageUrls,
        };

        let country = await Country.findOne({ code: code.toUpperCase() });

        if (country) {
            country.trips.push(trip);
        } else {
            country = new Country({
                code: code.toUpperCase(),
                name: code.toUpperCase(),
                description: "New country",
                trips: [trip],
            });
        }

        await country.save();
        res.status(201).json(country);
    } catch (err) {
        console.error("POST /api/countries error:", err);
        res.status(500).json({ error: "Failed to save trip" });
    }
});

// ------------------------------------------
// POST /api/countries/:code/trips
// Add trip to existing country
// ------------------------------------------
router.post("/:code/trips", upload.array("images", 10), async (req, res) => {
    const { startDate, endDate, summary } = req.body;
    const imageUrls = req.files.map((file) => `uploads/${file.filename}`);

    try {
        const country = await Country.findOne({ code: req.params.code.toUpperCase() });
        if (!country) return res.status(404).json({ error: "Country not found" });

        const trip = {
            startDate,
            endDate,
            summary,
            images: imageUrls,
        };

        country.trips.push(trip);
        await country.save();
        res.status(201).json(country);
    } catch (err) {
        console.error("POST /:code/trips error:", err);
        res.status(500).json({ error: "Failed to add trip" });
    }
});

module.exports = router;
