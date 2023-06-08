import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const ignoreApplicant = (id, status) => {
    return axios.post(`${apiMethod}/marketing.finance_api.ignore_application?name=${id}&ignored_status=${status}`);
}

export const getRequestByCat = (category) => {
    return axios.get(`${apiMethod}/marketing.finance_api.get_for_request_category?category=${category}`)
};

export const createForm = (payload) => {
    return axios.post(`${apiMethod}/aqa.api.add_aqa_form_request`, payload)
};
