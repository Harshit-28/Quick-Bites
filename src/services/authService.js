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

// Fetch user details by email
const getUserByEmail = async (email) => {
  const token = localStorage.getItem('token'); // Retrieve token
  const response = await axios.get(`${API_URL}/user/email/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token for authentication (if required)
    },
  });
  return response.data;
};

export default { register, login, getUserByEmail };
