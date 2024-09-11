import api from 'src/api';
import { objectToQueryString } from '../../../utils/helper';

export const loginUser = (data) => {
  let qs = objectToQueryString(data);
  console.log('qs');
  console.log(qs);

  return api(`/api/v1/login?api-key=kccw48o08c8kk0448scwcg8swgg8g04w4ccwsgos&${qs}`, null, 'GET');
};
