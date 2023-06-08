import authInterceptors from './axiosInterceptor'
const apiResource = process.env.REACT_APP_BASE_URL + "/api/resource";
const apiMethod = process.env.REACT_APP_BASE_URL + "/api/method";

export const getInstitutions=()=> {
    return authInterceptors.get(`${apiResource}/Institutions`);
}

export const createFaculty=(data)=>{
    return authInterceptors.post(`${apiResource}/Institution Faculty`,data)
}
