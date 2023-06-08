import * as action_types from "./constants";

const initialState = {
    schedule: [],
    modules: [],
    moduleStudents: [],
    replacementClass: [],
    attendance: [],
    timetable: [],
    material: [],
    assessment: {},
    assessmentDetails: {},
    lecturerAttendance: [],
    studentAttendance: {},
    studentListPHD: {},
    assessmentDetailsPHD: {},
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.SCHEDULE:
            return {...state, schedule: data };
        case action_types.REPLACEMENT_CLASS:
            return {...state, replacementClass: data };
        case action_types.MODULE_FACTS:
            return {...state, modules: data };
        case action_types.UNGRADEDSTUDENT_MODULE_LISTS:
            return {...state, moduleStudents: data };
        case action_types.MODULE_ATTENDANCE:
            return {...state, attendance: data };
        case action_types.MODULE_TIMETABLE:
            return {...state, timetable: data };
        case action_types.MODULE_MATERIAL:
            return {...state, material: data };
        case action_types.MODULE_ASSESSMENT:
            return {...state, assessment: data };
        case action_types.MODULE_ASSESSMENT_DETAILS:
            return {...state, assessmentDetails: data };
        case action_types.LECTURER_ATTENDANCE:
            return {...state, lecturerAttendance: data };
        case action_types.STUDENT_ATTENDANCE:
            return {...state, studentAttendance: data };
        case action_types.MODULE_ASSESSMENT_PHD:
            return {...state, studentListPHD: data };
        case action_types.MODULE_ASSESSMENT_DETAILS_PHD:
            return {...state, assessmentDetailsPHD: data };
            
        default:
            return state;
    }
};