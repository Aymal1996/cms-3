import * as action_types from './constants';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';


export const getJobOpening = (page, limit, order, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.advancement_api.hrms_job_opening_pagination?page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
      dispatch({
        type: action_types.JOB_OPENING,
        data: message,
      });
    };
};

export const getSuitableApplicants = (job, page, limit, order, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.advancement_api.hrms_advancement_job_opening_pagination?job_opening=${job}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
      dispatch({
        type: action_types.SUITABLE_APPLICANTS,
        data: message,
      });
    };
};

export const getOverallFit = (status, page, limit, order, orderby, search =  null) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    } else {
      ordering = order;
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/hrms.advancement_api.hrms_advancement_fit_index_pagination_list?${status ? `status=${status}&` : ''}page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby ? orderby : 'creation'}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
      dispatch({
        type: action_types.OVERALL_FITINDEX,
        data: message,
      });
    };
};

// export const getOverallFitCard = (page, limit, order, orderby) => {
//     return async (dispatch) => {
//       const {
//         data: { message },
//       } = await axios.get(`${apiMethod}/hrms.advancement_api.hrms_advancement_fit_index_pagination?status=Active&page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=creation` : ''}`);
//       dispatch({
//         type: action_types.OVERALL_FITINDEX_CARD,
//         data: message,
//       });
//     };
// };



export const emptyApplicant = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_APPLICANTS,
      data: {},
    });
  };
};

export const getAdvancementdetails = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.employee_staff_detail?employee_id=${id}`);
    dispatch({
      type: action_types.ADVANCEMENT_DETAILS,
      data: message,
    });
  };
};


export const emptyStaffDetails = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_STAFF_DETAILS,
      data: [],
    });
  };
};


export const getContracts = (id, page, limit, order, orderby) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.advancement_api.hrms_advancement_employee_contract_list?employee_id=${id}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
    dispatch({
      type: action_types.CONTRACTS_LIST,
      data: message,
    });
  };
};

export const getFitFigure = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.advancement_api.hrms_advancement_get_single_records?employee_id=${id}`);
    dispatch({
      type: action_types.FITINDEX_DETAILS,
      data: message,
    });
  };
};

export const getJobsAdc = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.advancement_api.get_job_position_dropdown`);
    dispatch({
      type: action_types.JOBS_LIST_ADV,
      data: message,
    });
  };
};

 