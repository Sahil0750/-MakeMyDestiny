const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  seatsBooked: {
    type: Number,
    required: [true, 'Please specify number of seats'],
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  travellerDetails: [{
    name: String,
    age: Number,
    gender: String
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'completed'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
