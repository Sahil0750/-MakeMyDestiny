import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getTrips } from '../services/tripService';
import './Trips.css';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: '',
    category: '',
    search: ''
  });

  const loadTrips = useCallback(async () => {
    try {
      const data = await getTrips(filters);
      setTrips(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="loading">Loading trips...</div>;

  return (
    <div className="trips-page">
      <div className="trips-header">
        <h1>Explore Destinations</h1>
        <p>Find your perfect getaway</p>
      </div>

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search destinations..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />
        <select name="state" value={filters.state} onChange={handleFilterChange}>
          <option value="">All States</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Kerala">Kerala</option>
          <option value="Goa">Goa</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="West Bengal">West Bengal</option>
        </select>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Adventure">Adventure</option>
          <option value="Religious">Religious</option>
          <option value="Wildlife">Wildlife</option>
          <option value="Heritage">Heritage</option>
          <option value="Beach">Beach</option>
          <option value="Hill Station">Hill Station</option>
        </select>
      </div>

      <div className="trips-grid">
        {trips.map(trip => (
          <div key={trip._id} className="trip-card">
            <div className="trip-badge">{trip.category}</div>
            <h3>{trip.destination}</h3>
            <p className="trip-state">📍 {trip.state}</p>
            <p className="trip-desc">{trip.description.substring(0, 100)}...</p>
            <div className="trip-details">
              <span>⏱️ {trip.duration}</span>
              <span>💺 {trip.availableSeats} seats</span>
            </div>
            <div className="trip-footer">
              <span className="trip-price">₹{trip.price.toLocaleString()}</span>
              <Link to={`/trips/${trip._id}`} className="view-btn">View Details</Link>
            </div>
          </div>
        ))}
      </div>

      {trips.length === 0 && (
        <div className="no-trips">
          <p>No trips found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Trips;
