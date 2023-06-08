import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RateComponent from '../../../../../molecules/StudentRating';
import Feedbacks from '../../../../../molecules/StudentReviews';
import { getRatings, getStudentsIntake } from '../../ducks/services';
import { getFeedbackList } from '../../ducks/actions';
import moment from 'moment';
export default () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ratings, setRatings] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState([]);
  const studentsFeedback = useSelector((state) => state.lecturers.feedback_listing);
  const intakes = useSelector((state) => state.lecturers.studentIntake);

  useEffect(() => {
    getRatings(id).then((response) => setRatings(response?.data?.message));
    dispatch(getFeedbackList(id, page, 6, { intake: intakes[0]?.name }));
  }, [id]);

  const onPageChangeHandler = (page) => {
    setPage(page);
    dispatch(getFeedbackList(id, page, 6, filter));
  };

  const onIntakeChangeHandler = (intake) => {
    setFilter({ intake: intake });
    setPage(1);
    dispatch(getFeedbackList(id, 1, 6, { intake: intake }));
  };

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <Row gutter={24}>
          <Col span={24}>
            <Title level={4}>Staff Workload</Title>
          </Col>
          <Col span={24}>
            <Card bordered={false} className="small-card8 b-black">
              <Row gutter={[24, 20]}>
                <Col span={24}>
                  <RateComponent data={ratings?.overall_rating} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
      {ratings?.row.map((value, index) => (
        <Col span={8} key={index}>
          <RateComponent data={value} />
        </Col>
      ))}
      <Col span={24}>
        <Row gutter={[24, 20]}>
          <Col span={24}>
            <Row gutter={24} align="middle" justify="space-between">
              <Col>
                <Title level={4}>Student Feedback</Title>
              </Col>
              <Col>
                <Select
                  defaultValue={intakes[0]?.name}
                  value={filter.intake}
                  placeholder="Select Faculties"
                  size="large"
                  style={{ width: '200px' }}
                  onChange={onIntakeChangeHandler}
                >
                  {intakes.map((item, index) => (
                    <Select.Option key={index} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Feedbacks reviewData={studentsFeedback} page={page} onChangePage={onPageChangeHandler} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
