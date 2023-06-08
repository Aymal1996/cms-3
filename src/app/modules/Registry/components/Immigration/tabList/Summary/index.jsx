import React, { Fragment, useEffect, useState } from 'react';
import { Row, Form, Col, Typography, Button, Spin, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';
import { useForm } from 'react-hook-form';
import ListCard from 'Molecules/ListCard';
import moment from 'moment';
import { getFileName, uploadFile } from '../../../../../../../features/utility';
import { LoadingOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import { getCountryDrop } from '../../../../../Marketing/Applications/ducks/actions';
import { addVisaRenewal } from '../../../../../Visa/ducks/services';
import { DownloadIcon } from '../../../../../../atoms/CustomIcons';
import { prevDoc, updateDocs } from '../../../../../StudentFile/ducks/services';
import { getApplicationDetial } from '../../../../../Marketing/ducks/actions';
import { getStudentdetails } from '../../../../Students/ducks/actions';

const { Title } = Typography;
const _ = require('lodash');
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.students.studentAppData);
  const country = useSelector((state) => state.applicationForm.countryData);
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const [visible, setVisible] = useState(false);

  const formFields = [
    {
      name: 'icpassport',
      label: 'IC/Passport Number',
      req: true,
      static: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      colWidth: '1 0 240px',
      reqmessage: '',
    },
    {
      name: 'issuing_country',
      label: 'Passport Issuing Country',
      req: true,
      static: false,
      placeholder: 'Please state',
      type: 'select',
      options: _.map(country, (e) => ({ label: e.name, value: e.name })),
      twocol: false,
      colWidth: '1 0 240px',
      reqmessage: '',
    },
    {
      name: 'passport_issue_date',
      label: 'Passport Issue Date',
      req: true,
      static: false,
      placeholder: '',
      type: 'date',
      twocol: false,
      colWidth: '1 0 240px',
      reqmessage: '',
      format: 'Do MMMM YYYY',
    },
    {
      name: 'passport_expiry',
      label: 'Passport Expiry Date',
      req: true,
      static: false,
      placeholder: '',
      type: 'date',
      twocol: false,
      colWidth: '1 0 240px',
      reqmessage: '',
      format: 'Do MMMM YYYY',
    },
    {
      name: 'passport_filepath',
      label: 'IC/Passport (Scanned)',
      req: true,
      static: false,
      placeholder: 'Upload',
      type: 'upload',
      twocol: false,
      colWidth: '1 0 240px',
      reqmessage: 'Passport scanned required',
    },
  ];

  useEffect(() => {
    dispatch(getCountryDrop());
  }, []);

  const callApi = () => {
    dispatch(getStudentdetails(data.applicant_id));
  };

  const previewDoc = async (docname, url) => {
    setLoad(true);
    let fileurl = '';
    await prevDoc(data?.applicant_id, docname, url)
      .then((res) => {
        fileurl = res.data.message;
        setLoad(false);
        window.open(fileurl, '_blank');
      })
      .catch((err) => {
        setLoad(false);
        message.error('Something went worng');
        console.log('something went worng');
      });
  };

  useEffect(() => {
    if (data) {
      // setValue('icpassport', data.icpassport);
      // setValue('passport_expiry', data.passport_expiry ? moment(data.passport_expiry, 'YYYY-MM-DD') : '');
      // setValue('passport_issue', data.passport_issue);
      // setValue('issuing_country', data.issuing_country);
      // setValue(
      //   'ic_scanned',
      //   data.ic_scanned
      //     ? {
      //         fileList: [
      //           {
      //             uid: '-1',
      //             name: getFileName(data?.ic_scanned),
      //             status: 'done',
      //             url: data.ic_scanned,
      //             s3: 'IC/Passport (Scanned)',
      //             aid: data?.applicant_id,
      //           },
      //         ],
      //       }
      //     : '',
      // );
    }
  }, [data]);

  const addNew = () => {
    setVisible(true);
  };

  const colName = [
    {
      title: 'Passport No.',
      dataIndex: 'passport_no',
      key: 'passport_no',
    },
    {
      title: 'Country',
      dataIndex: 'country_name',
      key: 'country_name',
    },
    {
      title: 'Issue',
      dataIndex: 'passport_issue_date',
      key: 'passport_issue_date',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
    },
    {
      title: 'Expiry',
      dataIndex: 'passport_expiry',
      key: 'passport_expiry',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
    },
    {
      title: 'Status',
      dataIndex: 'passport_status',
      key: 'passport_status',
    },
    {
      title: 'View',
      dataIndex: 'passport_filepath',
      key: 'passport_filepath',
      align: 'center',
      width: 150,
      render: (text) => (
        <>
          {text ? (
            <Button
              type="link"
              onClick={() => previewDoc('Passport Pages with certified true copy', text)}
              htmlType="button"
              className="p-0"
              icon={<DownloadIcon className="c-success" />}
            />
          ) : (
            'N/A'
          )}
        </>
      ),
    },
  ];

  const onFinish = async (val) => {
    setLoad(true);
    let passport = '';

    if (val?.passport_filepath) {
      let file = await uploadFile(val.passport_filepath, 'Passport Pages with certified true copy');
      passport = file.attached_document;
    }

    let body = {
      student_id: data.applicant_id,
      type: 'passport',
      passport_no: val?.icpassport,
      passport_expiry: moment(val?.passport_expiry).format('YYYY-MM-DD'),
      passport_country: val?.issuing_country.value,
      passport_issue_date: moment(val?.passport_issue_date).format('YYYY-MM-DD'),
      passport_filepath: passport,
    };
    let doc = [
      {
        item: 'Passport Pages with certified true copy',
        file_url: passport,
        document_date: moment().format('YYYY-MM-DD'),
      },
    ];

    const body1 = {
      doctype: 'Students',
      student_id: data.applicant_id,
      files: doc,
    };

    addVisaRenewal(body)
      .then((res) => {
        updateDocs(body1)
          .then((res) => {
            setLoad(false);
            message.success('Passport Added Successfully');
            setTimeout(() => {
              callApi();
              setVisible(false);
            }, 1000);
          })
          .catch((e) => {
            const { response } = e;
            console.log('response', response);
            message.error(response?.data?.status?.message ?? 'Something went wrong');
            setLoad(false);
          });
      })
      .catch((e) => {
        const { response } = e;
        console.log('error', response);
        setLoad(false);
        message.error('Something went wrong');
      });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      {!visible ? (
        <ListCard
          scrolling={500}
          title="Passport"
          ListCol={colName}
          ListData={
            (data?.passport_and_visa &&
              data?.passport_and_visa.length &&
              data?.passport_and_visa?.filter((x) => !x?.visa_no)) ||
            []
          }
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            hideOnSinglePage: true,
          }}
          extraBtn={'+ Add Passport'}
          extraAction={addNew}
          btnClass="green-btn"
          listClass="nospace-card"
          classes="clickRow"
        />
      ) : (
        <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Row gutter={[20, 30]} align="bottom">
            <Col span={24}>
              <Row gutter={[20, 20]}>
                <Col flex="auto">
                  <Title level={4} className="mb-0 c-default">
                    Passport
                  </Title>
                </Col>
                <Col>
                  <Button
                    type="link"
                    className="c-gray-linkbtn p-0"
                    onClick={() => setVisible(false)}
                    htmlType="button"
                  >
                    <LeftOutlined /> Summary
                  </Button>
                </Col>
              </Row>
            </Col>

            {formFields.map((item, index) => (
              <Fragment key={index}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            <Col span={24}>
              <Row gutter={[20, 20]} justify="center">
                <Col>
                  <Button type="primary" htmlType="submit" size="large" className="green-btn">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      )}
    </Spin>
  );
};
