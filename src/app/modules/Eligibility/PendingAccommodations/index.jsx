import React, { useEffect } from "react";
import { Row, Col, Breadcrumb } from "antd";
import Masonry from 'react-masonry-css';
import { getPendingAccomodationList } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from "../../../molecules/HeadingChip";
import StudentStepCard from "../../../atoms/StudentStepCard";
import StatusCardTemp from "../../../atoms/StatusCardTemp";

export default (props) => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.marketing.pendingAccomodationData);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getPendingAccomodationList());
  }, [])

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Pending Accommodations</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Pending Accommodations'} />
        </Col>
        <Col span={24}>
          <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
            {data && data.map((item, index) => (
              <React.Fragment key={index}>
                <StudentStepCard 
                data={item}
                stage={3} 
                fullLink={true}
                link={`/marketing/applications/pending-accommodations/${item.name}`} 
                comp={
                  <StatusCardTemp 
                    title='Arrival Form' 
                    text='Please contact the applicant to fill up the form in the Student Application Portal' 
                    status='pending'
                    data={item.modified}
                    title2='Accommodation Form' 
                    text2='Please contact the applicant to fill up the form in the Student Application Portal' 
                    status2='pending'
                    data2={item.modified}
                  />
                } 
                type='app' 
                />
              </React.Fragment>
            ))}
          </Masonry>
        </Col>
      </Row>
    </>
  )
}