import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import Masonry from 'react-masonry-css';
import { getApplicationProgressDetail } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import TitlewithButton from '../../../atoms/TitlewithButton';
import AssessmentCard from '../../../atoms/AssessmentCard';
import CardStepAccordian from '../../../molecules/CardStepAccordian';
import StatusCardTemp from '../../../atoms/StatusCardTemp';

export default (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const getData = useSelector((state) => state.marketing.applicationProgDetail);

  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getApplicationProgressDetail());
  }, []);

  useEffect(() => {
    if (getData) {
      let temp = [];
      getData.map((item) => {
        if (item.workflow_state == 'Pending enrollment') {
          temp.push({
            ...item,
            enrolledSteps: [
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
                ],
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
                  },
                ],
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
                ],
              },
              {
                title: 'Module Registration',
                cards: [
                  {
                    status: '',
                    title: 'Module Registration',
                    text: 'Pending registration',
                  },
                ],
              },
            ],
          });
        } else if (item.workflow_state == 'Incomplete registration visa') {
          temp.push({
            ...item,
            visaSteps: [
              {
                title: 'Registration Fee',
                cards: [
                  {
                    status: 'pending',
                    title: 'Pending Registration Fee',
                    text: 'Please contact the applicant to make the payment through Student Application Portal',
                    date: item.modified,
                  },
                  {
                    status: 'done',
                    title: 'Payment Varified',
                    text: 'Pending payment completion',
                  },
                  {
                    status: '',
                    title: 'Offer Letter Release',
                    text: 'Pending payment varification',
                  },
                ],
              },
              {
                title: 'Visa Processing Fee',
                cards: [
                  {
                    status: '',
                    title: 'Visa Processing Fee',
                    text: 'Pending Offer Letter Release',
                  },
                  {
                    status: '',
                    title: 'Payment Varification',
                    text: 'Pending payment completion',
                  },
                  {
                    status: '',
                    title: 'VAL Release',
                    text: 'Pending payment completion',
                  },
                ],
              },
            ],
          });
        } else {
          temp.push({
            ...item,
          });
        }
      });
      setData(temp);
    }
  }, [getData]);

  const onNotify = (name) => {};

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
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data &&
              data.map((item, index) => (
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
                  )}
                  {item.workflow_state == 'Incomplete registration visa' && (
                    <StudentStepCard
                      data={item}
                      stage={2}
                      link={`/marketing/applications/pending-registration-visa/${item.name}`}
                      comp={<CardStepAccordian data={item?.visaSteps} />}
                      type="app"
                    />
                  )}
                  {item.workflow_state == 'Pending accomodation' && (
                    <StudentStepCard
                      data={item}
                      stage={3}
                      fullLink={true}
                      link={`/marketing/applications/pending-accommodations/${item.name}`}
                      comp={
                        <StatusCardTemp
                          title="Arrival Form"
                          text="Please contact the applicant to fill up the form in the Student Application Portal"
                          status="pending"
                          data={item.modified}
                          title2="Accommodation Form"
                          text2="Please contact the applicant to fill up the form in the Student Application Portal"
                          status2="pending"
                          data2={item.modified}
                        />
                      }
                      type="app"
                    />
                  )}
                  {item.workflow_state == 'Pending enrollment' && (
                    <StudentStepCard
                      data={item}
                      stage={2}
                      link={`/marketing/applications/pending-enrolment/${item.name}`}
                      comp={<CardStepAccordian data={item?.enrolledSteps} />}
                      type="app"
                    />
                  )}
                </React.Fragment>
              ))}
          </Masonry>
        </Col>
      </Row>
    </>
  );
};
