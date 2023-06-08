import React, { useEffect } from "react";
import { Row, Col, Breadcrumb } from "antd";
import { getIncompleteDocumentsList } from '../ducks/actions';
import Masonry from 'react-masonry-css';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from "../../../molecules/HeadingChip";
import TitlewithButton from "../../../atoms/TitlewithButton";
import StudentStepCard from '../../../atoms/StudentStepCard';

export default (props) => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.marketing.incompleteRegistrationsData);
  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getIncompleteDocumentsList('Incomplete document'));
  }, []);


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
            {data && data.map((item,index) => (
              <React.Fragment key={index}>
                <StudentStepCard 
                data={item}
                stage={0} 
                link={`/marketing/applications/incomplete-documents/${item.name}`} 
                comp={<TitlewithButton btnTitle='Edit Documents' title='Incomplete Documents' link={`/marketing/applications/incomplete-documents/${item.name}`} />} 
                type='app' 
                />
              </React.Fragment>
            ))}
          </Masonry>
        </Col>
      </Row>
    </>
  );
};