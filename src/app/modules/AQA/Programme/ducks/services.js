import { apiMethod } from "../../../../../configs/constants"
import axios from "../../../../../services/axiosInterceptor"

export const codeCheck = (code) => {
    return axios.get(`${apiMethod}/aqa.api.program_code_exists?program_code=${code}`)
}

export const updateVersion = (body, code) => {
    return axios.post(`${apiMethod}/aqa.api.update_program_version_list`, body)
}