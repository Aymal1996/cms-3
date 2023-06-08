import * as action_types from "./constants";

const initialState = {
    requestListPending: [],
    requestListArchive: [],
    requestListYourRequest: [],
    formList: []
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.REQUEST_LIST_PENDING:
            return {...state, requestListPending: data };
        case action_types.REQUEST_LIST_ARCHIVE:
            return {...state, requestListArchive: data };
        case action_types.REQUEST_LIST_YOUR_REQUEST:
            return {...state, requestListYourRequest: data };
        case action_types.FORMS_LIST:
            return {...state, formList: data };
        default:
            return state;
    }
};