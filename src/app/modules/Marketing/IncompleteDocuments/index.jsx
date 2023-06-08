import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Pagination } from 'antd';
import { getIncompleteDocumentsList, emptyAppList } from '../ducks/actions';
import Masonry from 'react-masonry-css';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from 'Molecules/HeadingChip';
import TitlewithButton from 'Atoms/TitlewithButton';
import StudentStepCard from 'Atoms/StudentStepCard';

export default (props) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.marketing.incompleteRegistrationsData);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getIncompleteDocumentsList('Incomplete document', page, limit));
    return () => dispatch(emptyAppList());
  }, []);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    dispatch(getIncompleteDocumentsList('Incomplete document', pgNo, limit));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Incomplete Documents</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Incomplete Documents'} />
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
                    stage={0}
                    link={`/marketing/applications/incomplete-documents/${item?.name}`}
                    s3={true}
                    comp={
                      <TitlewithButton
                        btnTitle="Edit Documents"
                        title="Incomplete Documents"
                        link={`/marketing/applications/incomplete-documents/${item?.name}`}
                      />
                    }
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
