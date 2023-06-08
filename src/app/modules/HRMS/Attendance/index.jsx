import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import MultiView from 'Molecules/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOverallAttendance,
  getOverallAttendanceList,
  getTeamAttendance,
  getTeamAttendanceList,
  getTeamsAttendanceDropdown,
} from './ducks/actions';
import Search from './components/Search/OverallSearch';
import TeamSearch from './components/Search/TeamSearch';
import MyAttendance from './components/MyAttendance';
import Roles from '../../../../routing/config/Roles';
import { allowed } from '../../../../routing/config/utils';
import { getTeams } from '../../Application/ducks/actions';
import { statusList } from '../../../../configs/constantData';
import moment from 'moment';
import { baseUrl } from '../../../../configs/constants';

const ListColOverall = [
  {
    title: 'Date In',
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
    ellipsis: true,
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
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Team',
    dataIndex: 'team_name',
    key: 'team_name',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: true,
    key: 'status',
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'On Duty' || text == 'Rest Day' || text == 'On Leave') {
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

const ListColTeams = [
  {
    title: 'Date In',
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
    ellipsis: true,
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'On Duty' || text == 'Rest Day' || text == 'On Leave') {
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
  let activeTab = '';

  if (allowed([Roles.ATTENDANCE], 'read')) {
    activeTab = 'overall';
  } else if (allowed([Roles.ATTENDANCE_TEAMS], 'read')) {
    activeTab = 'teami';
  } else {
    activeTab = 'mytask';
  }

  const dispatch = useDispatch();

  const overallAttendanceData = useSelector((state) => state.attendance.overallAttendance);
  const overallAttendanceDataList = useSelector((state) => state.attendance.overallAttendanceList);
  const teamAttendance = useSelector((state) => state.attendance.teamAttendance);
  const teamAttendanceList = useSelector((state) => state.attendance.teamAttendanceList);

  const teamsDetailData = useSelector((state) => state.attendance.teamAttDrop);
  const team = useSelector((state) => state.global.teams);
  const [allTeam, setAllTeam] = useState([]);
  const [currentT, setCurrentTab] = useState(activeTab);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  useEffect(() => {
    if (allowed([Roles.ATTENDANCE], 'read') || allowed([Roles.ATTENDANCE_TEAMS], 'read')) {
      dispatch(getTeamsAttendanceDropdown(id));
      dispatch(getTeams());
    }
  }, []);

  useEffect(() => {
    if (Object.keys(team).length > 0) {
      let temp = [];
      team?.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Teams', value: '' });
          temp.push({ label: x.team_name, value: x.team_name });
        } else {
          temp.push({ label: x.team_name, value: x.team_name });
        }
      });
      setAllTeam(temp);
    }
  }, [team]);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    if (search) {
      let searchVal = {};
      searchVal = {
        name: search?.id ? search?.id : '',
        employee_name: search?.name ? search?.name : '',
        attendance_date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
        team: search?.team ? search?.team.value : '',
        m_status: search?.status ? search?.status.value : '',
      };
      dispatch(getOverallAttendanceList(page, limit, sort, sortby, searchVal));
    } else {
      dispatch(getOverallAttendanceList(page, limit, sort, sortby, null));
    }
  };

  const onTeamAction = (filter, page, limit, sort, sortby, type, search, team) => {
    if (search) {
      let searchVal = {};
      searchVal = {
        name: search?.id ? search?.id : '',
        employee_name: search?.name ? search?.name : '',
        date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
        m_status: search?.status ? search?.status.value : '',
      };
      dispatch(getTeamAttendanceList(team, page, limit, sort, sortby, searchVal));
    } else {
      dispatch(getTeamAttendanceList(team, page, limit, sort, sortby, null));
    }
  };

  const onOverallAction1 = (filter, page, limit, sort, sortby, type, search) => {
    dispatch(getOverallAttendance(page, limit, sort, sortby));
  };

  const onTeamAction1 = (filter, page, limit, sort, sortby, type, search, team) => {
    dispatch(getTeamAttendance(team, page, limit, sort, sortby));
  };

  const tabs = [
    {
      visible: allowed([Roles.ATTENDANCE], 'read'),
      title: 'Overall Attendance',
      key: 'overall',
      count: overallAttendanceDataList?.count || 0,
      Comp: MultiView,
      iProps: {
        carddata: overallAttendanceDataList?.rows || [],
        cardcount: overallAttendanceDataList?.count || 0,
        listdata: overallAttendanceDataList?.rows || [],
        listcount: overallAttendanceDataList?.count || 0,
        listCol: ListColOverall,
        cardLimit: 9,
        listLimit: 9,
        link: '/hrms/attendance/',
        Search: Search,
        statusKey: 'status',
        updateApi: onOverallAction,
        same: true,
        listKey: 'employee_id',
        statData: {
          id: 'employee_id',
          name: 'employee_name',
          image: 'employee_image',
        },
        searchDropdowns: {
          field2: allTeam,
          field3: statusList,
        },
      },
    },
    {
      visible: allowed([Roles.ATTENDANCE_TEAMS], 'read'),
      title: 'Team Attendance',
      key: 'teami',
      count: teamAttendanceList?.count || 0,
      iProps: {
        carddata: teamAttendanceList?.rows || [],
        cardcount: teamAttendanceList?.count || 0,
        listdata: teamAttendanceList?.rows || [],
        listcount: teamAttendanceList?.count || 0,
        listCol: ListColTeams,
        link: '/hrms/attendance/',
        Search: TeamSearch,
        statusKey: 'status',
        updateApi: onTeamAction,
        teamDrop: teamsDetailData,
        cardLimit: 9,
        listLimit: 9,
        listKey: 'employee_id',
        statData: {
          id: 'employee_id',
          name: 'employee_name',
          image: 'employee_image',
        },
        searchDropdowns: {
          field1: statusList,
        },
      },
      Comp: MultiView,
    },
    {
      visible: allowed([Roles.ATTENDANCE_INDIVIDUAL], 'read'),
      title: 'My Attendance',
      key: 'mytask',
      Comp: MyAttendance,
    },
  ];

  const overall = [
    {
      visible: allowed([Roles.ATTENDANCE], 'read'),
      title: 'Issues',
      key: 'overall',
      count: overallAttendanceData?.count || 0,
      Comp: MultiView,
      iProps: {
        carddata: overallAttendanceData?.rows || [],
        cardcount: overallAttendanceData?.count || 0,
        cardLimit: 9,
        listLimit: 9,
        link: '/hrms/attendance/',
        statusKey: 'status',
        updateApi: onOverallAction1,
        noSwitch: true,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
        },
      },
    },
  ];
  const teami = [
    {
      visible: allowed([Roles.ATTENDANCE_TEAMS], 'read'),
      title: 'Issues',
      key: 'teami',
      count: teamAttendance?.count || 0,
      iProps: {
        carddata: teamAttendance?.rows || [],
        cardcount: teamAttendance?.count || 0,
        link: '/hrms/attendance/',
        statusKey: 'status',
        updateApi: onTeamAction1,
        teamDrop: teamsDetailData,
        cardLimit: 9,
        listLimit: 9,
        noSwitch: true,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
        },
      },
      Comp: MultiView,
    },
  ];

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeTab} setCurrentTab={setCurrentTab} />
      </Col>
      {currentT == 'overall' && (
        <Col span={24}>
          <CardListSwitchLayout tabs={overall} active={'overall'} />
        </Col>
      )}
      {currentT == 'teami' && (
        <Col span={24}>
          <CardListSwitchLayout tabs={teami} active={'teami'} />
        </Col>
      )}
    </Row>
  );
};
