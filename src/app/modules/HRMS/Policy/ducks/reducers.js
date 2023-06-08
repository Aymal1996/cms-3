import * as action_types from "./constants";

const initialState = {
    policyListData: [],
    rolesListData: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.POLICY_LIST:
            return {...state, policyListData: data };
        case action_types.ROLES_LIST:
            return {...state, rolesListData: data };
        default:
            return state;
    }
};