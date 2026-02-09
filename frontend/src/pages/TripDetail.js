import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrip } from '../services/tripService';
import { createBooking } from '../services/bookingService';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './TripDetail.css';

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    seatsBooked: 1,
    travellerDetails: [{ name: '', age: '', gender: 'Male' }]
  });

  const loadTrip = useCallback(async () => {
    try {
      const data = await getTrip(id);
      setTrip(data.data);
    } catch (error) {
      toast.error('Failed to load trip details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTrip();
  }, [loadTrip]);

  const handleSeatsChange = (seats) => {
    const newSeats = parseInt(seats);
    const travellers = Array(newSeats).fill(null).map((_, i) => 
      bookingData.travellerDetails[i] || { name: '', age: '', gender: 'Male' }
    );
    setBookingData({ ...bookingData, seatsBooked: newSeats, travellerDetails: travellers });
  };

  const handleTravellerChange = (index, field, value) => {
    const newTravellers = [...bookingData.travellerDetails];
    newTravellers[index][field] = value;
    setBookingData({ ...bookingData, travellerDetails: newTravellers });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }

    try {
      await createBooking({ tripId: id, ...bookingData });
      toast.success('Booking successful!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!trip) return <div className="loading">Trip not found</div>;

  return (
    <div className="trip-detail">
      <div className="trip-hero">
        <h1>{trip.destination}</h1>
        <p>📍 {trip.state}</p>
      </div>

      <div className="trip-content">
        <div className="trip-info">
          <div className="info-section">
            <h2>About This Trip</h2>
            <p>{trip.description}</p>
          </div>

          <div className="info-section">
            <h3>Highlights</h3>
            <ul className="highlights">
              {trip.highlights.map((highlight, idx) => (
                <li key={idx}>✓ {highlight}</li>
              ))}
            </ul>
          </div>

          <div className="trip-stats">
            <div className="stat">
              <span className="stat-label">Duration</span>
              <span className="stat-value">{trip.duration}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Category</span>
              <span className="stat-value">{trip.category}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Available Seats</span>
              <span className="stat-value">{trip.availableSeats}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Price per Person</span>
              <span className="stat-value">₹{trip.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="booking-form">
          <h2>Book This Trip</h2>
          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label>Number of Seats</label>
              <input
                type="number"
                min="1"
                max={trip.availableSeats}
                value={bookingData.seatsBooked}
                onChange={(e) => handleSeatsChange(e.target.value)}
                required
              />
            </div>

            <h3>Traveller Details</h3>
            {bookingData.travellerDetails.map((traveller, idx) => (
              <div key={idx} className="traveller-form">
                <h4>Traveller {idx + 1}</h4>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={traveller.name}
                  onChange={(e) => handleTravellerChange(idx, 'name', e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={traveller.age}
                  onChange={(e) => handleTravellerChange(idx, 'age', e.target.value)}
                  required
                />
                <select
                  value={traveller.gender}
                  onChange={(e) => handleTravellerChange(idx, 'gender', e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            ))}

            <div className="total-amount">
              <span>Total Amount:</span>
              <span className="amount">₹{(trip.price * bookingData.seatsBooked).toLocaleString()}</span>
            </div>

            <button type="submit" className="book-btn">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
