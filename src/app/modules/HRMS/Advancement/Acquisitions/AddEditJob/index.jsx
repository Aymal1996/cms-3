import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Form, Button, Typography, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import FormGroup from 'Molecules/FormGroup';
import ListCard from 'Molecules/ListCard';
import { getSuitableApplicants, emptyApplicant, getJobsAdc } from '../../dcuks/actions';
import {addEditJobOpen} from '../../dcuks/services';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../../configs/constants';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

const listCol = [
  {
    title: 'Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorter: true,
  },
  {
    title: 'Current Position',
    dataIndex: 'current_position',
    key: 'current_position',
    sorter: true,
  },
  {
    title: 'Current Company',
    dataIndex: 'current_company',
    key: 'current_company',
    sorter: true,
  },
  {
    title: 'Employment Status',
    dataIndex: 'employement_status',
    key: 'employement_status',
    sorter: true,
    align: 'center',
  },
  {
    title: 'Fit Index',
    dataIndex: 'fit_ratio',
    key: 'fit_ratio',
    sorter: true,
    align: 'center',
  },
];

export default ({ data, updateApi }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [load, setLoad] = useState(false);
  const jobslist = useSelector((state) => state.advancement.jobListAdv);
  const applicantList = useSelector((state) => state.advancement.applicantlist);
  const { control, errors, reset, setValue, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getJobsAdc());
    return () => dispatch(emptyApplicant());
  }, []);

  useEffect(() => {
    if (data) {
      setValue('job_title', { label: data?.job_position_name, value: data?.job_title });
      dispatch(getSuitableApplicants(data?.job_title, 1, 10, '', ''));
    }
  }, [data]);

  const addeditJobs = [
    {
      type: 'select',
      label: 'Job Title',
      name: 'job_title',
      placeholder: 'Select Job',
      options: jobslist?.map((x) => ({ label: x.job_position_name, value: x.name })),
      req: true,
      reqmessage: 'Select Jobs',
      twocol: true,
    },
  ];

  const onFinish = async (val) => {
    setLoad(true);
    let body = {
      job_title: val.job_title.value,
    };
    addEditJobOpen(data?.job_title, body).then(response => {
      setLoad(false);
      if (response.data.message.success == true) {
        message.success(response.data.message.message);
        updateApi();
        reset();
      } else {
        message.error(response.data.message.message);
      }
    }).catch(e => {
      const {response} = e;
      setLoad(false);
      console.log('error', e);
      message.error('Something went wrong');
    })
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/hrms/advancement/${record?.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getSuitableApplicants(data?.job_title, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey),
      );
    } else {
      dispatch(getSuitableApplicants(data?.job_title, pagination.current, pagination.pageSize, '', ''));
    }
  };

  const onDelete = async (job) => {
    setLoad(true);
    try {
      await axios.delete(`${apiresource}/HRMS Job Openings/${job}`);
      message.success('Job Deleted Successfully');
      setLoad(false);
      updateApi();
    } catch (e) {
      const { response } = e;
      console.log('error', response);
      setLoad(false);
      message.error('Something went wrong');
    }
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]} align="bottom">
          <Col span={24}>
            <Title level={4} className="mb-0">
              {`${data ? data.job_position_name + ' Position' : 'Add New Job Opening'} `}
            </Title>
          </Col>
          {addeditJobs.map((item, index) => (
            <Fragment key={index}>
              <FormGroup item={item} control={control} errors={errors} />
            </Fragment>
          ))}
          {data ? (
            <>
              <Col span={24}>
                <Row gutter={24} justify="end">
                  {allowed([Roles.ADVANCEMENT], 'delete') && (
                    <Col>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                        className="red-btn"
                        onClick={() => onDelete(data.job_title)}
                      >
                        Delete Job Openinges
                      </Button>
                    </Col>
                  )}
                  {/* {allowed([Roles.ADVANCEMENT], 'write') && (
                    <Col>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn">
                        Save Changes
                      </Button>
                    </Col>
                  )} */}
                </Row>
              </Col>
              <Col span={24}>
                <Title level={4} className="mb-0">
                  Suitable Applicants
                </Title>
              </Col>
              <Col span={24}>
                <ListCard
                  classes="clickRow"
                  listClass="small-card8 b-black"
                  onRow={onClickRow}
                  ListCol={listCol}
                  ListData={applicantList?.rows}
                  onChange={onTableChange}
                  pagination={{
                    total: applicantList?.count,
                    current: page,
                    pageSize: limit,
                  }}
                />
              </Col>
            </>
          ) : (
            <Col span={24}>
              <Row gutter={24} justify="end">
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Form>
    </Spin>
  );
};
