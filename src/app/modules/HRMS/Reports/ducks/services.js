import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const downloadTasks = (payload, formatting) => {
  return axios.get(
    `${apiMethod}/hrms.task_api.create_task_report?formatting=${formatting}&filters=${JSON.stringify(
      payload,
    )}&type=download`,
  );
};

export const downloadEmployee = (payload, formatting) => {
  return axios.get(
    `${apiMethod}/marketing.api.create_employee_report?formatting=${formatting}&filters=${JSON.stringify(
      payload,
    )}&type=download`,
  );
};

export const downloadAttendance = (payload, formatting) => {
  return axios.get(
    `${apiMethod}/hrms.task_api.create_attendance_report?formatting=${formatting}&filters=${JSON.stringify(
      payload,
    )}&type=download`,
  );
};

export const downloadLeaveEntitlement = (payload, formatting) => {
  return axios.get(
    `${apiMethod}/hrms.leaves_api.create_leave_entitlment_report?formatting=${formatting}&filters=${JSON.stringify(
      payload,
    )}&type=download`,
  );
};
