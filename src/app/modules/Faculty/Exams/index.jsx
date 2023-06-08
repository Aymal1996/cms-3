import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Pagination,Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { useHistory } from 'react-router';
import HeadingChip from '../../../molecules/HeadingChip';
import ListCard from '../../../molecules/ListCard';
import { WarningIcon } from '../../../atoms/CustomIcons';
import { getallExamsList} from './ducks/actions';
import UnassignExams from './Component/UnassignExams';
import moment from 'moment';

const ListCol = [
  {
    title: 'Module',
    dataIndex: 'module_name',
    key: 'module_name',
    sorter: true,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: true,
    width: 200
  },
  
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: true,
  },
  {
    title: 'Intake',
    dataIndex: 'intake_name',
    key: 'intake_name',
    sorter: true,
  },
  {
    title: 'Time',
    dataIndex: 'time_from',
    key: 'time_from',
    sorter: true,
    align: 'center',
    render: (text, record) => <>{record.time_from ? moment(record.time_from,'HHmmss').format("hh:mm A") : ''} - {record.time_to ? moment(record.time_to,'HHmmss').format("hh:mm A") : ''}</>
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
    render: (text, record) => text? moment(text).format('DD/MM/YYYY') : ''
  },
  {
    title: 'Day',
    dataIndex: 'day',
    key: 'day',
    sorter: true,
  },
  {
    title: 'Exam Venue',
    dataIndex: 'exam_venue',
    key: 'exam_venue',
    sorter: true,
  },
 
  {
    title: 'Location',
    dataIndex: 'exam_venue_block',
    key: 'exam_venue_block',
    sorter: true,
  },
  
];

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { Title, Text } = Typography;
  const getexamlist = useSelector((state) => state.exams.allexamslist);


  const modulesCount = {
  examdate: `${getexamlist?.unassigned_exam_date} Modules Unassigned`,
  invigilator: `${getexamlist.unassigned_invigilators} Modules Unassigned`,
  }



const onClickRow = (record) => { 
  return {
    onClick: () => {
      history.push(`/faculty/exams/editExam/${record.name}`)
    },
  };
}

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const onSearch = (val) => {
    if (val) {
      let searchVal = {
        category_data: val?.category_data ? val.category_data.value : '',
        category: val?.category ? val.category.value : '',
      };
      console.log('submit',searchVal);
      dispatch(getallExamsList(page, limit, '', '', JSON.stringify(searchVal)));
    }
  };


const onTableChange = (pagination, filters, sorter) => {
  console.log('heloo', pagination, sorter);
  setPage(pagination.current);
  setLimit(pagination.pageSize);
  if (sorter.order) {
    dispatch(getallExamsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
  } else {
    dispatch(getallExamsList(pagination.current, pagination.pageSize, '', ''));
  }
};

    useEffect(() => {
      dispatch(getallExamsList(1, 10));
  }, []);


    return (
        <>
        <Row gutter={[20, 50]}>
            <Col span={24}>
                <Row gutter={[20,30]}>
                    <Col span={24}>
                    <HeadingChip title="OverAll Exam Timetable" />
                    </Col>
                    <Col span={24} className="clickRow">
                    <ListCard
                      ListCol={ListCol}
                      ListData={getexamlist?.rows}
                      Search={Search}
                      onSearch={Search && onSearch}
                      onRow={onClickRow}
                      ExtraBlocks={UnassignExams}
                      BlocksCount={modulesCount}
                      onChange={onTableChange}
                      pagination={{
                        total: getexamlist?.count,
                        current: page,
                        pageSize: limit,
                      }}
                    />
                    </Col>
                </Row>
            </Col>
        </Row>

        </>
    )
}