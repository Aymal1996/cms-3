import * as action_types from "./constants";

const initialState = {
    scholarshipList: [],
    scholarshipDropList: [],
    outstandingPayment: [],
    outstandingTotalPayment: [],
    studentList: [],
    scholorshipSingleData: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.SCHOLARSHIP_LIST:
            return {...state, scholarshipList: data };
        case action_types.SCHOLARSHIP_TYPE_DROP:
            return {...state, scholarshipDropList: data };
        case action_types.OUTSTANDING_PAYMENT:
                return {...state, outstandingPayment: data };
        case action_types.OUTSTANDING_TOTAL_PAYMENT:
            return {...state, outstandingTotalPayment: data };
        case action_types.STUDENT_LIST:
            return {...state, studentList: data };
        case action_types.SCHOLARSHIP_SINGLE_DATA:
            return {...state, scholorshipSingleData: data };
        default:
            return state;
    }
};