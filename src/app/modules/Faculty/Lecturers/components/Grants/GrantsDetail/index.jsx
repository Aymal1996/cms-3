import React from 'react';
import { Button, Col, Descriptions, Row, Space, Typography } from 'antd';
import { LeftOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { baseUrl } from '../../../../../../../configs/constants';

export default (props) => {
  const { backbtnTitle, setLoadDetail, grantDetail } = props;
  const { Title, Link } = Typography;
  const history = useHistory();
  console.log({ grantDetail });
  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Space direction="vertical" size={20}>
          {backbtnTitle && (
            <Button
              type="link"
              className="c-gray-linkbtn p-0 mt-1"
              onClick={() => {
                setLoadDetail(false);
              }}
              htmlType="button"
            >
              <LeftOutlined />
              {backbtnTitle}
            </Button>
          )}
          <Title level={4} className="c-default mb-0">
            {grantDetail?.grant_name}
          </Title>
        </Space>
      </Col>
      <Col span={24}>
        <Descriptions className="reqData" bordered colon={false} column={1}>
          <Descriptions.Item label="Source">{grantDetail?.source}</Descriptions.Item>
          <Descriptions.Item label="Grant Name">{grantDetail?.grant_name}</Descriptions.Item>

          <Descriptions.Item label="Date">{moment(grantDetail?.grant_date).format('Do MMMM YYYY')}</Descriptions.Item>

          <Descriptions.Item label="Research Ammount">{`RM${grantDetail?.grant_amount}`}</Descriptions.Item>

          <Descriptions.Item label="Attachment">
            <Button
              type="link"
              htmlType="button"
              className="p-0 downloadLink"
              onClick={() =>
                grantDetail?.attachment ? window.open(`${baseUrl}${grantDetail.attachment}`, '_blank') : null
              }
            >
              {grantDetail?.attachment}
            </Button>
          </Descriptions.Item>

          <Descriptions.Item label="Faclulty Verification">
            <Space align="center" direction="horizontal">
              <Title level={5} className="mb-0 c-default">
                {grantDetail?.faculty_verification}
              </Title>
              {grantDetail?.faculty_verification == 'Verified' ? (
                <CheckCircleFilled className=" c-success" />
              ) : (
                <CloseCircleFilled className=" c-error" />
              )}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Finance Verification">
            <Space align="center" direction="horizontal">
              <Title level={5} className="mb-0 c-default">
                {grantDetail?.finance_verification}
              </Title>
              {grantDetail?.finance_verification == 'Verified' ? (
                <CheckCircleFilled className=" c-success" />
              ) : (
                <CloseCircleFilled className=" c-error" />
              )}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={24}>
        <Row gutter={24} justify="end">
          <Col span={6}>
            <Button
              type="primary"
              htmlType="button"
              size="large"
              className="w-100 green-btn"
              onClick={() => history.push(`/faculty/grants/${grantDetail.name}`)}
            >
              Edit
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
