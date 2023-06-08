import React from 'react';
import { Card, Row, Col } from 'antd';

const { Title, Text } = props;

export default (props) => {


    return (
    <Card bordered={false} className="uni-card">
        <Row gutter={[20, 30]}>
            <Col span={24}><Title level={4} className='mb-0 c-default'>Requests</Title></Col>
            <Col span={24}>
                <Collapse 
                accordion 
                className='black-card' 
                expandIconPosition={'right'} 
                bordered={false}>
                    {
                        
                    }    
                </Collapse>
            </Col>
        </Row>
    </Card>
        
    )
}