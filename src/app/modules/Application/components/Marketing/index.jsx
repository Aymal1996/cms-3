import React, { useEffect } from 'react';
import { Row, Typography, Col } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ApplicationProgress from '../../../../molecules/ApplicationProgress';
import EnrolledLayout from '../../../../molecules/EnrolledLayout';
import { getApplicationLeads, getApplicationProgress, getTotalStudentEnrolled } from '../../../Marketing/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import PendingRequestCard from '../../../../molecules/PendingRequestCard';

const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const i18n = useTranslate();
  const { t } = i18n;
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const applicationLeads = useSelector((state) => state.marketing.applicationList);
  const applicationProgress = useSelector((state) => state.marketing.applicationProg);
  const totalStudentsEnrolled = useSelector((state) => state.marketing.totalStudentEnrolled);

  useEffect(() => {
    dispatch(getApplicationLeads());
    dispatch(getApplicationProgress());
    dispatch(getTotalStudentEnrolled());
  }, []);

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title={'Marketing'} />
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          <Col flex="1 1 300px">
            <ApplicationProgress
              label="Incomplete Applications"
              link="/marketing/applications/incomplete-applications"
              incompApplication={applicationProgress}
            />
          </Col>
          <Col flex="1 1 300px" order={isHDScreen ? 0 : 1}>
            <EnrolledLayout label="Enrolled Students" totalStudent={totalStudentsEnrolled} />
          </Col>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={applicationLeads}
              title=""
              count={applicationLeads?.length}
              link=""
              label="Application Leads"
              innerlink=""
              nameKey="applicant_name"
              idKey="name"
              app={true}
              s3={true}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
