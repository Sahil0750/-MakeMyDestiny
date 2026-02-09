import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

export const createBooking = async (bookingData) => {
  const res = await axios.post(API_URL, bookingData);
  return res.data;
};

export const getUserBookings = async () => {
  const res = await axios.get(`${API_URL}/user`);
  return res.data;
};

export const getAllBookings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getBooking = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const updateBooking = async (id, bookingData) => {
  const res = await axios.put(`${API_URL}/${id}`, bookingData);
  return res.data;
};

export const cancelBooking = async (id) => {
  const res = await axios.put(`${API_URL}/${id}/cancel`);
  return res.data;
};

export const getBookingStats = async () => {
  const res = await axios.get(`${API_URL}/stats/report`);
  return res.data;
};
