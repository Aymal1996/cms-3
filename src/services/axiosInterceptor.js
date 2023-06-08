import axios from 'axios';
import { message } from 'antd';
import { refreshAuth } from '../services/services';
const apiMethod = process.env.REACT_APP_BASE_URL + '/api/method';
const auth = apiMethod + '/frappe.integrations.oauth2.get_token';
import { baseUrl, loginID } from '../configs/constants';

const authInterceptors = axios.create({
  baseURL: baseUrl,
});
authInterceptors.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
const getQueryString = (data = {}) => {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};
authInterceptors.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._dretry) {
      originalRequest._retry = true;
      const token = JSON.parse(localStorage.getItem('token'));
      const refreshToken = token.refresh_token;
      const postData = getQueryString({
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        client_id: loginID,
        redirect_url: 'https://getpostman.com/oauth2/callback',
      });
      return axios.post(`${auth}`, postData).then((res) => {
        if (res.data.access_token) {
          let val = {
            access_token: res.data.access_token,
            expires_in: res.data.expires_in,
            refresh_token: res.data.refresh_token,
          };
          localStorage.setItem('token', JSON.stringify(val));
          originalRequest.headers['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token;
          return axios(originalRequest);
        }
      });
    }

    if (error.response.status === 400 && !originalRequest._dretry) {
      localStorage.clear();
      setTimeout(() => {
        message.error('Your session has been expired')
        setTimeout(() => {
          window.location.assign('/')
        }, 500);
      }, 1000);
    }
    return Promise.reject(error);
  },
  // async (error) => {
  //   return new Promise((resolve) => {
  //     const originalRequest = error.config
  //     const token = JSON.parse(localStorage.getItem('token'));
  //     const refreshToken = token.refresh_token
  //     if (error.response && error.response.status === 403 && error.config && !error.config.__isRetryRequest && refreshToken) {
  //       originalRequest._retry = true

  //       const response = refreshAuth(refreshToken)
  //         .then((res) => {
  //           console.log('send token',res)
  //           let val = {
  //             'access_token' : res.data.access_token,
  //             'expires_in': res.data.expires_in,
  //             'refresh_token': res.data.refresh_token,
  //           };
  //           localStorage.setItem("token", JSON.stringify(val));
  //           return axios(originalRequest)
  //         }).catch(e => {
  //           const {response} = e;
  //           console.log('error', e);
  //         });

  //       resolve(response)

  //     }
  //     return Promise.reject(error)
  //   })
  // },
);
export default authInterceptors;
