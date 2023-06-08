import { message } from "antd";
import { baseUrl } from "../../../../../configs/constants";
import { deletePolicy, policyViewUpdate } from "../ducks/services";

export const deleteAction = (name, apiCall, loader) => {
    loader(true);
    deletePolicy(name).then(res => {
      loader(false);
      if (res.data.message.success == true) {
        message.success(res.data.message.message);
        apiCall();
      } else {
        message.error(res.data.message.message);
      }
    }).catch(e => {
      const { response } = e;
      message.error(response.data.message);
      loader(false);
    })
};

export const viewAction = async (data, apiCall) => {

    const attachment = data?.attachment;
    attachment && window.open(`${baseUrl}${attachment}`, "_blank");

    const json = {
      policy_list: [
        {
          policy_title: data?.policy_title,
          name: data?.name,
          attachment: attachment,
          policy_status: 'Viewed',
          policy_user_group: data?.roles
        }
      ]
    }

    policyViewUpdate(json).then(res => {
      apiCall();
    }).catch(e => {
      const { response } = e;
      message.error(response?.data?.message);
    })
  }