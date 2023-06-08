import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Pagination } from 'antd';
import Masonry from 'react-masonry-css';
import { emptyAppList, getStepsListData } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import CardStepAccordian from '../../../molecules/CardStepAccordian';

export default (props) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.marketing.stepListData);

  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getStepsListData('Pending enrollment', page, limit));
    return () => dispatch(emptyAppList());
  }, []);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    dispatch(getStepsListData('Pending enrollment', pgNo, limit));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Pending Enrolment</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Pending Enrolment'} />
        </Col>
        <Col span={24}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data &&
              data?.rows?.length > 0 &&
              data?.rows?.map((item, index) => (
                <React.Fragment key={index}>
                  <StudentStepCard
                    data={item}
                    stage={4}
                    s3={true}
                    link={`/marketing/applications/pending-enrolment/${item?.name}`}
                    comp={<CardStepAccordian data={item?.steps} apiData={item} />}
                    type="app"
                  />
                </React.Fragment>
              ))}
          </Masonry>
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
