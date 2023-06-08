import * as action_types from "./constants";

const initialState = {
    allpublicationlist: [],
    publicationlist_by_status: [],
	publicationallgraph: [],
    publicationmygraph: [],
    programes: [],
    publicationsingledata: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.OVERALL_PUBLICATIONS_LIST:
            return {...state, allpublicationlist: data};
            case action_types.PUBLICATIONS_LIST_BY_STATUS:
                return {...state, publicationlist_by_status: data};
			 case action_types.PUBLICATION_SINGLE:
      return { ...state, publicationsingledata: data };
      case action_types.PUBLICATIONS_OVERALL_GRAPH:
        return { ...state, publicationallgraph: data };
      case action_types.PUBLICATIONS_MY_GRAPH:
        return { ...state, publicationmygraph: data };
        case action_types.PROGRAM_LIST:
        return { ...state, programes: data }
        default:
            return state;
    }s
};



