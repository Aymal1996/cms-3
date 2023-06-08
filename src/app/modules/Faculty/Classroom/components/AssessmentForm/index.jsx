import React, {useState, useEffect} from 'react';
import { Row, Col, Space, Typography, Card } from 'antd';
import { InputField, SelectField } from '../../../../../atoms/FormElement';
import moment from 'moment';
import { TickIcon } from '../../../../../atoms/CustomIcons';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';

const { Text, Title } = Typography;

const gradeList = [
    { label: 'Pass', value: 'Pass'},
    { label: 'Fail', value: 'Fail'},
    { label: 'Redo', value: 'Redo'},
]

export default (props) => {

    const { control, data: { date, type, status, name} } = props;
    const [stat, setStat] = useState('')

    const onChange = (val) => {
        setStat(val.label);
    }

    useEffect(() => {
        if (status) {
            setStat(status);
        }
    }, []);

    return (
        <Card bordered={false} className='field-card'>
            <Row gutter={20} align='middle'>
                <Col flex='1 0 auto'>
                <Space size={20} className='w-100'>
                    <div className='fontSize40 lineHeight40'>{stat ? stat != 'Pass' ? <CloseCircleFilled className='c-error' /> : <CheckCircleFilled  className='c-success' /> : <CheckCircleFilled className='c-gray' />}</div>
                    <Space direction='vertical' size={0}>
                        <Title level={5} className='mb-0 c-default'>{type}</Title>
                        <Text className='c-gray smallFont12'>Date: {moment(date).format('Do MMMM YYYY')}</Text>
                    </Space>
                </Space>
                </Col>
                <Col flex='0 1 200px'>
                <SelectField 
                    isRequired={true}
                    fieldname={type}
                    label=''
                    control={control}
                    class='mb-0'
                    onChange={onChange}
                    iProps={{ placeholder: 'select'}}
                    initValue={status ? {label: status, value: status} : ''}
                    selectOption={gradeList}
                />
                </Col>
            </Row>
        </Card>
    )
}