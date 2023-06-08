import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';


export const getOverallTasks = (page, limit, order, orderby) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.task_api.get_overall_task_list?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=date` : ''}`);
    dispatch({
      type: action_types.OVERALL_TASKS,
      data: message,
    });
  };
};

export const getOverallTasksWithStatus = (status, page, limit, order, orderby, search = null) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.task_api.get_overall_task_list_with_status?status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
    dispatch({
      type: action_types.OVERALL_TASKS_WITH_STATUS,
      data: message,
    });
  };
};

export const getTeamTasks = (task, page, limit, order, orderby) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.task_api.get_team_task_list?team_name=${task}&page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=date` : ''}`);
      dispatch({
        type: action_types.TEAM_TASKS,
        data: message,
      });
    };
};

export const getTeamTasksWithStatus = (task,status, page, limit, order, orderby, search = null) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.task_api.get_team_task_list_with_status?team_name=${task}&status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
    dispatch({
      type: action_types.TEAM_TASKS_WITH_STATUS,
      data: message,
    });
  };
};

export const getMyTasks = (id, page, limit, order, orderby, search = null) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.task_api.get_my_task_list?page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
      dispatch({
        type: action_types.MY_TASKS,
        data: message,
      });
    };
};

export const getMyProjects = (id) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.tasks_api.get_my_project_list?employee_id=${id}`);
      dispatch({
        type: action_types.MY_PROJECTS,
        data: message,
      });
    };
};

export const getAddProjectName = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_project_names`);
    dispatch({
      type: action_types.ADD_PROJECT_NAME,
      data: message,
    });
  };
};

export const getProjectName = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/HRMS Projects`);
    dispatch({
      type: action_types.PROJECT_NAME,
      data: data,
    });
  };
};

export const getSingleTaskDetail = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.tasks_api.get_employee_projects?employee_id=${id}`);
    dispatch({
      type: action_types.SINGLE_TASK_DETAIL,
      data: message,
    });
  };
};

export const emptyOverall = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_TASKS,
      data: null,
    });
  };
};

export const getTimesheet = (id, status, page, limit, order, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.task_api.get_employee_task_list?employee_id=${id}&status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
      dispatch({
        type: action_types.MY_TIMESHEETS,
        data: message,
      });
    };
};