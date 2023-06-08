import * as action_types from "./constants";

const initialState = {
    employeeProfileData: [],
    singleSkillsData: [],
    fitFigures: {},
    employeeDocuments: []
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.PROFILE_DATA:
            return {...state, employeeProfileData: data };
        case action_types.SINGLE_SKILLS:
            return {...state, singleSkillsData: data };
        case action_types.FITINDEX_DETAILS:
            return { ...state, fitFigures: data };
        case action_types.EMPLOYEE_DOCUMENTS:
            return { ...state, employeeDocuments: data };
        default:
            return state;
    }
};