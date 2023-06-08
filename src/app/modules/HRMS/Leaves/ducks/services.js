import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const updateCarryForward = (id) => {
    return axios.get(`${apiMethod}/hrms.leaves_api.update_carry_forward_expiry_pending?employee_id=${id}&status=Pending`);
};

export const updateCarryForwardApprove = (id) => {
    return axios.get(`${apiMethod}/hrms.leaves_api.change_carry_forwarded_leaves?employee_id=${id}`);
};

export const updateCarryForwardReject = (id) => {
    return axios.get(`${apiMethod}/hrms.leaves_api.update_carry_forward_expiry_pending?employee_id=${id}&status=Rejected`);
};
