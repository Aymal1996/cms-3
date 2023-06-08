import * as action_types from "./constants";

const initialState = {
    facultyList: [],
    facultyList2: [],
    institutions: [],
    faculty: {},
    programmes: []
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.FACULTY_LIST:
            return {...state, facultyList: data };
        case action_types.FACULTY_LIST2:
            return {...state, facultyList2: data };
        case action_types.INTITUTION_LIST:
            return {...state, institutions: data };
        case action_types.SINGLE_FACULTY:
            return {...state, faculty: data };
        case action_types.PROGRAM_LIST:
            return {...state, programmes: data };
        default:
            return state;
    }
};