import api from 'src/api';
import { objectToQueryString } from '../../../utils/helper';
export const loginUser = (data) => {
  const qs = objectToQueryString(data);
  return api(`/api/v1/login?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&${qs}`, null, 'get');
};

export const getProfile = (data) => {
  let ks = objectToQueryString(data);
  return api(`api/v1/login/Main_Company_Details?${ks}`, null, 'post');
};
