import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import Masonry from 'react-masonry-css';
import { getPendingVisaList } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import StudentStepCard from '../../../atoms/StudentStepCard';
import CardStepAccordian from '../../../molecules/CardStepAccordian';

export default (props) => {
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.marketing.pendingVisaData);
  const [data, setData] = useState([]);

  const breakpointColumnsObj = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  useEffect(() => {
    dispatch(getPendingVisaList());
  }, []);

  useEffect(() => {
    if (getData) {
      let temp = [];
      getData.map((item) => {
        temp.push({
          ...item,
          steps: [
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
      });
      setData(temp);
    }
  }, [getData]);

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item>Pending Registration & Visa</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Pending Registration & Visa'} />
        </Col>
        <Col span={24}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data &&
              data?.map((item, index) => (
                <React.Fragment key={index}>
                  <StudentStepCard
                    data={item}
                    stage={2}
                    link={`/marketing/applications/pending-registration-visa/${item.name}`}
                    comp={<CardStepAccordian data={item?.steps} />}
                    type="app"
                  />
                </React.Fragment>
              ))}
          </Masonry>
        </Col>
      </Row>
    </>
  );
};
