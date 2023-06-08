import { apiMethod } from "../../../../../configs/constants"
import axios from "../../../../../services/axiosInterceptor"

export const nameCheck = (name) => {
    return axios.get(`${apiMethod}/marketing.incentives_api.incentive_name_exists?incentive_name=${name}`)
}

export const addUpdateIncentive = (body) => {
    return axios.post(`${apiMethod}/marketing.incentives_api.add_edit_incentive`, body)
}

export const getProgramIncentive = (body) => {
    return axios.post(`${apiMethod}/marketing.incentives_api.get_program_4_intake`, body)
}

export const duplicateIncentive = (id) => {
    return axios.get(`${apiMethod}/marketing.incentives_api.create_incentive_duplicate?incentive_code=${id}`)
}