import axios from 'axios';

const API_URL = '/api/users';

const register = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(`${API_URL}/register`, userData, config);
  return response.data;
};

const login = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(`${API_URL}/login`, userData, config);
  return response.data;
};

const getUserProfile = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/profile`, config);

  return response.data;
};

const AuthService = { register, login, getUserProfile };

export default AuthService;
