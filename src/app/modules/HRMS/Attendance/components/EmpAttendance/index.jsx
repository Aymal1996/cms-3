import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../../molecules/ListCard';
import EditAttendance from '../AttendanceDetail';
import { LeftOutlined } from '@ant-design/icons';
import { getMyAttendance, getSingleAttendanceDetail, getTotalAttendance, getEmpAttendance } from '../../ducks/actions';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';
// import { getTotalAbsent } from '../../ducks/services';
import moment from 'moment';
const ListCol = [
  {
    title: 'Date in',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'Date Out',
    dataIndex: 'Attendance_date_out',
    key: 'Attendance_date_out',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'In',
    dataIndex: 'time_in',
    key: 'time_in',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
  },
  {
    title: 'Hours',
    dataIndex: 'total_work_hour',
    key: 'total_work_hour',
    render: (text) => (text === '0:00:00' ? '-' : `${text}`),
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    sorter: true,

    render: (text) => {
      let clname = '';
      if (text == 'On Duty' || text == 'Rest Day' || text == 'On Leave' || text == 'Holiday') {
        clname = 'c-success';
      } else if (text == 'Absent') {
        clname = 'c-error';
      } else if (
        text == 'Late Clock In' ||
        text == 'Late Clock Out' ||
        text == 'Early Clock In' ||
        text == 'Early Clock Out'
      ) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const dispatch = useDispatch();
  const [viewForm, setViewForm] = useState(false);
  const [empID, setEmpID] = useState('');
  const empAttendanceList = useSelector((state) => state.attendance.getEmpAttendance);
  const singleAttendanceDetail = useSelector((state) => state.attendance.singleAttendance);
  const totalAbsent = useSelector((state) => state.attendance.totalAbsent);

  const onRowClick = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.ATTENDANCE_TEAMS, Roles.ATTENDANCE], 'write')) {
          setViewForm(true);
          setEmpID(record?.name);
        }
      },
    };
  };

  useEffect(() => {
    dispatch(getEmpAttendance(id, page, limit, '', ''));
    dispatch(getTotalAttendance(id));
  }, [id]);

  useEffect(() => {
    if (empID && viewForm === true) {
      dispatch(getSingleAttendanceDetail(empID));
    } else if (!viewForm) {
      setPage(1);
      dispatch(getEmpAttendance(id, 1, 6, '', ''));
      dispatch(getTotalAttendance(id));
    }
  }, [empID, viewForm]);

  // useEffect(() => {
  //   if (!viewForm) {
  //     dispatch(getEmpAttendance(id, 1, 6, '', ''));
  //     dispatch(getTotalAttendance(id));
  //   }
  // }, [viewForm]);

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getEmpAttendance(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getEmpAttendance(id, pagination.current, pagination.pageSize, '', ''));
    }
  };
  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[24, 30]}>
        <Col span={24} flex="auto">
          <Title level={4} className="mb-0">
            Attendance
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
        {viewForm && allowed([Roles.ATTENDANCE_TEAMS, Roles.ATTENDANCE], 'write') ? (
          <Col span={24}>
            <Button
              type="link"
              htmlType="button"
              className="mb-1 p-0 c-gray-linkbtn"
              icon={<LeftOutlined />}
              onClick={() => setViewForm(false)}
            >
              Attendance History
            </Button>
            <Col span={24}>
              <EditAttendance attendanceData={singleAttendanceDetail} onViewForm={setViewForm} />
            </Col>
          </Col>
        ) : (
          <>
            {totalAbsent > 0 && (
              <Col span={24}>
                <Card bordered={false} className={`mini-card req-card-pending`}>
                  <Row gutter={[20, 30]}>
                    <Col span={24}>
                      <Space size={5} direction="vertical" align="start">
                        <Text className="mb-0 c-white">Number of Days Absent</Text>
                        <Title level={3} className="mb-0">
                          {`${totalAbsent} Days`}
                        </Title>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )}

            <Col span={24}>
              <ListCard
                title="Attendance History"
                ListCol={ListCol}
                ListData={empAttendanceList?.rows}
                onRow={onRowClick}
                //pagination={true}
                classes="clickRow"
                listClass="nospace-card"
                onChange={onTableChange}
                scrolling={500}
                pagination={{
                  total: empAttendanceList?.count,
                  current: page,
                  pageSize: limit,
                }}
              />
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};
