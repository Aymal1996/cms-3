import axios from "../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiMethod } from "../../../../configs/constants";

const date = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
//const feedurl = `${apiMethod}/marketing.api.get_message?doc_name=AP000160&start_date=2021-01-01&end_date=${date}`

const userEmail = JSON.parse(localStorage.getItem('userdetails'))?.email;
const forYou = `${apiMethod}/marketing.api.get_all_user_tag_comments?user_tag=${userEmail}`;
// let forYou = `${apiMethod}/marketing.api.get_all_user_tag_comments`;
// if(localStorage.getItem('userdetails')){
  
// }

const feedurl = `${apiMethod}/marketing.api.get_all_timeline_update`;




export const getTeamUpdates = (body) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(feedurl,body);
    dispatch({
      type: action_types.TEAM_UPDATES_MARKETING,
      data: message,
    });
  };
};

export const getForYouUpdates = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(forYou);
    dispatch({
      type: action_types.FORYOU_UPDATES_MARKETING,
      data: message,
    });
  };
};