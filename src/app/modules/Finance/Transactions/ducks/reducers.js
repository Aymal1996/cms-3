import * as action_types from "./constants";

const initialState = {
    scholarshipDrop: [],
    grantDrop: [],
    countryRank: {},
    allBalances: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.SCHOLARSHIPDROP:
            return {...state, scholarshipDrop: data };
        case action_types.GRANTDROP:
            return {...state, grantDrop: data };
        case action_types.COUNTRY_RANK:
            return {...state, countryRank: data };
        case action_types.ALL_BALANCES:
            return {...state, allBalances: data };
            
        default:
            return state;
    }
};