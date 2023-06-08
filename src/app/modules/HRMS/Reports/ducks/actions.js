import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getsearchTasks = (payload, formatting) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.task_api.create_task_report?formatting=${formatting}&filters=${JSON.stringify(
        payload,
      )}&type=search`,
    );
    dispatch({
      type: action_types.SEARCH_TASK,
      data: message,
    });
  };
};

export const getEmployeeTasks = (payload, formatting) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/marketing.api.create_employee_report?formatting=${formatting}&filters=${JSON.stringify(
        payload,
      )}&type=search`,
    );
    dispatch({
      type: action_types.SEARCH_EMPLOYEE,
      data: message,
    });
  };
};

export const getAttendance = (payload, formatting) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.task_api.create_attendance_report?formatting=${formatting}&filters=${JSON.stringify(
        payload,
      )}&type=search`,
    );
    dispatch({
      type: action_types.SEARCH_ATTENDANCE,
      data: message,
    });
  };
};

export const getLeaveEntitlement = (payload, formatting) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.leaves_api.create_leave_entitlment_report?formatting=${formatting}&filters=${JSON.stringify(
        payload,
      )}&type=search`,
    );
    dispatch({
      type: action_types.LEAVE_ENTITLEMENT,
      data: message,
    });
  };
};
