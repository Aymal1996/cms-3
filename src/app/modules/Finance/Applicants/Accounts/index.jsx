import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Breadcrumb } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import HeadingChip from 'Molecules/HeadingChip';
import { PhoneIcon, MailIcon } from 'Atoms/CustomIcons';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import UpdateSection from 'Molecules/UpdateSection';
import { emptyApp, getApplicationDetial } from '../../../Marketing/ducks/actions';
import Payment from '../../../Marketing/Applications/AddApplication/ApplicationForm/Payment';
import moment from 'moment';
import ApplicationDocuments from 'Molecules/ApplicationDocuments';
import { prevDoc } from '../../../StudentFile/ducks/services';

export default (props) => {
  const { id } = useParams();
  let location = useLocation();
  const url = location.pathname;
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState('');
  const appDetalData = useSelector((state) => state.marketing.appDetailData);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  let name = url.split('/')[3];
  const commentsApi = useSelector((state) => state.global.comments);

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
      url: '',
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

  const updateComment = () => {
    dispatch(getComments('Application', id));
  };

  const getImage = async (iid, cat, url, app) => {
    let res = await prevDoc(iid, cat, url, app);
    return res.data.message
  }

  useEffect(async () => {
    if (appDetalData && appDetalData?.documents?.length > 0) {
      if (appDetalData?.documents.find(x => x.item == 'Passport Photo with White Background')) {
        let doc = appDetalData?.documents.find(x => x.item == 'Passport Photo with White Background');
        let imgres = await getImage(id, doc.item, doc.attached_document, true);
        setProfileImg(imgres);
      }
    }
  }, [appDetalData]);

  const sideData = [
    {
      type: 'image',
      url: profileImg ? profileImg : '',
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: 'Application',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'mainTitle',
      title: appDetalData?.applicant_name,
      subtitle: appDetalData?.name,
      highlight: true,
    },
    {
      type: 'single',
      title: appDetalData?.nationality,
      highlight: true,
      noLine: true,
    },
    {
      type: 'titleValue',
      title: 'Counselor',
      value: appDetalData?.counsellor_name,
    },
    {
      type: 'titleValue',
      title: 'Application Date',
      value: appDetalData?.creation ? moment(appDetalData?.creation).format('Do MMMM YYYY') : '',
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      icon: <PhoneIcon />,
      text: appDetalData?.contact_no,
    },
    {
      icon: <MailIcon />,
      text: appDetalData?.email,
    },
  ];

  useEffect(() => {
    dispatch(getComments('Application', id));
    dispatch(getApplicationDetial(id));
    return () => {
      dispatch(emptyApp());
      dispatch(emptyComments());
    };
  }, []);

  const callApi = () => {
    dispatch(getApplicationDetial(id));
  }

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/finance/applicants">Applications</Breadcrumb.Item>
        <Breadcrumb.Item href={`/finance/applicants/${name}`} className="SentanceCase">
          {name.replace('-', ' ')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>Applicant Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Applicant Details" />
        </Col>
        <Col span={24}>
          <div className="twocol-3070">
            <div className="side-detail">
              {isHDScreen ? (
                <SideDetails data={sideData} type="info" bottom={bottomList} />
              ) : (
                <SideDetailResponsive data={sideData} type="info" bottom={bottomList} />
              )}
            </div>
            <div className="side-form">
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <Card bordered={false} className="uni-card">
                      <Payment />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <ApplicationDocuments 
                      id={id} 
                      docs={appDetalData?.documents} 
                      setLoading={props.setLoading} 
                      updateApi={callApi} 
                    />
                  </Col>
                  <Col span={24}>
                    <UpdateSection data={commentsApi} code={id} module={'Application'} updateComment={updateComment} />
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
