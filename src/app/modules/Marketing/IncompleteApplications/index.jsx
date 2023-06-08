import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Spin, Pagination, Empty } from 'antd';
import Masonry from 'react-masonry-css';
import { getApplicationProgressDetail, marketingBool } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import TitlewithButton from '../../../atoms/TitlewithButton';
import AssessmentCard from '../../../atoms/AssessmentCard';
import CardStepAccordian from '../../../molecules/CardStepAccordian';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const getData = useSelector((state) => state.marketing.applicationProgDetail);
  const applicationID = useSelector((state) => state.marketing.searchBar);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(marketingBool('Marketing'));
    dispatch(getApplicationProgressDetail(applicationID, page, limit));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getApplicationProgressDetail(applicationID, page, limit));
    }, 1500);
    return () => clearTimeout(timer);
  }, [applicationID]);

  useEffect(() => {
    setLoad(true);
    if (getData) {
      setData(getData.rows);
      setTimeout(() => setLoad(false), 1000);
    }
  }, [getData?.rows]);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    dispatch(getApplicationProgressDetail(applicationID, pgNo, limit));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Incomplete Applications</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Incomplete Applications'} />
        </Col>
        <Col span={24}>
          <Spin indicator={antIcon} size="large" spinning={load}>
            {data && data?.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {data.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.workflow_state == 'Incomplete document' && (
                      <StudentStepCard
                        data={item}
                        stage={0}
                        link={`/marketing/applications/incomplete-documents/${item.name}`}
                        comp={
                          <TitlewithButton
                            btnTitle="Edit Documents"
                            title="Incomplete Documents"
                            link={`/marketing/applications/incomplete-documents/${item.name}`}
                          />
                        }
                        type="app"
                        s3={true}
                      />
                    )}
                    {item.workflow_state == 'Eligibility assessment' && (
                      <StudentStepCard
                        data={item}
                        stage={1}
                        link={`/marketing/applications/eligibility-assessments/${item.name}`}
                        comp={
                          <AssessmentCard
                            status="pending"
                            data={item?.steps}
                            title="Eligibility Assessments"
                            title2={'Applicant Academic Assessment'}
                            type="card"
                          />
                        }
                        type="app"
                        s3={true}
                      />
                    )}
                    {item.workflow_state == 'Incomplete registration visa' && (
                      <StudentStepCard
                        data={item}
                        stage={2}
                        link={`/marketing/applications/pending-registration-visa/${item.name}`}
                        comp={<CardStepAccordian data={item?.steps} />}
                        type="app"
                        apiData={item}
                        s3={true}
                      />
                    )}
                    {item.workflow_state == 'Pending accomodation' && (
                      <StudentStepCard
                        data={item}
                        stage={3}
                        fullLink={true}
                        link={`/marketing/applications/pending-accommodations/${item.name}`}
                        comp={<CardStepAccordian data={item?.steps} />}
                        type="app"
                        apiData={item}
                        s3={true}
                      />
                    )}
                    {item.workflow_state == 'Pending enrollment' && (
                      <StudentStepCard
                        data={item}
                        stage={2}
                        link={`/marketing/applications/pending-enrolment/${item.name}`}
                        comp={<CardStepAccordian data={item?.steps} />}
                        type="app"
                        apiData={item}
                        s3={true}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Masonry>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Spin>
        </Col>
        <Col span={24}>
          <Pagination
            pageSize={limit}
            current={page}
            hideOnSinglePage={true}
            showSizeChanger={false}
            onChange={onPageChange}
            total={getData?.count}
          />
        </Col>
      </Row>
    </>
  );
};
