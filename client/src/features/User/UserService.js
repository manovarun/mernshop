import axios from 'axios';
const API_URL = '/api/users';

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

const updateUserProfile = async (token, user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/profile`, user, config);

  return response.data;
};

const UserService = { getUserProfile, updateUserProfile };

export default UserService;
