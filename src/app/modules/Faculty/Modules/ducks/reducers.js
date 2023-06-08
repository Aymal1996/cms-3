import * as action_types from "./constants";

const initialState = {
    facultyModuleList: {},
    moduleSummary: {},
    moduleLecturer: {},
    moduleStudents: {},
    moduleMaterial: {},
    moduleTimetable: {},
    moduleGraph: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.FACULTY_MODULES:
            return {...state, facultyModuleList: data };
        case action_types.MODULE_SUMMARY:
            return {...state, moduleSummary: data };
        case action_types.MODULE_LECTURER:
            return {...state, moduleLecturer: data };
        case action_types.MODULE_STUDENTS:
            return {...state, moduleStudents: data };
        case action_types.MODULE_MATERIALS:
            return {...state, moduleMaterial: data };
        case action_types.MODULE_TIMETABLE:
            return {...state, moduleTimetable: data };
        case action_types.MODULE_GRAPH:
            return {...state, moduleGraph: data };
            
        default:
            return state;
    }
};