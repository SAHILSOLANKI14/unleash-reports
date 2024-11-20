import axios from 'axios';

export const fetchProductById = async (productId) => {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data;
};
