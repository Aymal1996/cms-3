import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { CloseCircleFilled, CheckCircleFilled, UpOutlined, DownOutlined } from '@ant-design/icons';
import SmallStatusCard from '../../atoms/SmallStatusCard';
const ArchievePanel = (props) => {
  const { Title, Paragraph } = Typography;
  const { departmentName, docStatus } = props;
  const [iconPos, setIconPos] = useState(false);
  console.log({ docStatus });
  return (
    <Card bodyStyle={{ padding: '10px', backgroundColor: 'black', borderRadius: '10px' }} bordered={false}>
      <Row gutter={[24, 24]} justify="space-between" align="middle">
        <Col>
          <Row gutter={24} align="center">
            <Col>
              <SmallStatusCard
                status={docStatus.department_status}
                icon={
                  (docStatus.department_status == 'Approve' && <CheckCircleFilled />) ||
                  (docStatus.department_status == 'Reject' && <CloseCircleFilled />)
                }
                iColor={
                  (docStatus.department_status == 'Approve' && 'b-success') ||
                  (docStatus.department_status == 'Reject' && 'b-error')
                }
              />
            </Col>
            <Col>
              <Row gutter={[24]}>
                <Col span={24}>
                  <Title level={5} className="c-default">
                    {departmentName}
                  </Title>
                </Col>
                <Col span={24}>
                  <Title level={4}>{docStatus.department_status == 'Reject' ? 'Deferment' : 'Add Module'}</Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col>
          <Button
            type="link"
            className="c-white"
            onClick={() => setIconPos(!iconPos)}
            icon={iconPos ? <UpOutlined /> : <DownOutlined />}
          >
            {iconPos ? 'View Details' : 'Hide'}
          </Button>
        </Col>
        {docStatus.remarks && (
          <Col span={24}>
            <Paragraph>{docStatus.remarks}</Paragraph>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default ArchievePanel;
