import * as action_types from "./constants";

const initialState = {
    scholarshipsCard: {},
    scholarshipsList: {},
    scholarshipsPendingCard: {},
    scholarshipsPendingList: {},
    applicantCard: {},
    applicantList: {},
    studentCard: {},
    studentList: {},
    studentRequestsFinance: {},
    grantsCard: {},
    grantsList: {},
    grantPaymentHistory: {},
    transactionList: {},
    transactionListCash: {},
    studentNames:{},
    studentIds:{},
    transactionDetail:{},
    grantRequests: [],
    scholarRequests: [],
    fees:[],
    countryList:[],
    sortlist: []
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.FINANCE_SCHOLARSHIP_CARD:
            return {...state, scholarshipsCard: data };
        case action_types.FINANCE_SCHOLARSHIP_LIST:
            return {...state, scholarshipsList: data };
        case action_types.FINANCE_SCHOLARSHIP_PENDING_CARD:
            return {...state, scholarshipsPendingCard: data };
        case action_types.FINANCE_SCHOLARSHIP_PENDING_LIST:
            return {...state, scholarshipsPendingList: data };
        case action_types.FINANCE_APPLICANT_CARD:
            return {...state, applicantCard: data };
        case action_types.FINANCE_APPLICANT_LIST:
            return {...state, applicantList: data };
        case action_types.FINANCE_STUDENT_CARD:
            return {...state, studentCard: data };
        case action_types.FINANCE_STUDENT_LIST:
            return {...state, studentList: data };
        case action_types.FINANCE_STUDENT_REQUESTS:
            return {...state, studentRequestsFinance: data };
        case action_types.FINANCE_GRANTS_CARD:
            return {...state, grantsCard: data };
        case action_types.FINANCE_GRANTS_LIST:
            return {...state, grantsList: data };
        case action_types.FINANCE_GRANT_PAYMENT_DETAIL:
            return { ...state, grantPaymentHistory: data };
        case action_types.FINANCE_TRANSACTION_LIST:
            return {...state, transactionList: data };
        case action_types.DROPDOWN_STUDENT_NAME:
            return { ...state, studentNames: data };
        case action_types.DROPDOWN_STUDENT_ID:
            return { ...state, studentIds: data };
        case action_types.FINANCE_TRANSACTION_CASH_LIST:
            return { ...state, transactionListCash: data };
        case action_types.FINANCE_TRANSACTION_DETAIL:
            return { ...state, transactionDetail: data };         
        case action_types.FINANCE_GRANT_REQUEST:
            return { ...state, grantRequests: data };
        case action_types.FINANCE_SCHOLARSHIP_REQUEST:
            return { ...state, scholarRequests: data };   
        case action_types.REGISTRATION_FEE:
            return { ...state, fees: data };   
        case action_types.EMPTY_OTHER_REQ:
            return { ...state, scholarRequests: [], grantRequests: [] };
        case action_types.EMPTY_TRANS:
            return {...state, transactionDetail: {} };
        case action_types.COUNTRY_BYFEE:
            return { ...state, countryList: data };
        case action_types.SORTING_LIST:
            return { ...state, sortlist: data };
        case action_types.EMPTY_FINANCE_LIST:
            return { ...state, ...initialState };
            
        default:
            return state;
    }
};