import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import CMSCalendar from 'Molecules/CMSCalendar';
import moment from 'moment';
import { WarningIcon } from 'Atoms/CustomIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getClassroomSchedule, getModulesProgram, getReplacementCount } from './ducks/actions';
import { Popup } from 'Atoms/Popup';
import ReplacementForm from './components/ReplacementForm';


const { Title, Text } = Typography;
const badge = [
    {
        title: 'Class',
        color: '#0077B6',
    },
    {
        title: 'Appointments',
        color: '#9B5DE5',
    },
    {
        title: 'Exam',
        color: '#02A574'
    },
    {
        title: 'Holiday',
        color: '#E89005'
    }
]

const issueCheck = (val) => {
    switch(val) {
        case 'Ungraded Students' : return {link: 'UngradedStudents', color: 'b-error'};
        case 'Assessments this week' : return {link: 'StudentAssessment', color: 'b-success'};
    }
}

// const moduleDetails1 =  [
//     {
//         program_code: '123',
//         program_name: 'Doctor of Philosophy (PhD) Information System',
//         module_list: [
//             {
//                 module_name: 'Cognitive Psychology of Mass Communication',
//                 module_code: '123',
//                 student_count: 0,
//                 issue: ''
//             },
//             {
//                 name: '01531',
//                 module_name: 'Research Paper',
//                 module_code: '123',
//                 student_count: 3,
//                 issue: 'Assessments this week',
//             },
//         ]
//     },
// ]

export default (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const calData = useSelector(state => state.classroom.schedule);
    const replaceClass = useSelector(state => state.classroom.replacementClass);
    const moduleDetails = useSelector(state => state.classroom.modules);

    useEffect(() => {
        dispatch(getModulesProgram());
    }, []);

    const updateCal = (start, end) => {
        dispatch(getClassroomSchedule(start, end))
        dispatch(getReplacementCount(start, end))
    }

    const popup = {
        closable: true,
        visibility: visible,
        content: <ReplacementForm updateApi={updateCal} data={replaceClass} />,
        width: 1300,
        onCancel: () => setVisible(false),
    };

    return (
        <>
        <Row gutter={[20, 50]}>
            <Col span={24}>
                <Card bordered={false} className='uni-card'>
                    <Row gutter={[20,30]}>
                        <Col span={24}>
                            <Title level={3} className='mb-0 c-white'>{moment().format('dddd, Do MMMM YYYY')}</Title>
                        </Col>
                        {replaceClass && replaceClass.length > 0 ? 
                        <Col span={24}>
                            <Card bordered={false} className='red-card cursor-pointer' onClick={() => setVisible(true)}>
                                <Space size={20}>
                                    <WarningIcon className='fontSize40 c-white' />
                                    <Space size={4} direction='vertical'>
                                        <Text className="op-6">Assign Replacement Class</Text>
                                        <Title level={4} className=" c-white mb-0">{replaceClass.length} Class Remaining</Title>
                                    </Space>
                                </Space>
                            </Card>
                        </Col> 
                        : null}
                        <Col span={24}>
                            <CMSCalendar pWidth={1320} comp={'CalendarTable'} badges={badge} updateCal={updateCal} calenderData={calData} />
                        </Col>
                    </Row>
                </Card>
            </Col>
            {moduleDetails && moduleDetails.length > 0 && moduleDetails?.map((x, i) => (
                <Col span={24} key={i}>
                    <Row gutter={[20,30]}>
                        <Col span={24}>
                            <Title level={4} className='mb-0 c-white'>{x.program_name}</Title>
                        </Col>
                        {x.module_list.length > 0 && 
                        <Col span={24}>
                            <Row gutter={[20,20]}>
                                {x.module_list.map((y,j) => (
                                    <Col span={8} key={j}>
                                        <Card bordered={false} className={`uni-card main-card-hover point-cursor`} onClick={() => history.push({pathname: `/faculty/classroom/UngradedStudents/${y.name}`, state : { module: y.module_name, semester_code: y.semester_code, tt_id: y.tt_id}})}>
                                            <Space size={30} direction='vertical' className='w-100'>
                                                <Space direction='vertical' size={4} className='w-100'>
                                                    <Text className='c-gray'>Module</Text>
                                                    <Title level={5} className='mb-0 c-white'>{y.module_name}</Title>
                                                    <Text className='c-gray'>{y.structure_name}</Text>
                                                </Space>
                                                {y.student_count ?
                                                <Card bordered={false} className={`uni-card-small ${y.student_count ? issueCheck(y.issue)?.color: ''}`}>
                                                    <Title level={4} className='mb-0 c-white'>{`${y.student_count} ${y.issue}`}</Title>
                                                </Card> : null}
                                            </Space>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>}
                        
                    </Row>
                </Col>
            ))}

            {/* {moduleDetails1.map((x, i) => (
                <Col span={24} key={i}>
                    <Row gutter={[20,30]}>
                        <Col span={24}>
                            <Title level={4} className='mb-0 c-white'>{x.program_name}</Title>
                        </Col>
                        {x.module_list.length > 0 && 
                        <Col span={24}>
                            <Row gutter={[20,20]}>
                                {x.module_list.map((y,j) => (
                                    <Col span={8} key={j}>
                                        <Card bordered={false} className={`uni-card ${y.issue ? 'main-card-hover point-cursor' : ''}`} onClick={() => y.issue ? history.push({pathname: `/faculty/classroom/${issueCheck(y.issue)?.link}/${y.name}`, state : { module: y.module_name}}) : null}>
                                            <Space size={30} direction='vertical' className='w-100'>
                                                <Space direction='vertical' size={8} className='w-100'>
                                                    <Text className='c-gray'>Module</Text>
                                                    <Title level={5} className='mb-0 c-white'>{y.module_name}</Title>
                                                </Space>
                                                {y.student_count ?
                                                <Card bordered={false} className={`uni-card-small ${y.student_count ? issueCheck(y.issue)?.color: ''}`}>
                                                    <Title level={4} className='mb-0 c-white'>{`${y.student_count} ${y.issue}`}</Title>
                                                </Card> : null}
                                            </Space>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>}
                        
                    </Row>
                </Col>
            ))} */}
            
        </Row>
        <Popup {...popup} />
        </>
    )
}