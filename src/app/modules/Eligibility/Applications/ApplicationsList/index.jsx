import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ApplicationProgress from '../../../../molecules/ApplicationProgress';
import {
  getApplicationProgress,
  getEligibilityAssessmentList,
  getIncompleteDocumentsList,
  getPendingVisaList,
  getPendingAccomodationList,
  getPendingEnrollmentList,
} from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PendingRequestCard from '../../../../molecules/PendingRequestCard';

export default (props) => {
  const dispatch = useDispatch();
  const i18n = useTranslate();
  const history = useHistory();
  const { t } = i18n;
  const applicationProgress = useSelector((state) => state.marketing.applicationProg);
  const eligibilityAssessmentData = useSelector((state) => state.marketing.eligibilityAssessmentData);
  const incompleteRegistrationsData = useSelector((state) => state.marketing.incompleteRegistrationsData);
  const pendingVisaData = useSelector((state) => state.marketing.pendingVisaData);
  const pendingAccomodationData = useSelector((state) => state.marketing.pendingAccomodationData);
  const pendingEnrollmentData = useSelector((state) => state.marketing.pendingEnrollmentData);

  const addNew = () => history.push('/marketing/applications/addnew');
  const btnList = [
    {
      text: '+ New Application',
      action: () => addNew(),
    },
  ];

  useEffect(() => {
    dispatch(getApplicationProgress());
    dispatch(getIncompleteDocumentsList('Incomplete document'));
    dispatch(getEligibilityAssessmentList('Eligibility assessment'));
    dispatch(getPendingVisaList('Incomplete registration visa'));
    dispatch(getPendingAccomodationList('Pending accomodation'));
    dispatch(getPendingEnrollmentList('Pending enrollment'));
  }, []);

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title="Applications" btnList={btnList} />
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]} className="listingLayout">
          <Col flex="1 1 300px">
            <ApplicationProgress
              label="Incomplete Applications"
              link="/marketing/applications/incomplete-applications"
              incompApplication={applicationProgress}
            />
          </Col>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={incompleteRegistrationsData}
              title=""
              count={incompleteRegistrationsData.length || 0}
              link="/marketing/applications/incomplete-documents"
              label="Incomplete Documents"
              innerlink="/marketing/applications/incomplete-documents/"
              nameKey="applicant_name"
              idKey="name"
            />
          </Col>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={eligibilityAssessmentData}
              title=""
              count={eligibilityAssessmentData.length || 0}
              link="/marketing/applications/eligibility-assessments"
              label="Eligibility Assessments"
              innerlink="/marketing/applications/eligibility-assessments/"
              nameKey="applicant_name"
              idKey="name"
            />
          </Col>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={pendingVisaData}
              title=""
              count={pendingVisaData.length || 0}
              link="/marketing/applications/pending-registration-visa"
              label="Pending Registration &amp; Visa"
              innerlink="/marketing/applications/pending-registration-visa/"
              nameKey="applicant_name"
              idKey="name"
            />
          </Col>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={pendingAccomodationData}
              title=""
              count={pendingAccomodationData.length || 0}
              link="/marketing/applications/pending-accommodations"
              label="Pending Accommodations"
              innerlink="/marketing/applications/pending-accommodations/"
              nameKey="applicant_name"
              idKey="name"
            />
          </Col>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={pendingEnrollmentData}
              title=""
              count={pendingEnrollmentData.length || 0}
              link="/marketing/applications/pending-enrolment"
              label="Pending Enrolment"
              innerlink="/marketing/applications/pending-enrolment/"
              nameKey="applicant_name"
              idKey="name"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
