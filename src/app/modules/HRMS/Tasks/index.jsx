import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import MultiView from 'Molecules/MultiView';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOverallTasks,
  getOverallTasksWithStatus,
  getTeamTasksWithStatus,
  getTeamTasks,
  emptyOverall,
} from './ducks/actions';
import { getTeams2, getTeamsDetail, getAllProjects } from '../../Application/ducks/actions';
import Search from './components/Search';
import SearchTeam from './components/SearchTeam';
import MyTasks from './components/MyTasks';
import { useLocation } from 'react-router-dom';
import Roles from '../../../../routing/config/Roles';
import { allowed } from '../../../../routing/config/utils';
import moment from 'moment';

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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => text ? moment(text, 'YYYY-MM-DD').format('Do MMM YYYY') : '',
    sorter: true,
    width: 120,
  },
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
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    sorter: true,
    width: 100,
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
    sorter: true,
    width: 100,
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
    dataIndex: 'status',
    key: 'status',
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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => text ? moment(text, 'YYYY-MM-DD').format('Do MMM YYYY') : '',
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
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    sorter: true,
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
    sorter: true,
  },
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'task',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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
  const location = useLocation();
  const dispatch = useDispatch();

  // const overallData = useSelector(state => state.tasks.overallTaskData);
  const overallDataList = useSelector((state) => state.tasks.overallTaskDataWithStatus);
  const teamTaskData = useSelector((state) => state.tasks.teamTaskData);
  const teamTaskDataList = useSelector((state) => state.tasks.teamTaskDataWithStatus);
  const projects = useSelector((state) => state.global.projects);
  const team = useSelector((state) => state.global.teams2);
  const [allProj, setAllProj] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  let activeTab = '';

  useEffect(() => {
    if (allowed([Roles.TASK_TEAMS], 'read') || allowed([Roles.TASK], 'read')) {
      dispatch(getTeamsDetail(id));
      dispatch(getAllProjects());
      dispatch(getTeams2());
    }
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      let temp = [];
      projects?.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All', value: '' });
          temp.push({ label: x.project_name, value: x.name });
        } else {
          temp.push({ label: x.project_name, value: x.name });
        }
      });
      setAllProj(temp);
    }
  }, [projects]);

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

  if (location?.state?.addTimeSheet) {
    activeTab = 'mytask';
  } else {
    if (allowed([Roles.TASK], 'read')) {
      activeTab = 'overall';
    } else if (allowed([Roles.TASK_TEAMS])) {
      activeTab = 'team';
    } else {
      activeTab = 'mytask';
    }
  }

  // useEffect(() => {
  //   if (Object.keys(team).length > 0) {
  //     dispatch(getTeamTasks(team[0]?.team_name, 1, 6));
  //   }
  // }, [team]);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    let searchVal = {};
    searchVal = {
      employee_id: search?.id ? search?.id : '',
      employee_name: search?.name ? search?.name : '',
      date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
      project: search?.project ? search?.project.value : '',
      team_name: search?.team ? search?.team.value : '',
    };
    dispatch(getOverallTasksWithStatus(filter, page, limit, sort, sortby, searchVal));
  };

  const onTeamAction = (filter, page, limit, sort, sortby, type, search, team) => {
    if (team) {
      if (type == 'list') {
        if (search) {
          let searchVal = {};
          searchVal = {
            employee_id: search?.id ? search?.id : '',
            employee_name: search?.name ? search?.name : '',
            date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
            project: search?.project ? search?.project.value : '',
          };
          dispatch(getTeamTasksWithStatus(team, filter, page, limit, sort, sortby, searchVal));
        } else {
          dispatch(getTeamTasksWithStatus(team, filter, page, limit, sort, sortby, null));
        }
      } else {
        dispatch(getTeamTasks(team, page, limit, sort, sortby));
      }
    }
  };

  const tabs = [
    {
      visible: allowed([Roles.TASK], 'read'),
      title: 'Overall Tasks',
      key: 'overall',
      count: overallDataList?.count || overallDataList?.count || 0,
      Comp: MultiView,
      iProps: {
        carddata: overallDataList?.rows || [],
        cardcount: overallDataList?.count || 0,
        listdata: overallDataList?.rows || [],
        listcount: overallDataList?.count || 0,
        listCol: ListColOverall,
        link: '/hrms/tasks/',
        listKey: 'employee_id',
        filters: filtersOverall,
        updateApi: onOverallAction,
        Search: Search,
        cardLimit: 9,
        listLimit: 9,
        same: true,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
        },
        searchDropdowns: {
          field1: allProj,
          field2: allTeam,
        },
        addon: 'Timesheet',
        statusKey: 'status',
      },
    },
    {
      visible: allowed([Roles.TASK_TEAMS], 'read'),
      title: 'Team Tasks',
      key: 'team',
      count: teamTaskData?.count || teamTaskDataList?.count || 0,
      iProps: {
        carddata: teamTaskData?.rows || [],
        cardcount: teamTaskData?.count || 0,
        listdata: teamTaskDataList?.rows || [],
        listcount: teamTaskDataList?.count || 0,
        listCol: ListColTeams,
        listKey: 'employee_id',
        link: '/hrms/tasks/',
        filters: filtersOverall,
        updateApi: onTeamAction,
        Search: SearchTeam,
        searchDropdowns: {
          field1: allProj,
        },
        cardLimit: 6,
        listLimit: 10,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
        },
        statusKey: 'status',
        teamDrop: team && team.length ? team : [],
      },
      Comp: MultiView,
    },
    {
      visible: allowed([Roles.TASK_INDIVIDUAL], 'read'),
      title: 'My Tasks',
      key: 'mytask',
      Comp: MyTasks,
      iProps: {
        activeAddTimeSheet: location?.state?.addTimeSheet ? location?.state?.addTimeSheet : false,
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeTab} />
      </Col>
    </Row>
  );
};
