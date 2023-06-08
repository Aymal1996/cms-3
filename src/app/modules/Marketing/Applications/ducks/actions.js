import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getCountryDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Country?limit_page_length=0`);
        dispatch({
            type: action_types.COUNTRY,
            data: data,
        });
    };
};

export const getNationalityDrop = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/HRMS Nationality?limit_page_length=0`);
    dispatch({
      type: action_types.NATIONALITY,
      data: data,
    });
  };
};

export const getCouncelor = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.get_councellors`);
        dispatch({
            type: action_types.COUNCELOR,
            data: message,
        });
    };
};


export const getRaceDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Race`);
        dispatch({
            type: action_types.RACE,
            data: data,
        });
    };
};

export const getReligionDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Religion`);
        dispatch({
            type: action_types.RELIGION,
            data: data,
        });
    };
};

export const getApplicationTypeDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application Type`);
        dispatch({
            type: action_types.APPLICATION_TYPE,
            data: data,
        });
    };
};

export const getGenderDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Gender`);
        dispatch({
            type: action_types.GENDER,
            data: data,
        });
    };
};

export const getEnglishQualificationDrop = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/English Qualification`);
        dispatch({
            type: action_types.ENG_QUALIFICATION,
            data: data,
        });
    };
};


export const getProgNameDrop = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.get_program_names_list`);
        dispatch({
            type: action_types.PROGRAMME_NAME,
            data: message,
        });
    };
};

export const getSources = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.incentives_api.get_source_4_application`);
        dispatch({
            type: action_types.SOURCE_NAME,
            data: message,
        });
    };
};

export const getApplicantBalanceBreakdown = (id) => {
    return async (dispatch) => {
  
      const {
        data: { message },
      } = await axios.post(
        `${apiMethod}/marketing.finance_api.applicant_outstanding_balance_breakdown_list_new`, {"applicant_id": id}
      );
      dispatch({
        type: action_types.BREAKDOWN_BALANCE_APPLICANT,
        data: message,
      });
    };
  };
  
  export const getApplicantTransHistory = (id) => {
    return async (dispatch) => {
  
      const {
        data: { message },
      } = await axios.post(
        `${apiMethod}/marketing.finance_api.applicant_transaction_history_list`, {"applicant_id": id}
      );
      dispatch({
        type: action_types.BALANCE_HISTORY_APPLICANT,
        data: message,
      });
    };
  };

  export const getAllModulesProgram = (id) => {
    return async (dispatch) => {
  
      const {
        data: { message },
      } = await axios.get(
        `${apiMethod}/marketing.new_marketing_api.marketing_modules?program=${id}`
      );
      dispatch({
        type: action_types.ALL_MODULES_PROGRAM,
        data: message,
      });
    };
  };

  export const emptyMod = () => {
    return (dispatch) => {
      dispatch({
        type: action_types.EMPTY_ALL_APPFORM,
        data: [],
      });
    };
  };


  export const getAgentUser = () => {
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/marketing.new_marketing_api.agents_users`);
      dispatch({
        type: action_types.AGENT_USER,
        data: message,
      });
    };
  };

  export const getAllAgentUser = (status, page, limit, order, orderby, search) => {
    let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/marketing.new_marketing_api.agents_all_users?page=${page}&limit=${limit}${order && '&order='+ordering+'&orderby='+orderby}&status=${status}${search ? `&filters=${search}`: ''}`);
      dispatch({
        type: action_types.AGENT_ALL_USER,
        data: message,
      });
    };
  };
