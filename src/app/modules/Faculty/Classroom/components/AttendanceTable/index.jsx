import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Space } from 'antd';
import moment from 'moment';
import { useHistory, useParam, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import ListCard from 'Molecules/ListCard';
import { getLecturerAttendance, getStudentAttendance } from '../../ducks/actions';

const { Title, Text } = Typography;

export default (props) => {

    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const lecturerData = useSelector(state => state.classroom.lecturerAttendance);
    const studentData = useSelector(state => state.classroom.studentAttendance);
    const {data, cDate} = props;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(getLecturerAttendance(id, props.extra, cDate))
        dispatch(getStudentAttendance(id, props.extra, cDate, page, limit, "", ""))
    }, [cDate]);

    const colNameLecturer = [
        {
            title: 'Name',
            dataIndex: 'employee_name',
            key: 'employee_name',
        },
        {
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
            render: (text) => 'Lecturer'
        },
        {
          title: 'Attendance',
          dataIndex: 'status',
          key: 'status',
          render: text => <span className={`${text == 'Present' ? 'c-success': 'c-error'}`}>{text == 'Present' ? 'Attended' : 'Absent'}</span> 
        },
    ];

    const colNameStudent = [
        {
            title: 'Name',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
            render: (text) => 'Student'
        },
        {
            title: 'Semester',
            dataIndex: 'semester_name',
            key: 'semester_name',
        },
        {
          title: 'Attendance',
          dataIndex: 'status',
          key: 'status',
          render: text => <span className={`${text == 'Present' ? 'c-success': 'c-error'}`}>{text == 'Present' ? 'Attended' : 'Absent'}</span> 
        },
    ];

    const onClickRow = (record) => {
        return {
            onClick: () => {
                history.push(`/faculty/students/details/${record?.student_id}`)
            },
        };
    }

    const onClickRow1 = (record) => {
        return {
            onClick: () => {
                history.push(`/faculty/staff/${record?.employee_id}`)
            },
        };
    }

    const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        if (sorter.order) {
          dispatch(getStudentAttendance(id, props.extra, cDate, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
        } else {
          dispatch(getStudentAttendance(id, props.extra, cDate, pagination.current, pagination.pageSize, '', ''));
        }
    }

    return (
        <Space direction='vertical' size={30} className='w-100'>
            <Space size={4} direction='vertical'>
                <Title level={4} className='mb-0 c-white'>{data[0]?.module_name}</Title>
                <Text className='c-gray'>{`${data[0]?.start_time ? moment(data[0]?.start_time, "hh:mm:ss").format('hh:mma'): ''} - ${data[0]?.end_time ? moment(data[0]?.end_time, "hh:mm:ss").format('hh:mma'): ''} . ${data[0]?.classroom_name}, Block ${data[0]?.block}, Level ${data[0]?.level}`}</Text>
            </Space>
        <Row gutter={[20,20]}>
            <Col span={24} className="clickRow">
                <ListCard 
                onRow={onClickRow1}
                title='Lecturer Attendance'
                scrolling={500}
                listClass="nospace-card b-black"
                classes='transparent-table'
                ListData={lecturerData}
                ListCol={colNameLecturer}
                pagination={false}
                />
            </Col>
            <Col span={24} className="clickRow">
                <ListCard 
                onRow={onClickRow}
                title='Student Attendance'
                scrolling={500}
                listClass="nospace-card b-black"
                classes='transparent-table'
                onChange={onTableChange}
                ListData={studentData?.rows}
                ListCol={colNameStudent}
                pagination={{
                    total: studentData?.count,
                    current: page,
                    pageSize: limit
                }}
                />
            </Col>
        </Row>
        </Space>
    )
}