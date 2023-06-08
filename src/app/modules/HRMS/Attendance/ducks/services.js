import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const updateAttendance = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.attendance_api.update_attendance_record`, { ...payload, name: id });
};

export const getTotalAbsent = (id) => {
  return axios.put(`${apiMethod}/hrms.api.absent_count_single_employee?employee_id=${id}`);
};
