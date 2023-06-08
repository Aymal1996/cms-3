import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const addLecturer = (payload) => {
    return axios.post(`${apiMethod}/faculty.modules_api.add_module_lecturer`, payload);
};

export const delLecturer = (id) => {
    return axios.delete(`${apiresource}/AQA Module Lecturers/${id}`);
};
export const addMaterialMod = (payload) => {
    return axios.post(`${apiMethod}/faculty.modules_api.add_module_materials`, payload);
};