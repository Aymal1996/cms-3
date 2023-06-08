import axios from '../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../configs/constants';
import * as action_types from './constants';
 

export const getAuditStudentList = (status, page, limit, order, orderby, search = null, doc=null, stat=null, loader) => {
  return async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    let filtered = search;
    if(doc) {
      filtered = {...filtered, document: doc}
    }
    if(stat) {
      filtered = {...filtered, student_status: stat}
    }
    // if (search) {
    //   if (doc) {
    //     filtered = {...search, document: doc}
    //   } else {
    //     filtered = search;
    //   }
    // } else if(doc) {
    //   filtered={document: doc}
    // }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/registry.api.get_students_for_audit_per_mising_docs${status ? '?status=' + status : ''}${
        order && '&order=' + ordering + '&orderby=' + orderby
      }${page ? '&page_number=' + page : ''}${limit ? '&limit=' + limit : ''}${
        filtered ? '&filters=' + JSON.stringify(filtered) : ''
      }`,
    );
    loader && loader(false)
    dispatch({
      type: action_types.AUDIT_LIST,
      data: message,
    });
  };
};

export const resetAuditList = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.RESET_AUDIT_LIST,
      data: {},
    });
  };
};

export const pdfFileset = (file) => {
  return (dispatch) => {
    dispatch({
      type: action_types.PDF_FILE_SETTING,
      data: file,
    });
  };
};

export const getAuditedStudentList = (status, page, limit, order, orderby, search = null, load) => {
  return async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/registry.api.get_students_list_from_students_pagination_for_audited${status ? '?status=' + status : ''}${
        order && '&order=' + ordering + '&orderby=' + orderby
      }${page ? '&page_number=' + page : ''}${limit ? '&limit=' + limit : ''}${search ? '&filters='+JSON.stringify(search) : ''}`,
    );
    load && load(false);
    dispatch({
      type: action_types.AUDITED_LIST,
      data: message,
    });
  };
};

export const getMissingdocscount = (page, limit, load) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/registry.api.get_students_count_per_mising_docs?limit=${limit}&page_number=${page}`,
    );
    load && load(false)
    dispatch({
      type: action_types.MISSING_DOCS_COUNT,
      data: message,
    });
  };
};

export const getStatusCount = (page, limit, load) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/registry.api.get_students_count_by_student_status?limit=${limit}&page_number=${page}`,
    );
    load && load(false)
    dispatch({
      type: action_types.STUDENTBY_STATUS,
      data: message,
    });
  };
};

export const getdocumentList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/registry.api.fetch_documents_list`,
    );
    dispatch({
      type: action_types.DOCUMENT_LIST,
      data: message,
    });
  };
};