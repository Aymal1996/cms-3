import React, {  useEffect } from 'react';
import { Row, Col, Card, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import StudentForm from '../../components/StudentForm';
import SideDetails from '../../../../molecules/SideDetails';
import { PhoneIcon, MailIcon } from '../../../../atoms/CustomIcons';
import { getStudentdetails, emptyStudentApp } from '../ducks/actions';
import Documents from '../../../../molecules/Documents';
import UpdateSection, { baseUrl } from '../../../../molecules/UpdateSection';
import RequestComponent from '../../../components/RequestComponent';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {

  const { id } = useParams();
  const i18n = useTranslate();
  const { t } = i18n;
  const dispatch = useDispatch();
  
  const appData = useSelector((state) => state.students.studentAppData);
  const commentsApi = useSelector((state) => state.global.comments);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });


  useEffect(() => {
    dispatch(getComments('Students', id));
    dispatch(getStudentdetails(id));
    return () => {
      dispatch(emptyStudentApp());
      dispatch(emptyComments());
    };
  }, []);


  const documents = [
    {
      name: 'Passport Photo with White Background',
      type: 'Passport Photo with White Background',
      url: '',
    },
    {
      name: 'IC/Passport (Scanned)',
      type: 'IC/Passport (Scanned)',
      url: '',
    },
    {
      name: 'Academic Transcript 1',
      type: 'Academic Transcript 1',
      url: '',
    },
    {
      name: 'Academic Certificate 1',
      type: 'Academic Certificate 1',
      url: '',
    },
    {
      name: 'English Proficiency Certificate',
      type: 'English Proficiency Certificate',
      url: appData && appData.qualifications ? appData.qualifications[0]?.certificate : '',
    },
    {
      name: 'Offer Letter',
      type: 'Offer Letter',
      url: '',
    },
    {
      name: 'Resume/CV',
      type: 'CV',
      url: '',
    },
    {
      name: 'Portfolio',
      type: 'Portfolio',
      url: '',
    },
    {
      name: 'Visa Approval Letter',
      type: 'Visa Approval Letter',
      url: '',
    },
    {
      name: 'Accommodation Offer Letter',
      type: 'Accommodation Offer Letter',
      url: '',
    },
    {
      name: 'Arrival Form',
      type: 'Arrival Form',
      url: '',
    },
    {
      name: 'Accommodation Form',
      type: 'Accommodation Form',
      url: '',
    },
    {
      name: 'Sponsorship Recommendation Letter',
      type: 'Sponsorship Recommendation Letter',
      url: '',
    },
  ];

  useEffect(() => {
    if (Object.keys(appData).length > 0) {
      appData?.documents.map((item, index) => {
        let ax = documents.findIndex((y) => y.type == item.document_name);
        if (ax >= 0) {
          documents[ax].url = item.document;
        }
      });
    }
  }, [appData]);

  const sideData = [
    {
      type: 'image',
      url: appData?.profile_photo ? baseUrl+appData?.profile_photo : '',
      size: 120,
      highlight: true
    },
    {
      type: 'tag',
      title: 'Student',
      noDivider: true,
      highlight: true
    },
    {
      type: 'mainTitle',
      title: appData?.applicant_name,
      subtitle: appData?.applicant_id,
      highlight: true
    },
    {
      type: 'single',
      title: appData?.nationality,
      highlight: true,
      noLine: true,
    },
    {
      type: 'single',
      title: appData?.current_semester,
    },
    {
      type: 'titleValue',
      title: 'Faculty',
      value:
        appData && appData?.program_details && appData?.program_details.length > 0
          ? appData?.program_details[0]?.faculty_name
          : '',
    },
    {
      type: 'titleValue',
      title: 'Programme',
      value:
        appData && appData?.program_details && appData?.program_details.length > 0
          ? appData?.program_details[0]?.first_pref_name
          : '',
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      icon: <PhoneIcon />,
      text: appData?.contact_no,
    },
    {
      icon: <MailIcon />,
      text: appData?.email,
    },
  ];

  const updateComment = () => {
    dispatch(getComments('Students', id));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/registry/students">Students</Breadcrumb.Item>
        <Breadcrumb.Item>Student Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Student Details" />
        </Col>
        <Col span={24}>
        <div className='twocol-3070'>
          <div className='side-detail'>
              {isHDScreen ?
              <SideDetails data={sideData} type='info' bottom={bottomList} />
              :
              <SideDetailResponsive data={sideData} type='info' bottom={bottomList} />
              }
          </div>
          <div className='side-form'>
          
          <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <RequestComponent id={id} type={'student'} />
              </Col>
              <Col span={24}>
                <StudentForm data={appData} />
              </Col>
              <Col span={24}>
                <Documents id={id} docs={documents} />
              </Col>
              <Col span={24}>
                <UpdateSection
                  data={commentsApi}
                  code={appData.applicant_id}
                  module={'Students'}
                  updateComment={updateComment}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      </Col>
      </Row>
    </>
  );
};
