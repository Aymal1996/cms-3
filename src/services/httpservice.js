import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {"Access-Control-Allow-Origin": "*"}
});


instance.interceptors.request.use(function (config) {
    var token = JSON.parse(localStorage.getItem("token"));
    var access = token ? token.access_token : ''
    config.headers.Authorization = token.access_token;
    config.headers.Accept = 'application/x-www-form-urlencoded;charset=UTF-8';
    
    return config;
}, function (error) {
    console.log('checking http error', error)
    return Promise.reject(error);
});

export default instance;