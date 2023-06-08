import React, { Fragment, useEffect } from "react";
import { Row, Col, Typography, Space, Avatar, Collapse } from 'antd';
import ListCard from "Molecules/ListCard";
import { useSelector, useDispatch } from "react-redux";
import { getLeaveStatisticList, getLeaveStatisticBar } from "../../ducks/actions";
import { baseUrl } from "../../../../../../configs/constants";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ListCol = [
  {
    title: 'Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorted: (a, b) => a.employee_name - b.employee_name,
  },
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    key: 'job_title',
    sorted: (a, b) => a.job_title - b.job_title,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorted: (a, b) => a.company - b.company,
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    sorted: (a, b) => a.team - b.team,
  },
  {
    title: 'Contract',
    dataIndex: 'contract',
    key: 'contract',
    sorted: (a, b) => a.contract - b.contract,
  },
  {
    title: 'Leaves Taken',
    dataIndex: 'taken_employee_leaves',
    key: 'taken_employee_leaves',
    sorted: (a, b) => a.taken_employee_leaves - b.taken_employee_leaves,
    align: 'center',
    width: '100px',
    render: (text) => {
      return <span className="c-error">{text}</span>;
    },
  },
];

export default (props) => {

  const dispatch = useDispatch();
  const leaveStatAnnualList = useSelector(state => state.leaves.leaveStatAnnualList);
  const leaveStatisticsBar = useSelector(state => state.leaves.leaveStatisticsBar);
  const company = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].company;

  const getCompanyPercent = (totalLeaves, totalTaken) => {
    const percent = totalTaken / totalLeaves * 100;
    return percent ? parseFloat(percent).toFixed(2) : 0;
  }

  const getStaffPercent = (totalLeaves, totalTaken) => {
    const percent = totalTaken / totalLeaves * 100
    return percent ? parseFloat(percent).toFixed(2) : 0;
  }

  useEffect(() => {
    dispatch(getLeaveStatisticBar());
  }, []);

  const onClickRow = (record) => {
    return {
      onClick: () => { },
    };
  }

  function callback(key) {
    dispatch(getLeaveStatisticList(leaveStatisticsBar[key]?.leave_type));
  }

  const leavesPanelHeader = (item, index) => (
    <Fragment key={index}>
      <Row justify="space-between">
        <Col>
          <Title level={4} className="m-0">{item?.leave_type}</Title>
          <Title level={5} className="m-0">Company Average</Title>
          <Title level={3} className="m-0">{getCompanyPercent(item?.total_employees_entitlement, item?.total_taken_employees_leaves)}%</Title>
        </Col>
        <Col>
          <Space className='w-100' size={30} align="start">
            <Avatar.Group
              maxCount={5}
              size={70}
            >
              {item?.employee_list?.length > 0 && item?.employee_list?.map((list, ind) => (
                <Fragment key={ind}>
                  <Space direction="vertical" align="center" style={{ margin: '0 10px' }}>
                    <Avatar src={list?.image ? `${baseUrl}${list?.image}` : ''} size={70} />
                    <Text className='c-error'>{getStaffPercent(list?.employee_total_entitlement, list?.taken_employee_leaves)}%</Text>
                  </Space>
                </Fragment>
              ))}
            </Avatar.Group>
          </Space>
        </Col>
      </Row>
    </Fragment>
  );

  return (
    <>
      <Row>
        <Col span={24}>
        <Title level={3}>Leave Statistics</Title>
        </Col>
      </Row>
      <Collapse accordion onChange={callback} className="leaves-statistic">
        {leaveStatisticsBar.map((item, index) => (
          <Panel header={leavesPanelHeader(item, index)} key={index} showArrow={false}>
            <ListCard
              onRow={onClickRow}
              ListCol={ListCol}
              ListData={leaveStatAnnualList?.rows}
              pagination={true}
            />
          </Panel>
        ))}
      </Collapse>
    </>
  )
}