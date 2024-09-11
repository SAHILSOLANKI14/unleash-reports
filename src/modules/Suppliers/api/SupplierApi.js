import api from 'src/api';

export const fetchSupplierData = async (start, limit, search) => {
  const url = `/api/v1/customers?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&group=supplier&start=${start}&limit=${limit}`;
  try {
    const response = await api(url, null, 'get');
    return response;
  } catch (error) {
    throw error;
  }
};
