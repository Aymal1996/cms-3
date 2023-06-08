import * as action_types from "./constants";

const initialState = {
    termList: [],
    termDetail: [],
    calendarCourseList: [],
    courseTypeList: [],
    termDetailProgrammeList: [],
    programmeDropList: [],
    studentListData: [],
    programmeListData: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.TERM_LIST:
            return {...state, termList: data };
        case action_types.CALENDAR_COURSE_LIST:
            return {...state, calendarCourseList: data };
        case action_types.TERM_DETAIL:
            return {...state, termDetail: data };
        case action_types.COURSE_GROUP_TYPE:
            return {...state, courseTypeList: data };
        case action_types.TERM_DETAIL_PROGRAMME_LIST:
                return {...state, termDetailProgrammeList: data };    
        case action_types.PROGRAMME_DROP_LIST:
            return {...state, programmeDropList: data };
            
        case action_types.PROGRAMME_LIST:
            return {...state, programmeListData: data };  

            case action_types.STUDENT_LIST:
            return {...state, studentListData: data };  
        default:
            return state;
    }
};