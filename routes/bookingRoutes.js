const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus
} = require("../controllers/bookingController");

const { exportToExcel, exportToPDF } = require("../utils/exportUtils");
const Booking = require("../models/Booking");
const path = require("path");
const fs = require("fs");


const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// User creates booking
router.post("/", protect, createBooking);

// User gets own bookings
router.get("/my", protect, getMyBookings);

// Admin gets all bookings
router.get("/", protect, adminOnly, getAllBookings);

// Admin updates booking
router.put("/:id", protect, adminOnly, updateBookingStatus);




// Excel export
router.get("/export/excel", protect, adminOnly, async (req, res) => {
  const bookings = await Booking.find().populate("user", "name email");
  const filePath = await exportToExcel(bookings);

  res.download(filePath, "bookings.xlsx");
});

// PDF export
router.get("/export/pdf", protect, adminOnly, async (req, res) => {
  const bookings = await Booking.find().populate("user", "name email");
  const filePath = exportToPDF(bookings);

  // Wait for PDF to finish writing
  setTimeout(() => {
    res.download(filePath, "bookings.pdf");
  }, 500); // wait briefly to ensure write completed
});


module.exports = router;


