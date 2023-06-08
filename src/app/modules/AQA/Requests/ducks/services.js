import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';


export const createRequest = (payload) => {
    return axios.post(`${apiMethod}/aqa.api.add_aqa_form_request`, payload)
};
