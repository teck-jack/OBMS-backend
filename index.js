const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing JSON bodies
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/bookings", bookingRoutes);

// Basic route
app.get("/", (req, res) => {
    res.send("API is running...");
});

connectDB(); // Call 

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
