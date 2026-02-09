import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chatbot';

export const sendMessage = async (message) => {
  const res = await axios.post(API_URL, { message });
  return res.data;
};

export const getFAQs = async () => {
  const res = await axios.get(`${API_URL}/faqs`);
  return res.data;
};
