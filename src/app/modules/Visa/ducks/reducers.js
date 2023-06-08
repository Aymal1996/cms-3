import * as action_types from './constants';

const initialState = {
    visaRenewalList: [],
    newVisaList: [],
    visaOverviewList: {},
    expiredList: {},
    expiryList: {}
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.VISA_RENEWAL_LIST:
      return { ...state, visaRenewalList: data };

    case action_types.NEW_VISA_LIST:
      return { ...state, newVisaList: data };

    case action_types.VISA_OVERVIEW:
      return { ...state, visaOverviewList: data };

    case action_types.VISA_EXPIRED_LIST:
      return { ...state, expiredList: data };

    case action_types.VISA_EXPIRY_LIST:
      return { ...state, expiryList: data };
    case action_types.EMPTY_VISA_LIST:
      return { ...state, expiryList: {}, expiredList:{}, visaOverviewList:{}, newVisaList: {} };

    default:
      return state;
  }
};
