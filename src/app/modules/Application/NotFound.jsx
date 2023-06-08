import React from 'react';
import { Row, Typography, Col } from "antd";
import { useTranslate } from 'Translate';

const { Title, Text } = Typography;

export default (props) => {
    
    const i18n = useTranslate();
    const { t } = i18n;

    return (
        <Row gutter={[30, 24]}>
            <Col span={24}>
                <Title level={1}>Access Denied</Title>
                <Text level={1}>You don't have access to this page</Text>
            </Col>
        </Row>
    )
}