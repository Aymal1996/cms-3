import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
export const getStaffWorkload = (id) => {
  return axios.get(`${apiMethod}/faculty.lactures_api.staff_workload?employee_id=${id}`);
};

export const getResearchGrantList = (id) => {
  return axios.get(`${apiMethod}/faculty.lactures_api.employee_grants_list?employee_id=${id}`);
};

export const assignModules = (id) => {
  return axios.get(`${apiMethod}/faculty.lactures_api.module_staff_list?employee_id=${id}`);
};

export const updateAssignModule = (payload) => {
  return axios.post(`${apiMethod}/faculty.lactures_api.update_assigned_module_faculty`, payload);
};

export const getGrantsGraph = (id) => {
  return axios.post(`${apiMethod}/faculty.lactures_api.employee_grants_graph?employee_id=${id}`);
};

export const getTimetableGraph = (id) => {
  return axios.post(`${apiMethod}/faculty.Lacturer_timetable.lacturer_attendance_chart?employee_id=${id}`);
};

export const getPublicationGraph = (id) => {
  return axios.post(`${apiMethod}/faculty.lactures_api.employee_publications_graph?employee_id=${id}`);
};

export const getPerformanceGraph = (id) => {
  return axios.post(
    `${apiMethod}/faculty.program_section_student.semester_performances_chart_faculty?employee_id=${id}`,
  );
};

export const getRatings = (id) => {
  return axios.get(`${apiMethod}/faculty.program_section_student.rating_display?employee_id=${id}`);
};

export const getStaffDetail = (id) => {
  return axios.get(`${apiMethod}/faculty.lactures_api.staff_side_detail?employee_id=${id}`);
};
