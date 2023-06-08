import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card, Typography, Space } from "antd";
import PendingRequestCard from '../../../../../molecules/PendingRequestCard';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { useDispatch, useSelector } from 'react-redux';
import { WarningIcon } from '../../../../../atoms/CustomIcons';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

export default (props) => {
    const history = useHistory();
    const { other_issues } = props;

    const data = [
        {
            topHeading: 'Assign Programme Coordinator',
            btmHeading: `${other_issues?.unassigned_program_coordinators > 0 ? other_issues?.unassigned_program_coordinators : 0} Programmes Unassigned`,
            link: `/faculty/programmes`
        },
        {
            topHeading: 'Assign Materials',
            btmHeading: `${other_issues?.unassigned_materials > 0 ? other_issues?.unassigned_materials : 0} Modules Unassigned`,
            link: `/faculty/modules`
        },
        {
            topHeading: 'Assign Lecturers',
            btmHeading: `${other_issues?.unassigned_lecturers > 0 ? other_issues?.unassigned_lecturers : 0} Modules Unassigned`,
            link: `/faculty/modules`
        },
        {
            topHeading: 'Assign Module Timetable',
            btmHeading: `${other_issues?.unassigned_timetable > 0 ? other_issues?.unassigned_timetable : 0} Modules Unassigned`,
            link: `/faculty/timetable/unassignModules`
        },
        {
            topHeading: 'Assign Exam Date & Location',
            btmHeading: `${other_issues?.unassigned_exam_date > 0 ? other_issues?.unassigned_exam_date : 0} Modules Unassigned`,
            link: `/faculty/exams/unassignModules`
        },
        {
            topHeading: 'Assign Exam Invigilators',
            btmHeading: `${other_issues?.unassigned_invigilators > 0 ? other_issues?.unassigned_invigilators : 0} Modules Unassigned`,
            link: `/faculty/exams/unassignModules`
        },
        {
            topHeading: 'Assign Replacement Class',
            btmHeading: `${other_issues?.unassigned_replacement_class > 0 ? other_issues?.unassigned_replacement_class : 0} Class Unassigned`,
            link: `/faculty/classroom`
        },
    ]

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title={'Other Issues'} />
            </Col>
            <Col span={24}>
                <Card bordered={false} className="uni-card">
                    <Title level={4}>Programme Status</Title>
                    <Row gutter={[20, 20]}>
                        {data?.map((resp, ind) => (
                            <Col flex='0 1 225px'>
                                <Card
                                    bordered={false}
                                    className="uni-card red-card text-center point-cursor"
                                    onClick={() => history.push(`${resp.link}`)}
                                >
                                    <Space size={8} direction="vertical">
                                        <WarningIcon style={{fontSize: 50}} className='c-white mb-1' />
                                        <Text className="op-6 lineHeight20 d-block" style={{height:'40px'}}>{resp?.topHeading}</Text>
                                        <Title level={4} className="lineHeight20 mb-0">{resp?.btmHeading}</Title>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}