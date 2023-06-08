import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getsearchReports = (startDate, endDate, formatting) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/marketing.visa.get_expiring_expired_students_pdf?formatting=${formatting}&type=search&order_by=visa_expiry&order=desc&page_number=1&limit=10&filters={"start_date":"${startDate}","end_date":"${endDate}"}`,
    );
    dispatch({
      type: action_types.SEARCH_TASK,
      data: message,
    });
  };
};
