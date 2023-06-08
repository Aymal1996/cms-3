import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Typography, Card, Spin, message, Table } from 'antd';
import { useForm } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';
import Base64Downloader from 'common-base64-downloader-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { DateField, InputField, SelectField } from '../../../../../atoms/FormElement';
import { downloadTasks } from '../../ducks/services';
import { getsearchTasks } from '../../ducks/actions';

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
    const payload = {
      employee_id: val.id,
      employee_name: val.name,
      hours: val.totalHours,
      project: val.project,
      start_date: val.startDate ? moment(val.startDate).format('YYYY-MM-DD') : '',
      end_date: val.endDate ? moment(val.endDate).format('YYYY-MM-DD') : '',
    };

    dispatch(getsearchTasks(payload, formatting));

    downloadTasks(payload, formatting)
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
      key: 'employee_name',
      title: 'Employee Name',
      dataIndex: 'employee_name',
    },
    {
      key: 'project',
      title: 'Project',
      dataIndex: 'project',
    },
    {
      key: 'hours',
      title: 'Hours',
      dataIndex: 'hours',
    },
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
    },
    {
      key: 'tasks',
      title: 'Tasks',
      dataIndex: 'tasks',
    },
    {
      key: 'hours',
      title: 'Hours',
      dataIndex: 'hours',
    },
    {
      key: 'approver_name',
      title: 'Approver Name',
      dataIndex: 'approver_name',
    },
  ];

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Card bordered={false} className="uni-card">
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="w-100">
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <HeadingChip title="Download Tasks Reports" />
            </Col>

            <Col span={8}>
              <InputField
                isRequired={true}
                fieldname="id"
                label="Staff ID"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please state', size: 'large' }}
                rules={{ required: 'Enter Staff ID' }}
                initValue=""
                validate={errors.id && 'error'}
                validMessage={errors.id && errors.id.message}
              />
            </Col>

            <Col span={8}>
              <InputField
                //isRequired={true}
                fieldname="name"
                label="Staff Name"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please state', size: 'large' }}
                //rules={{ required: 'Enter Staff Name' }}
                initValue=""
                //validate={errors.name && 'error'}
                //validMessage={errors.name && errors.name.message}
              />
            </Col>

            <Col span={8}>
              <SelectField
                //isRequired={true}
                fieldname="project"
                label="Select Project"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                //rules={{ required: 'Select Team' }}
                initValue=""
                selectOption={[{ label: 'project', value: 'project' }]}
                //validate={errors.team && 'error'}
                //validMessage={errors.team && errors.team.message}
              />
            </Col>

            <Col span={8}>
              <InputField
                fieldname="totalHours"
                label="Total Hours"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please state', size: 'large', type: 'number' }}
                initValue=""
              />
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
