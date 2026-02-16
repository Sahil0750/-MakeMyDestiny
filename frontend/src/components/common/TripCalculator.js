import React, { useState } from 'react';
import './TripCalculator.css';

const TripCalculator = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    carType: 'sedan',
    passengers: 1
  });
  const [result, setResult] = useState(null);

  const destinations = [
    'Ranchi', 'Netarhat', 'Deoghar', 'Jamshedpur', 'Betla', 'Hundru Falls',
    'Delhi', 'Manali', 'Goa', 'Jaipur', 'Varanasi', 'Kerala', 'Darjeeling'
  ];

  const carTypes = {
    sedan: { name: 'Sedan (4 seater)', rate: 12, fuel: 15 },
    suv: { name: 'SUV (7 seater)', rate: 18, fuel: 10 },
    luxury: { name: 'Luxury Car', rate: 25, fuel: 8 },
    tempo: { name: 'Tempo Traveller (12 seater)', rate: 22, fuel: 8 }
  };

  const distances = {
    'Ranchi-Netarhat': 156,
    'Ranchi-Deoghar': 250,
    'Ranchi-Jamshedpur': 130,
    'Ranchi-Betla': 170,
    'Ranchi-Hundru Falls': 45,
    'Ranchi-Delhi': 1350,
    'Ranchi-Manali': 1800,
    'Ranchi-Goa': 1850,
    'Ranchi-Jaipur': 1450,
    'Ranchi-Varanasi': 450,
    'Ranchi-Kerala': 2400,
    'Ranchi-Darjeeling': 420
  };

  const getDistance = (from, to) => {
    const key1 = `${from}-${to}`;
    const key2 = `${to}-${from}`;
    return distances[key1] || distances[key2] || 0;
  };

  const calculateTrip = (e) => {
    e.preventDefault();
    const { from, to, carType, passengers } = formData;
    
    if (from === to) {
      alert('Please select different locations');
      return;
    }

    const distance = getDistance(from, to);
    if (distance === 0) {
      alert('Distance data not available for this route');
      return;
    }

    const car = carTypes[carType];
    const fuelCost = (distance / car.fuel) * 100; // Assuming ₹100/liter
    const driverCost = distance * 2; // ₹2 per km
    const totalCost = (distance * car.rate) + fuelCost + driverCost;
    const costPerPerson = totalCost / passengers;
    const duration = (distance / 60).toFixed(1); // Assuming 60 km/hr average

    setResult({
      distance,
      duration,
      totalCost: Math.round(totalCost),
      costPerPerson: Math.round(costPerPerson),
      fuelCost: Math.round(fuelCost),
      carName: car.name
    });
  };

  return (
    <div className="trip-calculator">
      <div className="calculator-card">
        <h2>🚗 Trip Cost Calculator</h2>
        <p className="calculator-desc">Calculate your travel distance and estimated costs</p>

        <form onSubmit={calculateTrip}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <select
                id="from"
                value={formData.from}
                onChange={(e) => setFormData({...formData, from: e.target.value})}
                required
              >
                <option value="">Select Starting Point</option>
                {destinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="to">To</label>
              <select
                id="to"
                value={formData.to}
                onChange={(e) => setFormData({...formData, to: e.target.value})}
                required
              >
                <option value="">Select Destination</option>
                {destinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="carType">Vehicle Type</label>
              <select
                id="carType"
                value={formData.carType}
                onChange={(e) => setFormData({...formData, carType: e.target.value})}
              >
                {Object.entries(carTypes).map(([key, car]) => (
                  <option key={key} value={key}>{car.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="passengers">Passengers</label>
              <input
                id="passengers"
                type="number"
                min="1"
                max="20"
                value={formData.passengers}
                onChange={(e) => setFormData({...formData, passengers: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          <button type="submit" className="calculate-btn">
            Calculate Trip
          </button>
        </form>

        {result && (
          <div className="result-card">
            <h3>📊 Trip Details</h3>
            <div className="result-grid">
              <div className="result-item">
                <span className="result-label">Distance</span>
                <span className="result-value">{result.distance} km</span>
              </div>
              <div className="result-item">
                <span className="result-label">Duration</span>
                <span className="result-value">{result.duration} hrs</span>
              </div>
              <div className="result-item">
                <span className="result-label">Vehicle</span>
                <span className="result-value">{result.carName}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Fuel Cost</span>
                <span className="result-value">₹{result.fuelCost}</span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">Total Cost</span>
                <span className="result-value">₹{result.totalCost}</span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">Per Person</span>
                <span className="result-value">₹{result.costPerPerson}</span>
              </div>
            </div>
            <p className="result-note">
              * Estimated costs include fuel, driver charges, and vehicle rental. 
              Actual costs may vary based on season and availability.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCalculator;
