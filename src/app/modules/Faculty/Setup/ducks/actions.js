import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import * as action_types from './constants';

export const getAllClassrooms =
  (page_number, limit, order, orderby, search = null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.setup.get_classroom_list?page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? `&filters=${search}` : ''}`,
    );
    dispatch({
      type: action_types.ALL_CALSSROOMS,
      data: message,
    });
  };

export const getAllExamsHall =
  (page_number, limit, order, orderby, search = null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.setup.get_exam_hall_list?page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? `&filters=${search}` : ''}`,
    );
    dispatch({
      type: action_types.ALL_EXAMSHALL,
      data: message,
    });
  };
export const getAllClassroomType = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/Faculty Classroom Type`);
  dispatch({
    type: action_types.CLASSROOM_TYPE,
    data: data,
  });
};
export const getAllFacultyLevel = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/Faculty Level`);
  dispatch({
    type: action_types.FACLULTY_TYPE,
    data: data,
  });
};
export const getAllBlock = () => async (dispatch) => {
  const {
    data: { data },
  } = await axios.get(`${apiresource}/Faculty Block`);

  dispatch({
    type: action_types.BLOCKS,
    data: data,
  });
};
