import { apiMethod } from "../../../../../configs/constants"
import axios from "../../../../../services/axiosInterceptor"

export const policyViewUpdate = (payload) => {
    return axios.put(`${apiMethod}/hrms.policy_api.add_single_policy`, payload)
}

export const deletePolicy = (name) => {
    return axios.post(`${apiMethod}/hrms.policy_api.delete_policy?name=${name}`)
}

export const addPolicy = (payload) => {
    return axios.post(`${apiMethod}/hrms.policy_api.add_single_policy`, payload)
}

