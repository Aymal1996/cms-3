import axios from '../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../configs/constants';

export const studFile = (id) => {
  return axios.get(`${apiMethod}/marketing.api.generate_student_file_form?student_id=${id}`);
};

export const studProfile = (id) => {
  return axios.get(`${apiMethod}/marketing.api.generate_student_profile?student_id=${id}`);
};

export const studAppForm = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_application_form?student_id=${id}`);
  };

  export const studTranscript = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_academic_transcript?student_id=${id}`);
  };

  export const studAttendance = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_academic_transcript?student_id=${id}`);
  };

  export const studCourse = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_academic_transcript?student_id=${id}`);
  };

  export const studTimetable = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_class_timetable?student_id=${id}`);
  };

  export const studCalendar = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_academic_calender?student_id=${id}`);
  };