import * as action_types from "./constants";

const initialState = {
    requestListPending: {},
    requestListArchive: {},
    requestListYourRequest: {},
    formList: [],
    requestData: [],
    fieldData: [],
    eStatus: []
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
        case action_types.REQUEST_DATA:
            return {...state, requestData: data };
        case action_types.FIELDS_LIST:
            return {...state, fieldData: data };
        case action_types.EMPTY_REQUEST_DATA:
            return {...state, requestData: [] };
        case action_types.EMPLOYEE_STATUS:
            return {...state, eStatus: data };
            
        default:
            return state;
    }
};