import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const addStudentApp = (payload, id) => {
    if (id) {
        return axios.put(`${apiresource}/Application/${id}`, payload);
    } else {
        return axios.post(`${apiresource}/Application`, payload);
    }
};

export const offerLetterRelease = (id) => {
    return axios.post(`${apiMethod}/registry.api.offer_letter_released?application_id=${id}`)
};

export const generateOfferLetter = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_offer_letters?application_id=${id}`);
  };

// export const createStudent = (payload) => {
//     return axios.post(`${apiMethod}/marketing.api.create_student`, payload)
// };

export const createStudent = (id) => {
    return axios.post(`${apiMethod}/marketing.new_marketing_api.create_students_program?application_id=${id}`)
};

export const programIncentive = (payload) => {
    return axios.post(`${apiMethod}/marketing.incentives_api.get_application_incentives`, payload)
};

export const eligibilityLetter = (id) => {
    return axios.get(`${apiMethod}/marketing.api.generate_eligibility_letters?application_id=${id}`)
};

export const notifyManagerEligibility = (id) => {
    return axios.get(`${apiMethod}/marketing.api.notify_eligibilty_managers?application_id=${id}`)
};

export const checkEmailExist = (email) => {
    return axios.post(`${apiMethod}/marketing.api.validate_user_by_email?email=${email}`)
};
// https://cms2dev.limkokwing.net/api/method/marketing.api.check_email?email=owais@yopmail.com

export const uploadDocApi = (payload) => {
    return axios.put(`${apiMethod}/registry.api.save_application_uploaded_documents`, payload)
};

export const uploadVAL = (payload) => {
    return axios.put(`${apiMethod}/registry.api.upload_application_visa_document`, payload)
};

export const uploadMedical = (payload) => {
    return axios.put(`${apiMethod}/marketing.application_portal_api.medical_upload_via_cms`, payload)
};