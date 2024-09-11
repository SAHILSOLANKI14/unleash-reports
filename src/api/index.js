import axios from 'axios';
import storage, { storageKey } from 'src/utils/storageUtils';
import { push, replace } from 'connected-react-router';

const client = axios.create({
  baseURL: `https://dev.unleashpos.com/`,
  //baseURL: `https://prachidist.com/`,
});

const handleSuccess = (response) => {
  return response;
};

const handleError = (error) => {
  const errData = error?.response?.data || {};
  switch (error?.response?.status) {
    case 403:
      storage.del('TOKEN');
      storage.del('TENANT_HASH');
      replace('/auth/login');
      break;
    case 404:
      break;
    default:
      break;
  }
  return Promise.reject(errData);
};

const handleAuth = (config, isFormData) => {
  const token = storage.get('TOKEN');
  const tenantHash = storage.get('TENANT_HASH');
  if (token && token !== '' && token !== null && typeof token !== 'undefined') {
    config.headers['Authorization'] = 'Bearer ' + JSON.parse(token);
    config.headers['Access-Control-Allow-Origin'] = '*';
  }
  return config;
};

client.interceptors.request.use(async (config) => {
  return handleAuth(config);
});

client.interceptors.response.use(handleSuccess, handleError);

export default function api(path, payload, method, isFormData, onUploadProgress) {
  return new Promise((resolve, reject) => {
    client
      .request({
        method: method,
        url: path,
        responseType: 'json',
        data: payload,
        ...(onUploadProgress && { onUploadProgress }),
      })
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        const errData = error?.response?.data || {};
        return reject(errData);
      });
  });
}
