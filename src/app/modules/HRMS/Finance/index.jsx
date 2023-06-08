import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Search from './components/Search';
import MultiView from 'Molecules/MultiView';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import { getOverallFinance, getOverallFinanceList } from './ducks/actions';
import { allowed } from '../../../../routing/config/utils';
import Roles from '../../../../routing/config/Roles';
import { getTeams } from '../../Application/ducks/actions';

const colName = [
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
    title: 'Job Title',
    dataIndex: 'job_title_name',
    key: 'job_title_name',
    sorter: true,
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
    dataIndex: 'team',
    key: 'team',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (text) => {
      let clname = '';
      if (/\d/.test(text)) {
        clname = 'c-error';
      } else if (text == 'Outstanding Loan') {
        clname = 'c-error';
      } else {
        clname = 'c-success';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const filters = [
  {
    label: 'Active',
    value: 'Active',
  },

  {
    label: 'Archive',
    value: 'Archive',
  },
];

export default (props) => {

  const dispatch = useDispatch();
  const overallFinance = useSelector((state) => state.hrmsfinance.overallFinanceData);
  const overallFinanceList = useSelector((state) => state.hrmsfinance.overallFinanceListData);
  const team = useSelector((state) => state.global.teams);
  const [allTeam, setAllTeam] = useState([]);

  useEffect(() => dispatch(getTeams()), []);

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
          employee_name: search?.name ? search?.name : '',
          team_name: search?.team ? search?.team.value : '',
          contract_type: search?.contract ? search?.contract.value : '',
        };
        dispatch(getOverallFinanceList(filter, page, limit, sort, sortby, searchVal));
      } else {
        dispatch(getOverallFinanceList(filter ? filter : filters[0].label, page, limit, sort, sortby, null));
      }
  };

  
  const onOverallIssueAction = (filter, page, limit, sort, sortby, type, search) => {
      dispatch(getOverallFinance(page, limit, sort, sortby));
  };

  const tabs = [
    {
      visible: allowed([Roles.HRMSFINANCE], 'read'),
      title: 'Overall Finance',
      key: 'overall',
      count: overallFinanceList?.count,
      Comp: MultiView,
      iProps: {
        carddata: overallFinanceList?.rows || [],
        cardcount: overallFinanceList?.count || 0,
        listdata: overallFinanceList?.rows || [],
        listcount: overallFinanceList?.count || 0,
        listCol: colName,
        filters: filters,
        Search: Search,
        link: '/hrms/finance/',
        statusKey: 'status',
        updateApi: onOverallAction,
        cardLimit: 9,
        listLimit: 9,
        same: true,
        statData: {
          id: 'employee_id',
          name: 'employee_name'
        },
        searchDropdowns: {
          field1: allTeam,
          field2: [
            { label: 'All', value: '' },
            { label: 'Permanent', value: 'Permanent' },
            { label: 'Contract', value: 'Contract' },
            { label: 'Probation', value: 'Probation' },
          ],
        },
      },
    },
  ];

  const tabs1 = [
    {
      visible: allowed([Roles.HRMSFINANCE], 'read'),
      title: 'Issues',
      key: 'issues',
      count: overallFinance?.count,
      Comp: MultiView,
      iProps: {
        carddata: overallFinance?.rows || [],
        cardcount: overallFinance?.count || 0,
        link: '/hrms/finance/',
        statusKey: 'status',
        updateApi: onOverallIssueAction,
        noSwitch: true,
        statData: {
          id: 'employee_id',
          name: 'employee_name'
        },
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs1} active={tabs1[0].key} />
      </Col>
    </Row>
  );
};