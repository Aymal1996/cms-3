import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';
export const createClassroom = (payload) => {
  return axios.post(`${apiMethod}/faculty.setup.add_single_classroom`, payload);
};

export const deleteClassroom = (id) => {
  return axios.post(`${apiMethod}/faculty.setup.delete_classroom?name=${id}`);
};

export const createExamHall = (payload) => {
  return axios.post(`${apiMethod}/faculty.setup.add_single_exam_hall`, payload);
};

export const deleteExamHall = (id) => {
  return axios.post(`${apiMethod}/faculty.setup.delete_exam_hall?name=${id}`);
};
