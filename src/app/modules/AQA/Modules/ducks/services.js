import { apiMethod } from "../../../../../configs/constants"
import axios from "../../../../../services/axiosInterceptor"

export const moduleGet = (str) => {
    return axios.get(`${apiMethod}/marketing.new_marketing_api.get_modules_dropdown_with_search?searchStr=${str}`)
}
