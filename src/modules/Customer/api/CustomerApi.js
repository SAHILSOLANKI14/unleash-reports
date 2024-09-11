import api from 'src/api';

export const fetchCustomerData = async (start, limit, search, data) => {
  const url = `/api/v1/customers?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&group=${data}&start=${start}&limit=${limit}`;
  try {
    const response = await api(url, null, 'get');
    return response;
  } catch (error) {
    throw error;
  }
};
