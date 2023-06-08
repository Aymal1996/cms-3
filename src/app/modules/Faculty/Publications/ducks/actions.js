import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

  export const getOverallPublicationsList = (page, limit, order, orderby, search =  null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.publications.overall_publications_list?page_number=${page}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? `&filters=${search}` : ''}`,
    );
    dispatch({
      type: action_types.OVERALL_PUBLICATIONS_LIST,
      data: message,
    });
  };
  
  

  export const getPublicationsListByStatus = (page, limit, order, orderby, search = null, status) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.publications.my_publications_list?page_number=${page}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? `&filters=${search}` : ''}&status=${status}`,
    );  
    dispatch({
      type: action_types.PUBLICATIONS_LIST_BY_STATUS,
      data: message,
    });
  };

  export const getPublicationDetails = (name) => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Publications/${name}`);
        console.log(data);
        dispatch({
            type: action_types.PUBLICATION_SINGLE,
            data: data,
        });
    };
};

export const getPublicationGraph = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.get(`${apiMethod}/faculty.publications.overall_publications_graph`);
      dispatch({
          type: action_types.PUBLICATIONS_OVERALL_GRAPH,
          data: message,
      });
  };
};

export const getMyPublicationGraph = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.get(`${apiMethod}/faculty.publications.my_publications_graph`);
      dispatch({
          type: action_types.PUBLICATIONS_MY_GRAPH,
          data: message,
      });
  };
};

export const getPrograms = () => {
  return async(dispatch) => {
      const {
          data: { data },
      } = await axios.get(`${apiresource}/Institution Faculty Program?filters=[["status", "=", "Active"]]&fields=["name", "program_name", "ineffective_date"]`);
   
      console.log(data);
     
      dispatch({
          type: action_types.PROGRAM_LIST,
          data: data,
      });
  };
};

