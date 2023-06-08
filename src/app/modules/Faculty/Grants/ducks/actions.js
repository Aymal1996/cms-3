import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

  export const getOverallGrantsList = (page, limit, order, orderby, search =  null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.grants.overall_grants_list?page_number=${page}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? `&filters=${search}` : ''}`,
    );
    dispatch({
      type: action_types.OVERALL_GRANTS_LIST,
      data: message,
    });
  };
  

  export const getGrantsListByStatus = (page, limit, order, orderby, search = null, status) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.grants.my_grants_list?page_number=${page}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? `&filters=${search}` : ''}&status=${status}`,
    );  
    dispatch({
      type: action_types.GRANTS_LIST_BY_STATUS,
      data: message,
    });
  };

  export const getGrantDetails = (name) => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Grants/${name}`);
        console.log(data);
        dispatch({
            type: action_types.GRANT_SINGLE,
            data: data,
        });
    };
};

export const getGrantGraph = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.get(`${apiMethod}/faculty.grants.overall_grants_graph`);
      dispatch({
          type: action_types.GRANTS_OVERALL_GRAPH,
          data: message,
      });
  };
};


export const getMyGrantGraph = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.get(`${apiMethod}/faculty.grants.my_grants_graph`);
      dispatch({
          type: action_types.GRANTS_MY_GRAPH,
          data: message,
      });
  };
};



