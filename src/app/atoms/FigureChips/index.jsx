import React from 'react';
import { Card, Typography} from 'antd';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

export default (props) => {
    const history = useHistory();

    return (
        <Card bordered={false} hoverable={props.data.status ?  true : false } onClick={() => props?.link && history.push({ pathname: `${props?.link}`, state: {filter : props.data.filter}})}
        className={`point-cursor ${props.data.status ?  `figures-card card-hover ${props.data.status}` : 'transparent-card'}`}>
            <Title level={1} className='mb-0'>{props.data.value}</Title>
            <Title level={4} className='mb-0  mt-0'>{props.data.title}</Title>
        </Card>
    )
}