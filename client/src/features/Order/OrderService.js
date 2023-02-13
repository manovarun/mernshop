import axios from 'axios';

const API_URL = '/api/orders';

export const createOrder = async (token, order) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, order, config);

  return response.data;
};

export const getOrderDetails = async (token, orderId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${orderId}`, config);

  return response.data;
};

const OrderService = { createOrder, getOrderDetails };

export default OrderService;
