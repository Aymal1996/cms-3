import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const getStudentName = (id) => {
    return axios.get(`${apiMethod}/marketing.finance_api.student_exists?student_id=${id}`)
}

export const getStudentOutstandingBalanceBreakdown = (id) => {
    return axios.get(`${apiMethod}/marketing.finance_api.student_outstanding_balance_breakdown_list?student_id=${id}`)
}

export const addEditTransaction = (body) => {

    return axios.post(`${apiMethod}/marketing.finance_api.add_edit_transaction_new`, body)
}

export const applicantExist = (id) => {
    return axios.get(`${apiMethod}/marketing.finance_api.applicant_exists?applicant_id=${id}`)
}

export const studentExist = (id) => {
    return axios.get(`${apiMethod}/marketing.finance_api.student_exists?student_id=${id}`)
}

export const applicantBreakdown = (payload) => {
    return axios.post(`${apiMethod}/marketing.finance_api.applicant_outstanding_balance_breakdown_list_new`, payload)
};

export const updateTransactionCalc = (id, status) => {
    return axios.get(`${apiMethod}/registry.finance_api.create_scholarship_transaction?status=${status}&transaction_reference=${id}`)
};

export const getReceipt = (id) => {
    return axios.get(`${apiMethod}/marketing.finance_api.generate_transaction_receipt?transaction_id=${id}`)
};