import * as action_types from "./constants";

const initialState = {
    sources: {},
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.SOURCE_LIST:
            return {...state, sources: data };
        case action_types.FORM_LISTING:
            return {...state, formList: data };
            
        default:
            return state;
    }
};