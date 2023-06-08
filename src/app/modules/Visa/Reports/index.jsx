import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useDispatch, useSelector } from 'react-redux';
import { VisaReports } from './Components';
export default (props) => {

  return (
    <>
      <Row gutter={[20, 50]}>
        <Col span={24}><VisaReports /></Col>
      </Row>
    </>
  );
};
