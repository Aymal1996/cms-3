import * as action_types from "./constants";

const initialState = {
    alltimetablelist: [],
    timetableDetails: [],
    unassignModules: [],
    classroomTypes: [],
    classrooms: [],
    unassignedStud: [],
    lecturerT: []
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.TIMETABLE_LIST:
            return {...state, alltimetablelist: data}; 
            case action_types.TIMETABLE_DETAILS:
                return {...state, timetableDetails: data}; 
            case action_types.UNASSIGN_MODULES:
                return {...state, unassignModules: data}; 
            case action_types.CLASSROOM_TYPE:
                    return {...state, classroomTypes: data};     
             case action_types.CLASSROOMS:
                        return {...state, classrooms: data};    
            case action_types.UNASSIGNED_STUDENTS:
                return {...state, unassignedStud: data};
            case action_types.TIMETABLE_LECTURERS:
                return {...state, lecturerT: data};    
            case action_types.RESET_TIMETABLE:
                return {...state, lecturerT: [], unassignedStud: [], classrooms: [], classroomTypes: [], timetableDetails: []};    
                
                        
        default:
            return state;
    }
};



