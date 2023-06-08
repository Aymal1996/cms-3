import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Card, Tabs, Form, Spin, message, Tag } from 'antd';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StaffDetails from '../../../components/StaffDetails';
import LeaveApplication from './components/LeaveApplication';
import LeaveSummary from './components/LeaveSummary';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import { useForm } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { getAdvancementdetails, emptyStaffDetails } from '../../Advancement/dcuks/actions';
import { getSingleLeaveDetail, getLeaveApplicationDetail, getEntitlement } from '../ducks/actions';
import ListCard from 'Molecules/ListCard';
import { DateField, InputField } from 'Atoms/FormElement';
import moment from 'moment';

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [deleted, setDeleted] = useState([]);
  const [leaveAvailability, setLeaveAvailability] = useState(false);
  const [entitlement, setEntitlement] = useState([]);
  const [load, setLoad] = useState(false);
  const singleLeaveDetail = useSelector((state) => state.leaves.singleLeaveData);
  const applicationLeaveData = useSelector((state) => state.leaves.applicationLeaveData);
  const entitlementData = useSelector((state) => state.leaves.entitlementData);
  const { control, errors, setValue, handleSubmit } = useForm();
  //console.log('entitlementData', entitlementData)

  useEffect(() => {
    dispatch(getSingleLeaveDetail(id));
    dispatch(getEntitlement(id));
    dispatch(getLeaveApplicationDetail(id, 'Pending'));

    dispatch(getAdvancementdetails(id));
    return () => {
      dispatch(emptyStaffDetails());
    };
  }, []);

  useEffect(() => {
    if (entitlementData) {
      let temp = {
        annualLeave: entitlementData?.find((element) => element?.leave_type == 'Annual Leave'),
        medicalLeave: entitlementData?.find((element) => element?.leave_type === 'Medical Leave'),
        maternityLeave: entitlementData?.find((element) => element?.leave_type === 'Maternity Leave'),
        hospitalizationLeave: entitlementData?.find((element) => element?.leave_type === 'Hospitalization Leave'),
        paternityLeave: entitlementData?.find((element) => element?.leave_type === 'Paternity Leave'),
        bereavementLeave: entitlementData?.find((element) => element?.leave_type === 'Bereavement Leave'),
        marriageLeave: entitlementData?.find((element) => element?.leave_type === 'Marriage Leave'),
        emergencyLeave: entitlementData?.find((element) => element?.leave_type === 'Emergency Leave'),
        unpaidLeave: entitlementData?.find((element) => element?.leave_type === 'Unpaid Leave'),
        replacementLeave: entitlementData?.find((element) => element?.leave_type === 'Replacement Leave'),
        studyLeave: entitlementData?.find((element) => element?.leave_type === 'Study Leave'),
        welfareLeave: entitlementData?.find((element) => element?.leave_type === 'Welfare Leave'),
      };
      setEntitlement(temp);
    }
  }, [entitlementData]);

  const updateStatus = (status, page, limit, sort, sortby) => {
    dispatch(getLeaveApplicationDetail(id, status, page, limit, sort, sortby));
  };

  const onFinish = async (val) => {
    setLoad(true);

    const startDate = moment();
    const endDate = val?.leaveStart ? moment(val?.leaveStart) : moment();
    const days = val?.leaveStart ? endDate.diff(startDate, 'days') : 0;

    console.log('days', days);

    const json = {
      employee_id: id,
      leaves_availibility: [
        {
          leave_type: val?.annualLeave ? 'Annual Leave' : undefined,
          entitlement: val?.annualLeave ?? undefined,
          carry_forward_cut_off_days: days,
        },
        {
          leave_type: val?.medicalLeave == 0 || val?.medicalLeave ? 'Medical Leave' : undefined,
          entitlement: val?.medicalLeave ?? undefined,
        },
        {
          leave_type: val?.maternityLeave == 0 || val?.medicalLeave ? 'Maternity Leave' : undefined,
          entitlement: val?.maternityLeave ?? undefined,
        },
        {
          leave_type: val?.hospitalizationLeave == 0 || val?.medicalLeave ? 'Hospitalization Leave' : undefined,
          entitlement: val?.hospitalizationLeave ?? undefined,
        },
        {
          leave_type: val?.paternityLeave == 0 || val?.medicalLeave ? 'Paternity Leave' : undefined,
          entitlement: val?.paternityLeave ?? undefined,
        },
        {
          leave_type: val?.bereavementLeave == 0 || val?.medicalLeave ? 'Bereavement Leave' : undefined,
          entitlement: val?.bereavementLeave ?? undefined,
        },
        {
          leave_type: val?.marriageLeave == 0 || val?.medicalLeave ? 'Marriage Leave' : undefined,
          entitlement: val?.marriageLeave ?? undefined,
        },
        {
          leave_type: val?.emergencyLeave == 0 || val?.medicalLeave ? 'Emergency Leave' : undefined,
          entitlement: val?.emergencyLeave ?? undefined,
        },
        {
          leave_type: val?.unpaidLeave == 0 || val?.medicalLeave ? 'Unpaid Leave' : undefined,
          entitlement: val?.unpaidLeave ?? undefined,
        },
        {
          leave_type: val?.replacementLeave == 0 || val?.medicalLeave ? 'Replacement Leave' : undefined,
          entitlement: val?.replacementLeave ?? undefined,
        },
        {
          leave_type: val?.studyLeave == 0 || val?.medicalLeave ? 'Study Leave' : undefined,
          entitlement: val?.studyLeave ?? undefined,
        },
        {
          leave_type: val?.welfareLeave == 0 || val?.medicalLeave ? 'Welfare Leave' : undefined,
          entitlement: val?.welfareLeave ?? undefined,
        },
      ],
    };
    let url = `${apiMethod}/hrms.api.edit_leaves_availibilites`;
    try {
      await axios.post(url, json);
      message.success('Entitlement Successfully Updated');
      getEntitlement(id);
      setLoad(false);
      setLeaveAvailability(false);
    } catch (e) {
      setLoad(false);
      const { response } = e;
      message.error(e);
    }
  };

  const ListCol = [
    {
      title: 'Leave Type',
      dataIndex: 'leave_type',
      key: 'leave_type',
      sorter: true,
    },
    {
      title: 'Carried Forward',
      dataIndex: 'carry_forwarded_leaves',
      key: 'carry_forwarded_leaves',
      align: 'center',
      sorter: true,
      render: (text) => {
        return <>{text} Days</>;
      },
    },
    {
      title: 'Entitlement',
      dataIndex: 'total_leaves',
      key: 'total_leaves',
      sorter: true,
      align: 'center',
      render: (text) => {
        return <> {text < 0 ? 0 : text + ' Days'}</>;
      },
    },
    {
      title: 'Taken',
      dataIndex: 'taken_leaves',
      key: 'taken_leaves',
      sorter: true,
      align: 'center',
      render: (text) => {
        return <>{text} Days</>;
      },
    },
    {
      title: 'Available',
      dataIndex: 'available_leaves',
      key: 'available_leaves',
      align: 'center',
      sorter: true,
      render: (text) => {
        return <span className="c-success">{text} Days</span>;
      },
    },
  ];

  const editLeave = () => {
    setLeaveAvailability(true);
  };

  useEffect(() => {
    if (leaveAvailability) {
      setValue('annualLeave', entitlement?.annualLeave?.entitlement);
      setValue('medicalLeave', entitlement?.medicalLeave?.entitlement);
      setValue('maternityLeave', entitlement?.maternityLeave?.entitlement);
      setValue('hospitalizationLeave', entitlement?.hospitalizationLeave?.entitlement);
      setValue('paternityLeave', entitlement?.paternityLeave?.entitlement);
      setValue('bereavementLeave', entitlement?.bereavementLeave?.entitlement);
      setValue('marriageLeave', entitlement?.marriageLeave?.entitlement);
      setValue('emergencyLeave', entitlement?.emergencyLeave?.entitlement);
      setValue('unpaidLeave', entitlement?.unpaidLeave?.entitlement);
      setValue('replacementLeave', entitlement?.replacementLeave?.entitlement);
      setValue('studyLeave', entitlement?.studyLeave?.entitlement);
      setValue('welfareLeave', entitlement?.welfareLeave?.entitlement);
    }
  }, [leaveAvailability]);

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  return (
    <StaffDetails id={id} section="HRMS Leave Application" title={'Leaves'} specifies={true} myProfile={true}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Title level={4} className="mb-0">
              Leaves
            </Title>
          </Col>
          <Col>
            <Button
              icon={<LeftOutlined />}
              size="middle"
              className="c-graybtn small-btn"
              onClick={() => history.push(`/hrms/requests/${id}`)}
            >
              Categories
            </Button>
          </Col>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
              <TabPane tab="Leave Application" key="1">
                <LeaveApplication
                  id={id}
                  updateApi={updateStatus}
                  progressData={singleLeaveDetail?.summary}
                  data={applicationLeaveData}
                  tabSelected={location?.state?.tab == 'Missed' ? 'Issues' : location?.state?.tab}
                />
              </TabPane>
              <TabPane tab="Summary" key="2">
                <LeaveSummary title="Leave Statistics" id={id} data={singleLeaveDetail?.summary} />
              </TabPane>
              <TabPane tab="Availability" key="3">
                {!leaveAvailability && (
                  <ListCard
                    title="Leave Availability"
                    ListCol={ListCol}
                    ListData={singleLeaveDetail?.availibility}
                    pagination={false}
                    extraBtn={'Edit'}
                    extraAction={editLeave}
                    btnClass="blue-btn"
                    scrolling={500}
                  />
                )}
                {leaveAvailability && (
                  <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                    <Spin indicator={antIcon} size="large" spinning={load}>
                      <Button type="text" onClick={() => setLeaveAvailability(false)}>
                        Leaves Availabilty
                      </Button>
                      <Col span={24}>
                        <Title level={4} className="c-default mb-0 ">
                          Edit Leave Availability
                        </Title>
                      </Col>
                      <Row gutter={[20, 30]}>
                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={10}>
                              <Tag className="program-list">
                                <span className="p-name">Annual Leave</span>
                              </Tag>
                            </Col>
                            <Col span={10}>
                              <DateField
                                fieldname="leaveStart"
                                control={control}
                                class="mb-0"
                                iProps={{
                                  placeholder: 'Please Select date',
                                  size: 'large',
                                  format: 'DD-MM-YYYY',
                                  disabledDate: disabledDate,
                                }}
                                initValue=""
                              />
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="annualLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={20}>
                              <Tag className="program-list">
                                <span className="p-name">Replacement Leave</span>
                              </Tag>
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="replacementLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={20}>
                              <Tag className="program-list">
                                <span className="p-name">Medical Leave</span>
                              </Tag>
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="medicalLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={20}>
                              <Tag className="program-list">
                                <span className="p-name">Hospitalization Leave</span>
                              </Tag>
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="hospitalizationLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={20}>
                              <Tag className="program-list">
                                <span className="p-name">Bereavement Leave</span>
                              </Tag>
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="bereavementLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={20}>
                              <Tag className="program-list">
                                <span className="p-name">Marriage Leave</span>
                              </Tag>
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="marriageLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={20}>
                              <Tag className="program-list">
                                <span className="p-name">Maternity Leave</span>
                              </Tag>
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="maternityLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        {entitlementData?.find((element) => element?.leave_type === 'Study Leave') && (
                          <Col span={24}>
                            <Row gutter={[20, 30]}>
                              <Col span={20}>
                                <Tag className="program-list">
                                  <span className="p-name">Study Leave</span>
                                </Tag>
                              </Col>
                              <Col span={4}>
                                <InputField
                                  fieldname="studyLeave"
                                  control={control}
                                  class="mb-0"
                                  iProps={{ placeholder: 'Please state', size: 'small' }}
                                  initValue=""
                                />
                              </Col>
                            </Row>
                          </Col>
                        )}

                        {entitlementData?.find((element) => element?.leave_type === 'Welfare Leave') && (
                          <Col span={24}>
                            <Row gutter={[20, 30]}>
                              <Col span={20}>
                                <Tag className="program-list">
                                  <span className="p-name">Welfare Leave</span>
                                </Tag>
                              </Col>
                              <Col span={4}>
                                <InputField
                                  fieldname="welfareLeave"
                                  control={control}
                                  class="mb-0"
                                  iProps={{ placeholder: 'Please state', size: 'small' }}
                                  initValue=""
                                />
                              </Col>
                            </Row>
                          </Col>
                        )}

                        <Col span={24}>
                          <Row gutter={[20, 30]}>
                            <Col span={20}>
                              <Tag className="program-list">
                                <span className="p-name">Emergency Leave</span>
                              </Tag>
                            </Col>
                            <Col span={4}>
                              <InputField
                                fieldname="emergencyLeave"
                                control={control}
                                class="mb-0"
                                iProps={{ placeholder: 'Please state', size: 'small' }}
                                initValue=""
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24} className="text-right">
                          <Button type="primary" size="large" htmlType="submit" className="green-btn">
                            Save Changes
                          </Button>
                        </Col>
                      </Row>
                    </Spin>
                  </Form>
                )}
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
