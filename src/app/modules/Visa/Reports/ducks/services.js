import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const downloadReports = (startDate, endDate, formatting) => {
  return axios.get(
    `${apiMethod}/marketing.visa.get_expiring_expired_students_pdf?formatting=${formatting}&type=download&order_by=visa_expiry&order=desc&page_number=1&limit=10&filters={"start_date":"${startDate}","end_date":"${endDate}"}`,
  );
};
