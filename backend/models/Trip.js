const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: [true, 'Please add a destination'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'Please add a state']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  duration: {
    type: String,
    required: [true, 'Please add duration']
  },
  availableSeats: {
    type: Number,
    required: [true, 'Please add available seats'],
    min: 0
  },
  totalSeats: {
    type: Number,
    required: [true, 'Please add total seats']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add end date']
  },
  image: {
    type: String,
    default: 'default-trip.jpg'
  },
  highlights: [String],
  category: {
    type: String,
    enum: ['Adventure', 'Religious', 'Wildlife', 'Heritage', 'Beach', 'Hill Station', 'Cultural'],
    default: 'Cultural'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trip', tripSchema);
