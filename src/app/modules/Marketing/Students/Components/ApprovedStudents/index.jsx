import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Pagination, Empty } from 'antd';
import { getIncompleteDocumentsList } from '../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from 'Molecules/HeadingChip';
import TitlewithButton from 'Atoms/TitlewithButton';
import StudentStepCard from 'Atoms/StudentStepCard';

export default (props) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.marketing.incompleteRegistrationsData);

  useEffect(() => {
    dispatch(getIncompleteDocumentsList('Approved', page, limit));
  }, []);

  const onPageChange = (pgNo) => {
    console.log('pgNo', pgNo, page);
    setPage(pgNo);
    dispatch(getIncompleteDocumentsList('Approved', pgNo, limit));
  };


  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Approved Students List</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Approved Students List'} />
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            {data && data?.rows?.length > 0 ? (
              data?.rows?.map((item, index) => (
                <Col span={8} key={index}>
                  <StudentStepCard
                    data={item}
                    stage={5}
                    link={`/marketing/applications/approved/${item?.name}`}
                    comp={
                      <TitlewithButton
                        btnTitle="Student Details"
                        title="Approved Students"
                        link={`/marketing/applications/approved/${item?.name}`}
                      />
                    }
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
          </Row>
        </Col>
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
    </>
  );
};
