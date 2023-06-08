import * as action_types from "./constants";

const initialState = {
    applicationList: [],
    applicationCount: [],
    applicationProg: [],
    applicationProgDetail: [],
    totalStudentEnrolled: [],
    eligibilityAssessmentData: [],
    incompleteRegistrationsData: [],
    pendingVisaData: [],
    pendingAccomodationData: [],
    pendingEnrollmentData: [],
    appDetailData: [],
    stepDetailData: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.APPLICATION_LEADS:
            return {...state, applicationList: data };
        case action_types.APPLICATION_COUNT:
            return {...state, applicationCount: data };
        case action_types.APPLICATION_PROG:
            return {...state, applicationProg: data };
        case action_types.APPLICATION_PROG_DETAIL:
            return {...state, applicationProgDetail: data };
        case action_types.TOTAL_STUDENT_ENROLLED:
            return {...state, totalStudentEnrolled: data };

        case action_types.ELIGIBILITY_ASSESSMENT:
            return {...state, eligibilityAssessmentData: data };    
        case action_types.INCOMPLETE_REGISTRATIONS:
            return {...state, incompleteRegistrationsData: data };    
        case action_types.PENDING_VISA:
            return {...state, pendingVisaData: data };    
        case action_types.PENDING_ACCOMODATION:
            return {...state, pendingAccomodationData: data };    
        case action_types.PENDING_ENROLLMENT:
            return {...state, pendingEnrollmentData: data };

        case action_types.APPLICATION_DETAIL:
            return {...state, appDetailData: data };

        case action_types.STEPS_DETAIL_DATA2:
            return {...state, stepDetailData2: data };

        default:
            return state;
    }
};