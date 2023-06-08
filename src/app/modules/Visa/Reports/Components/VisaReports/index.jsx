import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Typography, Card, Spin, message, Table } from 'antd';
import { useForm } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';
import Base64Downloader from 'common-base64-downloader-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { DateField, InputField, SelectField } from '../../../../../atoms/FormElement';
import { downloadReports } from '../../ducks/services';
import { getsearchReports } from '../../ducks/actions';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { control, errors, handleSubmit } = useForm();
  const [load, setLoad] = useState(false);
  const [pdfDownload, setPdfDownload] = useState();
  const [pdfName, setPdfName] = useState();
  const dispatch = useDispatch();
  const tasksData = useSelector((state) => state.downloadReports.overallTaskData);

  const onSubmit = (val) => {
    setLoad(true);
    const formatting = val.reportFormat.value;
    const startDate = val.startDate ? moment(val.startDate).format('YYYY-MM-DD') : '';
    const endDate = val.endDate ? moment(val.endDate).format('YYYY-MM-DD') : '';

    dispatch(getsearchReports(startDate, endDate, formatting));

    downloadReports(startDate, endDate, formatting)
      .then((response) => {
        setLoad(false);
        setPdfDownload(response.data.filecontent);
        setPdfName(response.data.filename);
      })
      .catch((error) => {
        setLoad(false);
        message.error('Something went wrong');
      });
  };

  const columns = [
    {
      key: 'student_id',
      title: 'Student Id',
      dataIndex: 'student_id',
      width: 100,
    },
    {
      key: 'student_name',
      title: 'Student Name',
      dataIndex: 'student_name',
      width: 200,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: 100,
    },
    {
      key: 'program_name',
      title: 'Program Name',
      dataIndex: 'program_name',
      width: 250,
    },
    {
      key: 'visa_expiry',
      title: 'Visa Expiry',
      dataIndex: 'visa_expiry',
      render: (text) => (text && text !== 'null') ? text : '-',
    },
    {
      key: 'visa_status',
      title: 'Visa Status',
      dataIndex: 'visa_status',
      width: 100,
      render: (text) => {
        let clname = '';
        if (text == 'Expiring') {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Card bordered={false} className="uni-card">
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="w-100">
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <HeadingChip title="Download Visa Reports" />
            </Col>

            <Col span={8}>
              <DateField
                fieldname="startDate"
                label="Select Start Date"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
                initValue=""
              />
            </Col>

            <Col span={8}>
              <DateField
                fieldname="endDate"
                label="Select End Date"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
                initValue=""
              />
            </Col>

            <Col span={8}>
              <SelectField
                isRequired={true}
                fieldname="reportFormat"
                label="Select Report Format"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                rules={{ required: 'Select Team' }}
                initValue=""
                selectOption={[
                  { label: 'PDF', value: 'pdf' },
                  { label: 'Excel', value: 'excel' },
                ]}
                validate={errors.reportFormat && 'error'}
                validMessage={errors.reportFormat && errors.reportFormat.message}
              />
            </Col>

            <Col span={24}>
              <Row justify="center" gutter={[30, 30]}>
                <Col span={8}>
                  <Button size="large" type="primary" htmlType="submit" className="w-100">
                    Search
                  </Button>
                </Col>
                {pdfDownload && (
                  <>
                    <Col span={8}>
                      <Base64Downloader
                        base64={pdfDownload}
                        downloadName={pdfName}
                        className="ant-btn ant-btn-primary ant-btn-lg w-100"
                      >
                        Click to download
                      </Base64Downloader>
                    </Col>

                    <Col span={24}>
                      <Table dataSource={tasksData?.rows} columns={columns} />
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </Spin>
  );
};
