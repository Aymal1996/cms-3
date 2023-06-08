import * as action_types from './constants';

const initialState = {
  overall_material: [],
  my_material: [],
  student_list: [],
  revision_list: [],
  material_name: '',
  tags: [],
  materialForm: '',
  materialEdit: '',
  //   all_examhall: [],
  //   faculty_type: [],
  //   classroom_type: [],
  //   blocks: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.OVERALL_MATERIAL:
      return { ...state, overall_material: data };
    case action_types.MY_MATERIAL:
      return { ...state, my_material: data };
    case action_types.STUDENT_LIST:
      return { ...state, student_list: data };
    case action_types.MATERIAL_NAME:
      return { ...state, material_name: data };
    case action_types.REVISION_LIST:
      return { ...state, revision_list: data };
    case action_types.TAGS:
      return { ...state, tags: data };
    case action_types.MATERIAL_FORM:
      return { ...state, materialForm: data };
    case action_types.MATERIAL_EDIT:
      return { ...state, materialEdit: data };
    // case action_types.ALL_EXAMSHALL:
    //   return { ...state, all_examhall: data };
    // case action_types.FACLULTY_TYPE:
    //   return { ...state, faculty_type: data };
    // case action_types.CLASSROOM_TYPE:
    //   return { ...state, classroom_type: data };
    // case action_types.BLOCKS:
    //   return { ...state, blocks: data };
    default:
      return state;
  }
};
