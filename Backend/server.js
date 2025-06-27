const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const connectDB = require("./db");
const Country = require("./models/Country");

const app = express();
const PORT = 3001;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// Multer setup
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
app.get("/api/countries/:code", async (req, res) => {
    try {
        const country = await Country.findOne({ code: req.params.code.toUpperCase() });
        if (!country) return res.status(404).json({ error: "Country not found" });
        res.json(country);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// POST new country
app.post("/api/countries", upload.array("images", 10), async (req, res) => {
    const { code, name, description } = req.body;
    const imageUrls = req.files.map((file) => `http://localhost:3001/uploads/${file.filename}`);

    try {
        const newCountry = await Country.findOneAndUpdate(
            { code: code.toUpperCase() },
            { name, description, images: imageUrls },
            { upsert: true, new: true }
        );
        res.json(newCountry);
    } catch (err) {
        console.error("Error saving country:", err);
        res.status(500).json({ error: "Failed to save country" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
