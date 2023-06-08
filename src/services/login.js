import authInterceptor from './axiosInterceptor'
const apiMethod = process.env.REACT_APP_BASE_URL + "/api/method/login?";

export const signIn=(username,password)=>{
   return authInterceptor.post(`${apiMethod}usr=${username}&pwd=${password}`)
}