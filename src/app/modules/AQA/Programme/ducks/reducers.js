import * as action_types from "./constants";

const initialState = {
    programmeList: [],
    programmeListFAC: {},
    program: {},
    version: [],
    module: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.PROGRAMME_LIST:
            return {...state, programmeList: data };
        case action_types.PROGRAMME_LIST_FAC:
            return {...state, programmeListFAC: data };
        case action_types.PROGRAMME_LIST_FILTER:
            return {...state, programmeList: data };
        case action_types.EMPTY_PROGRAMME_LIST:
            return {...state, programmeList: data };


        case action_types.SINGLE_PROGRAMME:
            return {...state, program: data };
        case action_types.SINGLE_VERSION:
            return {...state, version: data };
        case action_types.ALL_MODULES:
            return {...state, module: data };
        case action_types.EMPTY_PROGRAMME:
            return {...state, program: data };

        default:
            return state;
    }
};