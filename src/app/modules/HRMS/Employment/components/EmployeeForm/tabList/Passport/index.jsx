import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { employApi } from '../../../../ducks/services';
import MainForm from './MainForm';
import { getFileName, getSingleUpload, uniquiFileName } from '../../../../../../../../features/utility';
import { baseUrl } from '../../../../../../../../configs/constants';

export default (props) => {

  const { mode, data, updateApi, id, setLoad, controlOut, errorsOut, idState } = props;
  const { control: controlIn, errors: errorsIn, setValue: setValueIn, handleSubmit: handleSubmitIn } = useForm();

  useEffect(() => {
    if(mode ==  'edit' && data && Object.keys(data).length > 0) {
      setValueIn('passport_number', data?.passport_number);
      setValueIn('passport_status', {label: data?.passport_status, value: data?.passport_status});
      setValueIn('date_of_issue', data?.date_of_issue ? moment(data?.date_of_issue, 'YYYY MM DD') : '');
      setValueIn('valid_upto', data?.valid_upto ? moment(data?.valid_upto, 'YYYY MM DD') : '');
      setValueIn('employment_pass_no', data.employment_pass_no);
      setValueIn('emp_pass_expiration_date', data?.emp_pass_expiration_date ? moment(data?.emp_pass_expiration_date, 'YYYY MM DD') : '');
      setValueIn('attach_passport', data?.attach_passport ? {fileList: [{uid: '-1', name: getFileName(data?.attach_passport), status: 'done', url: `${baseUrl}${data?.attach_passport}`}]} : '');
    }
  }, [data]);

  const onFinish = async (val) => {
    setLoad(true);
    let passportImg = '';
    if (val?.attach_passport) {
      if (val?.attach_passport.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val?.attach_passport?.file?.originFileObj.name)
        let res = await getSingleUpload(modifiedName, 'image',  val.attach_passport?.file?.originFileObj, 'Employee', id);
        passportImg = res?.file_url;
      } else {
        passportImg = val.attach_passport.fileList[0].url
      }
    }
    const body = {
        passport_number: val.passport_number,
        passport_status: val.passport_status.value,
        date_of_issue: val.date_of_issue,
        valid_upto: val.valid_upto,
        employment_pass_no: val.employment_pass_no,
        emp_pass_expiration_date: val.emp_pass_expiration_date != 'Invalid date' ? val.emp_pass_expiration_date : '',
        attach_passport: passportImg
    }

    employApi(body, id).then(res => {
      setLoad(false);
      updateApi();
      message.success('Medical Record Successfully Saved')
    }).catch(e => {
      console.log(e);
      setLoad(false);
      message.error(e);
    });
  }

  return (
    <>
    {mode == 'edit' ?
    <Form layout='vertical' onFinish={handleSubmitIn(onFinish)} scrollToFirstError>
      <MainForm control={controlIn} errors={errorsIn} mode={mode} idState={idState} />
    </Form>
    : 
    <MainForm control={controlOut} errors={errorsOut} mode={mode} idState={idState} />}
    </>
  );
};