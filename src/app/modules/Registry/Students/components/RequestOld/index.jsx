import React, { useState, useEffect } from 'react';
import { Skeleton, Row, Col, Card, Typography, Tabs, Collapse, Button, message, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PendingReq from '../../../../../molecules/Description';
import { registryData } from '../../ducks/actions';
import { getSingleAppData, updateRequest } from '../../ducks/services';
import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import PendingPanel from '../../../../../molecules/PendingPanel';
import ArchivePanel from '../../../../../molecules/ArchivePanel';
const Requests = (props) => {
  const { studentID } = props;
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const { Panel } = Collapse;
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const requestDataArchieve = useSelector((state) =>
    state.students.requestData.filter((value) => value.status === 'Archive'),
  );
  const requestDataPending = useSelector((state) =>
    state.students.requestData.filter((value) => value.status === 'Pending'),
  );
  const [aciveTab, setActiveTab] = useState('');
  const [descriptionData, setDescriptionData] = useState([]);
  const [resourceData, setResourceData] = useState();

  useEffect(() => {
    dispatch(registryData(studentID));
  }, [studentID]);

  const removeDoctype = (dept) => {
    return dept.map(({ doctype, ...rest }) => rest);
  };
  const onPanalChangeHandler = (key, data) => {
    if (key) {
      const appId = data[key].name;
      setDescriptionData([]);
      setActiveTab(key);
      getSingleAppData(appId).then((response) => {
        if (response?.data?.data) {
          let data = [];
          let reqData = response?.data?.data;
          reqData.form_fields.map((value, key) => {
            let obj = {
              label: value.field_label,
              value: value.field_value,
            };
            data.push(obj);
          });
          reqData.departments.map((value, key) => {
            let obj = {};
            if (value.status === 'Pending') {
              obj = {
                label: value.department,
                value: value.status,
                icon: <CloseCircleFilled style={{ fontSize: '20px' }} />,
              };
            } else if (value.status === 'Approve') {
              obj = {
                label: value.department,
                value: value.status,
                icon: <CheckCircleFilled style={{ fontSize: '20px' }} />,
              };
            } else if (value.status === 'Reject') {
              obj = {
                label: value.department,
                value: value.status,
                icon: <CloseCircleFilled style={{ fontSize: '20px' }} />,
              };
            }
            data.push(obj);
          });
          setDescriptionData(data);
          const { doctype, ...resourcedata } = reqData;
          setResourceData(resourcedata);
        }
      });
    } else {
      setDescriptionData([]);
      setActiveTab('');
    }
  };

  const onTabChangeHandler = (e) => {
    setActiveTab('');
    dispatch(registryData(studentID));
  };

  const onClickRevrtAprvHandler = (statusType) => {
    const payload = {
      ...resourceData,
      status: statusType,
      form_fields: removeDoctype(resourceData['form_fields']),
      departments: removeDoctype(resourceData['departments']),
    };
    statusType === 'Archive'
      ? (payload.departments[payload.departments.length - 1].status = 'Approve')
      : (payload.departments[payload.departments.length - 1].status = 'Pending');
    updateRequest(payload)
      .then((response) => {
        statusType === 'Archive'
          ? message.success('Request Approve Successfully')
          : message.success('Request Revert Successfully');
        setActiveTab('');
        dispatch(registryData(studentID));
      })
      .catch((error) => message.error(error));
  };

  const onClickRejectHandler = async (val) => {
    const payload = {
      ...resourceData,
      status: 'Archive',
      form_fields: removeDoctype(resourceData['form_fields']),
      departments: removeDoctype(resourceData['departments']),
    };
    payload.departments[payload.departments.length - 1].remarks = val['reject_reason'];
    payload.departments[payload.departments.length - 1].status = 'Reject';
    updateRequest(payload)
      .then((response) => {
        message.success('Request Successfully Rejected');
        setActiveTab('');
        dispatch(registryData(studentID));
      })
      .catch((error) => message.error(error));
  };

  return (
    <Card bordered={false} className="uni-card">
      <Row gutter={[20, 20]}>
        <Col flex="auto">
          <Title level={4}>Requests</Title>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs" onChange={onTabChangeHandler}>
            <TabPane tab="Pending Request" key="1">
              <Skeleton active paragraph={{ rows: 2 }} loading={requestDataPending && requestDataPending.length === 0}>
                <Collapse
                  activeKey={aciveTab}
                  accordion
                  bordered={false}
                  expandIcon={() => <></>}
                  ghost
                  onChange={(e) => onPanalChangeHandler(e, requestDataPending)}
                >
                  {requestDataPending && requestDataPending.length > 0
                    ? requestDataPending.map((value, key) => (
                        <Panel header={<PendingPanel departmentName={value.department} />} key={key}>
                          {descriptionData.length > 0 ? (
                            <Form onFinish={handleSubmit(onClickRejectHandler)}>
                              <PendingReq
                                control={control}
                                errors={errors}
                                pending
                                stdReqData={descriptionData}
                                onClickApprove={onClickRevrtAprvHandler}
                              />
                            </Form>
                          ) : (
                            ''
                          )}
                        </Panel>
                      ))
                    : []}
                </Collapse>
              </Skeleton>
            </TabPane>
            <TabPane tab="Archieve" key="2">
              <Skeleton
                active
                paragraph={{ rows: 2 }}
                loading={requestDataArchieve && requestDataArchieve.length === 0}
              >
                <Collapse
                  activeKey={aciveTab}
                  accordion
                  bordered={false}
                  expandIcon={() => <></>}
                  ghost
                  className='red-card-collapse'
                  onChange={(e) => onPanalChangeHandler(e, requestDataArchieve)}
                >
                  {requestDataArchieve && requestDataArchieve.length > 0
                    ? requestDataArchieve.map((value, key) => (
                        <Panel
                          header={
                            <ArchivePanel
                              departmentName={value.department}
                              docStatus={
                                requestDataArchieve[key].departments[requestDataArchieve[key].departments.length - 1]
                              }
                            />
                          }
                          key={key}
                        >
                          {descriptionData.length > 0 ? (
                            <PendingReq
                              archieve
                              docStatus={
                                requestDataArchieve[key].departments[requestDataArchieve[key].departments.length - 1]
                              }
                              stdReqData={descriptionData}
                              onClickRevert={onClickRevrtAprvHandler}
                            />
                          ) : (
                            ''
                          )}
                        </Panel>
                      ))
                    : []}
                </Collapse>
              </Skeleton>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Row></Row>
    </Card>
  );
};

export default Requests;
