import * as action_types from './constant';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const getOverallList = (status, page, limit, order, orderby, search = null) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.get_overall_employment_list?status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
      dispatch({
        type: action_types.EMPLOYEE_LIST,
        data: message,
      });
    };
};

export const getOverallCard = (page, limit, order) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.get_overall_employment_cards?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=creation` : ''}`);
      dispatch({
        type: action_types.EMPLOYEE_CARD,
        data: message,
      });
    };
};

export const getTeams = (page, limit, order, orderby, search = null) => {
    let ordering = '';
      if(order == "ascend") {
          ordering = 'ASC'
      } else if(order == "descend") {
          ordering = 'DESC'
      }
      return async (dispatch) => {
        const {
          data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_team_list?page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&team=' + search : ''}`);
        dispatch({
          type: action_types.TEAM_LIST,
          data: message,
        });
      };
  };

  export const getTeamsDetail = (id) => {
      return async (dispatch) => {
        const {
          data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.team_detail_side_bar?team_code=${id}`);
        dispatch({
          type: action_types.TEAM_DETAILS,
          data: message,
        });
      };
  };

  export const getMembers = (id, page, limit, order, orderby) => {
    let ordering = '';
      if(order == "ascend") {
          ordering = 'ASC'
      } else if(order == "descend") {
          ordering = 'DESC'
      }
      return async (dispatch) => {
        const {
          data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_team_detail?team_code=${id}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
        dispatch({
          type: action_types.MEMBER_LIST,
          data: message,
        });
      };
  };

  export const emptyTeams = () => {
    return (dispatch) => {
      dispatch({
        type: action_types.EMPTY_TEAMS,
        data: [],
      });
    };
  };

  export const emptyStaff = () => {
    return (dispatch) => {
      dispatch({
        type: action_types.EMPTY_STAFF,
        data: [],
      });
    };
  };

  export const getEmployeeDetail = (id) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.employment_details?empid=${id}`);
      dispatch({
        type: action_types.EMPLOYEE_DETAILS,
        data: message,
      });
    };
  };

  export const getWHTemplateList = () => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.tasks_api.get_dropdowns`, {params: {"doctype" : "Work Hour Template"}});
      dispatch({
        type: action_types.TEMPLATE_LIST,
        data: message,
      });
    };
  };

  export const getWHTemplate = (temp) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiresource}/hrms.api.get_work_hours_temp_data?tempid=${temp}`);
      dispatch({
        type: action_types.HOUR_TEMPLATE,
        data: message,
      });
    };
  };

  export const getWarnLetter = () => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.api.warning_letter`);
      dispatch({
        type: action_types.WARN_LETTERS,
        data: message,
      });
    };
  };

  export const getEmployFaculty = (company) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/aqa.api.get_faculty`, {params: {"company": company}});
      dispatch({
        type: action_types.CONTRACT_FACULTY,
        data: message,
      });
    };
  };

  export const getEmployProgram = (company, faculty) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/aqa.api.get_program`, {params: {"company": company, "faculty": faculty}});
      dispatch({
        type: action_types.CONTRACT_PROGRAM,
        data: message,
      });
    };
  };

  export const getEmployCampus = (company) => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/Campus`, {params: { "company": company }});
      dispatch({
        type: action_types.CONTRACT_CAMPUS,
        data: message,
      });
    };
  };
  
