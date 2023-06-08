import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const changeMatStatus = (id, mod, val) => {
    return axios.get(`${apiMethod}/faculty.classroom_api.material_outline_publisher_update`, {params: {"module_id": id, "material_id": mod, "value": val}});
};

export const updateAssessment = (body) => {
    return axios.post(`${apiMethod}/faculty.classroom_api.single_student_assesment_update`, body);
};

export const replaceClass = (body) => {
    return axios.post(`${apiMethod}/faculty.classroom_calenders.add_replace_class`, body);
}