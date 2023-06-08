import axios from '../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../configs/constants';

export const getSearchData = (number, limit, search, department) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/hrms.api.get_employee_role_list?searchTXT=${search}&page_number=${number}&limit=${limit}&searchFilter=${department}`,
    );
    dispatch({
      type: action_types.SEARCH,
      data: message,
    });
  };
};
