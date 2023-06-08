import { apiMethod } from "../../../../../configs/constants"
import axios from "../../../../../services/axiosInterceptor"

export const addScholarship = (payload) => {
    return axios.post(`${apiMethod}/registry.api.create_scholarship`, payload)
}

export const updateScholarship = (payload) => {
    return axios.put(`${apiMethod}/registry.api.scholarship_add_scheme`, payload)
}

export const deleteScholarship = (id) => {
    return axios.delete(`${apiresource}/Scholarship/${id}`)
}