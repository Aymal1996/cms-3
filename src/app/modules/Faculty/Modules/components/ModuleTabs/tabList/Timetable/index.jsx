import React, {useState, useEffect} from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../../../../molecules/ListCard';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import SearchTimetable from '../../../SearchTimetable';
import { getModuleTimetable } from '../../../../ducks/actions';
import moment from 'moment';
import { timeTableCategory } from '../../../../../../../../configs/constantData';

const { Title } = Typography;
const colName = [
    {
        title: 'Programme',
        dataIndex: 'program_name',
        key: 'program_name',
      },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (text, record) => <span>{`${record?.start_time ? moment(record?.start_time, "hh:mm:ss").format('hh:mm a'): ''}, ${record?.end_time ? moment(record?.end_time, "hh:mm:ss").format('hh:mm a'): ''}`}</span>
    },
    {
        title: 'Day',
        dataIndex: 'day',
        key: 'day',
    },
    {
        title: 'Classroom',
        dataIndex: 'classroom_name',
        key: 'classroom_name',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: (text, record) => <span>{`Block ${record?.block} - ${record?.level}`}</span>
    },
];

export default (props) => {

    const dispatch = useDispatch();
    const { id} = useParams();
    const location = useLocation();
    const [page, setPage]= useState(1);
    const [limit, setLimit] = useState(6);
    const [search, setSearch] = useState(null);
    const data = useSelector(state => state.facultyModules.moduleTimetable)

    useEffect(() => {
        dispatch(getModuleTimetable(id, page, limit, "", "", null, location.state.key1))
    }, []);

    const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        if (sorter.order) {
            dispatch(getModuleTimetable(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, search, location.state.key1));
        } else {
            dispatch(getModuleTimetable(id, pagination.current, pagination.pageSize, '', '', search, location.state.key1));
        }
    }

    const onSearch = (search) => {
        if (search) {
          let searchVal = {};
          searchVal = {
            category: search.category.value,
            category_data: search.search,
          };
          setSearch(JSON.stringify(searchVal))
          dispatch(getModuleTimetable(id, page, limit, '', '', JSON.stringify(searchVal), location.state.key1));
        } else {
          setSearch(null)
          dispatch(getModuleTimetable(id, page, limit, '', '', null, location.state.key1));
        //   dispatch(getStaffList(id, page, limit, '', '', null));
        }
      };
    return (
        <Card bordered={false} className="uni-card nospace-card cardinTab">
        <Row gutter={[20,20]}>
            <Col span={24}>
                <Title level={4} className='c-default mb-0'>Module Timetable</Title>
            </Col>
            <Col span={24}>
                <ListCard 
                scrolling={500}
                field1={timeTableCategory}
                listClass="nospace-card"
                classes='clickRow'
                Search={SearchTimetable}
                onSearch={onSearch}
                ListData={data?.rows}
                ListCol={colName}
                onChange={onTableChange}
                pagination={{
                    total: data?.count,
                    current: page,
                    pageSize: limit
                }}
                />
            </Col>
        </Row>
        </Card>
    )
}