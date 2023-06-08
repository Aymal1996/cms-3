import * as action_types from "./constants";

const initialState = {
    allgrantlist: [],
    grantlist_by_status: [],
	grantallgraph: [],
    grantmygraph: [],
    grantsingledata: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.OVERALL_GRANTS_LIST:
            return {...state, allgrantlist: data};
            case action_types.GRANTS_LIST_BY_STATUS:
                return {...state, grantlist_by_status: data};
			 case action_types.GRANT_SINGLE:
      return { ...state, grantsingledata: data };
      case action_types.GRANTS_OVERALL_GRAPH:
        return { ...state, grantallgraph: data };
      case action_types.GRANTS_MY_GRAPH:
        return { ...state, grantmygraph: data }
        default:
            return state;
    }
};



