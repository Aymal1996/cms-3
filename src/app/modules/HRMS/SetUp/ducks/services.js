import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const createLeave = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_leave_type`, payload);
};

export const getSingleLeave = (id) => {
  return axios.get(`${apiresource}/HRMS Leave Type/${id}`);
};
export const updateSingleLeave = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_leave_type`, { ...payload, name: id });
};
export const deleteSingleLeave = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Leave Type&name=${id}`);
};

export const addEducationField = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_education_field`, payload);
};

export const getSingleEducation = (id) => {
  return axios.get(`${apiresource}/HRMS Education Field/${id}`);
};

export const updateSingleEducation = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_education_field`, { ...payload, name: id });
};
export const deleteSingleEducation = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Education Field&name=${id}`);
};

export const addInstitution = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_institutions`, payload);
};

export const getSingleInstitution = (id) => {
  return axios.get(`${apiresource}/Institutions/${id}`);
};

export const updateSingleInstitution = (id, payload) => {
  return axios.put(`${apiMethod}/hrms.setup.create_hrms_institutions`, { ...payload, name: id });
};
export const deleteSingleInstitution = (id) => {
  return axios.delete(`${apiMethod}/hrms.setup.delete_records?doctype=Institutions&name=${id}`);
};

export const addCountry = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_nationality`, payload);
};

export const updateSingleCountry = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_nationality`, { ...payload, name: id });
};
export const deleteSingleCountry = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Country&name=${id}`);
};

export const addSingleHoliday = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_holidays`, payload);
};

export const updateSingleHoliday = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_holidays`, { ...payload, name: id });
};
export const deleteSingleHoliday = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Holidays&name=${id}`);
};

export const addSingleReligion = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_religion`, payload);
};

export const updateSingleReligion = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_religion`, { ...payload, name: id });
};
export const deleteSingleReligion = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Religion&name=${id}`);
};
export const addSingleRace = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_race`, payload);
};

export const updateSingleRace = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_race`, { ...payload, name: id });
};
export const deleteSingleRace = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Race&name=${id}`);
};
export const addSingleAsset = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_assets`, payload);
};

export const updateSingleAsset = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_assets`, { ...payload, name: id });
};
export const deleteSingleAsset = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Assets&name=${id}`);
};
export const addSingleLeaveEntitlement = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_leave_entitlement`, payload);
};

export const updateSingleLeaveEntitlement = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_leave_entitlement`, { ...payload, name: id });
};
export const deleteSingleLeaveEntitlement = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Leave Entitlement&name=${id}`);
};
export const getSingleTeam = (id) => {
  return axios.get(`${apiresource}/HRMS Teams/${id}`);
};
export const addSingleTeam = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_team`, payload);
};

export const updateSingleTeam = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_team`, { ...payload, name: id });
};
export const deleteSingleTeam = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Teams&name=${id}`);
};

export const getSingleRole = (id) => {
  return axios.get(`${apiMethod}/hrms.setup.get_single_role_record?role_id=${id}`);
};

export const addUserRoles = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_roles`, payload);
};

export const updateUserRoles = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_roles`, { ...payload, name: id });
};
export const deleteUserRoles = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=User Roles&name=${id}`);
};

export const getSingleProject = (id) => {
  return axios.get(`${apiresource}/HRMS Projects/${id}`);
};

export const addProject = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_projects`, payload);
};

export const updateProjecat = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_projects`, { ...payload, name: id });
};
export const deleteProject = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Projects&name=${id}`);
};

export const deleteRequestForm = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Form Listing&name=${id}`);
};

export const addjobPosition = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_job_position`, payload);
};

export const updatejobPosition = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_job_position`, { ...payload, name: id });
};
export const deletejobPosition = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Job Position&name=${id}`);
};
export const getSingleJob = (id) => {
  return axios.get(`${apiresource}/Job Position/${id}`);
};

// Request
export const addRequest = (body, id) => {
  if (id) {
    return axios.put(`${apiresource}/HRMS Form Listing/${id}`, body);
  } else {
    return axios.post(`${apiMethod}/hrms.setup.add_form_listing`, body);
  }
};
export const delRequest = (id) => {
  return axios.delete(`${apiresource}/HRMS Form Listing/${id}`);
};
export const addSingleDepartment = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_department`, payload);
};
export const updateDepartment = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_department`, { ...payload, name: id });
};
export const deleteDepartment = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Department&name=${id}`);
};

export const getSingleDepartment = (id) => {
  return axios.get(`${apiresource}/HRMS Department/${id}`);
};
export const addSingleWarningLetter = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_warning_letter`, payload);
};
export const updateWarningLetter = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.post(`${apiMethod}/hrms.setup.create_warning_letter`, { ...updatePayload, name: id });
};
export const deleteWarningLetter = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Warning Letter&name=${id}`);
};
export const getWarningLetterDetail = (id) => {
  return axios.get(`${apiresource}/Warning Letter/${id}`);
};

export const addSingleApprover = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_approver`, payload);
};
export const updateApprover = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_hrms_approver`, { ...payload, name: id });
};
export const deleteApprover = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=HRMS Approver&name=${id}`);
};

export const getApproverDetail = (id) => {
  return axios.get(`${apiresource}/HRMS Approver/${id}`);
};

export const addSingleLetterTemp = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_letter_template`, payload);
};
export const updateletterTemp = (id, payload) => {
  let { department_name, ...updatePayload } = payload;
  return axios.post(`${apiMethod}/hrms.setup.create_letter_template`, { ...updatePayload, name: id });
};
export const deleteletterTemp = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Letter Template&name=${id}`);
};

export const getLetterTempDetail = (id) => {
  return axios.get(`${apiresource}/Letter Template/${id}`);
};

export const addWorkingHourTemp = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_working_hour`, payload);
};
export const updateWorkingHourTemp = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_working_hour`, { ...payload, name: id });
};
export const deleteWorkingHourTemp = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Work Hour Template&name=${id}`);
};

export const getWorkingHourTempDetail = (id) => {
  return axios.get(`${apiresource}/Work Hour Template/${id}`);
};
export const getDepartmentList = (id) => {
  return axios.get(`${apiMethod}/hrms.setup.employee_dropdown_hrms_dpt_team?name_id=${id}`);
};

export const getSingleWarningLetter = (id) => {
  return axios.get(`${apiresource}/Warning Letter/${id}`);
};

export const deleteAssetFinance = (id) => {
  return axios.get(`${apiMethod}/hrms.tasks_api.delete_assets_from_finance_assets?asset_no=${id}`);
};

export const addSingleSkill = (payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_skills`, payload);
};

export const updateSingleSkill = (id, payload) => {
  return axios.post(`${apiMethod}/hrms.setup.create_skills`, { ...payload, name: id });
};
export const deleteSingleSkill = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_records?doctype=Skill&name=${id}`);
};

export const leaveEntititlementSec = (id) => {
  return axios.get(`${apiMethod}/hrms.leaves_api.leave_availibilities_on_entitlements?entitlment_name=${id}`);
};

export const addTerminatedEmployee = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.add_terminate_notification_employee?employee_id=${id}`);
};

export const deleteTerminatedEmployee = (id) => {
  return axios.post(`${apiMethod}/hrms.setup.delete_terminate_notification_employee?employee_id=${id}`);
};