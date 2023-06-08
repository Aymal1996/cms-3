import React, { useEffect, Fragment } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { getEligibilityAssessmentList } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import AssessmentCard from '../../../atoms/AssessmentCard';
import Masonry from 'react-masonry-css';

export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.marketing.eligibilityAssessmentData);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getEligibilityAssessmentList());
  }, []);

  const onNotify = (name) => {};

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
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data &&
              data.map((item, index) => (
                <Fragment key={index}>
                  <StudentStepCard
                    data={item}
                    stage={1}
                    link={`/marketing/applications/eligibility-assessments/${item.name}`}
                    comp={
                      <AssessmentCard
                        status="pending"
                        reason="Hello World"
                        data={item.modified}
                        btnTitle="Notify Department"
                        title="Eligibility Assessments"
                        title2={item?.status == 'done' ? 'Completed Assessment' : 'Pending Assessment'}
                        title3="Elgibility Team"
                        action={() => onNotify(item.name)}
                      />
                    }
                    type="app"
                  />
                </Fragment>
              ))}
          </Masonry>
        </Col>
      </Row>
    </>
  );
};
