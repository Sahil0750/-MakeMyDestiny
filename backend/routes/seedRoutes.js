const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const User = require('../models/User');
const trips = require('../data/trips');

router.post('/import', async (req, res) => {
  try {
    await Trip.deleteMany();
    await User.deleteMany();

    await Trip.insertMany(trips);

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@makemydestiny.com',
      password: 'admin123',
      phone: '9876543210',
      role: 'admin'
    });

    const user = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      phone: '9876543211',
      role: 'user'
    });

    res.json({
      success: true,
      message: 'Data imported successfully',
      data: {
        trips: trips.length,
        users: 2
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
