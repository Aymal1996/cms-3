import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb } from "antd";
import Masonry from 'react-masonry-css';
import { getPendingEnrollmentList } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from "../../../molecules/HeadingChip";
import StudentStepCard from "../../../atoms/StudentStepCard";
import CardStepAccordian from "../../../molecules/CardStepAccordian";

export default (props) => {

  const dispatch = useDispatch();
  const getData = useSelector(state => state.marketing.pendingEnrollmentData);
  const [data, setData] = useState([]);

  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1
  };

  useEffect(() => {
    dispatch(getPendingEnrollmentList());
  }, []);

  useEffect(() => {
    if (getData) {
      let temp = [];
      getData.map(item => {
        temp.push({
          ...item,
          steps : [
            {
              title: 'Medical Checkup',
              cards: [
                {
                  status: 'pending',
                  title: 'Pending Medical Checkup',
                  text: 'Please contact the applicant to make the payment through Student Application Portal',
                  date: item.modified,
                },
                {
                  status: '',
                  title: 'Medical Checkup Verfication',
                  text: 'Pending document upload',
                },
              ]
            },
            {
              title: 'Visa Sticker',
              cards: [
                {
                  status: '',
                  title: 'Pending Visa',
                  text: 'Pending visa from applicant',
                },
                {
                  status: '',
                  title: 'Visa Sticker Approval',
                  text: 'Pending visa from applicant',
                },
                {
                  status: '',
                  title: 'Visa Sticker Collection',
                  text: 'Pending visa collection',
                }
              ]
            },
            {
              title: 'Tution Fee',
              cards: [
                {
                  status: '',
                  title: 'Tution Fee',
                  text: 'Pending payment collection',
                },
                {
                  status: '',
                  title: 'Payment Verification',
                  text: 'Pending payment collection',
                },
              ]
            },
            {
              title: 'Module Registration',
              cards: [
                {
                  status: '',
                  title: 'Module Registration',
                  text: 'Pending registration',
                },
              ]
            },
          ]
        })
      });
      setData(temp);
    }
  }, [getData]);

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
            {data && data.map((item, index) => (
              <React.Fragment key={index}>
                <StudentStepCard 
                data={item}
                stage={2}
                link={`/marketing/applications/pending-enrolment/${item.name}`} 
                comp={<CardStepAccordian data={item?.steps} />}
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