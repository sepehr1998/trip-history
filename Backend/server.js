const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");

const countryRoutes = require("./routes/countries");

const app = express();
const PORT = 3001;

connectDB();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use("/api/countries", countryRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
