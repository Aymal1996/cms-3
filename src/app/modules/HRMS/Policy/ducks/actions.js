import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getPolicyList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.policy_api.get_policy_list`);
    dispatch({
      type: action_types.POLICY_LIST,
      data: message,
    });
  };
};