import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrips } from '../services/tripService';
import { getAllBookings, getBookingStats } from '../services/bookingService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, tripsData, bookingsData] = await Promise.all([
        getBookingStats(),
        getTrips(),
        getAllBookings()
      ]);
      setStats(statsData.data);
      setTrips(tripsData.data);
      setBookings(bookingsData.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'trips' ? 'active' : ''} 
          onClick={() => setActiveTab('trips')}
        >
          Manage Trips
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''} 
          onClick={() => setActiveTab('bookings')}
        >
          All Bookings
        </button>
      </div>

      {activeTab === 'overview' && stats && (
        <div className="overview">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Bookings</h3>
              <p className="stat-number">{stats.totalBookings}</p>
            </div>
            <div className="stat-card">
              <h3>Active Bookings</h3>
              <p className="stat-number">{stats.activeBookings}</p>
            </div>
            <div className="stat-card">
              <h3>Cancelled</h3>
              <p className="stat-number">{stats.cancelledBookings}</p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-number">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="monthly-stats">
            <h2>Monthly Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Bookings</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {stats.monthlyBookings.map(month => (
                  <tr key={month._id}>
                    <td>Month {month._id}</td>
                    <td>{month.count}</td>
                    <td>₹{month.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'trips' && (
        <div className="trips-management">
          <div className="section-header">
            <h2>All Trips</h2>
            <Link to="/admin/trips/new" className="add-btn">+ Add New Trip</Link>
          </div>
          <div className="trips-table">
            <table>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>State</th>
                  <th>Price</th>
                  <th>Available Seats</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map(trip => (
                  <tr key={trip._id}>
                    <td>{trip.destination}</td>
                    <td>{trip.state}</td>
                    <td>₹{trip.price.toLocaleString()}</td>
                    <td>{trip.availableSeats}/{trip.totalSeats}</td>
                    <td>{trip.category}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bookings-management">
          <h2>All Bookings</h2>
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Destination</th>
                  <th>Seats</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking.user.name}</td>
                    <td>{booking.trip.destination}</td>
                    <td>{booking.seatsBooked}</td>
                    <td>₹{booking.totalAmount.toLocaleString()}</td>
                    <td>
                      <span className={`status ${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
