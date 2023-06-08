import { apiMethod } from '../configs/constants';
import axios from '../services/axiosInterceptor';
import { message } from 'antd';

export const dummyRequest = (response) => {
  // console.log("check response", response);
  setTimeout(() => {
    response.onSuccess('ok');
  }, 0);
};

export const uniquiFileName = (name, cat) => {
  let replaceAbleKey = '';
  if(cat) {
    if (cat.includes('Proof of English')) {
      replaceAbleKey = `Proof_of_English_${Date.now() + String(Math.random().toString().slice(2, 4))}_${name}`;  
    } else {
      replaceAbleKey = `${cat.replaceAll(" ", "_")}_${Date.now() + String(Math.random().toString().slice(2, 4))}_${name}`;
    }
  } else {
    replaceAbleKey = `File_${Date.now() + String(Math.random().toString().slice(2, 4))}_${name}`;
  }
  return replaceAbleKey;
};

export const getFileName = (url) => {
  if (url) {
    var filename = url.substring(url.lastIndexOf('/') + 1);
    return filename;
  }
};

const readeFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

let uploadUrl = `${apiMethod}/marketing.api.uploadImageToken`;

export const getSingleUpload = async (name, type, file, doctype, code) => {
  const fileObj = await readeFile(file);
  const postJson = {
    doctype: doctype,
    docname: code,
    filename: name, // filename
    is_private: 0,
    docfield: type, // document or image
    cmd: 'uploadfile',
    from_form: 1,
    filedata: fileObj, // file object
  };
  try {
    let res = await axios.post(uploadUrl, postJson);
    return res.data.message;
  } catch (e) {
    console.log('Err', e);
    return false;
  }
};

export const generateTree = (data) => {
  var dictonary = data.reduce((p, c) => {
    p[c.revision_no] = c;
    return p;
  }, {});
  var parentList2 = data.reduce(function (p, c) {
    if (c.revision_no_reference == null) {
      p.push(c);
    } else {
      if (!dictonary[c.revision_no_reference].children) {
        dictonary[c.revision_no_reference].children = [];
      }

      dictonary[c.revision_no_reference].children.push(c);
    }
    return p;
  }, []);
  return parentList2;
};

export const onBeforeUploadFile = (src, type, name, setValue, index, parent) => {
  if (type == 'image') {
    if (src.file.type != 'image/jpeg' && src.file.type != 'image/png') {
      message.error({ content: 'Only JPG & PNG files accepted', key: 'img' });
      setValue(name, '');
    }
  } else if (type == 'pdf') {
    if (src.file.type != 'application/pdf') {
      message.error({ content: 'Only pdf with max 10MB size file accepted', key: 'pdf' });
      parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
    } else {
      if (src.file.size / 1024 / 1024 > 10) {
        message.error({ content: 'Only pdf with max 10MB size file accepted', key: 'pdf' });
        parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
      }
    }
  } else  if (type == 'pdfimage') {
    if (src.file.type != 'application/pdf' && src.file.type != 'image/jpeg' && src.file.type != 'image/png') {
      message.error({ content: 'Only pdf with max 10MB size file or Image accepted', key: 'pdfimage' });
      parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
    } else {
      if (src.file.size / 1024 / 1024 > 10) {
        message.error({ content: 'Max 10MB size file accepted', key: 'pdfimage' });
        parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
      }
    }
  }
};

export const formatCurrency = (value) => {
  return `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\.00$/, '')}`;
};

let uploadUrlPrivate = `${apiMethod}/marketing.api.uploadImageToken?is_private=0`;

export const getSingleUploadPrivate = async (name, type, file, doctype, code) => {
  const fileObj = await readeFile(file);
  const postJson = {
    doctype: doctype,
    docname: code,
    filename: name, // filename
    is_private: 0,
    docfield: type, // document or image
    cmd: 'uploadfile',
    from_form: 1,
    filedata: fileObj, // file object
  };
  try {
    let res = await axios.post(uploadUrlPrivate, postJson);
    return res.data.message;
  } catch (e) {
    console.log('Err', e);
    return false;
  }
};


export const getSignedURL = async (name, cat, file) => {
  let surl = `${apiMethod}/registry.api.upload_files_to_awss3`;
  let fildata = await readeFile(file)
  let baseFile = fildata.substr(fildata.indexOf(',') + 1);
  const postJson = {
    filename: name,
    filedata: baseFile,
    category: cat
  };
  try {
    let res = await axios.post(surl, postJson);
    return res.data.message;
  } catch (e) {
    console.log('Err', e);
    return false;
  }
};

export const uploadFile = async (fileinput, cat, ocat) => {
  let fileObj = null;
  if (fileinput.fileList[0].uid != '-1') {
    let modifiedName = uniquiFileName(fileinput?.file?.originFileObj.name, ocat ? ocat : cat);
    let res = await getSignedURL(
      modifiedName,
      cat,
      fileinput?.file?.originFileObj,
    );
    fileObj = { item: cat, attached_document: res?.filepath };
    return fileObj;
  } else {
    fileObj = {
      item: cat,
      attached_document: fileinput.fileList[0].url,
    };
    return fileObj;
  }
}