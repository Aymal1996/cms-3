import * as action_types from './constants';

const initialState = {
  all_calssroom: [],
  all_examhall: [],
  faculty_type: [],
  classroom_type: [],
  blocks: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.ALL_CALSSROOMS:
      return { ...state, all_calssroom: data };
    case action_types.ALL_EXAMSHALL:
      return { ...state, all_examhall: data };
    case action_types.FACLULTY_TYPE:
      return { ...state, faculty_type: data };
    case action_types.CLASSROOM_TYPE:
      return { ...state, classroom_type: data };
    case action_types.BLOCKS:
      return { ...state, blocks: data };
    default:
      return state;
  }
};
