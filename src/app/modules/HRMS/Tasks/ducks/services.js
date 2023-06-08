import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const ApproveRejectTimesheet = (id, name, status, role) => {
    return axios.get(`${apiMethod}/hrms.task_api.approve_reject_timesheet?employee_id=${id}&name=${name}&status=${status}${role ? `&role=${role}` : ''}`);
};