import api from 'src/api';
import { objectToQueryString } from '../../../utils/helper';
export const fetchCustomerDetailData = async (data) => {
  let qs = objectToQueryString(data);
  const url = `/api/v1/companies/customers?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&${qs}`;
  try {
    const response = await api(url, null, 'get');
    return response;
  } catch (error) {
    throw error;
  }
};
