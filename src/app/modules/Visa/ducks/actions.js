import axios from '../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiMethod } from '../../../../configs/constants';

export const getVisaRenewalList = (filterVal, page, limit, order, orderby, search = null) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.visa.get_expiring_expired_students_list?state=${filterVal}&order_by=visa_expiry&order=${order}&page_number=${page}&limit=${limit}&${
      search ? '&filters=' + JSON.stringify(search) : ''
    }`);
    dispatch({
      type: action_types.VISA_RENEWAL_LIST,
      data: message,
    });
  };
};

export const getVisaOverview = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.visa.visa_dashboard`);
    dispatch({
      type: action_types.VISA_OVERVIEW,
      data: message,
    });
  };
};

export const getNewVisaList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
      
    } = await axios.get(`${apiMethod}/marketing.visa.visa_applications?page_number=${page}&limit=${limit}&orderby=creation&order=desc`);
    dispatch({
      type: action_types.NEW_VISA_LIST,
      data: message,
    });
  };
};


export const getExpiredVisaList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.visa.get_expiring_expired_students_list?state=Expired&order_by=visa_expiry&order=DESC&page_number=1&limit=9`);
    dispatch({
      type: action_types.VISA_EXPIRED_LIST,
      data: message,
    });
  };
};

export const getExpiryVisaList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.visa.get_expiring_expired_students_list?state=Expiring&order_by=visa_expiry&order=DESC&page_number=1&limit=9`);
    dispatch({
      type: action_types.VISA_EXPIRY_LIST,
      data: message,
    });
  };
};

export const emptyListVisa = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_VISA_LIST,
      data: {},
    });
  };
};