import axios from '../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../configs/constants';

export const auditStudents = (payload) => {
  return axios.post(`${apiMethod}/registry.api.create_students_for_audited`, payload);
};

export const deleteAuditStudents = (body) => {
  return axios.put(`${apiMethod}/registry.api.delete_audited_student`, body);
};

export const getS3File = (id, doc, name) => {
  return axios.get(`${apiMethod}/registry.api.fetch_files_from_awss3?student_id=${id}&key=${doc}&filename=${name}`);
};

export const studFile = (id, doctype) => {
  return axios.get(`${apiMethod}/marketing.api.generate_student_file_form?student_id=${id}&doctype=${doctype}`);
};

export const studProfile = (id, doctype) => {
  return axios.get(`${apiMethod}/marketing.api.generate_student_profile?student_id=${id}&doctype=${doctype}`);
};

export const studAppForm = (id, doctype) => {
    return axios.get(`${apiMethod}/marketing.api.generate_application_form?student_id=${id}&doctype=${doctype}`);
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

  export const prevDoc = (id, name, url, app = false) => {
    if (app == true) {
      return axios.get(`${apiMethod}/registry.api.fetch_files_from_awss3?application_id=${id}&key=${encodeURIComponent(name)}&filename=${encodeURIComponent(url)}`);   
    } else {
      return axios.get(`${apiMethod}/registry.api.fetch_files_from_awss3?student_id=${id}&key=${encodeURIComponent(name)}&filename=${encodeURIComponent(url)}`);
    }
  };

  export const updateDocs = (payload) => {
    return axios.post(`${apiMethod}/registry.api.save_uploaded_documents`, payload);
  };

  export const deleteDocument = (payload) => {
    return axios.put(`${apiMethod}/registry.api.delete_audited_student_doc`, payload);
  };