import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tabs, Typography, Tag } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { getMyProjects, getMyTasks } from '../../ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import SearchMyTask from '../SearchMyTask';
import ListCard from 'Molecules/ListCard';
import AddNewTimeSheet from './Component/AddNewTimeSheet';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';
import DetailsComponent from 'Molecules/DetailsComponent';
import moment from 'moment';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

const { TabPane } = Tabs;
const { Title } = Typography;

const ListCol = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (text ? moment(text, 'YYYY-MM-DD').format('Do MMM YYYY') : ''),
    sorter: true,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    elipsis: true,
    sorter: true,
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
    align: 'center',
    sorter: true,
  },
  {
    title: 'Task',
    dataIndex: 'tasks',
    key: 'tasks',
    ellipsis: true,
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
      if (text == 'Approved') {
        clname = 'c-success';
      } else if (text == 'Rejected' || text == 'Missed') {
        clname = 'c-error';
      } else if (text == 'Pending') {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const statuses = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Missed', value: 'Missed' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Reject', value: 'Reject' },
];

export default (props) => {
  const { iProps } = props;
  const dispatch = useDispatch();
  const [addVisible, setAddVisible] = useState(false);
  const myTaskData = useSelector((state) => state.tasks.myTaskData);
  const myProjects = useSelector((state) => state.tasks.myProject);
  const [rowDetails, setRowDetail] = useState(false);
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState([]);
  const [selectedRecord, setRecord] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [allProj, setAllProj] = useState([]);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const [searchVal, setSearchVal] = useState(null);

  useEffect(() => {
    dispatch(getMyTasks(id, page, limit, '', ''));
    dispatch(getMyProjects(id));
  }, []);

  const btnList = [
    {
      text: '+ Add New Timesheet',
      classes: 'green-btn',
      action: () => {
        setAddVisible(true);
        setActiveKey('1');
        setMode('add');
      },
    },
  ];

  useEffect(() => {
    if (Object.keys(myProjects).length > 0) {
      let temp = [];
      myProjects?.rows.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All', value: '' });
          temp.push({ label: x.project, value: x.name });
        } else {
          temp.push({ label: x.project, value: x.name });
        }
      });
      setAllProj(temp);
    }
  }, [myProjects]);

  useEffect(() => {
    if (iProps?.activeAddTimeSheet) {
      setAddVisible(true);
      setActiveKey('1');
      setMode('add');
    }
  }, [iProps?.activeAddTimeSheet]);

  const updateApi = () => {
    setRecord(null);
    dispatch(getMyTasks(id, page, limit, '', ''));
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowDetail(true);
        setRecord(record);
        let temp = [
          {
            label: 'Timesheet Date',
            value: record?.date ? moment(record.date).format('Do MMMM YYYY') : '',
          },
          {
            label: 'Project Name',
            value: record?.project,
          },
          {
            label: 'Total Hours',
            value: record?.hours,
          },
          {
            label: 'Task',
            value: record?.tasks,
          },
          {
            label: 'Approver Name',
            value: record?.approver_name,
          },
          {
            label: 'Status',
            value: record?.status,
            classi: record?.status == 'Pending' ? 'c-pending' : record?.status == 'Approved' ? 'c-success' : 'c-error',
          },
        ];
        setRowData(temp);
      },
    };
  };

  const onSearch = (search) => {
    setPage(1);
    if (search) {
      let searching = {};
      console.log('search', search);
      searching = {
        status: search?.status ? search?.status.value : '',
        start_date: search?.date ? moment(search?.date[0]).format('YYYY-MM-DD') : '',
        end_date: search?.date ? moment(search?.date[1]).format('YYYY-MM-DD') : '',
        project: search?.project ? search?.project.value : '',
      };
      setSearchVal(searching);
      dispatch(getMyTasks(id, 1, limit, '', '', searching));
    } else {
      setSearchVal(null);
      dispatch(getMyTasks(id, 1, limit, '', '', searching));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getMyTasks(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchVal));
    } else {
      dispatch(getMyTasks(id, pagination.current, pagination.pageSize, '', '', searchVal));
    }
  };

  const onEdit = () => {
    setAddVisible(true);
    setMode('edit');
  };

  return (
    <>
      {!addVisible && <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />}
      <Card bordered={false} className="uni-card">
        <Tabs activeKey={activeKey} type="card" className="custom-tabs" onChange={(e) => setActiveKey(e)}>
          <TabPane key={'1'} tab="Timesheet">
            {!rowDetails && !addVisible && (
              <ListCard
                title="My Timesheet"
                classes="clickRow"
                onRow={onClickRow}
                listClass="nospace-card"
                Search={SearchMyTask && SearchMyTask}
                onSearch={SearchMyTask && onSearch}
                ListCol={ListCol}
                ListData={myTaskData?.rows}
                onChange={onTableChange}
                field1={allProj}
                field2={statuses}
                pagination={{
                  total: myTaskData?.count,
                  current: page,
                  pageSize: limit,
                }}
              />
            )}
            {addVisible && allowed([Roles.TASK_INDIVIDUAL], 'write') && (
              <AddNewTimeSheet
                projectName={myProjects}
                id={id}
                updateApi={updateApi}
                mode={mode}
                data={selectedRecord}
                setAddVisible={setAddVisible}
              />
            )}
            {rowDetails && (
              <DetailsComponent
                setRecord={setRecord}
                setRowDetail={setRowDetail}
                mainTitle="Timesheet Details"
                backbtnTitle="My Timesheet"
                data={rowData}
                onAction3={
                  allowed([Roles.TASK_INDIVIDUAL], 'write') &&
                  rowData.find((x) => x.label == 'Status')?.value == 'Pending'
                    ? onEdit
                    : null
                }
                btn3title={'Edit Timesheet'}
              />
            )}
          </TabPane>

          <TabPane key={'2'} tab="Projects">
            <Row gutter={[20, 30]}>
              <Col span={24}>
                <Title level={4} className="c-default mb-0">
                  My Projects
                </Title>
              </Col>
              <Col span={24}>
                <Row gutter={[20, 20]}>
                  {myProjects && (
                    <>
                      {myProjects.rows?.map((e, index) => (
                        <Col span={24} key={index}>
                          <Tag className="program-list">
                            <span className="p-name">{e.project}</span>
                          </Tag>
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};
