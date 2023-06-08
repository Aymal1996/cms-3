import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Form, message, Menu, Breadcrumb, Space, Button } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import HeadingChip from 'Molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import { PhoneIcon, MailIcon } from 'Atoms/CustomIcons';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { ClockCircleFilled } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import moment from 'moment';
import ApplicationStatus from 'Molecules/ApplicationStatus';
import AssessmentCard from 'Atoms/AssessmentCard';
import NotifyDeartment from 'Molecules/NotifyDeartment';
import { Popup, PopupSuccess } from 'Atoms/Popup';
import CardStepAccordian from 'Molecules/CardStepAccordian';
import { getFileName, uploadFile } from '../../../../../features/utility';
import ApplicationForm from '../AddApplication/ApplicationForm';
import {
  getApplicationDetial,
  getStepsDetailData,
  emptyApp,
  marketingBool,
  getDownloadDocumentsList,
} from '../../ducks/actions';
import {
  getCountryDrop,
  getApplicationTypeDrop,
  getGenderDrop,
  getEnglishQualificationDrop,
  getProgNameDrop,
  getCouncelor,
  getSources,
  getAgentUser,
} from '../ducks/actions';
import { getRace, getComments, emptyComments, getMarital } from '../../../Application/ducks/actions';
import {
  addStudentApp,
  eligibilityLetter,
  generateOfferLetter,
  notifyManagerEligibility,
  offerLetterRelease,
  uploadDocApi,
  uploadMedical,
  uploadVAL,
} from '../ducks/services';
import { useSelector, useDispatch } from 'react-redux';
import PendingRegistrationsVisaDetails from '../../PendingRegistrationsVisaDetails';
import PendingEnrollmentDetails from '../../PendingEnrollmentDetails';
import UpdateSection from 'Molecules/UpdateSection';
import { getCurrentYearIntakes } from '../../../AQA/Incentives/ducks/actions';
import ApplicationDocuments from '../../../../molecules/ApplicationDocuments';
import { prevDoc } from '../../../StudentFile/ducks/services';
import EligibilityComp from 'Molecules/EligibilityComp';
import PendingVisaDetails from '../../PendingVisaDetails';
import { calculateDays } from '../../../../../utils/dateCalc';
import ShowDocument from '../../../../molecules/ShowDocument';
import { apiMethod } from '../../../../../configs/constants';

const { Title, Text } = Typography;

export default (props) => {
  const { id } = useParams();
  let location = useLocation();
  const url = location.pathname;
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [visibledoc, setVisibleDoc] = useState(false);
  const [agentUser, setAgentUser] = useState(false);
  const [firstIncent, setFirstIncent] = useState([]);
  const [secondIncent, setSecondIncent] = useState([]);
  const [thirdIncent, setThirdIncent] = useState([]);
  const [profileImg, setProfileImg] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { control, errors, setValue, setError, clearErrors, handleSubmit, getValues, watch } = useForm();
  const appDetalData = useSelector((state) => state.marketing.appDetailData);
  const stepDetailData = useSelector((state) => state.marketing.stepDetailData);
  const intakeList = useSelector((state) => state.incentives.intakeList);
  // const documentDownloadList = useSelector((state) => state.marketing.documentDownloadList);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  let name = url.split('/')[3];
  let mainurl = url.split('/')[1];
  const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];
  const commentsApi = useSelector((state) => state.global.comments);
  const sourcesData = useSelector((state) => state.applicationForm.sources);
  const agentUsersList = useSelector((state) => state.applicationForm.agentUsers);

  const updateComment = () => {
    dispatch(getComments('Application', id));
  };

  const movetoEarly = async () => {
    props.setLoading(true);
    const payload = {
      doc_status: '',
      eligibility_status: '',
      registration_status: '',
      accommodations_status: '',
      enrolment_status: '',
      workflow_state: 'Incomplete document',
      application_eligibility_status: [],
      application_registration_status: [],
      application_accommodation_status: [],
      application_enrolment_status: [],
      eligibility: 0,
      registration_fee: 0,
      offer_letter_release: 0,
      student_offer_letter_acceptance: 0,
      visa_acceptance: 0,
      arrival_form: 0,
      accomodation: 0,
      medical_checkup: 0,
      visa_delivery_to_university: 0,
      visa_approval: 0,
      visa_collection: 0,
      tution_fee: 0,
      module_registration: 0,
    };

    addStudentApp(payload, id)
      .then((x) => {
        props.setLoading(false);
        message.success('Application Successfully Moved To Incomplete');
        setTimeout(() => history.push('/marketing/applications'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        message.error(response);
      });
  };

  const movetoArchive = () => {
    props.setLoading(true);
    const payload = {
      status: 'Archive',
    };

    addStudentApp(payload, id)
      .then((x) => {
        props.setLoading(false);
        message.success('Application Successfully Moved To Archive');
        setTimeout(() => history.push('/marketing/applications'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        message.error(response);
      });
  };

  const menu = (
    <Menu>
      {(name == 'pending-registration-visa' || name == 'pending-accommodations' || name == 'pending-enrolment') && (
        <Menu.Item>
          <Space size={4}>
            <Button onClick={() => movetoEarly()}>
              <ClockCircleFilled />
              <Text>Move to earlier stage</Text>
            </Button>
          </Space>
        </Menu.Item>
      )}
      {name != 'lead-applications' && (
        <Menu.Item>
          <Space size={4}>
            <Button onClick={() => movetoArchive()}>
              <ClockCircleFilled />
              <Text>Archive application</Text>
            </Button>
          </Space>
        </Menu.Item>
      )}
      <Menu.Item>
        <Space size={4}>
          <Button
            onClick={() =>
              history.push({ pathname: '/marketing/applications/addnew', state: { apiData: appDetalData } })
            }
          >
            <ClockCircleFilled />
            <Text>Duplicate Application</Text>
          </Button>
        </Space>
      </Menu.Item>
    </Menu>
  );

  const getImage = async (iid, cat, url, app, opendoc) => {
    let res = await prevDoc(iid, cat, url, app);
    if (opendoc == true) {
      props.setLoading(false);
      window.open(res, '_blank');
    } else {
      return res.data.message;
    }
  };

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

  const viewDoc = async (cat, docname) => {
    props.setLoading(true);
    prevDoc(id, cat, docname, true)
      .then((res) => {
        let fileurl = res.data.message;
        props.setLoading(false);
        window.open(fileurl, '_blank');
      })
      .catch((err) => {
        props.setLoading(false);
        message.error('Something went worng');
        console.log('something went worng');
      });
  };

  const popupVisa = {
    closable: false,
    className: 'black-modal',
    title: '',
    content: ``,
    width: 536,
  };

  const acceptValue = (key) => {
    let payload = {};
    payload[key] = 1;
    if (key == 'visa_approval') {
      payload['visa_status'] = "Active"
    }
    props.setLoading(true);
    addStudentApp(payload, id)
      .then((x) => {
        props.setLoading(false);
        setVisibleDoc(false);
        setSelectedDoc(null);
        if (key == 'visa_delivery_to_university') {
          popupVisa['title'] = 'Visa Collected';
          popupVisa['content'] = 'Applicant visa been collected';
          PopupSuccess(popupVisa);
        }
        if (key == 'visa_acceptance') {
          popupVisa['title'] = 'Visa Approval Letter Verified';
          popupVisa['content'] = `The VAL letter for ${appDetalData?.applicant_name} has review and verified.`;
          PopupSuccess(popupVisa);
        }
        setTimeout(() => callApi(), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  // const viewVAL = async () => {
  //   let doc = appDetalData.documents.find((x) => x.item == 'Visa Approval Letter (VAL)');
  //   if (appDetalData?.visa_acceptance == 1) {
  //     if (doc) {
  //       viewDoc(doc?.item, doc?.attached_document);
  //     }
  //   } else {
  //     props.setLoading(true);
  //     prevDoc(id, doc?.item, doc?.attached_document, true)
  //       .then((res) => {
  //         let fileurl = res.data.message;
  //         props.setLoading(false);
  //         setSelectedDoc({
  //           url: fileurl,
  //           category: doc?.item,
  //           docname: doc?.attached_document,
  //           onAction: () => acceptValue('visa_acceptance'),
  //           btnText: 'Verify VAL',
  //           text: 'Please review and go through the VAL to avoid mistakes and false letter uploaded',
  //         });
  //         setVisibleDoc(true);
  //       })
  //       .catch((err) => {
  //         props.setLoading(false);
  //         message.error('Something went worng');
  //         console.log('something went worng');
  //       });
  //   }
  // };

  const onUploadFile = async (val, category) => {
    props.setLoading(true);
    let doc = '';
    if (val?.uploadfile) {
      let file = await uploadFile(val.uploadfile, category);
      doc = file.attached_document;
    }

    const body = {
      doctype: 'Application',
      application_id: id,
      files: [
        {
          item: category,
          file_url: doc,
          document_date: moment().format('YYYY-MM-DD'),
        },
      ],
    };

    if (category == 'Visa Approval Letter (VAL)') {
      uploadVAL(body)
        .then((res) => {
          message.success('VAL Uploaded Successfully');
          props.setLoading(false);
          setTimeout(() => callApi(), 1000);
        })
        .catch((err) => {
          const { response } = err;
          console.log('response', response);
          message.error(response?.data?.status?.message ?? 'Something went wrong');
          props.setLoading(false);
        });
    } else if (category == 'Medical Check-up') {
      uploadMedical(body)
        .then((res) => {
          message.success('Medical Document Uploaded Successfully');
          props.setLoading(false);
          setTimeout(() => callApi(), 1000);
        })
        .catch((err) => {
          const { response } = err;
          console.log('response', response);
          message.error(response?.data?.status?.message ?? 'Something went wrong');
          props.setLoading(false);
        });
    }
  };

  const onVisaInfo = (val) => {
    props.setLoading(true);
    const body = {
      visa_expiry: moment(val.date).format('YYYY-MM-DD'),
      visa_issued: moment(val.date1).format('YYYY-MM-DD'),
      visa_no: val.name,
    };
    addStudentApp(body, id)
      .then((resp2) => {
        message.success('Visa Info Successfully Updated');
        props.setLoading(false);
        setTimeout(() => callApi(), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const visacards = [
    {
      days: appDetalData?.modified ? calculateDays(appDetalData?.modified, 'Y-MM-DD HH:mm:ss.SSSSSS') : '',
      status: appDetalData?.visa_fee,
      text1: 'Please Contact the applicant to make the payment through the portal',
      text2: 'Applicant has completed the payment.',
      title: 'Visa Processing Fee',
    },
    {
      form: true,
      status: appDetalData?.visa_expiry ? 1 : 0,
      title: 'Visa Information',
      btnText: 'Submit',
      fields: {
        date: true,
        // datename: 'Issue Date',
        dateplace: 'Select Issue Date',
        datereq: true,
        datevalue: appDetalData?.visa_issued ? moment(appDetalData?.visa_issued, 'YYYY-MM-DD') : '',
        date1: true,
        // date1name: 'Expiry Date',
        date1place: 'Select Expiry Date',
        date1req: true,
        date1value: appDetalData?.visa_expiry ? moment(appDetalData?.visa_expiry, 'YYYY-MM-DD') : '',
        string: true,
        stirngreq: true,
        stringvalue: appDetalData?.visa_no,
        // stringname: 'Visa No.',
        stringplace: 'Enter Visa No.',
      },
      onActionForm: onVisaInfo,
    },
    {
      pendingtext: 'Pending Upload',
      status: appDetalData?.visa_acceptance,
      text1: 'Please send the required documents to upload the file once it ready.',
      title: 'Upload Visa Approval Letter',
      btnText: 'Upload',
      // btnText2: 'View VAL',
      fields: { upload: true, uploadreq: true },
      onActionForm: (val) => onUploadFile(val, 'Visa Approval Letter (VAL)'),
      // onAction: () => viewVAL(),
    },
  ];

  const visacards2 = [
    {
      title: 'Medical',
      cards: [
        {
          pendingtext: 'Pending Upload',
          status: appDetalData?.medical_checkup,
          text1: 'Please send the required documents to upload the file once it ready.',
          title: 'Upload Medical Check-up',
          btnText: 'Upload',
          // btnText2: 'View File',
          fields: { upload: true, uploadreq: true },
          onActionForm: (val) => onUploadFile(val, 'Medical Check-up'),
          // onAction: () => viewVAL(),
        },
      ],
    },
    {
      title: 'Visa',
      cards: [
        {
          pendingtext: 'Pending',
          status: appDetalData?.visa_collection,
          text1: 'Please contact the applicant to send their visa to university',
          text2: '',
          title: 'Visa Collection',
          btnText: 'Proceed',
          onAction: () => acceptValue('visa_collection'),
        },
        {
          pendingtext: 'Pending Approve',
          status: appDetalData?.visa_approval,
          text1: 'Please apply visa sticker for student',
          text2: '',
          title: 'Visa Sticker',
          btnText: 'Visa Sticker Approved',
          onAction: () => acceptValue('visa_approval'),
        },
        {
          pendingtext: 'Pending Collection',
          status: appDetalData?.visa_delivery_to_university,
          text1: "Please contact the student to collect their visa upon it's ready",
          text2: '',
          title: 'Delivery',
          btnText: 'Visa Collected',
          onAction: () => acceptValue('visa_delivery_to_university'),
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(getCurrentYearIntakes());
    dispatch(getComments('Application', id));
    dispatch(getApplicationDetial(id));
    dispatch(getStepsDetailData(id));
    dispatch(marketingBool('Marketing'));
    dispatch(getDownloadDocumentsList(id));
    return () => {
      dispatch(emptyApp());
      dispatch(emptyComments());
    };
  }, []);

  const callApi = () => {
    dispatch(getApplicationDetial(id));
  };

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <NotifyDeartment title="Notify Department" onClose={() => setVisible(false)} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const docPopup = {
    closable: false,
    visibility: visibledoc,
    class: 'black-modal',
    content: (
      <ShowDocument
        selectedDoc={selectedDoc}
        onClose={() => {
          setVisibleDoc(false);
          selectedDoc(null);
        }}
      />
    ),
    width: 800,
    onCancel: () => {
      setVisibleDoc(false);
      selectedDoc(null);
    },
  };

  const popupOffer = {
    closable: false,
    className: 'black-modal',
    title: 'Offer Letter Released',
    content: `The offer letter for ${appDetalData?.applicant_name} has successfully been released.`,
    width: 536,
  };

  useEffect(() => {
    dispatch(getCountryDrop());
    dispatch(getRace());
    dispatch(getApplicationTypeDrop());
    dispatch(getGenderDrop());
    dispatch(getEnglishQualificationDrop());
    dispatch(getProgNameDrop());
    dispatch(getCouncelor());
    dispatch(getSources());
    dispatch(getAgentUser());
    dispatch(getMarital());
  }, []);

  useEffect(async () => {
    if (appDetalData && Object.keys(appDetalData).length > 0) {
      setValue('applicant_name', appDetalData?.applicant_name);
      setValue('icpassport', appDetalData?.icpassport);
      setValue('contact_no', appDetalData?.contact_no);
      setValue('email', appDetalData?.email);
      // setValue('emergency_contact_name', appDetalData?.emergency_contact_name);
      // setValue('emergency_contact_email', appDetalData?.emergency_contact_email);
      // setValue('emergency_contact_number', appDetalData?.emergency_contact_number);
      setValue('score', appDetalData?.score);
      setValue('place_of_birth', appDetalData?.place_of_birth);

      setValue('current_address', appDetalData?.address[0]?.current_address_1);
      setValue('current_city', appDetalData?.address[0]?.current_city);
      setValue('current_post_code', appDetalData?.address[0]?.current_post_code);
      setValue('current_state', appDetalData?.address[0]?.permanent_state);

      if (appDetalData?.address[0]?.current_country) {
        setValue(
          'current_country',
          appDetalData?.address[0]?.current_country
            ? {
                value: appDetalData?.address[0]?.current_country,
                label: appDetalData?.address[0]?.current_country,
              }
            : '',
        );
      }

      setValue('permanent_address', appDetalData?.address[1]?.current_address_1);
      setValue('permanent_city', appDetalData?.address[1]?.current_city);
      setValue('permanent_post_code', appDetalData?.address[1]?.current_post_code);
      setValue('permanent_state', appDetalData?.address[1]?.permanent_state);

      if (appDetalData?.address[1]?.current_country) {
        setValue(
          'permanent_country',
          appDetalData?.address[1]?.current_country
            ? {
                value: appDetalData?.address[1]?.current_country,
                label: appDetalData?.address[1]?.current_country,
              }
            : '',
        );
      }

      if (appDetalData?.date_of_birth) {
        setValue('date_of_birth', moment(appDetalData?.date_of_birth, 'YYYY-MM-DD'));
      }
      if (appDetalData?.passport_expiry) {
        setValue('passport_expiry', moment(appDetalData?.passport_expiry, 'YYYY-MM-DD'));
      }

      if (appDetalData?.english_language_qualification) {
        setValue(
          'english_language_qualification',
          appDetalData?.english_language_qualification
            ? {
                value: appDetalData?.english_language_qualification,
                label: appDetalData?.english_language_qualification,
              }
            : '',
        );
      }

      if (appDetalData?.type) {
        setValue(
          'type',
          appDetalData?.type
            ? {
                value: appDetalData?.type,
                label: appDetalData?.type,
              }
            : '',
        );
        if (appDetalData?.type == 'Existing Student') {
          setValue('current_studentid', appDetalData?.current_studentid);
        }
        if (appDetalData?.type == 'Transfer Student') {
          setValue(
            'enrolled_semester',
            appDetalData?.enrolled_semester
              ? { label: appDetalData?.enrolled_semester, value: appDetalData?.enrolled_semester }
              : '',
          );

          if (appDetalData?.application_module_exemption_proof) {
            let modifiedName = getFileName(appDetalData?.application_module_exemption_proof);
            setValue(
              'application_module_exemption_proof',
              appDetalData?.application_module_exemption_proof
                ? {
                    fileList: [
                      {
                        uid: '-1',
                        name: modifiedName,
                        status: 'done',
                        url: appDetalData?.application_module_exemption_proof,
                        s3: 'Academic Transcript',
                        aid: id,
                        app: true,
                      },
                    ],
                  }
                : '',
            );
          }
        }
      }

      if (appDetalData?.application_intake) {
        let lab = intakeList.find((x) => x.name == appDetalData?.application_intake);
        setValue(
          'application_intake',
          appDetalData?.application_intake
            ? {
                value: appDetalData?.application_intake,
                label: lab ? lab?.term_start : appDetalData?.intake_name,
              }
            : '',
        );
      }

      if (appDetalData?.application_source) {
        setValue(
          'application_source',
          appDetalData?.application_source
            ? {
                value: appDetalData?.application_source,
                label: appDetalData?.source_name,
              }
            : '',
        );
      }

      if (appDetalData?.third_pref) {
        setValue(
          'third_pref',
          appDetalData?.third_pref
            ? {
                value: appDetalData?.third_pref,
                label: appDetalData?.third_pref_name,
              }
            : '',
        );
      }

      if (appDetalData?.second_pref) {
        setValue(
          'second_pref',
          appDetalData?.second_pref
            ? {
                value: appDetalData?.second_pref,
                label: appDetalData?.second_pref_name,
              }
            : '',
        );
      }

      if (appDetalData?.first_pref) {
        setValue(
          'first_pref',
          appDetalData?.first_pref
            ? {
                value: appDetalData?.first_pref,
                label: appDetalData?.first_pref_name,
              }
            : '',
        );
      }

      if (appDetalData?.race) {
        setValue(
          'race',
          appDetalData?.race
            ? {
                value: appDetalData?.race,
                label: appDetalData?.race_name,
              }
            : '',
        );
      }

      if (appDetalData?.nationality) {
        setValue(
          'nationality',
          appDetalData?.nationality
            ? {
                value: appDetalData?.nationality,
                label: appDetalData?.nationality,
              }
            : '',
        );
      }

      if (appDetalData?.issuing_country) {
        setValue(
          'issuing_country',
          appDetalData?.issuing_country
            ? {
                value: appDetalData?.issuing_country,
                label: appDetalData?.issuing_country,
              }
            : '',
        );
      }

      if (appDetalData?.gender) {
        setValue(
          'gender',
          appDetalData?.gender
            ? {
                value: appDetalData?.gender,
                label: appDetalData?.gender,
              }
            : '',
        );
      }

      if (appDetalData?.counsellor) {
        setValue('counsellor', {
          value: appDetalData?.counsellor,
          label: appDetalData?.counsellor_name,
        });
      } else {
        setValue('counsellor', {
          value: user?.name,
          label: user?.full_name,
        });
      }

      if (appDetalData?.marital_satus) {
        setValue(
          'marital_satus',
          appDetalData?.marital_satus
            ? {
                value: appDetalData?.marital_satus,
                label: appDetalData?.marital_satus,
              }
            : '',
        );
      }

      if (appDetalData?.issuing_country) {
        setValue(
          'issuing_country',
          appDetalData?.issuing_country
            ? {
                value: appDetalData?.issuing_country,
                label: appDetalData?.issuing_country,
              }
            : '',
        );
      }

      if (appDetalData?.first_pref_incentive && appDetalData?.first_pref_incentive.length > 0) {
        let temp = [];
        appDetalData.first_pref_incentive.map((x) => {
          temp.push({
            incentive_name: x.incentive_name,
            name: x.incentive,
            nationality: x.nationality,
            tution_fee_covered: parseInt(x.incentive_discount),
          });
        });
        setFirstIncent(temp);
      }
      if (appDetalData?.second_pref_incentive && appDetalData?.second_pref_incentive.length > 0) {
        let temp = [];
        appDetalData.second_pref_incentive.map((x) => {
          temp.push({
            incentive_name: x.incentive_name,
            name: x.incentive,
            nationality: x.nationality,
            tution_fee_covered: parseInt(x.incentive_discount),
          });
        });
        setSecondIncent(temp);
      }

      if (appDetalData?.third_pref_incentive && appDetalData?.third_pref_incentive.length > 0) {
        let temp = [];
        appDetalData.third_pref_incentive.map((x) => {
          temp.push({
            incentive_name: x.incentive_name,
            name: x.incentive,
            nationality: x.nationality,
            tution_fee_covered: parseInt(x.incentive_discount),
          });
        });
        setThirdIncent(temp);
      }

      if (appDetalData?.education && appDetalData?.education.length > 0) {
        setValue('education', appDetalData?.education);
      }

      if (appDetalData?.parent_info && appDetalData?.parent_info.length > 0) {
        setValue('parent_info', appDetalData?.parent_info);
      }

      if (appDetalData?.documents?.length > 0) {
        if (appDetalData?.documents.find((x) => x.item == 'Passport Photo with White Background')) {
          let doc = appDetalData?.documents.find((x) => x.item == 'Passport Photo with White Background');
          let imgres = await getImage(id, doc.item, doc.attached_document, true);
          setProfileImg(imgres);
          setValue(
            'attached_document_bg',
            doc?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(doc?.attached_document),
                      status: 'done',
                      url: doc?.attached_document,
                      s3: doc.item,
                      aid: id,
                      app: true,
                    },
                  ],
                }
              : '',
          );
        }
        if (appDetalData?.documents.find((x) => x.item == 'IC/Passport (Scanned)')) {
          let doc = appDetalData?.documents.find((x) => x.item == 'IC/Passport (Scanned)');
          setValue(
            'attached_document_scanned',
            doc?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(doc?.attached_document),
                      status: 'done',
                      url: doc?.attached_document,
                      s3: doc.item,
                      aid: id,
                      app: true,
                    },
                  ],
                }
              : '',
          );
        }
        if (appDetalData?.documents.find((x) => x.item == 'CV')) {
          let doc = appDetalData?.documents.find((x) => x.item == 'CV');
          setValue(
            'resume',
            doc?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(doc?.attached_document),
                      status: 'done',
                      url: doc?.attached_document,
                      s3: doc.item,
                      aid: id,
                      app: true,
                    },
                  ],
                }
              : '',
          );
        }
        if (appDetalData?.documents.find((x) => x.item == 'Portfolio')) {
          let doc = appDetalData?.documents.find((x) => x.item == 'Portfolio');
          setValue(
            'portfolio',
            doc?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(doc?.attached_document),
                      status: 'done',
                      url: doc?.attached_document,
                      s3: doc.item,
                      aid: id,
                      app: true,
                    },
                  ],
                }
              : '',
          );
        }

        if (appDetalData?.documents.find((x) => x.item == 'Proof of English Language Proficiency (IELTS/TOEFL)')) {
          let doc = appDetalData?.documents.find(
            (x) => x.item == 'Proof of English Language Proficiency (IELTS/TOEFL)',
          );
          setValue(
            'certificate',
            doc?.attached_document
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(doc?.attached_document),
                      status: 'done',
                      url: doc?.attached_document,
                      s3: doc.item,
                      aid: id,
                      app: true,
                    },
                  ],
                }
              : '',
          );
        }
      }
    }
  }, [appDetalData]);

  useEffect(() => {
    if (appDetalData && Object.keys(appDetalData).length > 0 && agentUsersList?.length > 0) {
      if (appDetalData?.source_application == 'Agent Portal' || appDetalData?.source_name == 'Agent') {
        const agent = sourcesData?.find((x) => x?.source_name == 'Agent');
        const agentUser = agentUsersList?.find((x) => x?.name == appDetalData?.agent_id);
        console.log('agentUser', agentUser, appDetalData?.agent_id);
        setAgentUser(true);
        setValue('application_source', {
          value: agent?.name,
          label: agent?.source_name,
        });

        setTimeout(() => {
          setValue('agent_user', {
            label: agentUser?.first_name + ' ' + (agentUser?.last_name ? agentUser?.last_name : ''),
            value: agentUser?.name,
          });
        }, 1000);
      }
    }
  }, [sourcesData, agentUsersList, appDetalData]);

  const onFinish = async (val) => {
    props.setLoading(true);

    let appName = id;
    let certificate = '';
    let educate = [];

    let noexempt = [];
    let exempt = [];
    let modtranscript = '';
    let documents = [];
    let parentinfo = [];

    if (val.parent_info && val.parent_info.length > 0) {
      val.parent_info.map((x) => {
        parentinfo.push({
          relation_type: x.relation_type.value,
          father_name: x.father_name,
          father_contact: x.father_contact,
          father_email: x.father_email,
        });
      });
    }

    if (val?.type?.value == 'Transfer Student' && val?.first_pref) {
      val.modules.map((x) => {
        if (x.selected[0]) {
          exempt.push({
            status: 'Active', // not required
            student_module_status: 'Active', // not required
            module_current_status: 'Regular',
            module: x.module,
            module_name: x.module_name,
            module_code: x.module_code, // not required
            semester_source_period: x.period, // not required
            semester_source_name: x.semester, // not required
            semester_source: x?.structure,
            term: val?.application_intake ? val?.application_intake.value : '', // not required
            period: x.fromsource ? x.fromsource.period : '', // not required
            structure_name: x.fromsource ? x.fromsource.label : '',
            overall_grade: x?.overall_grade,
            grade: x?.grade,
            earned_point: x?.earned_point,
            total_grade_point: x.total_grade_point,
            student_total_point: x.student_total_point,
            grading_system_description: x.grading_system_description,
          });
        } else {
          noexempt.push({
            status: 'Active', // not required
            student_module_status: 'Active', // not required
            module_current_status: 'Regular',
            module_code: x.module_code, // not required
            module_name: x.module_name,
            module: x.module,
            semester_source_period: x.period, // not required
            semester_source_name: x.semester, // not required
            semester_source: x.structure,
            term: val?.application_intake ? val?.application_intake.value : '', // not required
            period: x.fromsource ? x.fromsource.period : '',
            semester: x.fromsource ? x.fromsource.label : '',
          });
        }
      });
    }

    if (val?.application_module_exemption_proof) {
      let file = await uploadFile(val.application_module_exemption_proof, 'Academic Transcript');
      documents.push(file);
      modtranscript = file.attached_document;
    }

    // Passport Photo with White Background
    if (val.attached_document_bg) {
      let file = await uploadFile(val.attached_document_bg, 'Passport Photo with White Background');
      documents.push(file);
    }
    // IC/Passport (Scanned)
    if (val.attached_document_scanned) {
      let file = await uploadFile(val.attached_document_scanned, 'IC/Passport (Scanned)');
      documents.push(file);
    }
    // CV
    if (val.resume) {
      let file = await uploadFile(val.resume, 'CV');
      documents.push(file);
    }
    // Portfolio
    if (val.portfolio) {
      let file = await uploadFile(val.portfolio, 'Portfolio');
      documents.push(file);
    }
    // Certificate
    if (val.certificate) {
      let file = await uploadFile(
        val.certificate,
        'Proof of English Language Proficiency (IELTS/TOEFL)',
        'Proof of English Language Proficiency IELTS TOEFL',
      );
      documents.push(file);
      certificate = file.attached_document;
    }

    if (val.education && val.education.length > 0) {
      await Promise.all(
        val.education.map(async (x) => {
          let certificateUrl = '';
          let transcriptUrl = '';
          if (x?.academic_certificate) {
            let file = await uploadFile(x?.academic_certificate, 'Academic Certificate');
            documents.push(file);
            certificateUrl = file.attached_document;
          }
          if (x.academic_transcript) {
            let file = await uploadFile(x?.academic_transcript, 'Academic Transcript');
            documents.push(file);
            transcriptUrl = file.attached_document;
          }

          if (x.education_name || x.country || certificateUrl || transcriptUrl) {
            educate.push({
              education_name: x.education_name ? x.education_name?.value : '',
              country: x.country ? x.country?.value : '',
              academic_certificate: certificateUrl ? certificateUrl : '',
              academic_transcript: transcriptUrl ? transcriptUrl : '',
            });
          }
        }),
      );
    }

    let firstI = [];
    let secondI = [];
    let thirdI = [];

    firstIncent.length > 0 &&
      firstIncent.map((x) => {
        firstI.push({ incentive: x.name });
      });
    secondIncent.length > 0 &&
      secondIncent.map((x) => {
        secondI.push({ incentive: x.name });
      });
    thirdIncent.length > 0 &&
      thirdIncent.map((x) => {
        thirdI.push({ incentive: x.name });
      });

    const payLoad = {
      doc_status: 'Approved',
      workflow_state: 'Eligibility assessment',
      type: val?.type?.value,
      first_pref_incentive: firstI,
      second_pref_incentive: secondI,
      third_pref_incentive: thirdI,
      applicant_name: val?.applicant_name.trim(),
      application_source: val?.application_source.value,
      source_name: val?.application_source.label,
      icpassport: val?.icpassport,
      contact_no: val?.contact_no,
      email: val?.email,
      owner: val?.agent_user ? val?.agent_user?.value : '',
      agent_id: val?.agent_user ? val?.agent_user?.value : '',
      date_of_birth: val?.date_of_birth ? moment(val?.date_of_birth).format('YYYY-MM-DD') : '',
      passport_expiry: val?.passport_expiry ? moment(val?.passport_expiry).format('YYYY-MM-DD') : '',
      issuing_country: val?.issuing_country ? val?.issuing_country.value : '',
      // emergency_contact_name: val?.emergency_contact_name,
      // emergency_contact_email: val?.emergency_contact_email,
      // emergency_contact_number: val?.emergency_contact_number,
      parent_info: parentinfo,
      english_language_qualification: val?.english_language_qualification
        ? val?.english_language_qualification?.value
        : '',
      score: val?.score,
      certificate: certificate ? certificate : '',
      race: val?.race ? val?.race?.value : '',
      marital_satus: val?.marital_satus ? val?.marital_satus?.value : '',
      gender: val?.gender ? val?.gender?.value : '',
      religion: '',
      age_joined: '',
      nationality: val?.nationality ? val?.nationality?.value : '',
      place_of_birth: val?.place_of_birth,
      first_pref: val?.first_pref ? val?.first_pref?.value : '',
      second_pref: val?.second_pref ? val?.second_pref?.value : '',
      third_pref: val?.third_pref ? val?.third_pref?.value : '',
      application_intake: val?.application_intake ? val?.application_intake.value : '',

      current_studentid: val?.current_studentid,
      enrolled_semester: val?.enrolled_semester ? val?.enrolled_semester.label : '',
      application_semesters_modules: noexempt,
      application_module_exemption: exempt,
      application_module_exemption_proof: modtranscript,

      documents: documents,

      address: [
        {
          current_address: 1,
          current_address_1: val?.current_address,
          permanent_state: val?.current_state,
          current_post_code: val?.current_post_code,
          current_country: val?.current_country ? val?.current_country?.value : '',
          current_city: val?.current_city,
        },
        {
          permanent_address: 1,
          current_address_1: val?.permanent_address,
          permanent_state: val?.permanent_state,
          current_post_code: val?.permanent_post_code,
          current_country: val?.permanent_country ? val?.permanent_country?.value : '',
          current_city: val?.permanent_city,
        },
      ],
      counsellor: val?.counsellor ? val?.counsellor?.value : '',
      education: educate,
    };

    console.log('checking', payLoad);

    addStudentApp(payLoad, appName)
      .then((resp2) => {
        message.success('Application Successfully Updated');
        props.setLoading(false);
        setTimeout(() => history.push('/marketing/applications'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const onNotify = (name) => {
    props.setLoading(true);
    notifyManagerEligibility(name)
      .then((res) => {
        props.setLoading(false);
        setVisible(true);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const onEligibile = (status, remarks) => {
    props.setLoading(true);
    let payload = {};

    if (status == 'Rejected') {
      payload = {
        eligibility_status: status,
        workflow_state: 'Eligibility assessment',
        status: 'Archive',
        application_eligibility_status: [
          {
            eligible_status: 'Not Eligible',
            remarks: 'Applicant Not Eligibile',
          },
        ],
      };
    } else {
      payload = {
        eligibility: 1,
        eligibility_status: status,

        // application_eligibility_status: [
        //   {
        //     eligible_status: 'Eligible',
        //     remarks: remarks,
        //   },
        // ],
        // workflow_state: 'Incomplete registration visa',
      };
      payload['accomodation'] = 1;
      payload['arrived'] = 1;
      payload['arrival_form'] = 1;
      if (appDetalData.nationality == 'Malaysia') {
        payload['visa_acceptance'] = 1;
        payload['visa_fee'] = 1;
        payload['visa_approval'] = 1;
        payload['visa_collection'] = 1;
        payload['visa_delivery_to_university'] = 1;
        payload['medical_checkup'] = 1;
      }
    }
    addStudentApp(payload, id)
      .then((x) => {
        eligibilityLetter(id)
          .then((rest) => {
            props.setLoading(false);
            message.success('Application is Eligible');
            setTimeout(() => history.push('/eligibility/overview'), 1000);
          })
          .catch((e) => {
            const { response } = e;
            props.setLoading(false);
            console.log('error', response);
            message.error('Something went wrong while generating letter');
          });
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const enrolledNow = () => {
    props.setLoading(true);
    addStudentApp({ module_registration: 1 }, id)
      .then((x) => {
        message.success('Student Enrolled Successfully');
        setTimeout(() => history.push('/marketing/students'), 1000);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const onOfferLetter = () => {
    props.setLoading(true);
    offerLetterRelease(id)
      .then((x) => {
        generateOfferLetter(id)
          .then((xd) => {
            addStudentApp(
              {
                offer_letter_release: 1,
                registration_status: 'Approved',
                // workflow_state: 'Pending accomodation',
              },
              id,
            );

            props.setLoading(false);
            PopupSuccess(popupOffer);
            setTimeout(() => history.push('/registry/pending-offerletter'), 1000);
          })
          .catch((e) => {
            console.log('Something Went Wrong');
            message.error('Something Went Wrong');
          });
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  const props1 = {
    title: 'Incomplete Documents',
    appStage: '1',
    stage: 0,
    type: 'app',
    noTitle: false,
    component: (
      <Text className="card-text">Please complete the application form below to proceed to the next stage.</Text>
    ),
  };
  const props2 = {
    title: 'Eligibility Assessments',
    appStage: '2',
    stage: 1,
    type: 'app',
    noTitle: false,
    component:
      url.split('/')[1] == 'eligibility' ? (
        <EligibilityComp onAction={onEligibile} apiData={appDetalData} />
      ) : (
        <>
          {appDetalData.workflow_state == 'Eligibility assessment' && (
            <AssessmentCard
              status="pending"
              data={stepDetailData}
              btnTitle="Notify Department"
              title=""
              title2={'Applicant Academic Assessment'}
              title3={"Eligibility department is currently assessing the applicant's eligibility"}
              action={() => onNotify(appDetalData.name)}
              action2={() => onNotify(appDetalData.name)}
            />
          )}
        </>
      ),
  };
  const props3 = {
    title: 'Pending Registration & Visa',
    appStage: '3',
    stage: 2,
    type: 'app',
    noTitle: false,
    component:
      url.split('/')[1] == 'registry' ? (
        <PendingRegistrationsVisaDetails date={appDetalData.modified} onAction={onOfferLetter} />
      ) : url.split('/')[1] == 'visa' ? (
        <PendingVisaDetails data={stepDetailData} title="Pending Visa Upload" cards={visacards} />
      ) : (
        <CardStepAccordian data={stepDetailData} page={true} setLoading={props?.setLoading} apiData={appDetalData} />
      ),
  };
  const props4 = {
    title: 'Pending Accommodations',
    appStage: '4',
    stage: 3,
    type: 'app',
    noTitle: false,
    component: (
      <Row gutter={[20, 20]} justify="end">
        <Col span={24}>
          <CardStepAccordian data={stepDetailData} page={true} setLoading={props?.setLoading} apiData={appDetalData} />
        </Col>
      </Row>
    ),
  };
  const props5 = {
    title: 'Pending Enrolment',
    appStage: '5',
    stage: 4,
    type: 'app',
    noTitle: false,
    component:
      url.split('/')[1] == 'registry' ? (
        <PendingEnrollmentDetails date={appDetalData.modified} data={appDetalData} onAction={enrolledNow} />
      ) : url.split('/')[1] == 'visa' ? (
        // <PendingVisaDetails data={stepDetailData} title="Visa" cards={visacards2} />
        <CardStepAccordian data={visacards2} page={true} setLoading={props?.setLoading} apiData={appDetalData} />
      ) : (
        <CardStepAccordian data={stepDetailData} page={true} setLoading={props?.setLoading} apiData={appDetalData} />
      ),
  };
  const props6 = {
    title: 'Approved',
    appStage: 'Approved',
    stage: 5,
    type: 'app',
    noTitle: false,
    component: (
      <Text className="card-text" style={{ backgroundColor: '#02a574', color: '#fff' }}>
        Application is Approved
      </Text>
    ),
  };

  const checkCase = () => {
    let chkname = name == 'lead-applications' || mainurl == 'visa' ? appDetalData?.workflow_state : name;
    switch (chkname) {
      case 'incomplete-documents':
        return props1;
      case 'Incomplete document':
        return props1;
      case 'eligibility-assessments':
        return props2;
      case 'Eligibility assessment':
        return props2;
      case 'pending-registration-visa':
        return props3;
      case 'Incomplete registration visa':
        return props3;
      case 'pending-accommodations':
        return props4;
      case 'Pending accomodation':
        return props4;
      case 'pending-enrolment':
        return props5;
      case 'Pending enrollment':
        return props5;
      case 'approved':
        return props6;
    }
  };

  const onError = (errors, e) => {
    if (Object.keys(errors).length > 0) {
      message.error('There are some Validation Errors');
    }
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
        <Breadcrumb.Item href={`/marketing/applications/${name}`} className="SentanceCase">
          {name.replace('-', ' ')}
        </Breadcrumb.Item>
        <Breadcrumb.Item>Application Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Application Details" />
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
                    <ApplicationStatus {...checkCase()} menu={url.split('/')[1] == 'marketing' ? menu : null} />
                  </Col>
                  <Col span={24}>
                    <Card bordered={false} className="uni-card transparent-card">
                      <Row gutter={[20, 20]}>
                        <Col span={24}>
                          <Card bordered={false} className="uni-card">
                            <Form
                              onFinish={handleSubmit(onFinish, onError)}
                              layout="vertical"
                              scrollToFirstError={true}
                            >
                              <ApplicationForm
                                mode={
                                  name == 'incomplete-documents' ||
                                  (name == 'eligibility-assessments' && mainurl == 'marketing')
                                    ? 'edit'
                                    : 'view'
                                }
                                control={control}
                                errors={errors}
                                setValue={setValue}
                                getValues={getValues}
                                setError={setError}
                                clearErrors={clearErrors}
                                setAgentUser={setAgentUser}
                                agentUser={agentUser}
                                watch={watch}
                                widthCol="1 0 300px"
                                stage={name}
                                data={appDetalData}
                                incentArray={{
                                  firstIncent: firstIncent,
                                  setFirstIncent: setFirstIncent,
                                  secondIncent: secondIncent,
                                  setSecondIncent: setSecondIncent,
                                  thirdIncent: thirdIncent,
                                  setThirdIncent: setThirdIncent,
                                }}
                              />
                            </Form>
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
                          <UpdateSection
                            data={commentsApi}
                            code={id}
                            module={'Application'}
                            updateComment={updateComment}
                            messageOn={true}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
      <Popup {...docPopup} />
    </>
  );
};
