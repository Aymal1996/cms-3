import React, { useState, useEffect } from 'react';
import { Row, Col, Empty, Tabs, Space, Typography, Badge, Pagination } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import MainStatusCard from '../../../atoms/MainStatusCard';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);

  const data = [
    {
      employee_id: 'HR-EMP-01883',
      employee_name: 'Harry Freeman',
      job_title: 'Expiring Visa',
      job_title_name: '4 Days',
      image: '/files/limkokwing.jpg',
    },
    {
      employee_id: 'HR-EMP-01883',
      employee_name: 'Harry Freeman',
      job_title: 'Expiring Visa',
      job_title_name: '4 Days',
      image: '/files/limkokwing.jpg',
    },
    {
      employee_id: 'HR-EMP-01883',
      employee_name: 'Harry Freeman',
      job_title: 'Expiring Visa',
      job_title_name: '4 Days',
      image: '/files/limkokwing.jpg',
    },
    {
      employee_id: 'HR-EMP-01883',
      employee_name: 'Harry Freeman',
      job_title: 'Expiring Visa',
      job_title_name: '4 Days',
      image: '/files/limkokwing.jpg',
    },
    {
      employee_id: 'HR-EMP-01883',
      employee_name: 'Harry Freeman',
      job_title: 'Expiring Visa',
      job_title_name: '4 Days',
      image: '/files/limkokwing.jpg',
    },
  ];

  const data2 = [];

  const onPageChange = (pgNo) => {
    setPage(pgNo);
  };

  const onPageChangeArchive = (pgNo) => {
    setPage2(pgNo);
  };

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Tabs defaultActiveKey="1" type="card" className="tab-bold">
          <TabPane
            tab={
              <Space size={12}>
                <Title className="tab-header mb-0" level={4}>
                  Visa Cancellation
                </Title>
                <Badge count={data && data?.length} className="tab-badge" />
              </Space>
            }
            key="1"
          >
            <Col span={24}>
              <Row gutter={[20, 30]}>
                {data && data?.length > 0 ? (
                  data?.map((e) => (
                    <Col span={8}>
                      <MainStatusCard
                        data={e}
                        link=""
                        topKey={{
                          status1: e?.job_title,
                          status2: e?.job_title_name,
                        }}
                        cardOn={true}
                        statData={{
                          id: 'employee_id',
                          name: 'employee_name',
                          class: 'b-error',
                        }}
                      />
                    </Col>
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Row>
            </Col>
            <Col span={24}>
              <Pagination
                pageSize={9}
                current={page}
                hideOnSinglePage={true}
                showSizeChanger={false}
                onChange={onPageChange}
                total={data?.count}
              />
            </Col>
          </TabPane>
          <TabPane tab="Archive" key="2">
            <Row gutter={[20, 30]}>
              <Col span={24}>
                {data2 && data2?.length > 0 ? (
                  <Col span={8}>
                    <MainStatusCard
                      data={e}
                      link=""
                      topKey={{
                        status1: e?.job_title,
                        status2: e?.job_title_name,
                      }}
                      cardOn={true}
                      statData={{
                        id: 'employee_id',
                        name: 'employee_name',
                        class: 'b-error',
                      }}
                    />
                  </Col>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Col>
            </Row>
            <Col span={24}>
              <Pagination
                pageSize={9}
                current={page2}
                hideOnSinglePage={true}
                showSizeChanger={false}
                onChange={onPageChangeArchive}
                total={data2?.length}
              />
            </Col>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
