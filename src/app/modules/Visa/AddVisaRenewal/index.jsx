import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Button, Spin, Form, Typography, message } from 'antd';
import StudentTemp from '../../Registry/Students/StudentTemp';
import { useHistory, useLocation, useParams } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import FormGroup from 'Molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getFileName, uploadFile } from '../../../../features/utility';
import moment from 'moment';
import { addVisaRenewal } from '../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { updateDocs } from '../../StudentFile/ducks/services';

const { Title } = Typography;
const _ = require('lodash');
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const subkey = location.pathname.split('/')[3];
  const [load, setLoad] = useState(false);
  const apiData = useSelector((state) => state.students.studentAppData);
  const { control, errors, setValue, handleSubmit } = useForm();
  const data = location?.state?.data;

  const formFields = [
    {
      subheader: 'Passport Info',
      name: 'passport_no',
      label: 'Passport Number',
      req: true,
      static: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Enter Passport Number',
    },
    {
      name: 'passport_expiry',
      label: 'Passport Expiry Date',
      req: true,
      static: true,
      placeholder: '',
      type: 'date',
      twocol: true,
      reqmessage: 'Enter Passport Expiry Date',
      format: 'Do MMMM YYYY',
    },
    {
      name: 'passport_issue_date',
      label: 'Passport Receive Date',
      req: true,
      static: true,
      placeholder: '',
      type: 'date',
      twocol: true,
      reqmessage: 'Enter Passport Issue Date',
      format: 'Do MMMM YYYY',
    },
    {
      type: 'input',
      label: 'Passport Issuing Country',
      name: 'passport_country',
      twocol: true,
      req: true,
      static: true,
      placeholder: 'Please select',
      reqmessage: 'Country Required',
    },
    {
      name: 'passport_filepath',
      label: 'Passport (Scanned)',
      req: true,
      static: true,
      placeholder: 'Upload',
      type: 'upload',
      twocol: true,
      reqmessage: 'Passport File Required',
    },

    {
      subheader: 'Renew Visa Info',
      name: 'visa_no',
      label: 'Visa Number',
      req: true,
      static: data ? true : false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Visa Number Required',
    },
    // {
    //   name: 'visa_id',
    //   label: 'Visa ID',
    //   req: true,
    //   static: data ? true : false,
    //   placeholder: 'Please state',
    //   type: 'input',
    //   twocol: true,
    //   reqmessage: 'Visa ID Required',
    // },
    {
      name: 'visa_expiry',
      label: 'Visa Expiry Date',
      req: true,
      static: data ? true : false,
      placeholder: '',
      type: 'date',
      twocol: true,
      reqmessage: 'Visa Expiry Required',
      format: 'Do MMMM YYYY',
    },
    {
      name: 'visa_issued',
      label: 'Visa Issue Date',
      req: true,
      static: data ? true : false,
      placeholder: '',
      type: 'date',
      twocol: true,
      reqmessage: 'Visa Issue Required',
      format: 'Do MMMM YYYY',
    },
    {
      name: 'visa_filepath',
      label: 'Visa File',
      req: true,
      static: data ? true : false,
      placeholder: 'Upload',
      type: 'upload',
      twocol: true,
      reqmessage: 'Visa File Required',
    },
  ];

  const onFinish = async (val) => {
    setLoad(true);
    let visa = '';

    if (val?.visa_filepath) {
      let file = await uploadFile(val.visa_filepath, 'Visa Sticker');
      visa = file.attached_document;
    }

    let body = {
      student_id: apiData.applicant_id,
      passport_no: val?.passport_no,
      passport_expiry: moment(val?.passport_expiry).format('YYYY-MM-DD'),
      passport_country: val?.passport_country,
      passport_issue_date: moment(val?.passport_issue_date).format('YYYY-MM-DD'),
      passport_filepath: val.passport_filepath.fileList[0].url,
      type: 'visa',
      visa_no: val?.visa_no,
      // visa_id: val?.visa_id,
      visa_expiry: moment(val?.visa_expiry).format('YYYY-MM-DD'),
      visa_issued: moment(val?.visa_issued).format('YYYY-MM-DD'),
      visa_type_code: 'Student',
      visa_filepath: visa,
    };

    const doc = [
      {
        item: 'Visa Sticker',
        file_url: visa,
        document_date: moment().format('YYYY-MM-DD'),
      },
    ];

    const body1 = {
      doctype: 'Students',
      student_id: id,
      files: doc,
    };

    addVisaRenewal(body)
      .then((res) => {
        updateDocs(body1)
          .then((res1) => {
            setLoad(false);
            message.success('Visa Renewed Successfully');
            setTimeout(
              () => history.push({ pathname: `/visa/students/immigration/${id}`, state: { stab: '2' } }),
              1000,
            );
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

  const updateText = (e) => {
    switch (e) {
      case 'expired':
        return 'Expired';
      case 'expiring':
        return 'Expiring';
    }
  };

  useEffect(() => {
    if (apiData && apiData.passport_and_visa && apiData.passport_and_visa.length) {
      const passport = apiData?.passport_and_visa.find((x) => !x?.visa_no && x?.is_current == 'Yes');
      if (passport) {
        setValue('passport_no', passport.passport_no);
        setValue('passport_expiry', passport.passport_expiry ? moment(passport.passport_expiry, 'YYYY-MM-DD') : '');
        setValue(
          'passport_issue_date',
          passport.passport_issue_date ? moment(passport.passport_issue_date, 'YYYY-MM-DD') : '',
        );
        setValue('passport_country', passport.country_name);
        setValue(
          'passport_filepath',
          passport?.passport_filepath
            ? {
                fileList: [
                  {
                    uid: '-1',
                    name: getFileName(passport?.passport_filepath),
                    status: 'done',
                    url: passport.passport_filepath,
                    s3: 'Passport Pages with certified true copy',
                    aid: apiData.applicant_id,
                  },
                ],
              }
            : '',
        );
      }
    }
  }, [apiData]);

  useEffect(() => {
    if (data) {
      setValue('passport_no', data.passport_no);
      setValue('passport_expiry', data.passport_expiry ? moment(data.passport_expiry, 'YYYY-MM-DD') : '');
      setValue(
        'passport_receive_date',
        data.passport_receive_date ? moment(data.passport_receive_date, 'YYYY-MM-DD') : '',
      );
      setValue('passport_country', data.passport_country);

      setValue('visa_no', data.visa_no);
      setValue('visa_expiry', data.visa_expiry ? moment(data.visa_expiry, 'YYYY-MM-DD') : '');
      setValue('visa_issued', data.visa_issued ? moment(data.visa_issued, 'YYYY-MM-DD') : '');
      // setValue('visa_type_code', data.visa_type_code);

      setValue(
        'passport_filepath',
        data.passport_filepath
          ? {
              fileList: [
                {
                  uid: '-1',
                  name: getFileName(data?.passport_filepath),
                  status: 'done',
                  url: data.passport_filepath,
                  s3: 'Passport Pages with certified true copy',
                  aid: apiData.applicant_id,
                },
              ],
            }
          : '',
      );
      setValue(
        'visa_filepath',
        data.visa_filepath
          ? {
              fileList: [
                {
                  uid: '-1',
                  name: getFileName(data?.visa_filepath),
                  status: 'done',
                  url: data.visa_filepath,
                  s3: 'Visa Sticker',
                  aid: apiData.applicant_id,
                },
              ],
            }
          : '',
      );
    }
  }, [data]);

  return (
    <StudentTemp id={id} section="visa" document={false} request={false} setLoading={props.setLoading}>
      <Spin indicator={antIcon} size="large" spinning={load}>
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Title level={4} className="mb-0 c-default">
              {`${updateText(subkey)} Visa`}
            </Title>
          </Col>
          <Col>
            <Button
              type="link"
              className="c-gray-linkbtn p-0"
              onClick={() => history.push({ pathname: `/visa/students/immigration/${id}`, state: { stab: '2' } })}
              htmlType="button"
            >
              <LeftOutlined /> Application
            </Button>
          </Col>
          <Col span={24}>
            <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
              <Row gutter={[20, 20]} align="bottom">
                {formFields.map((item, idx) => (
                  <Fragment key={idx}>
                    {item?.subheader && (
                      <Col span={24}>
                        <Title level={item?.subheadlevel ? item?.subheadlevel : 5} className="mb-0 c-default">
                          {item.subheader}
                        </Title>
                      </Col>
                    )}
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
          </Col>
        </Row>
      </Spin>
    </StudentTemp>
  );
};
