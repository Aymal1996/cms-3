import * as action_types from "./constants";

const initialState = {
    pendingIssue: {},
    complaintList: {},
    complaintCard: {},
    issuesCard: {},
    issuesList: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.STUDENT_PENDING_ISSUES:
            return {...state, pendingIssue: data };
        case action_types.STUDENT_COMPLAINTS_LIST:
            return {...state, complaintList: data };  
        case action_types.STUDENT_COMPLAINTS_CARD:
            return {...state, complaintCard: data };
        case action_types.STUDENT_ISSUES_CARD:
            return {...state, issuesCard: data };
        case action_types.STUDENT_ISSUES_LIST:
            return {...state, issuesList: data };
        default:
            return state;
    }
};