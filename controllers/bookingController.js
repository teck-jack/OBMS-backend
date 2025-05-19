const Booking = require("../models/Booking");

// @desc: User creates a booking
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, address, bookTitle, quantity } = req.body

    const newBooking = new Booking({
      name,
      email,
      phone,
      address,
      bookTitle,
      quantity,
      user: req.user.id
      
    })

    await newBooking.save()

    res.status(201).json(newBooking)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create booking' })
  }
}
// @desc: User gets his own bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error getting bookings" });
  }
};

// @desc: Admin gets all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error getting all bookings" });
  }
};

// @desc: Admin updates booking status
exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  try {
const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated doc
    )
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};
