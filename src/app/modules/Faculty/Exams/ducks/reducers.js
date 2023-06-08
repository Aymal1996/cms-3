import * as action_types from "./constants";

const initialState = {
    allexamslist: [],
    allinvigilators: [],
    getallmodules: [],
    getallfaculties: [],
    getlecturehall: [],
    getallprogramme: [],
    getunassignexams: [],
    getunassignInvigilators: [],
    examsdetails: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.GET_EXAM_LIST:
            return {...state, allexamslist: data};
        case action_types.EXAM_SINGLE:
                return {...state, examsdetails: data};
                case action_types.EXAM_INVIGILATORS:
                    return {...state, allinvigilators: data};
                    case action_types.GET_MODULES:
                        return {...state, getallmodules: data};
                        case action_types.GET_FACULTIES:
                            return {...state, getallfaculties: data};
                            case action_types.GET_LECTUREHALL:
                                return {...state, getlecturehall: data};
                                case action_types.GET_PROGRAMME:
                                return {...state, getallprogramme: data};
                                case action_types.UNASSIGN_EXAMS:
                                    return {...state, getunassignexams: data};
                                    case action_types.UNASSIGN_INVIGILATORS:
                                        return {...state, getunassignInvigilators: data};

                                    
        default:
            return state;
    }
};



