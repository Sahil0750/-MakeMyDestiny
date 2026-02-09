const express = require('express');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  getBookingStats
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, authorize('admin'), getAllBookings);

router.get('/user', protect, getUserBookings);
router.get('/stats/report', protect, authorize('admin'), getBookingStats);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking);

router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
