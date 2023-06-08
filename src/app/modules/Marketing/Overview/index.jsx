import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import ApplicationProgress from '../../../molecules/ApplicationProgress';
import EnrolledLayout from '../../../molecules/EnrolledLayout';
import { getApplicationProgress, getTotalStudentEnrolled, getRecruitment, getLeadApplications } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../configs/constantData';
import ListCard from '../../../molecules/ListCard';
import { useHistory } from 'react-router-dom';

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const applicationProgress = useSelector((state) => state.marketing.applicationProg);
  const totalStudentsEnrolled = useSelector((state) => state.marketing.totalStudentEnrolled);
  const totalRecruitment = useSelector((state) => state.marketing.totalRecruitment);
  const apiData = useSelector((state) => state.marketing.leadApp);

  useEffect(() => {
    dispatch(getLeadApplications(1, 6));
    // dispatch(getApplicationLeads());
    dispatch(getApplicationProgress());
    dispatch(getTotalStudentEnrolled());
    dispatch(getRecruitment());
  }, []);
 
  const ListCol = [
    {
      title: 'Application Type',
      dataIndex: 'application_type',
      key: 'application_type',
    },
    {
      title: 'Agents',
      dataIndex: 'agents',
      key: 'agents',
    },
    {
      title: 'Marketing',
      dataIndex: 'marketing',
      key: 'marketing',
    },
    {
      title: 'Online',
      dataIndex: 'online',
      key: 'online',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/marketing/applications`);
      },
    };
  };

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title="Marketing Overview" />
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
              data={apiData.rows || []}
              title=""
              count={apiData?.total || 0}
              link="/marketing/applications/lead-applications"
              label="Application Leads"
              innerlink="/marketing/applications/lead-applications/"
              nameKey="applicant_name"
              idKey="name"
              app={true}
              s3={true}
            />
          </Col>

          <Col span={24} order={4} className="clickRow">
            <ListCard
              title="Total Recruitment"
              onRow={onClickRow}
              ListCol={ListCol}
              ListData={totalRecruitment}
              pagination={false}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
