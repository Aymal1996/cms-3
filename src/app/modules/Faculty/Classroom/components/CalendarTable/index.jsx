import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Space, Badge } from 'antd';
import moment from 'moment';
import ListCard from 'Molecules/ListCard';
import { caseCol, capitalizeFirstLetter } from '../../../utills/CalendarCases';

const { Title, Text } = Typography;

export default (props) => {

    const {data, cDate} = props;
    const [aData, setAData] = useState({})

    useEffect(() => {
        if (data) {
            setAData({
                class: data.filter(x => x.type == 'class'),
                appointment: data.filter(x => x.type == 'appointment'),
                exam: data.filter(x => x.type == 'exam'),
                holiday: data.filter(x => x.type == 'holiday'),
            })
        }
    }, [data]);

    const colName = [
        {
            title: 'Module',
            dataIndex: 'module_name',
            key: 'module_name',
        },
        {
            title: 'Programme',
            dataIndex: 'program_name',
            key: 'program_name',
        },
        {
          title: 'Faculty',
          dataIndex: 'faculty_name',
          key: 'faculty_name',
        },
        {
            title: 'Term',
            dataIndex: 'timetable_name',
            key: 'timetable_name',
        },
        {
            title: 'Replacement Date',
            dataIndex: 'replacement_date',
            key: 'replacement_date',
            render: (text) => text ? <span className='c-error'>{moment(text).format('Do MMMM YYYY')}</span> : 'N/A'
          },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (text, record) => <span>{`${record?.start_time ? moment(record?.start_time, "hh:mm:ss").format('hh:mma'): ''} - ${record?.end_time ? moment(record?.end_time, "hh:mm:ss").format('hh:mma'): ''}`}</span>
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

    const colNameExam = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Module',
            dataIndex: 'module_name',
            key: 'module_name',
        },
        {
            title: 'Programme',
            dataIndex: 'program_name',
            key: 'program_name',
        },
        {
          title: 'Faculty',
          dataIndex: 'faculty_name',
          key: 'faculty_name',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (text, record) => <span>{`${record?.time_from ? moment(record?.time_from, "hh:mm:ss").format('hh:mma'): ''} - ${record?.time_to ? moment(record?.time_to, "hh:mm:ss").format('hh:mma'): ''}`}</span>
        },
        {
            title: 'Exam Venue',
            dataIndex: 'exam_venue',
            key: 'exam_venue',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            render: (text, record) => <span>{`Block ${record?.exam_venue_block} - ${record?.exam_venue_level}`}</span>
        },
    ];

    const colNameApp = [
        {
            title: 'Name',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (text, record) => <span>{`${record?.start_time ? moment(record?.start_time, "hh:mm:ss").format('hh:mma'): ''} - ${record?.end_time ? moment(record?.end_time, "hh:mm:ss").format('hh:mma'): ''}`}</span>
        },
        {
            title: 'Venue',
            dataIndex: 'exam_venue',
            key: 'exam_venue',
        },
    ];

    // const onClickRow = (record) => {
    //     return {
    //         onClick: () => {
    //         },
    //     };
    // }

    console.log('data', data)

    return (
        <Space direction='vertical' size={30} className='w-100'>
            <Title level={3} className='mb-0 c-white text-center'>{moment(cDate).format('dddd, Do MMMM YYYY')}</Title>
        <Row gutter={[20,20]}>
            {Object.entries(aData).map(([KEY,VAL], i) => (
            <Fragment key={i}>
                {VAL.length > 0 && <>
                <Col span={24}>
                    <Badge color={caseCol(KEY)} text={capitalizeFirstLetter(KEY)}/>
                </Col>
                <Col span={24}>
                {KEY == 'holiday' ? 
                <Text>{VAL[0].holiday_name}</Text>
                :
                <ListCard 
                scrolling={500}
                listClass="nospace-card b-black"
                classes='transparent-table'
                ListData={VAL}
                ListCol={KEY != 'appointment' ? KEY == 'class' ? colName : colNameExam : colNameApp}
                pagination={false}
                />}
                </Col>
                </>}
            </Fragment>
            ))}
        </Row>
        </Space>
    )
}