import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/CardListSwitchLayout';
import MultiView from '../../../molecules/MultiView';
import Search from '../Students/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';
import { emptyListFinance, getFinanceApplicatCard, getFinanceApplicatList } from '../ducks/actions';
import { ignoreApplicant } from './ducks/services';

const filters = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Ignored',
    value: 'Ignored',
  },
];

export default (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  const colName = [
    {
      title: 'Student Name',
      dataIndex: 'applicant_name',
      key: 'applicant_name',
      sorter: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      key: 'faculty',
      sorter: true,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      sorter: true,
    },
    {
      title: 'Outstanding Balance',
      dataIndex: 'outstanding_amount',
      key: 'outstanding_amount',
      align: 'right',
      sorter: true,
      render: (text) => (
        <span className="c-error">
          {company_currency} {text}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links">
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const dispatch = useDispatch();
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const data = useSelector((state) => state.finance.applicantCard);
  const datalist = useSelector((state) => state.finance.applicantList);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);

  useEffect(() => {
    dispatch(getAllFaculty());
    dispatch(getAllPrograms());
    return () => dispatch(emptyListFinance());
  }, []);

  useEffect(() => {
    if (facultyList && facultyList.length > 0) {
      let temp = [];
      facultyList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Faculties', value: '' });
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        } else {
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        }
      });
      setFaculty(temp);
    }
  }, [facultyList]);

  useEffect(() => {
    if (programList && programList.length > 0) {
      let temp = [];
      programList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Programmes', value: '' });
          temp.push({ label: x.program_name, value: x.program_name });
        } else {
          temp.push({ label: x.program_name, value: x.program_name });
        }
      });
      setProgram(temp);
    }
  }, [programList]);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search, team, id) => {
    if (id) {
      ignoreApplicant(id, filter == 'Ignored' && type == 'list' ? 'Show' : 'Ignored')
        .then((res) => {
          message.success(res.data.message.message);
          if (type == 'list') {
            if (search) {
              let searchVal = {};
              searchVal = {
                faculty: search?.faculty ? search?.faculty.value : '',
                program_name: search?.program ? search?.program.value : '',
              };
              dispatch(getFinanceApplicatList(page, limit, sort, sortby, searchVal, filter));
            } else {
              dispatch(getFinanceApplicatList(page, limit, sort, sortby, null, filter));
            }
          } else {
            dispatch(getFinanceApplicatCard(page, limit, sort, sortby));
          }
        })
        .catch((e) => {
          const { response } = e;
          message.error(response.data.message);
        });
    } else {
      if (type == 'list') {
        if (search) {
          let searchVal = {};
          searchVal = {
            faculty: search?.faculty ? search?.faculty.value : '',
            program_name: search?.program ? search?.program.value : '',
          };
          dispatch(getFinanceApplicatList(page, limit, sort, sortby, searchVal, filter));
        } else {
          dispatch(getFinanceApplicatList(page, limit, sort, sortby, null, filter));
        }
      } else {
        dispatch(getFinanceApplicatCard(page, limit, sort, sortby));
      }
    }
  };

  const tabs = [
    {
      visible: true,
      title: 'Applicant Outstanding Balance',
      key: 'pending',
      count: data?.count,
      Comp: MultiView,
      iProps: {
        carddata: data.rows || [],
        cardcount: data.count,
        listdata: datalist.rows,
        listcount: datalist.count,
        listKey: 'applicant_id',
        cardLimit: 9,
        listLimit: 9,
        listCol: colName,
        filters: filters,
        Search: Search,
        link: '/finance/applicants/',
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: faculty,
          field2: program,
        },
        statData: { key1: 'status', key2: 'outstanding_amount', currency: `${company_currency} ` },
        statusKey: 'status',
        hide: true,
        applicant: true,
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
    </Row>
  );
};
