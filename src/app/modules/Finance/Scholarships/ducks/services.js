import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const ignoreScholarship = (id, status) => {
    return axios.post(`${apiMethod}/registry.finance_api.ignore_scholarship?name=${id}&ignored_status=${status}`);
}

export const ignorePendingScholarship = (id) => {
    return axios.post(`${apiMethod}/registry.finance_api.ignore_scholarship_request?name=${id}&ignored_status=Ignored`);
}