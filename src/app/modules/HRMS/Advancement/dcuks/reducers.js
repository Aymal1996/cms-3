import * as action_types from './constants';

const initialState = {
  jobopen: {},
  applicantlist: {},
  fitindexlist: {},
  fitindexcard: {},
  advData: {},
  contractList: {},
  fitFigures: {},
  jobListAdv: [],
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.JOB_OPENING:
      return { ...state, jobopen: data };
    case action_types.SUITABLE_APPLICANTS:
      return { ...state, applicantlist: data };
    case action_types.EMPTY_APPLICANTS:
      return { ...state, applicantlist: data };
    case action_types.OVERALL_FITINDEX:
      return { ...state, fitindexlist: data };
    case action_types.OVERALL_FITINDEX_CARD:
      return { ...state, fitindexcard: data };
    case action_types.ADVANCEMENT_DETAILS:
      return { ...state, advData: data };
    case action_types.CONTRACTS_LIST:
      return { ...state, contractList: data };
    case action_types.FITINDEX_DETAILS:
      return { ...state, fitFigures: data };
    case action_types.EMPTY_STAFF_DETAILS:
      return { ...state, advData: {} };
    case action_types.JOBS_LIST_ADV:
      return { ...state, jobListAdv: data };
    default:
      return state;
  }
};
