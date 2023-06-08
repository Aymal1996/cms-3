import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Space,
  message,
  Breadcrumb,
} from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import UpdateSection from '../../../../molecules/UpdateSection';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import AddForm from '../components/AddForm';
import { useDispatch, useSelector } from 'react-redux';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import ActivationCard from '../../../../atoms/ActivationCard';
import DeletePopup from '../../../../molecules/DeletePopup';
import { Popup } from '../../../../atoms/Popup';
import moment from 'moment';
import { getSingleProgram, getProgramVersion, emptyProgram } from '../ducks/actions';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import { checkExpiry } from '../../utils/dateCalc';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { BreakingPoint } from '../../../../../configs/constantData';
import Documents from '../../../../molecules/Documents';
import Versioning from '../components/Versioning';

const { Title, Text } = Typography;

export default (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [documents, setDocuments] = useState([]);
  const { control, errors, setValue, getValues, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState('Draft');
  const [accreditation, setAccreditation] = useState(null);
  const [license, setLicense] = useState(null);
  const [summary, setSummary] = useState(null);
  const [visible, setVisible] = useState(false);
  const [delSub, setDelSub] = useState([]);
  const [delSem, setDelSem] = useState([]);
  const { id } = useParams();
  const programApi = useSelector((state) => state.programme.program);
  const versionApi = useSelector((state) => state.programme.version);
  const commentsApi = useSelector((state) => state.global.comments);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const i18n = useTranslate();
  const { t } = i18n;

  const sideData = [
    {
      type: 'code',
      text: programApi?.licenses?.faculty_code,
      subtitle: programApi?.licenses?.faculty_name,
      level2: isHDScreen ? 4 : 5,
      highlight: true
    },
    {
      type: 'mainTitle',
      title: programApi?.licenses?.program_name,
      subtitle: programApi?.licenses?.program_code,
      level: isHDScreen ? 4 : 5,
      highlight: true
    },
    {
      type: 'single',
      title: programApi?.licenses?.program_version,
      level: isHDScreen ? 4 : 5,
      highlight: true,
      noLine: true
    },
    {
      type: 'titleValue',
      title: 'Credits',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: `${
        programApi?.left_card_data && programApi?.left_card_data?.total_credits
          ? programApi?.left_card_data?.total_credits + ' Credits'
          : ''
      }`,
    },
    {
      type: 'titleValue',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      title: 'Semester Fee',
      value: programApi?.left_card_data && programApi?.left_card_data?.total_semester_fees,
    },
    {
      type: 'titleValue',
      title: 'Resource Fee',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: programApi?.left_card_data && programApi?.left_card_data?.total_resource_fees,
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      title: 'Delete Programme',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getProgramVersion(id))
      dispatch(getSingleProgram(id));
      dispatch(getComments('Program Licensing', `PL-${id}`));
    } else {
      history.push('/aqa/programme');
    }
    return () => {
      dispatch(emptyProgram());
      dispatch(emptyComments());
    };
  }, [id]);

  useEffect(() => {
    if (Object.keys(programApi).length > 0) {
      let dataPop = programApi.licenses;
      if (dataPop?.kpt_application_date) {
        setValue('kpt_application_date', moment(dataPop?.kpt_application_date, 'YYYY-MM-DD'));
      }
      if (dataPop?.kpt_approval_date) {
        setValue('kpt_approval_date', moment(dataPop?.kpt_approval_date, 'YYYY-MM-DD'));
      }
      if (dataPop?.kpt_expiry_date) {
        setValue('kpt_expiry_date', moment(dataPop?.kpt_expiry_date, 'YYYY-MM-DD'));
        setLicense(checkExpiry(dataPop?.kpt_expiry_date));
      }
      setValue('kpt_approval_code', dataPop?.kpt_approval_code);
      setValue('kpt_letter', programApi?.documents[0]?.document_type);
      setValue('program_code', dataPop?.program_code);
      setValue('program_name', dataPop?.program_name);
      if (dataPop?.faculty_name) {
        setValue('faculty', { label: dataPop?.faculty_name, value: dataPop?.faculty });
      }
      if (dataPop?.effective_date) {
        setValue('effective_date', moment(dataPop?.effective_date, 'YYYY-MM-DD'));
      }
      if (dataPop?.ineffective_date) {
        setValue('ineffective_date', moment(dataPop?.ineffective_date, 'YYYY-MM-DD'));
        setSummary(checkExpiry(dataPop?.ineffective_date));
      }
      if (dataPop?.study_duration) {
        setValue('study_duration', { label: dataPop?.study_duration, value: dataPop?.study_duration });
      }
      if (dataPop?.study_level) {
        setValue('study_level', { label: dataPop?.study_level, value: dataPop?.study_level });
      }
      setValue('course_synopsis', dataPop?.course_synopsis);
      if (dataPop?.mqa_status) {
        setValue('mqa_status', {
          value: dataPop?.mqa_status,
          label: dataPop?.mqa_status,
        });
      }
      if (dataPop?.mqa_validity_start_date) {
        setValue('mqa_validity_start_date', moment(dataPop?.mqa_validity_start_date, 'YYYY-MM-DD'));
      }

      setValue('mqa_serial_no', dataPop?.mqa_serial_no);
      setValue('mqa_reference_no', dataPop?.mqa_reference_no);
      setValue('mqa_accreditation', dataPop?.mqa_accreditation);
      if (dataPop?.mqa_application_date) {
        setValue('mqa_application_date', moment(dataPop?.mqa_application_date, 'YYYY-MM-DD'));
      }
      if (dataPop?.mqa_expiry_date) {
        setValue('mqa_expiry_date', moment(dataPop?.mqa_expiry_date, 'YYYY-MM-DD'));
        setAccreditation(checkExpiry(dataPop?.mqa_expiry_date));
      }
      setValue('institution_name', { label: dataPop?.institution_name, value: dataPop?.institution_name });
      setStatus(dataPop?.status);
      setValue('program_requirements', programApi?.requirements);
      setValue('semester_structure', programApi?.semesters_data);
      let temp = [];
        programApi?.documents.map((item, index) => {
            temp.push({ url : item.document });
        });
        setDocuments(temp);
    }
  }, [programApi]);

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <DeletePopup title="Programme" onClose={() => setVisible(false)} onDelete={() => onDelete()} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onStatusChange = (e) => {
    if (e == true) {
      setStatus('Active');
    } else {
      if (programApi?.status == 'Draft') {
        setStatus('Draft');
      } else if (programApi?.status == 'Archive') {
        setStatus('Archive');
      } else {
        setStatus('Inactive');
      }
    }
  };

  const postApi = async (body) => {
    let url = `${apiMethod}/marketing.new_marketing_api.update_program_license_structure`;
    try {
      await axios.post(url, body);
      message.success('Programme Successfully Updated');
      props.setLoading(false); 
      setTimeout(() => history.push('/aqa/programme'), 1000);
    } catch (e) {
      const { response } = e;
      message.error('Something went wrong');
      props.setLoading(false); 
    }
  };

  const onDraft = () => {
    let val = getValues();
    if(val.program_name && val.program_code && val.faculty) {
      onFinish(val);
    } else {
      message.error('Please Enter Code, Programme Name and Faculty')
    }
  }

  const onFinish = async (val) => {
    props.setLoading(true); 
    let programs = [];
    let semester = [];
    let allFeeModule = 0;
    let allCredits = 0;
    let allresourceFee = 0;
    let doc = [];
    if (val.kpt_document) {
      let modifiedName = uniquiFileName(val.kpt_document?.file?.originFileObj.name);
      let res = await getSingleUpload(
        modifiedName,
        'image',
        val.kpt_document?.file?.originFileObj,
        'Program Licensing',
        val.program_code,
      );
      doc.push({
        document_type: val.kpt_letter || 'KPT Letter',
        document: res?.file_url,
      });
    }
    val.program_requirements?.map((x) => {
      programs.push({
        qualification: x.qualification.label,
        cgpa: x.cgpa.label,
        credit_value: x.credit_value,
      });
    });

    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    val.semester_structure?.map((e, index) => {
      let subject = [];
      let totalFees = 0;
      let totalCredits = 0;
      let randomCode = '';
      for (var i = 0; i < 5; i++) randomCode += possible.charAt(Math.floor(Math.random() * possible.length));

      e?.semester?.map((y) => {
        totalFees = totalFees + parseFloat(y.module_fees);
        totalCredits = totalCredits + parseFloat(y.credit);
        let preq = [];
        y.module_prerequisites && y.module_prerequisites.length > 0 && y.module_prerequisites.map(z => {
            preq.push({
                module: z.value,
            })
        })
        subject.push({
          name: y.name,
          type: y.type,
          credit: y.credit,
          module_fees: y.module_fees,
          module_prerequisites: preq
        });
      });
      allFeeModule = allFeeModule + totalFees;
      allCredits = allCredits + totalCredits;
      allresourceFee = allresourceFee + parseFloat(e.resource_fees);

      let deletedSubject = []
      let b = delSub.filter(x => x.sem == e.structure_code);
      if (b) {
        b.map(x => deletedSubject.push({name: x.name}))
      }
      semester.push({
        structure_code: e.structure_code ? e.structure_code : `SL-${Math.floor(10000 + Math.random() * 90000)}`,
        program: id,
        structure_name: e.structure_name,
        period: e.period.label,

        resource_fees: e.resource_fees,
        currency: e.currency.label,
        credits: totalCredits,
        module_fees: totalFees,
        delete_subject: deletedSubject,
        // company: "Limkokwing University Creative Technology",
        // branch: "Limkokwing University",
        // campus: "005- LUCIT Main Campus",
        semester_subject: subject,
      });

    });

    let payLoad = {
      summary: {
        program: id,
        program_code: val.program_code,
        program_name: val.program_name,
        effective_date: val.effective_date ? moment(val.effective_date).format('YYYY-MM-DD') : '',
        ineffective_date: val.ineffective_date ? moment(val.ineffective_date).format('YYYY-MM-DD') : '',
        faculty_code: val.faculty.value,
        study_duration: val.study_duration.label,
        program_level: val.study_level.label,
        course_synopsis: val.course_synopsis,
        status: status,
      },

      licensing: {
        license_code: programApi?.licenses?.name, // necessary
        program: id,
        institution_name: val.institution_name.label,
        status: status,
        program_code: val.program_code,
        effective_date: val.effective_date ? moment(val.effective_date).format('YYYY-MM-DD') : '',
        ineffective_date: val.ineffective_date ? moment(val.ineffective_date).format('YYYY-MM-DD') : '',
        faculty: val.faculty.value,
        study_duration: val.study_duration.label,
        study_level: val.study_level.label,
        // "program_structure_fee": 0.0,
        // "program_registration_fee": 0.0,

        // "kpt_approval": "Approve",
        kpt_approval_code: val.kpt_approval_code,
        kpt_approval_date: val.kpt_approval_date ? moment(val.kpt_approval_date).format('YYYY-MM-DD') : '',
        kpt_expiry_date: val.kpt_expiry_date ? moment(val.kpt_expiry_date).format('YYYY-MM-DD') : '',
        kpt_application_date: val.kpt_application_date ? moment(val.kpt_application_date).format('YYYY-MM-DD') : '',
        licensing_documents: doc,

        mqa_status: val.mqa_status.label,
        mqa_validity_start_date: val.mqa_validity_start_date
          ? moment(val.mqa_validity_start_date).format('YYYY-MM-DD')
          : '',
        mqa_reference_no: val.mqa_reference_no,
        mqa_serial_no: val.mqa_serial_no,
        mqa_accreditation: val.mqa_accreditation,
        mqa_expiry_date: val.mqa_expiry_date ? moment(val.mqa_expiry_date).format('YYYY-MM-DD') : '',
        mqa_application_date: val.mqa_application_date ? moment(val.mqa_application_date).format('YYYY-MM-DD') : '',

        // "mqa_approval": "Approve",
        // "mqa_accreditation_expiry": "2021-06-30",
        // "mqa_full_accreditation_approval": "Approve",
        // "mqa_final_approval": "Approve",
        // "qa_approval": "Approve",

        program_requirements: programs,
      },
      semester: semester,
      delete_semester: delSem,
    };
    console.log('check', payLoad);
    postApi(payLoad);
  };

  const onDelete = async () => {
    props.setLoading(true); 
    let url = `${apiMethod}/aqa.api.delete_add_program?program_code=${id}`;
    try {
      await axios.post(url);
      message.success('Programme Successfully Deleted');
      setVisible(false);
      props.setLoading(false); 
      setTimeout(() => history.push('/aqa/programme'), 1000);
    } catch (e) {
      const { response } = e;
      props.setLoading(false); 
      message.error('Something went wrong');
    }
  };

  const updateComment = () => {
    dispatch(getComments('Program Licensing', `PL-${id}`));
  };

  const updateApi = (id) => {
    
  }

  const updateVer = () => {
    dispatch(getProgramVersion(id));
    dispatch(getSingleProgram(id));
  }

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/aqa/programme">Programmes</Breadcrumb.Item>
        <Breadcrumb.Item>Programme Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Programme Details'} />
        </Col>
        <Col span={24}>
        <div className='twocol-3070'>
          <div className='side-detail'>
              {isHDScreen ?
              <SideDetails data={sideData} type="button" bottom={bottomList} />
              :
              <SideDetailResponsive data={sideData} type='button' bottom={bottomList} />
              }
          </div>
          <div className='side-form'>
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <ActivationCard
                        t={t}
                        title={programApi?.licenses?.status}
                        status={status}
                        onChange={onStatusChange}
                      />
                    </Col>
                    {(license != null || summary != null || accreditation != null) && (
                      <Col span={24}>
                        <Card bordered={false} className="uni-card">
                          <Title level={4}>Programme Status</Title>
                          <Row gutter={20} justify="space-between">
                            {license != null && license < 16 && (
                              <Col flex="1 0 150px">
                                <Card
                                  bordered={false}
                                  className={`uni-card ${license != 0 ? 'pending-card' : 'red-card'}`}
                                >
                                  <Space size={8} direction="vertical">
                                    <Text className="op-6 lineHeight20">License</Text>
                                    <Title level={4} className="lineHeight20 mb-0">
                                      {license != 0 ? `${license} Day(s) Left` : 'Expired'}
                                    </Title>
                                  </Space>
                                </Card>
                              </Col>
                            )}
                            {summary != null && summary < 1 && (
                              <Col flex="1 0 150px">
                                <Card bordered={false} className="uni-card inactive-card">
                                  <Space size={8} direction="vertical">
                                    <Text className="op-6 lineHeight20">Summary</Text>
                                    <Title level={4} className="lineHeight20 mb-0">
                                      Programme Inactive
                                    </Title>
                                  </Space>
                                </Card>
                              </Col>
                            )}
                            {accreditation != null && accreditation < 16 && (
                              <Col flex="1 0 150px">
                                <Card
                                  bordered={false}
                                  className={`uni-card ${accreditation != 0 ? 'pending-card' : 'red-card'}`}
                                >
                                  <Space size={8} direction="vertical">
                                    <Text className="op-6 lineHeight20">Accreditation</Text>
                                    <Title level={4} className="lineHeight20 mb-0">
                                      {accreditation != 0 ? `${accreditation} Day(s) Left` : 'Expired'}
                                    </Title>
                                  </Space>
                                </Card>
                              </Col>
                            )}
                          </Row>
                        </Card>
                      </Col>
                    )}
                    <Col span={24}>
                      <Versioning data={versionApi} code={id} setLoading={props.setLoading} updateVer={updateVer} updateApi={updateApi} />
                    </Col>
                    <Col span={24}>
                    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
                      <AddForm
                        control={control}
                        errors={errors}
                        delSem={delSem}
                        setDelSem={setDelSem}
                        getValues={getValues}
                        stat={status}
                        heading={'Program Details'}
                        setValue={setValue}
                        delSub={delSub}
                        setDelSub={setDelSub}
                        onDraft={onDraft}
                        mode="edit"
                        t={t}
                      />
                      </Form>
                    </Col>
                    <Col span={24}>
                      <Documents id={id} docs={documents} />
                    </Col>
                  </Row>
                
              </Col>
              <Col span={24}>
                <UpdateSection
                  data={commentsApi}
                  code={programApi?.licenses?.name}
                  module={'Program Licensing'}
                  updateComment={updateComment}
                />
              </Col>
            </Row>
          </Card>
          </div>
          </div>
        </Col>
      </Row>

      <Popup {...popup} />
    </>
  );
};
