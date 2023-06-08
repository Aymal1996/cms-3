import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import MultiView from 'Molecules/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import { getOverallTasksWithStatus, getTeamTasksWithStatus, getTeamTasks, emptyAllLeaves } from './ducks/actions';
import Search from './components/Search';
import SearchTeam from './components/SearchTeam';
import MyLeaves from './components/MyLeaves';
import moment from 'moment';
import Roles from '../../../../routing/config/Roles';
import { allowed } from '../../../../routing/config/utils';
import { getTeams2 } from '../../Application/ducks/actions';
import TeamStatistics from './components/TeamStatistics';
import LeaveCalendar from 'Molecules/HRMS/LeaveCalendar';

const filtersOverall = [
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'History',
    value: 'History',
  },
];

const ListColOverall = [
  {
    title: 'ID',
    dataIndex: 'employee_id',
    key: 'employee_id',
    sorter: true,
    width: 150,
  },
  {
    title: 'Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorter: true,
  },
  {
    title: 'Applied',
    dataIndex: 'creation',
    key: 'creation',
    sorter: true,
    width: 110,
    render: (text) => {
      return moment(text).format('YYYY-MM-DD');
    },
  },
  {
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
    width: 110,
    render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
    width: 110,
    render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: 'Type',
    dataIndex: 'leave_type',
    key: 'leave_type',
    sorter: true,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: true,
  },
  {
    title: 'Team',
    dataIndex: 'team_name',
    key: 'team_name',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'application_status',
    key: 'application_status',
    align: 'center',
    width: 140,
    render: (text) => {
      let clname = '';
      if (text == 'Approved') {
        clname = 'c-success';
      } else if (text == 'Rejected') {
        clname = 'c-error';
      } else if (text == 'Pending') {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const ListColTeams = [
  {
    title: 'ID',
    dataIndex: 'employee_id',
    key: 'employee_id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorter: true,
  },
  {
    title: 'Applied',
    dataIndex: 'creation',
    key: 'creation',
    sorter: true,
    width: 110,
    render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
    width: 110,
    render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
    width: 110,
    render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: 'Type',
    dataIndex: 'leave_type',
    key: 'leave_type',
    sorter: true,
  },
  {
    title: 'Period',
    dataIndex: 'leave_period',
    key: 'leave_period',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'application_status',
    key: 'application_status',
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'Approved') {
        clname = 'c-success';
      } else if (text == 'Rejected') {
        clname = 'c-error';
      } else if (text == 'Pending') {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const overallData = useSelector((state) => state.leaves.overallTaskData);
  const overallDataList = useSelector((state) => state.leaves.overallTaskDataWithStatus);
  const teamTaskData = useSelector((state) => state.leaves.teamTaskData);
  const teamTaskDataList = useSelector((state) => state.leaves.teamTaskDataWithStatus);
  //const teamsDetailData = useSelector(state => state.global.teamsDetailData);
  const team = useSelector((state) => state.global.teams2);
  const [allTeam, setAllTeam] = useState([]);
  const employeeId = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const company1 = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].company;

  let activeTab = '';
  if (allowed([Roles.LEAVES], 'read')) {
    activeTab = 'overall';
  } else if (allowed([Roles.LEAVES_TEAMS], 'read')) {
    activeTab = 'teami';
  } else {
    activeTab = 'myleaves';
  }

  useEffect(() => {
    console.log('0000', activeTab);

    if (allowed([Roles.LEAVES_TEAMS], 'read') || allowed([Roles.LEAVES], 'read')) {
      //dispatch(getTeamsDetail(employeeId));
      dispatch(getTeams2());
    }
    return () => dispatch(emptyAllLeaves());
  }, []);

  useEffect(() => {
    if (Object.keys(team).length > 0) {
      let temp = [];
      team?.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All', value: '' });
          temp.push({ label: x.team_name, value: x.team_name });
        } else {
          temp.push({ label: x.team_name, value: x.team_name });
        }
      });
      setAllTeam(temp);
    }
  }, [team]);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    let searchVal = {};
    searchVal = {
      employee_id: search?.id ? search?.id : '',
      employee_name: search?.name ? search?.name : '',
      date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
      team_name: search?.team ? search?.team.value : '',
    };
    dispatch(getOverallTasksWithStatus(filter, page, limit, sort, employeeId, sortby, searchVal, company1));
  };

  const onTeamAction = (filter, page, limit, sort, sortby, type, search, team) => {
    if (type == 'list') {
      if (search) {
        let searchVal = {};
        searchVal = {
          employee_id: search?.id ? search?.id : '',
          employee_name: search?.name ? search?.name : '',
          date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
        };
        dispatch(getTeamTasksWithStatus(team, filter, page, limit, sort, sortby, searchVal));
      } else {
        dispatch(getTeamTasksWithStatus(team, filter, page, limit, sort, sortby, null));
      }
    } else {
      if (team) {
        dispatch(getTeamTasks(team, page, limit, sort, sortby));
      }
    }
  };

  const tabs = [
    {
      visible: allowed([Roles.LEAVES], 'read'),
      title: 'Overall Leaves',
      key: 'overall',
      count: overallDataList?.count || 0,
      Comp: MultiView,
      iProps: {
        carddata: overallDataList?.rows || [],
        cardcount: overallDataList?.count || 0,
        listdata: overallDataList?.rows || [],
        listcount: overallDataList?.count || 0,
        listCol: ListColOverall,
        Search: Search,
        link: '/hrms/leaves/',
        listKey: 'employee_id',
        filters: filtersOverall,
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: allTeam,
        },
        addon: 'Leave Application',
        statusKey: 'application_status',
        cardLimit: 9,
        listLimit: 9,
        same: true,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
        },
        extraComp1: <TeamStatistics />,
        extraComp2: <LeaveCalendar />,
        emptyError: 'No pending leave application at the moment',
      },
    },
    {
      visible: allowed([Roles.LEAVES_TEAMS], 'read'),
      title: 'Team Leaves',
      key: 'teami',
      count: teamTaskData?.count || teamTaskDataList?.count || 0,
      iProps: {
        carddata: teamTaskData?.rows || [],
        cardcount: teamTaskData?.count || 0,
        listdata: teamTaskDataList?.rows || [],
        listcount: teamTaskDataList?.count || 0,
        listCol: ListColTeams,
        link: '/hrms/leaves/',
        listKey: 'employee_id',
        filters: filtersOverall,
        updateApi: onTeamAction,
        Search: SearchTeam,
        addon: 'Leave Application',
        statusKey: 'application_status',
        cardLimit: 9,
        listLimit: 9,
        // same: true,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
        },
        extraComp1: <LeaveCalendar />,
        teamDrop: team,
        emptyError: 'No pending leave application at the moment',
      },
      Comp: MultiView,
    },
    {
      visible: allowed([Roles.LEAVES_INDIVIDUAL], 'read'),
      title: 'My Leaves',
      key: 'myleaves',
      Comp: MyLeaves,
    },
  ];

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeTab} />
      </Col>
    </Row>
  );
};
