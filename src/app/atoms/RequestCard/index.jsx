import React from 'react';
import { Row, Col, Typography, Avatar, Card, Space } from 'antd';
import SmallStatusCard from '../SmallStatusCard';
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
const { Title, Text } = Typography;

export default (props) => {
  const { data, link, stateKey, cardType } = props;
  const history = useHistory();
  return (
    <Card
      bordered={false}
      className="uni-card"
      style={{ cursor: 'pointer' }}
      onClick={() => history.push({ pathname: link, state: { rstatus: stateKey, rid: data?.name } })}
    >
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space size={17}>
            <Avatar size="large" src={data?.image || ''} />
            <Space direction="vertical" size={0}>
              <Text className="c-gray lineHeight20">{data?.name}</Text>
              <Text className="lineHeight20">{data?.student || data?.employee_name}</Text>
              {cardType && <Text className="c-gray card_type">{cardType}</Text>}
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Card bordered={false} className="mini-card b-black">
            <Row gutter={24} wrap={false} align="middle">
              <Col flex='1 0 160px'>
                <Space direction="vertical" size={0} className="w-100">
                  <Text className="d-block c-white op-6 smallFont12">{data?.department || 'HRMS'}</Text>
                  <Title level={5} className="text-cutout d-block mb-0 lineHeight20">
                    {data?.form_name}
                  </Title>
                </Space>
              </Col>
              <Col flex='0 1 154px'>
                <SmallStatusCard
                  status={
                    stateKey == 'yourrequests'
                      ? 'Pending'
                      : data?.status == 'Archive'
                      ? data['department status'] ||  data?.approvers && data?.approvers[0]?.status
                      : data.status
                  }
                  icon={
                    stateKey == 'yourrequests' ? (
                      <ClockCircleFilled />
                    ) : (
                      (data?.status == 'Archive' ? (
                        data['department status'] == 'Approved' || data?.approvers && data?.approvers.find(x => x.status == 'Approve') ? (
                          <CheckCircleFilled />
                        ) : data['department status'] == 'Reject' || data?.approvers && data?.approvers.find(x => x.status == 'Reject')? (
                          <CloseCircleFilled />
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )) ||
                      (data?.status == 'Pending' && <ClockCircleFilled />) ||
                      (data?.status == 'Approved' && <CheckCircleFilled />) ||
                      (data?.status == 'Rejected' && <CloseCircleFilled />)
                    )
                  }
                  iColor={
                    stateKey == 'yourrequests'
                      ? 'b-pending'
                      : (data?.status == 'Archive'
                          ? data['department status'] == 'Reject' || data?.approvers && data?.approvers.find(x => x.status == 'Reject')
                            ? 'b-error'
                            : 'b-success'
                          : '') ||
                        (data?.status == 'Pending' && 'b-pending') ||
                        (data?.status == 'Approved' && 'b-success') ||
                        (data?.status == 'Reject' && 'b-error')
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
