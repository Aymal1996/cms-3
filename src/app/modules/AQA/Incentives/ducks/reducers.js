import * as action_types from "./constants";

const initialState = {
    intakeList: [],
    incentives: {},
    incentiveData: {},
    studentList: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.INTAKES_LIST:
            return {...state, intakeList: data };
        case action_types.INCENTIVE_LIST:
            return {...state, incentives: data };
        case action_types.INCENTIVE_DATA:
            return {...state, incentiveData: data };
        case action_types.INCENTIVE_STUDENT_LIST:
            return {...state, studentList: data };
        default:
            return state;
    }
};