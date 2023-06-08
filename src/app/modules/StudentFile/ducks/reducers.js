import * as action_types from './constants';

const initialState = {
  audited: {},
  audit: {},
  missingcount: {},
  docsList: [],
  studstatus:{},
  pdffile: null
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.AUDIT_LIST:
      return { ...state, audit: data };
    case action_types.AUDITED_LIST:
      return { ...state, audited: data };
    case action_types.MISSING_DOCS_COUNT:
      return { ...state, missingcount: data };
    case action_types.RESET_AUDIT_LIST:
      return { ...state, audit: {} };
    case action_types.DOCUMENT_LIST:
      return { ...state, docsList: data };
    case action_types.STUDENTBY_STATUS:
      return { ...state, studstatus: data };
    case action_types.PDF_FILE_SETTING:
      return { ...state, pdffile: data };
      
    default:
      return state;
  }
};
