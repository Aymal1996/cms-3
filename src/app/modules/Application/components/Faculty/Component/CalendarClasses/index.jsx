import React, { Fragment, useState } from 'react';
import { Row, Typography, Col, Card, Space, Badge, Divider, message, Empty, Tooltip } from 'antd';
import { baseUrl } from '../../../../../../../configs/constants';
import { caseCol } from '../../../../../../modules/Faculty/utills/CalendarCases';
import { getMeetingID } from '../../../../ducks/services';
import { meetingLink } from '../../../../ducks/actions';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const { Title, Paragraph } = Typography;
const badges = [
  {
    title: 'Class',
    color: '#0077B6',
  },
  {
    title: 'Meet Up',
    color: '#9B5DE5',
  },
  {
    title: 'Exam',
    color: '#02A574',
  },
  {
    title: 'Holiday',
    color: '#E89005',
  },
];

export default (props) => {
  const { calendarData, updateApi, calendarWeekly } = props;
  const [isActive, setActive] = useState(false);
  const [isCurrent, setIsCurrent] = useState(true);
  const dispatch = useDispatch();
  let days = [];
  const history = useHistory();
  const currentDateActive = moment().format('DD');
  const currentDate = moment();
  const todayDate = moment().format('YYYY-MM-DD');
  //const weekStart = currentDate.clone().startOf('week');
  const weekStart = currentDate.clone();
  for (let i = 0; i <= 5; i++) {
    days.push({
      weekday: moment(weekStart).add(i, 'days').format('ddd'),
      weeknum: moment(weekStart).add(i, 'days').format('DD'),
      date: moment(weekStart).add(i, 'days').format('YYYY-MM-DD'),
    });
  }

  const getDate = (e, days) => {
    updateApi(e);
    setActive(days);
    setIsCurrent(moment().isSame(e, 'day'));
  };

  const virtualClass = (e) => {
    props.setLoading(true);
    getMeetingID(e?.name)
      .then((response) => {
        dispatch(
          meetingLink({
            link: response?.data?.message?.meetingUrl,
          }),
        );
        props.setLoading(false);
      })
      .catch((e) => {
        message.error('Something went wrong');
      });
  };

  return (
    <Card bordered={false} className="uni-card main-card-hover" style={{ height: '500px' }}>
      <Title level={4} className="c-default mb-1">
        Today
      </Title>
      <Row gutter={[10, 10]}>
        {days &&
          days?.map((resp, i) => (
            <Fragment key={i}>
              <Col span={4}>
                <Card
                  bordered={false}
                  onClick={() => getDate(resp?.date, resp?.weekday)}
                  className={`dashboard-calendar ${
                    currentDateActive == resp?.weeknum
                      ? 'activeCard'
                      : '' || resp?.weekday == isActive
                      ? 'activeCard'
                      : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <Title level={5} className="mb-0 smallFont12">
                    {resp?.weekday}
                  </Title>
                  <Title level={4} className="m-0">
                    {resp?.weeknum}
                  </Title>
                  <Space size={3} className="justify-cetner m-0" wrap>
                    {calendarWeekly &&
                      calendarWeekly?.length > 0 &&
                      calendarWeekly.map((x, i) => {
                        const xDate = moment(x?.date).format('YYYY-MM-DD');
                        const respDate = moment(resp?.date).format('YYYY-MM-DD');
                        if (xDate == respDate) {
                          return <Badge color={caseCol(x.type)} />;
                        }
                      })}
                  </Space>
                </Card>
              </Col>
            </Fragment>
          ))}

        <Col span={24}>
          <Divider className="mt-0" />
          <Row gutter={10} justify="center">
            {badges.map((x, i) => (
              <Col key={i}>
                <Badge className="bottom-badge" color={x?.color} text={x.title} />
              </Col>
            ))}
          </Row>
          <Divider className="mt-1-5" />
        </Col>

        <Col span={24} className="classes-height">
          <Row>
            <Col span={8}>
              {calendarData &&
                calendarData?.length > 0 &&
                calendarData.map((resp, i) => (
                  <Fragment key={i}>
                    <Row className="time_ul">
                      <Col span={24}>{resp?.start_time}</Col>
                      <Col span={24}>{resp?.end_time}</Col>
                    </Row>
                  </Fragment>
                ))}
            </Col>
            <Col span={16}>
              <Row gutter={[10, 10]} align="bottom">
                {calendarData &&
                  calendarData?.length > 0 &&
                  calendarData.map((resp, i) => (
                    <Fragment key={i}>
                      {resp?.module &&
                        resp?.module.map((e, ind) => (
                          <Col span={24} key={ind}>
                            <Card
                              bordered={false}
                              className="inner-card"
                              style={{ background: '#202020', cursor: isCurrent ? 'pointer' : 'default' }}
                              onClick={() => (isCurrent ? virtualClass(resp) : {})}
                            >
                              <Space>
                                <Badge className="bottom-badge" color="#0077B6" />
                                <Paragraph level={5} className="smallFont14 mb-0">
                                  <Tooltip
                                    placement="top"
                                    title={e?.academic_terms && e?.academic_terms?.split('-')[1]}
                                  >
                                    <Space direction="vertical" size={4}>
                                      {e?.module_code}
                                      {e?.module_name}
                                    </Space>
                                  </Tooltip>
                                </Paragraph>
                              </Space>
                            </Card>
                          </Col>
                        ))}
                    </Fragment>
                  ))}
                {/* <Col span={24}>
                  <Card bordered={false} className='inner-card' style={{ background: '#202020' }}>
                    <Title level={5} className="smallFont12 mb-0">Meet Up</Title>
                    <Avatar.Group maxCount={6}>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                      <Avatar size={32} style={{ backgroundColor: '#f56a00' }}></Avatar>
                      <Avatar size={32} src={`${baseUrl}/files/14.jpg`} />
                    </Avatar.Group>
                  </Card>
                </Col> */}
              </Row>
            </Col>

            <Col span={24}>
              {calendarData && calendarData?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
