import * as action_types from "./constants";

const initialState = {
    formListData: [],
    fieldsData: [],
    departmentList: [],
    approvalList: [],
    formdetail: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.FORMS_LISTING:
            return {...state, formListData: data };  
        case action_types.FORMS_FIELDS:
            return {...state, fieldsData: data };  
        case action_types.FORMS_DEPARTMENTS:
            return {...state, departmentList: data };  
        case action_types.DEPARTMENT_APPROVAL:
            return {...state, approvalList: data };
        case action_types.FORM_DETAILS:
            return {...state, formdetail: data };
        case action_types.EMPTY_FORMS:
            return {...state, formdetail: data };

        default:
            return state;
    }
};