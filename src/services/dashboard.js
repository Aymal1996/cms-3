import authInterceptors from './axiosInterceptor'
const apiResource = process.env.REACT_APP_BASE_URL + "/api/resource";
const apiMethod = process.env.REACT_APP_BASE_URL + "/api/method";

export const getDelayedApplication=()=> {
    return authInterceptors.get(`${apiResource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",0]]`);
}

export const getDelayedApplicationCount=()=> {
    return authInterceptors.get(`${apiResource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",0]]&limit_page_length=None`);
}

export const getIncompleteApplicationProgress=()=> {
    return authInterceptors.get(`${apiMethod}/marketing.api.get_incomplete_application_list`);
}

export const getIncompleteDoc =(params)=> {
    return authInterceptors.get(`${apiResource}/Application?fields=["name","applicant_name","workflow_state"]&filters=[["docstatus","=",0],["workflow_state","=","${params}"]]`);
}

export const addApplication=(data)=>{
    return authInterceptors.post(`${apiResource}/Application`,data)
}

export const uploadImage=(data)=>{
    return authInterceptors.post(`${apiMethod}/marketing.api.uploadImageToken`,data)
}

export const getapplicationDetial= (appURL) => {
    return authInterceptors.get(`${apiResource}/Application/${appURL}`);
}

export const editapplicationDetial= (appURL,data) => {
    return authInterceptors.put(`${apiResource}/Application/${appURL}`,data);
}

export const changePassword = (payload) => {
    return authInterceptors.post(`${apiMethod}/hrms.api.check_current_password`, payload);
};