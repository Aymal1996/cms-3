import * as action_types from './constants';
const initialState = {
  tabClose: false,
  overallFinanceData: [],
  overallFinanceListData: [],
  financeDetailData: [],
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.CHANGE_TAB:
      return { ...state, tabClose: data };
    case action_types.OVERALL_FINANCE:
      return { ...state, overallFinanceData: data };
    case action_types.FINANACE_DETAIL:
      return { ...state, financeDetailData: data };
    case action_types.OVERALL_FINANCE_LIST:
      return { ...state, overallFinanceListData: data };
    default:
      return state;
  }
};
