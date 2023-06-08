import axios from '../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../configs/constants';

export const addVisaRenewal = (payload) => {
  return axios.post(`${apiMethod}/marketing.api.add_student_passport_visa`, payload);
};