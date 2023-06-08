import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getOverallAttendance = (page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.attendance_api.get_overall_attendance_pagination?page_number=${page}&limit=${limit}${
      order ? `&order=${order}&orderby=creation` : ''
    }`,
  );
  dispatch({
    type: action_types.OVERALL_ATTENDANCE,
    data: message,
  });
};

export const getOverallAttendanceList =
  (page, limit, order, orderby, search = null) =>
  async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.attendance_api.get_overall_attendance_pagination_list?page_number=${page}&limit=${limit}${
        order ? `&order=${ordering}&orderby=${orderby ? orderby : 'creation'}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.OVERALL_ATTENDANCE_LIST,
      data: message,
    });
  };

export const getTeamAttendance = (team, page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.attendance_api.get_my_team_attendance_pagination?team=${team}&page_number=${page}&limit=${limit}${
      order ? `&order=${order}` : ''
    }`,
  );
  dispatch({
    type: action_types.TEAM_ATTENDANCE,
    data: message,
  });
};
export const getTeamAttendanceList =
  (team, page, limit, order, orderby, search = null) =>
  async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.attendance_api.get_my_team_attendance_pagination_list?team=${team}&page_number=${page}&limit=${limit}${
        orderby ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.TEAM_ATTENDANCE_LIST,
      data: message,
    });
  };
export const getMyAttendance =
  (employeeID, page, limit, order, orderby, search = null) =>
  async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.attendance_api.get_single_employee_attendance_pagination?&employee=${employeeID}&page_number=${page}&limit=${limit}${
        orderby ? `&order=${ordering}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.MY_ATTENDANCE,
      data: message,
    });
  };

export const getEmpAttendance =
  (employeeID, page, limit, order, orderby, search = null) =>
  async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.attendance_api.get_single_employee_attendance_pagination?&employee=${employeeID}&page_number=${page}&limit=${limit}${
        orderby ? `&order=${ordering}&orderby=${orderby}` : ''
      }`,
    );
    dispatch({
      type: action_types.GET_EMPA_ATTENDANCE,
      data: message,
    });
  };

export const getSingleAttendanceDetail = (id) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/hrms.api.get_single_attendance?name=${id}`);
  dispatch({
    type: action_types.SINGLE_ATTENDANCE,
    data: message,
  });
};

export const getTotalAttendance = (id) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/hrms.attendance_api.absent_count_single_employee?employee_id=${id}`);
  dispatch({ type: action_types.TOTAL_ABSENT, data: message });
};

export const getTeamsAttendanceDropdown = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.attendance_api.get_employee_team_list?employee_id=${id}`);
    dispatch({
      type: action_types.TEAM_ATTENDANCE_DROP,
      data: message,
    });
  };
};