import React, { useEffect, Fragment, useState } from 'react';
import { Row, Col, Breadcrumb, Tabs, Space, Typography, Badge, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import AssessmentCard from '../../../atoms/AssessmentCard';
import Masonry from 'react-masonry-css';
import { Empty } from 'antd';
import { getEligibilityArchiveList, getEligibilityAssessmentList } from '../../Marketing/ducks/actions';

const { Title } = Typography;

export default (props) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.marketing.eligibilityAssessmentData);
  const data2 = useSelector((state) => state.marketing.eligibilityArchive);
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);

  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getEligibilityAssessmentList('Eligibility assessment', page, 9));
    dispatch(getEligibilityArchiveList(page2));
  }, []);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    dispatch(getEligibilityAssessmentList('Eligibility assessment', pgNo, 9));
  };

  const onPageChangeArchive = (pgNo) => {
    setPage2(pgNo);
    dispatch(getEligibilityArchiveList(pgNo));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Eligibility Assessments</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Eligibility Assessments'} />
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="tab-bold">
            <TabPane
              tab={
                <Space size={12}>
                  <Title className="tab-header mb-0" level={4}>
                    Applications
                  </Title>
                  <Badge count={data && data?.count} className="tab-badge" />
                </Space>
              }
              key="1"
            >
              <Col span={24}>
                {data && data?.count ?
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {data?.rows?.map((item, index) => (
                      <Fragment key={index}>
                        <StudentStepCard
                          data={item}
                          stage={1}
                          link={`/eligibility/applications/eligibility-assessments/${item.name}`}
                          type="app"
                          s3={true}
                          comp={
                            <AssessmentCard
                              status={'pending'}
                              data={item}
                              btnTitle="Notify Department"
                              title="Eligibility Assessments"
                              title2={'Applicant Academic Assessment'}
                              type="card"
                            />
                          }
                        />
                      </Fragment>
                    ))}
                </Masonry>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
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
              <Col span={24}>
                {(data2 && data2?.count > 0) ?
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                    {data2?.rows.map((item, index) => (
                      <Fragment key={index}>
                        <StudentStepCard
                          data={item}
                          stage={1}
                          type="app"
                          link={`/eligibility/applications/eligibility-assessments/${item.name}`}
                          comp={<AssessmentCard
                            status={item.eligibility_status}
                            data={item}
                            title="Eligibility Assessments"
                            title2={'Applicant Academic Assessment'}
                            type='card'
                          />}
                        />
                      </Fragment>
                    ))}
                </Masonry>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
              </Col>
              <Col span={24}>
                <Pagination
                  pageSize={9}
                  current={page2}
                  hideOnSinglePage={true}
                  showSizeChanger={false}
                  onChange={onPageChangeArchive}
                  total={data2?.count}
                />
              </Col>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};
