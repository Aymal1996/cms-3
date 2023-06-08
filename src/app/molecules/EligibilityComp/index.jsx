import React, { useState } from 'react';
import { Col, Row, Button, Input, Typography } from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;

export default (props) => {
  const [remarks, setRemarks] = useState('');
  const { onAction, apiData } = props;
  return (
    <Col span={24}>
      {apiData.eligibility == 1 ? (
        <Title level={4} className="mb-0 c-success text-center">
          Application Approved
        </Title>
      ) : (
        <>
          {apiData?.workflow_state == 'Eligibility assessment' && (
            <Row gutter={[20, 20]}>
              {/* <Col span={24}><TextArea placeholder="Remarks" allowClear onChange={(e) => setRemarks(e)} /></Col> */}
              <Col span={12}>
                <Button
                  size="large"
                  onClick={() => onAction('Approved', remarks)}
                  type="primary"
                  htmlType="button"
                  className="w-100 green-btn"
                >
                  Eligible
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => onAction('Rejected', remarks)}
                  className="w-100 red-btn"
                >
                  Not Eligible
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    </Col>
  );
};
