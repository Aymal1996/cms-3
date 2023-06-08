import * as action_types from "./constants";

const initialState = {
    moduleList: [],
    module: {},
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.MODULE_LIST:
            return {...state, moduleList: data };
        case action_types.SINGLE_MODULE:
            return {...state, module: data };
        default:
            return state;
    }
};