import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { ApplicationsIcon, RequestIcon, CalendarIcon } from '../../../atoms/CustomIcons';
import DashboardStatusCard from '../../../molecules/DashboardStatusCard';
import { useDispatch, useSelector } from 'react-redux';
import { emptyListVisa, getVisaOverview } from '../ducks/actions';

export default (props) => {
  const dispatch = useDispatch();
  const visaOverviewList = useSelector((state) => state.visa.visaOverviewList);

  console.log('visaOverviewList', visaOverviewList)

 

  const newVisa = [
    {
      title: 'Student',
      value: visaOverviewList?.new_visa ?? 0,
      status: 'b-error',
      key: '',
    },
  ];
  
  const renewalVisa = [
    {
      title: 'Expired',
      value: visaOverviewList?.expired ?? 0,
      status: 'b-error',
      key: '',
    },
    {
      title: 'Expiring',
      value: visaOverviewList?.expiring ?? 0,
      status: 'b-pending',
      key: '',
    },
  ];
  
  const visaCancellation = [
    {
      title: 'Withdrawn',
      value: visaOverviewList?.withdrawn ?? 0,
      status: 'b-error',
      key: '',
    },
    {
      title: 'Self-withdrawn',
      value: visaOverviewList?.self_withdrawn ?? 0,
      status: 'b-error',
      key: '',
    },
  ];
  
  const visaRequest = [
    {
      title: 'Student',
      value: visaOverviewList?.new_visa ?? 0,
      status: 'b-error',
      key: '',
    },
  ];

  const data = [
    {
      title: 'New Visa Application',
      icon: <ApplicationsIcon />,
      data: newVisa,
      link: '/visa/new-visa',
    },
    {
      title: 'Renewal Visa Application',
      icon: <RequestIcon />,
      data: renewalVisa,
      link: '/visa/renewal',
    },
    {
      title: 'Visa Cancellation',
      icon: <CalendarIcon />,
      data: visaCancellation,
      link: '/visa/renewal',
    },
    {
      title: 'Visa Sticker Request',
      icon: <CalendarIcon />,
      data: visaRequest,
      link: '/visa/new-visa',
    },
  ];

  useEffect(() => {
    dispatch(getVisaOverview());
    return () => dispatch(emptyListVisa());
  }, []);

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title="Visa Overview" />
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          {data?.map((item, index) => (
            <Col span={8} key={index}>
              <DashboardStatusCard data={item} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
