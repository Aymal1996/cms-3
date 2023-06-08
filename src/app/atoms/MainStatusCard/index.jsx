import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Avatar, Card, Space, Button, Descriptions } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { baseUrl } from '../../../configs/constants';
import { prevDoc } from '../../modules/StudentFile/ducks/services';

const { Title, Text } = Typography;

export default (props) => {
  const {
    data,
    link,
    addon,
    statusKey,
    statData,
    highlight,
    hide,
    onHide,
    cardType,
    cardOn,
    topKey,
    extraData,
    noID,
    app,
  } = props;

  const colorCheck = (col) => {
    if (col) {
      let val = Number(col.replace('%', ''));
      if (val < 50) {
        return 'c-error';
      } else if (val < 80) {
        return 'c-pending';
      } else {
        return '';
      }
    }
  };

  const statuses = (status) => {
    let val = status;
    if (val) {
      if (val.includes('Issues')) {
        val = 'Issues';
      }

      if (val.includes('Passed')) {
        val = 'Passed';
      }
    }

    switch (val) {
      case 'Low Class Attendance':
        return 'b-error';
      case 'Poor Performance':
        return 'b-error';
      case 'Unregisterd Module':
        return 'b-error';
      case 'Unassigned Module(s)':
        return 'b-pending';
      case 'Pending':
        return 'b-pending';
      case 'Unassigned Modules':
        return 'b-pending';
      case 'High Workload':
        return 'b-error';
      case 'Low Class Attendance':
        return 'b-error';
      case 'Low Student Performance':
        return 'b-error';
      case 'Poor Student Review':
        return 'b-error';
      case 'Expiring Visa':
        return 'b-error';
      case 'Outstanding Balance':
        return 'b-error';
      case 'Outstanding':
        return 'b-error';
      case 'Issue':
        return 'b-error';
      case 'Issues':
        return 'b-error';
      case 'Refund Request':
        return 'b-pending';
      case 'Payment Verification':
        return 'b-pending';

      case 'Missed':
        return 'b-error';
      case 'Fit Index':
        return 'b-success';
      case 'Low Index':
        return 'b-error';
      case 'Medium Fit Index':
        return 'b-pending';
      case 'Late Clock In':
        return 'b-pending';
      case 'Absent':
        return 'b-error';
      case 'On Duty':
        return 'b-success';
      case 'Attended':
        return 'b-success';
      case 'Outstanding Loan':
        return 'b-error';
      case 'Expiring Asset Possession':
        return 'b-pending';
      case 'Expired Asset Possession':
        return 'b-error';
      case 'Expiring':
        return 'b-pending';
      case 'Expired':
        return 'b-error';
      case 'On Leave':
        return 'b-success';
      case 'Rest Day':
        return 'b-success';
      case 'Passed':
        return 'b-success';
      case 'Early Clock Out':
        return 'b-pending';
      case 'Permanent':
        return 'b-success';
      case 'Contract':
        return 'b-pending';
      case 'No Issue':
        return 'b-success';
      case 'Approved':
        return 'b-success';

      case 'Excellent':
        return 'b-success';
      case 'Poor':
        return 'b-error';
      case 'Average':
        return 'b-pending';
      case 'Supervisor Assessment Required':
        return 'b-error';
      case 'Staff Assessment Required':
        return 'b-error';
    }
  };

  const [pimage, setPImage] = useState('');

  useEffect(async () => {
    let ids = data['student_id'] || data['staff_id'] || data['applicant_id'] || data[statData?.id];
    if (data?.user_image && props?.s3 == true) {
      let yz = '';
      await prevDoc(ids, 'Passport Photo with White Background', data?.user_image, app)
        .then((res) => {
          yz = res.data.message;
        })
        .catch((err) => {
          console.log('something went worng');
        });
      setPImage(yz);
    } else if (data?.image && props?.s3 == true) {
      let yz = '';
      await prevDoc(ids, 'Passport Photo with White Background', data?.image, app)
        .then((res) => {
          yz = res.data.message;
        })
        .catch((err) => {
          console.log('something went worng');
        });
      setPImage(yz);
    }
  }, [data]);

  return (
    <div className="position-relative h-100">
      {hide == true && (
        <Button
          type="link"
          className="right-card-link"
          onClick={() => onHide(data['student_id'] || data['staff_id'] || data['applicant_id'] || data[statData?.id])}
          icon={<CloseCircleFilled />}
        />
      )}
      <Link
        to={{
          pathname: link
            ? noID
              ? link
              : `${link}${data.student_id || data.staff_id || data.applicant_id || data[statData?.id] || data.name}`
            : '',
          state: { tab: link == '/hrms/employment/' ? '1' : data?.status },
        }}
      >
        <Card bordered={false} className="uni-card">
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <Space size={17}>
                <Avatar
                  size={70}
                  src={
                    pimage && props.s3 == true
                      ? pimage
                      : data?.image
                      ? `${baseUrl}${data?.image}`
                      : `${baseUrl}${data[statData?.image]}`
                  }
                />
                <Space direction="vertical" size={0}>
                  <Title level={5} className="c-default mb-0">
                    {data?.staff_name ||
                      data.student_name ||
                      data.applicant_name ||
                      data[statData?.name] ||
                      topKey?.name}
                  </Title>
                  <Text className="c-gray lineHeight20">
                    {data['student_id'] || data['staff_id'] || data['applicant_id'] || data[statData?.id] || topKey?.id}
                  </Text>
                  {cardType && <Text className="c-gray card_type">{cardType}</Text>}
                </Space>
              </Space>
            </Col>

            <Col span={24}>
              <Card bordered={false} className={`mini-card ${statusKey ? statuses(data[statusKey]) : statData?.class}`}>
                <Row gutter={24} wrap={false} align="middle">
                  <Col span={24}>
                    <Space direction="vertical" size={highlight ? 15 : 2}>
                      {statData && statData.key1 ? (
                        <>
                          <Title level={5} className={`mb-0 ${highlight ? 'c-white' : 'op-6'}`}>
                            {data[statData?.key1]}
                          </Title>
                          <Title level={highlight ? 3 : 5} className="mb-0">
                            {`${statData?.currency ? statData?.currency : ''}${data[statData?.key2]}`}
                          </Title>
                        </>
                      ) : cardOn ? (
                        <>
                          <Title level={5} className={`mb-0 ${highlight ? 'c-white' : 'op-6'}`}>
                            {data.name}
                          </Title>
                          {topKey?.status1 && (
                            <Title level={highlight ? 3 : 5} className="mb-0">
                              {topKey?.status1}
                            </Title>
                          )}
                          {topKey?.status2 && (
                            <Title level={highlight ? 3 : 5} className="mb-0">
                              {topKey?.status2}
                            </Title>
                          )}
                        </>
                      ) : (
                        <>
                          <Title level={5} className="mb-0">
                            {data[statusKey]} {addon}
                          </Title>
                          {data?.date && (
                            <Title level={5} className="mb-0 op-6">
                              {data?.date && moment(data?.date).format('Do MMMM YYYY')}
                            </Title>
                          )}
                          {data?.creation && (
                            <Title level={5} className="mb-0 op-6">
                              {data?.creation && moment(data?.creation).format('Do MMMM YYYY')}
                            </Title>
                          )}
                        </>
                      )}
                    </Space>
                  </Col>
                </Row>
              </Card>
              {extraData && (
                <Card bordered={false} className="mini-card b-black dashboard-FitCard">
                  <Descriptions>
                    {extraData.map((x, i) => (
                      <Descriptions.Item
                        key={i}
                        span={24}
                        label={x.label}
                        className={
                          x.label == 'Fit Index Score' &&
                          (data[x['value']] == '0' || data[x['value']] == '0%') &&
                          'supervisor_text'
                        }
                      >
                        {x.label == 'Fit Index Score' && (data[x['value']] == '0' || data[x['value']] == '0%') ? (
                          <span className={`${colorCheck(data[x['value']])}`}>{data?.fit_index_text}</span>
                        ) : (
                          <span className={`${colorCheck(data[x['value']])}`}>{data[x['value']]}</span>
                        )}
                      </Descriptions.Item>
                    ))}
                  </Descriptions>
                </Card>
              )}
            </Col>
          </Row>
        </Card>
      </Link>
    </div>
  );
};
