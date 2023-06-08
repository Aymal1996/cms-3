import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import * as action_types from './constants';

export const getMaterialName = (data) => async (dispatch) => {
  dispatch({
    type: action_types.MATERIAL_NAME,
    data: data,
  });
};

export const getOverallMaterial =
  (limit, page_number, order, orderby, search = null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.materials.overall_materials_list?page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.OVERALL_MATERIAL,
      data: message,
    });
  };

export const getMyMaterial =
  (page_number, limit, order, orderby, search = null, status) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.materials.my_materials_list?page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? '&filters=' + JSON.stringify(search) : ''}&status=${status}`,
    );
    dispatch({
      type: action_types.MY_MATERIAL,
      data: message,
    });
  };

export const getStudentList =
  (id, page_number, limit, order, orderby, search = null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.materials.materials_students_list?material=${id}&page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
      } ${search ? `&filters=${search}` : ''}`,
    );
    dispatch({
      type: action_types.STUDENT_LIST,
      data: message,
    });
  };

export const getRevisionList = (id, page_number, limit, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/faculty.materials.getting_revisions_list?material_name=${id}&page_number=${page_number}&limit=${limit}${
      order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
    }`,
  );
  dispatch({
    type: action_types.REVISION_LIST,
    data: message,
  });
};

export const getTagsList = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiresource}/Material Tags`);
  dispatch({
    type: action_types.TAGS,
    data: message,
  });
};

export const showMaterialForm = (data) => async (dispatch) => {
  dispatch({
    type: action_types.MATERIAL_FORM,
    data: data,
  });
};

export const editMaterialType = (data) => async (dispatch) => {
  dispatch({
    type: action_types.MATERIAL_EDIT,
    data: data,
  });
};
