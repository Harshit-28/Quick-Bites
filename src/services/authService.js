import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend URL

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store token in localStorage
  }
  return response.data;
};

export default { register, login };