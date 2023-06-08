import * as action_types from "./constants";

const initialState = {
    programmeStatus: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.PROGRAMME_STATUSES:
            return {...state, programmeStatus: data };
            
        default:
            return state;
    }
};