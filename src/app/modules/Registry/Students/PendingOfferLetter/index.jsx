import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography, Breadcrumb, Empty, Pagination } from 'antd';
import StudentStepCard from '../../../../atoms/StudentStepCard';
import { getOfferletterList } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;

export default (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const data = useSelector((state) => state.students.offerlist);

  useEffect(() => {
    dispatch(getOfferletterList(page, limit));
    return () => dispatch(emptrListRegistry());
  }, []);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    dispatch(getOfferletterList(pgNo, limit));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/registry/students">Students</Breadcrumb.Item>
        <Breadcrumb.Item>Pending Offer Letter Release</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultActiveKey="1" type="card" className="tab-bold">
        <TabPane tab="Pending Offer Letter Release" key="1" forceRender={true}>
          <Row gutter={[20, 20]}>
            {data?.rows && data?.rows.length ? (
              data?.rows?.map((item, index) => (
                <Col flex="1 0 340px" key={index}>
                  <StudentStepCard
                    data={item}
                    stage={2}
                    link={`/registry/applications/pending-registration-visa/${item.name}`}
                    type="app"
                    s3={true}
                  />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Col>
            )}
            <Col span={24}>
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
        {/* <TabPane tab="Archives" key="2" forceRender={true}>
                    <div className='flexibleRow'>
                        {requests.map((item, index) => (
                            <div className='requestPanel' key={index}>
                                <StudentStepCard data={item} stage={2} link={`/registry/applications/pending-registration-visa/${item.name}`} type='app' />
                            </div>
                        ))}
                    </div>
                </TabPane> */}
      </Tabs>
    </>
  );
};
