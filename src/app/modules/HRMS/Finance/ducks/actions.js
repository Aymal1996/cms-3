import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import * as action_types from './constants';

export const closeAllOpenForms = (bol) => {
  return (dispatch) => {
    dispatch({
      type: action_types.CHANGE_TAB,
      data: bol,
    });
  };
};

export const getOverallFinance = (page, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.get_overall_finance_cards?&page_number=${page}&limit=${limit}${
      order ? `&order=${order}&orderby=date` : ''
    }`,
  );
  dispatch({
    type: action_types.OVERALL_FINANCE,
    data: message,
  });
};
export const getOverallFinanceList = (status, page, limit, order, orderby='date', search = null) => async (dispatch) => {
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/hrms.api.get_overall_finance_list?status=${status}&page_number=${page}&limit=${limit}${
      order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`
  );
  dispatch({
    type: action_types.OVERALL_FINANCE_LIST,
    data: message,
  });
};

export const getFinanceDetail = (id) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/hrms.api.emp_finance_details?empid=${id}`);
  dispatch({
    type: action_types.FINANACE_DETAIL,
    data: message,
  });
};
