import * as action_types from "./constants";

const initialState = {
  teamMarketingList: [],
  forYouList: []
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.TEAM_UPDATES_MARKETING:
      return { ...state, teamMarketingList: data };
    case action_types.FORYOU_UPDATES_MARKETING:
      return { ...state, forYouList: data };
    default:
      return state;
  }
};