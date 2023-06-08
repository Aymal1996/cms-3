import React, { useEffect } from 'react';
import HeadingChip from 'Molecules/HeadingChip';
import { Col, Button, Form, Row, message } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, LeftOutlined } from '@ant-design/icons';
import { uniquiFileName, getSingleUpload, getFileName } from '../../../../../features/utility';
import { getGrantDetails } from '../ducks/actions';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { addUpdateGrant, updateFacultyStatus, updateFinanceStatus } from '../ducks/services';
import moment from 'moment';
import GrantForm from '../components/GrantForm';
import { baseUrl } from '../../../../../configs/constants';

export default (props) => {
   
  const { id } = useParams();
  const history = useHistory(); 
  const dispatch = useDispatch();
  const { control, errors, handleSubmit, setValue } = useForm();
  const grantData = useSelector((state) => state.grants.grantsingledata);

  useEffect(() => {
    dispatch(getGrantDetails(id));
  }, []);

  useEffect(() => { 
    if (Object.keys(grantData).length > 0) {
      setValue('grant_name', grantData.grant_name);
      setValue('grant_amount', grantData.grant_amount);
      setValue('source', grantData.source ? { label: grantData.source, value: grantData.source } : '');
      setValue('duration', grantData.duration ? { label: grantData.duration, value: grantData.duration } : '');
      setValue('grant_date', grantData?.grant_date ? moment(grantData?.grant_date, 'YYYY-MM-DD') : '');
      setValue('finance_verification', grantData?.finance_verification ? { label: grantData?.finance_verification, value: grantData?.finance_verification } : '');
      setValue('faculty_verification', grantData?.faculty_verification ? { label: grantData?.faculty_verification, value: grantData?.faculty_verification } : '');
      setValue('lecturer_id', grantData?.lecturer_id ? { label: grantData?.lecturer_name, value: grantData?.lecturer_id } : '');
      if (grantData?.attachment) {
        setValue('attachments',
            {
                fileList: [
                  {
                    uid: '-1',
                    name: getFileName(grantData?.attachment),
                    status: 'done',
                    url: `${baseUrl}${grantData?.attachment}`,
                  },
                ],
            }
        );
      }
    }
  }, [grantData]);

  // let grantStatus;
  // const grantStatusValue = grantData?.faculty_verification;

  // if (grantStatusValue =='Pending') {
  //   grantStatus = <CheckCircleFilled className="list-links"/>;
  // } else if (grantStatusValue =='Verified') {
  //   grantStatus = <CheckCircleFilled className="c-success"/>;
  // } else {
  //   grantStatus = <CloseCircleFilled className="error"/>;
  // }

  // let grantFinanceStatus;
  // const grantFinanceValue = grantData?.finance_verification;

  // if (grantFinanceValue =='Pending') {
  //   grantFinanceStatus = <CheckCircleFilled className="list-links"/>;
  // } else if (grantFinanceValue =='Verified') {
  //   grantFinanceStatus = <CheckCircleFilled className="c-success"/>;
  // } else {
  //   grantFinanceStatus = <CloseCircleFilled className="error"/>;
  // }

  const onFinish = async (value) => {
    props.setLoading(true);

    let fileurl= '';
    if (value.attachments) {
      if (value.attachments.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(value.attachments?.file?.originFileObj.name);
        let res = await getSingleUpload(
          modifiedName,
          'image',
          value.attachments?.file?.originFileObj,
        );
        fileurl = res?.file_url;
      } else {
        fileurl = value.attachments.fileList[0].url;
      }
    }

    const payload = {
      grants: [
        {
          name: grantData?.name,
          lecturer_id: value?.lecturer_id?.value,
		      grant_name: value?.grant_name,
          grant_date: value.grant_date,
          status: "Active",
          source: value?.source.value,
          duration: value?.duration.value,
          grant_amount: value?.grant_amount,
          attachment: fileurl ? fileurl.replace(`${baseUrl}`, "") : "",
          doctype: 'Grants',
        },
      ],
    };

    addUpdateGrant(payload).then(res => {
      updateFacultyStatus(id, value?.faculty_verification.value).then(x => {
        updateFinanceStatus(id, value?.finance_verification.value).then(y => {
          message.success('Grant Successfully Updated');
          setTimeout(() => history.push('/faculty/grants'), 1000);
        })
      })
    }).catch(e => {
      const {response} = e;
      message.error('Something went wrong');
      props.setLoading(false);
    })
}

  return (
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Button type="link" className="c-gray-linkbtn p-0 mt-1" onClick={() => history.goBack()} htmlType="button">
            <LeftOutlined /> Back
          </Button>		
        </Col>
        <Col span={24}>
          <HeadingChip title="Grant Details"/>
        </Col>
        <Col span={24}>
          <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
            <GrantForm
              control={control}
              errors={errors}
              mode="edit"
            />
          </Form>
        </Col>
      </Row>
    )
}