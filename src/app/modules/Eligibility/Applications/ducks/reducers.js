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
        default:
            return state;
    }
};