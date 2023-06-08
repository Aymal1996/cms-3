import * as action_types from './constants';

const initialState = {
  searchData: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.SEARCH:
      return { ...state, searchData: data };

    default:
      return state;
  }
};
