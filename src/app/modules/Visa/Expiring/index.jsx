import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Pagination, Empty } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import MainStatusCard from '../../../atoms/MainStatusCard';
import { getVisaRenewalList } from '../ducks/actions';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const data = useSelector((state) => state.visa.visaRenewalList);

  console.log('visaList', data);

  useEffect(() => {
    dispatch(getVisaRenewalList('Expiring', page, limit, '', ''));
  }, []);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
  };

  // const data = [
  //   {
  //     employee_id: 'HR-EMP-01883',
  //     employee_name: 'Harry Freeman',
  //     job_title: 'Expiring Visa',
  //     job_title_name: '4 Days',
  //     image: '/files/limkokwing.jpg',
  //   },
  //   {
  //     employee_id: 'HR-EMP-01883',
  //     employee_name: 'Harry Freeman',
  //     job_title: 'Expiring Visa',
  //     job_title_name: '4 Days',
  //     image: '/files/limkokwing.jpg',
  //   },
  //   {
  //     employee_id: 'HR-EMP-01883',
  //     employee_name: 'Harry Freeman',
  //     job_title: 'Expiring Visa',
  //     job_title_name: '4 Days',
  //     image: '/files/limkokwing.jpg',
  //   },
  //   {
  //     employee_id: 'HR-EMP-01883',
  //     employee_name: 'Harry Freeman',
  //     job_title: 'Expiring Visa',
  //     job_title_name: '4 Days',
  //     image: '/files/limkokwing.jpg',
  //   },
  //   {
  //     employee_id: 'HR-EMP-01883',
  //     employee_name: 'Harry Freeman',
  //     job_title: 'Expiring Visa',
  //     job_title_name: '4 Days',
  //     image: '/files/limkokwing.jpg',
  //   },
  // ];

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title="Expiring Visa" />
      </Col>

      <Col span={24}>
        <Row gutter={[20, 30]}>
          {data && data?.rows?.length > 0 ? (
            data?.rows?.map((e) => (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  link="/visa/renewal/expiring/"
                  topKey={{
                    status1: e?.visa_status,
                    status2: e?.visa_expiry ? moment(e?.visa_expiry).format('LL') : '',
                  }}
                  cardOn={true}
                  statData={{
                    id: 'student_id',
                    name: 'student_name',
                    class: 'b-pending',
                  }}
                />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24}>
        <Pagination
          pageSize={9}
          current={page}
          hideOnSinglePage={true}
          showSizeChanger={false}
          onChange={onPageChange}
          total={data?.total}
        />
      </Col>
    </Row>
  );
};
