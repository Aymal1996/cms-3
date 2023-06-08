import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const employAddApi = (payload) => {
    return axios.post(`${apiresource}/Employee`, payload);
};
export const employUpdateImage = (email, payload) => {
  return axios.put(`${apiresource}/User/${email}`, payload);
};

export const sendWarning = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_employee_warning`, payload);
};

export const sendShowCause = (payload) => {
  return axios.post(`${apiMethod}/hrms.api.add_employee_showcause`, payload);
};

export const delWarning = (id, json) => {
  return axios.put(`${apiresource}/EMP Warning Letter/${id}`, json);
};

export const emailCheck = (email) => {
  // return axios.get(`${apiMethod}/hrms.api.user_email_exists?email=${email}`)
  return axios.get(`${apiMethod}/frappe.utils.gmail_api.is_gmail_exist?id=${email}`)
}

export const employApi = (payload, id) => {
  if (id) {
    return axios.put(`${apiresource}/Employee/${id}`, payload);
  } else {
    return axios.post(`${apiresource}/Employee`, payload);
  }
};

export const insuranceApi = (payload, id) => {
  if (id) {
      return axios.put(`${apiresource}/Employee Medical/${id}`, payload);
  } else {
    return axios.post(`${apiMethod}/hrms.api.add_employee_medical`, payload);
  }
};

export const contractApi = (payload, id) => {
  if (id) {
    return axios.put(`${apiresource}/Contract/${id}`, payload);
  } else {
    return axios.post(`${apiresource}/Contract`, payload);
  }
};

export const leaveApi = (id) => {
    return axios.get(`${apiMethod}/hrms.leaves_api.creating_employees_leaves_data?employee=${id}`);
};

export const employDraftApi = (body) => {
  return axios.post(`${apiMethod}/hrms.api.add_employee_draft`, body);
};

export const employDocumentUpload = (body) => {
  return axios.post(`${apiMethod}/hrms.api.add_employee_document`, body);
};

export const getImageResponse = (body) => {
  return axios.get(`${apiMethod}/hrms.api.view_attachment?file_name=${body}`);
};


export const deleteTerminateEmployeeMail = (id, status) => {
  return axios.post(`${apiMethod}/hrms.setup.send_terminate_notifications_mails?employee_id=${id}${status ? '&reactivate=1': ''}`);
};

export const welcome = (id) => {
  return axios.post(`${apiMethod}/frappe.utils.gmail_api.send_welcome_mail_to_user?employeeid=${id}`);
};
