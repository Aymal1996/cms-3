import axios from "../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../configs/constants";
import { message } from "antd";

//Scholarship section
export const getFinanceScholarshipList = (page, limit, order, orderby, search =  null,filter=null) => {
    let ordering = '';
      if(order == "ascend") {
          ordering = 'ASC'
      } else if(order == "descend") {
          ordering = 'DESC'
      }
      return async (dispatch) => {
        const {
          data: { message },
        } = await axios.get(`${apiMethod}/registry.finance_api.get_outstanding_scholarship_list?page_number=${page}&limit=${limit}&status=${filter}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
        dispatch({
          type: action_types.FINANCE_SCHOLARSHIP_LIST,
          data: message,
        });
      };
  };

export const getFinanceScholarshipCard = (page, limit, order) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/registry.finance_api.get_outstanding_scholarship_cards?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=name` : ''}`);
    dispatch({
        type: action_types.FINANCE_SCHOLARSHIP_CARD,
        data: message,
    });
};

export const getFinanceScholarshipPendingList = (page, limit, order, orderby, search =  null) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/registry.finance_api.get_pending_scholarship_list?page_number=${page}&limit=${limit}&status=All${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
      dispatch({
        type: action_types.FINANCE_SCHOLARSHIP_PENDING_LIST,
        data: message,
      });
    };
};

export const getFinanceScholarshipPendingCard = (page, limit, order) => async (dispatch) => {
  const {
      data: { message },
  } = await axios.get(`${apiMethod}/registry.finance_api.get_pending_scholarship_cards?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=name` : ''}&status=Pending`);
  dispatch({
      type: action_types.FINANCE_SCHOLARSHIP_PENDING_CARD,
      data: message,
  });
};

//Applicant section
export const getFinanceApplicatCard = (page,limit, order) => async (dispatch) => {
  const {
      data: { message },
  } = await axios.get(`${apiMethod}/marketing.finance_api.get_applicant_outstanding_balance_cards?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=name` : ''}`);
  dispatch({
      type: action_types.FINANCE_APPLICANT_CARD,
      data: message,
  });
};


export const getFinanceApplicatList = (page, limit, order, orderby, search =  null, status) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async (dispatch) => {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/marketing.finance_api.get_applicant_outstanding_balance_list_with_status?status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
      dispatch({
        type: action_types.FINANCE_APPLICANT_LIST,
        data: message,
      });
    };
};

//Students section
export const getFinanceStudentsCard = (page, limit, order) => async (dispatch) => {
  let ordering = '';
  if(order == "ascend") {
      ordering = 'ASC'
  } else if(order == "descend") {
      ordering = 'DESC'
  }
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/marketing.student_api.get_student_outstanding_balance_cards?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=date` : ''}`);
dispatch({
    type: action_types.FINANCE_STUDENT_CARD,
    data: message,
});
};

export const getFinanceStudentsList = (status, page, limit, order, orderby, search) => async (dispatch) => {
  let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
  const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.student_api.get_student_outstanding_balance_list_with_status?status=${status}&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
  dispatch({
      type: action_types.FINANCE_STUDENT_LIST,
      data: message,
  });
};


export const getFinanceStudentRequestsCard = (page, limit, order, orderby = 'date') => async (dispatch) => {
  let ordering = '';
  if(order == "ascend") {
      ordering = 'ASC'
  } else if(order == "descend") {
      ordering = 'DESC'
  }
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/marketing.student_api.get_student_refund_request_card?&status=Pending&page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}`);
  dispatch({
      type: action_types.FINANCE_STUDENT_REQUESTS,
      data: message,
  });
};

//Grants section
export const getFinanceGrantsCard = (page, limit, order, orderby, status='All') => async (dispatch) => {
  const {
      data: { message },
  } = await axios.get(`${apiMethod}/registry.finance_api.get_pending_grants_list?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=date` : ''}&status=${status}`);
  dispatch({
      type: action_types.FINANCE_GRANTS_CARD,
      data: message,
  });
};

export const getFinanceGrantsList = (page, limit, order, orderby, status='All') => async (dispatch) => {
  const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.finance_api.get_pending_grants_list?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=name` : ''}&status=${status}`);
  dispatch({
      type: action_types.FINANCE_GRANTS_LIST,
      data: message,
  });
};

export const getFinanceGrantPaymentHistory = (name) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/?grant_name=${name}`);
  dispatch({
    type: action_types.FINANCE_GRANT_PAYMENT_DETAIL,
    data: message,
  });
};

export const getTransactionListPg = (status, page, limit, t_status, search={}, order, orderby) => {
  return async(dispatch) => {
      let ordering = '';
      if(order == "ascend") {
          ordering = 'ASC'
      } else if(order == "descend") {
          ordering = 'DESC'
      }

      let bodyData = {
        "page_number": page,
        "limit": limit,
        "orderby": orderby, 
        "order": ordering,    
        "t_status": t_status,    
        "status": status,    
        "filters": search
      };

      try {
      const {
          data: { message },
      } = await axios.post(`${apiMethod}/marketing.finance_api.transaction_listing_pagination`,bodyData);
      dispatch({
          type: action_types.FINANCE_TRANSACTION_LIST,
          data: message,
      });
    } catch (e) {
      const { response } = e;
      message.error(response);
    }
  };
};

export const getTransactionListPgCash = (status, page, limit, t_status, search={}, order, orderby) => {
  return async(dispatch) => {
      let ordering = '';
      if(order == "ascend") {
          ordering = 'ASC'
      } else if(order == "descend") {
          ordering = 'DESC'
      }

      let bodyData = {
        "page_number": page,
        "limit": limit,
        "orderby": orderby, 
        "order": ordering,    
        "t_status": t_status,    
        "status": status,    
        "filters": search
      };

      const {
          data: { message },
      } = await axios.post(`${apiMethod}/marketing.finance_api.transaction_listing_pagination`,bodyData);
      dispatch({
          type: action_types.FINANCE_TRANSACTION_CASH_LIST,
          data: message,
      });
  };
};


export const getStudentNames = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_program.faculty_code_dropdown`);
    dispatch({
      type: action_types.DROPDOWN_STUDENT_NAME,
      data: message,
    });
  };
};

export const getStudentIds = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_program.faculty_code_dropdown`);
    dispatch({
      type: action_types.DROPDOWN_STUDENT_ID,
      data: message,
    });
  };
};

export const getFinanceTransactionDetail = (name) => async (dispatch) => {
  let bodyData = { name: name };
  const {
    data: { message },
  } = await axios.post(`${apiMethod}/marketing.finance_api.get_transaction_detail`, bodyData);
  dispatch({
    type: action_types.FINANCE_TRANSACTION_DETAIL,
    data: message[0],
  });
};

export const getGrantRequest = (name) => async (dispatch) => {
  let bodyData = { name: name };
  const {
    data: { message },
  } = await axios.post(`${apiMethod}/registry.finance_api.grants_requests?name=${name}`);
  dispatch({
    type: action_types.FINANCE_GRANT_REQUEST,
    data: message,
  });
};

export const getScholarshipRequest = (name) => async (dispatch) => {
  let bodyData = { name: name };
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/registry.finance_api.specific_scholarship_requests?scholarship_id=${name}`);
  dispatch({
    type: action_types.FINANCE_SCHOLARSHIP_REQUEST,
    data: message,
  });
};

export const getRegistrationFee = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.post(`${apiMethod}/marketing.finance_api.get_fee_structure_new`);
  dispatch({
    type: action_types.REGISTRATION_FEE,
    data: message,
  });
};

export const getCountryforFee = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.post(`${apiMethod}/marketing.finance_api.get_country_data`);
  dispatch({
    type: action_types.COUNTRY_BYFEE,
    data: message,
  });
};

export const getSorting = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.post(`${apiMethod}/marketing.finance_api.get_cms_fee_priority`);
  dispatch({
    type: action_types.SORTING_LIST,
    data: message,
  });
};


export const emptyOtherRequest = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_OTHER_REQ,
      data: {},
    });
  };
};

export const emptyTrans = () => async (dispatch) => {
  dispatch({
      type: action_types.EMPTY_TRANS,
      data: {},
  });
};

export const emptyListFinance = () => async (dispatch) => {
  dispatch({
      type: action_types.EMPTY_FINANCE_LIST,
      data: {},
  });
};
