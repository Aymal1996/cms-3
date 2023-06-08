import React from 'react';
import { Space, Typography, Button } from 'antd';
import { useHistory } from 'react-router';

const { Title } = Typography;

export default (props) => {

    const history = useHistory();

        return (
            <Space direction='vertical' size={30} className='w-100'>
                <Title level={4} className="c-default mb-0">{props.title}</Title>
                <Button type="primary" htmlType='button' className="w-100" size="large" 
                onClick={() => history.push(props.link)}
                >
                    {props.btnTitle}
                </Button>
            </Space>
        )
}