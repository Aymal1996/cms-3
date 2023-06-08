import React from 'react';
import { Row, Col, Card, Layout } from 'antd';
import Feeds from '../Feeds';
import Navigation from '../Navigation';

const { Sider } = Layout;

export default (props) => {
    return (
        <Card 
        style={{width: 600}}
        bordered={false}
        bodyStyle={{padding: 0}}>
            <Row gutter={[30,30]}>
                <Col flex="240px">
                    <Navigation />
                </Col>
                <Col flex="270px">
                    {/* <Sider> */}
                        <Feeds />
                    {/* </Sider> */}
                </Col>
            </Row>
        </Card>
    )
}