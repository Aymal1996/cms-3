import * as action_types from "./constants";

const initialState = {
    countryData: [],
    nationalityData: [],
    religionData: [],
    raceData: [],
    appTypeData: [],
    genderData: [],
    engQualificationData: [],
    progData: [],
    councelorData: [],
    sources: [],
    balanceBreakdown: {},
    balanceHistory:  {},
    modules: [],
    agentUsers: [],
    agentAllUsers: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.COUNTRY:
            return {...state, countryData: data };
        case action_types.NATIONALITY:
            return {...state, nationalityData: data };
        case action_types.RELIGION:
            return {...state, religionData: data };
        case action_types.RACE:
            return {...state, raceData: data };
        case action_types.APPLICATION_TYPE:
            return {...state, appTypeData: data };
        case action_types.GENDER:
            return {...state, genderData: data };
        case action_types.ENG_QUALIFICATION:
            return {...state, engQualificationData: data };
        case action_types.PROGRAMME_NAME:
            return {...state, progData: data };
        case action_types.SOURCE_NAME:
                return {...state, sources: data };
        case action_types.COUNCELOR:
            return {...state, councelorData: data };
        case action_types.BREAKDOWN_BALANCE_APPLICANT:
            return {...state, balanceBreakdown: data };
        case action_types.BALANCE_HISTORY_APPLICANT:
            return {...state, balanceHistory: data };
        case action_types.ALL_MODULES_PROGRAM:
            return {...state, modules: data };
        case action_types.EMPTY_ALL_APPFORM:
            return {...state, modules: []};

        case action_types.AGENT_USER:
            return {...state, agentUsers: data};
        case action_types.AGENT_ALL_USER:
            return {...state, agentAllUsers: data};
            
        default:
            return state;
    }
};