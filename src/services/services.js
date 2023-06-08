import axiosInterceptor from './axiosInterceptor';
import { loginID } from '../configs/constants';
const apiMethod = process.env.REACT_APP_BASE_URL + '/api/method';
const switchAuth = apiMethod + '/frappe.integrations.oauth2.get_switch_token';
const auth = apiMethod + '/frappe.integrations.oauth2.get_token';

const getQueryString = (data = {}) => {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const authentications = (username, password) => {
  const data = {
    grant_type: 'password',
    client_id: loginID,
    redirect_url: 'https://getpostman.com/oauth2/callback',
    username: username,
    password: password,
  };
  const postData = getQueryString(data);
  return axiosInterceptor.post(auth, postData);
};

export const switchAuthentications = (payload) => {
  return axiosInterceptor.post(switchAuth, payload);
};

export const refreshAuth = (refresh) => {
  const data = {
    refresh_token: refresh,
    grant_type: 'refresh_token',
    client_id: loginID,
    redirect_url: 'https://getpostman.com/oauth2/callback',
  };
  const postData = getQueryString(data);
  return axiosInterceptor.post(auth, postData);
};
