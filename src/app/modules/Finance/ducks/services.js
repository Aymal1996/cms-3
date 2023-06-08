import axios from '../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../configs/constants';

export const ignorePendingStudent = (id, status) => {
    return axios.post(`${apiMethod}/marketing.student_api.change_student_status`, {
        name: id,
        ignored_status: status
    });
}

export const setRegistationFee = (payload) => {
    return axios.post(`${apiMethod}/marketing.finance_api.set_fee_structure_new`, payload);
}