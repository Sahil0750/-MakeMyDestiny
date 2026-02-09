const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trip = require('./models/Trip');
const User = require('./models/User');
const Booking = require('./models/Booking');
const trips = require('./data/trips');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Trip.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    await Trip.insertMany(trips);

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@makemydestiny.com',
      password: 'admin123',
      phone: '9876543210',
      role: 'admin'
    });

    // Create sample user
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      phone: '9876543211',
      role: 'user'
    });

    console.log('Data Imported Successfully!');
    console.log('Admin Login: admin@makemydestiny.com / admin123');
    console.log('User Login: user@test.com / user123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Trip.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
