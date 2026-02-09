import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTrips = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const res = await axios.get(`${API_URL}/trips?${params}`);
  return res.data;
};

export const getTrip = async (id) => {
  const res = await axios.get(`${API_URL}/trips/${id}`);
  return res.data;
};

export const createTrip = async (tripData) => {
  const res = await axios.post(`${API_URL}/trips`, tripData);
  return res.data;
};

export const updateTrip = async (id, tripData) => {
  const res = await axios.put(`${API_URL}/trips/${id}`, tripData);
  return res.data;
};

export const deleteTrip = async (id) => {
  const res = await axios.delete(`${API_URL}/trips/${id}`);
  return res.data;
};
