import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Typography, Badge, Tabs, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import StudentStepCard from 'Atoms/StudentStepCard';
import { Empty } from 'antd';
import { emptyListVisa, getNewVisaList } from '../ducks/actions';

const { TabPane } = Tabs;
const { Title } = Typography;
const limit = 9;

export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.visa.newVisaList);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getNewVisaList(page, limit));
    return () => dispatch(emptyListVisa());
  }, []);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    dispatch(getNewVisaList(pgNo, limit));
  };

  const getStage = (e) => {
    switch(e) {
      case "Pending enrollment" : return 4;
      case "Incomplete registration visa" : return 2;
    }
  }

  return (
    <Tabs defaultActiveKey="1" type="card" className="tab-bold">
      <TabPane
        tab={
          <Space size={12}>
            <Title className="tab-header mb-0" level={4}>
              New Visa Application
            </Title>
            <Badge count={data && data?.count} className="tab-badge" />
          </Space>
        }
        key="1"
      >
        <Row gutter={[20, 30]} justify="end">
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                {data && data?.count ? (
                  <Row gutter={[20, 20]}>
                    {data?.rows?.map((item, index) => (
                      <Col span={8} key={index}>
                        <StudentStepCard s3={true} data={item} stage={getStage(item?.workflow_state)} link={`/visa/new-visa/${item.name}`} type="app" />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Pagination
              pageSize={limit}
              current={page}
              hideOnSinglePage={true}
              showSizeChanger={false}
              onChange={onPageChange}
              total={data?.count}
            />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};
