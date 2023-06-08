import React from 'react';
import { Row, Col, Card, Descriptions, Typography, Space, Progress, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

const typeCheck = (col, type) => {
    switch(col) {
        case 'Lecture ' : return ({title: `L${getLastWord(type)}`, color: '#187edc'})
        case 'Quiz ' : return ({title: `Q${getLastWord(type)}`, color: '#02A574'})
        case 'Assignment ' : return ({title: `A${getLastWord(type)}`, color: '#E89005'})
        case 'Midterm Exam' : return ({title: 'Midterm Exam', color: '#C3423F'})
        case 'Final Exam' : return {title: 'Final Exam', color: '#C3423F'}
        default: break;
    }
}

function getLastWord(str){
    return str.substr(str.lastIndexOf(" ") + 1);
}

export default (props) => {

    const history = useHistory();
    const summary = useSelector(state => state.facultyModules.moduleSummary);

    return (
        <Card bordered={false} className='uni-card nospace-card cardinTab'>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Title level={4} className='mb-0 c-default'>Module Summary</Title>
                </Col>
                <Col span={24}>
                    <Descriptions className='reqData' bordered colon={false} column={1}>
                        <Descriptions.Item label='Module Name'>{summary?.module_name}</Descriptions.Item>
                        <Descriptions.Item label='Faculty'><Space direction='vertical'>{summary?.faculty && summary?.faculty.map((x, i) => (<Text key={i}>{x}</Text>))}</Space></Descriptions.Item>
                        <Descriptions.Item label='Programme(s)'><Space direction='vertical'>{summary?.programmes && summary?.programmes.map((x, i) => (<Text key={i}>{x?.programe_name} <Button type='link' className='linkbtn p-0' onClick={() => history.push(`/faculty/programmes/${x?.program_code}`)}>View</Button></Text>))}</Space></Descriptions.Item>
                        <Descriptions.Item label='Credits'>{summary?.credit}{' Credits'}</Descriptions.Item>
                        <Descriptions.Item label='Hours'>{summary?.hours}{' Hours'}</Descriptions.Item>
                        <Descriptions.Item label='Learning Mode'>{summary?.learning_mode}</Descriptions.Item>
                        <Descriptions.Item label='Classroom Type'>{summary?.class_room_type}</Descriptions.Item>
                        <Descriptions.Item label='Classes per week'>{summary?.class_per_week}{' Classes'}</Descriptions.Item>
                        <Descriptions.Item label='Module Fee'>{summary?.fee_currency ? `${summary?.fee_currency} ` : ''}{summary?.module_fee}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={24}>
                    <Title level={4} className='mb-0 c-default'>Module Outline</Title>
                </Col>
                <Col span={24}>
                    <Row gutter={5}>
                        {summary && summary?.outline && summary?.outline.map((x,i) => (
                            <Col flex={`1 0 ${x.weight}`}>
                                <Space direction='vertical' size={10} className='w-100'>
                                    <Text className='text-center d-block'>{typeCheck(x.type.replace(/[0-9]/g, ''), x.type)?.title}</Text>
                                    <Progress percent={100} strokeColor={typeCheck(x.type.replace(/[0-9]/g, ''), x.type)?.color}  showInfo={false} />
                                    <Text className='text-center d-block'>{x.weight}</Text>
                                </Space>
                            </Col>
                        ))}
                        
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}