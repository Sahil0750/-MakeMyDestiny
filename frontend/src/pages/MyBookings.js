import React, { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking } from '../services/bookingService';
import { toast } from 'react-toastify';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(id);
        toast.success('Booking cancelled successfully');
        loadBookings();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Cancellation failed');
      }
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.trip.destination}</h3>
                <span className={`status ${booking.status}`}>{booking.status}</span>
              </div>
              
              <div className="booking-details">
                <p><strong>State:</strong> {booking.trip.state}</p>
                <p><strong>Travel Date:</strong> {new Date(booking.trip.startDate).toLocaleDateString()}</p>
                <p><strong>Seats Booked:</strong> {booking.seatsBooked}</p>
                <p><strong>Total Amount:</strong> ₹{booking.totalAmount.toLocaleString()}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
              </div>

              <div className="travellers">
                <h4>Travellers:</h4>
                {booking.travellerDetails.map((traveller, idx) => (
                  <p key={idx}>{idx + 1}. {traveller.name} - {traveller.age} yrs - {traveller.gender}</p>
                ))}
              </div>

              {booking.status === 'booked' && (
                <button 
                  onClick={() => handleCancel(booking._id)} 
                  className="cancel-btn"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
