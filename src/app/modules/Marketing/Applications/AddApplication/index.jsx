import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Form, message, Card } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useHistory, useLocation } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import {
  getCountryDrop,
  getNationalityDrop,
  getApplicationTypeDrop,
  getGenderDrop,
  getEnglishQualificationDrop,
  getProgNameDrop,
  getCouncelor,
  getSources,
} from '../ducks/actions';
import { useDispatch } from 'react-redux';
import { addStudentApp } from '../ducks/services';
import { getFileName, uploadFile } from '../../../../../features/utility';
import { getMarital, getRace } from '../../../Application/ducks/actions';
import moment from 'moment';
import { getCurrentYearIntakes } from '../../../AQA/Incentives/ducks/actions';
import { allowed } from '../../../../../routing/config/utils';
import AllRoles from '../../../../../routing/config/AllRoles';
import { useSelector } from 'react-redux';

const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const appDetalData = location?.state?.apiData;
  const [load, setLoad] = useState(false);
  const [firstIncent, setFirstIncent] = useState([]);
  const [secondIncent, setSecondIncent] = useState([]);
  const [thirdIncent, setThirdIncent] = useState([]);
  const [agentUser, setAgentUser] = useState(false);
  const { control, errors, setValue, getValues, handleSubmit, clearErrors, setError, watch } = useForm();
  const userId = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const userName = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].full_name;
  const intakeList = useSelector((state) => state.incentives.intakeList);

  useEffect(() => {
    dispatch(getCountryDrop());
    dispatch(getNationalityDrop());
    dispatch(getRace());
    dispatch(getApplicationTypeDrop());
    dispatch(getGenderDrop());
    dispatch(getEnglishQualificationDrop());
    dispatch(getProgNameDrop());
    dispatch(getCouncelor());
    dispatch(getMarital());
    dispatch(getSources());
    dispatch(getCurrentYearIntakes());
    if (!allowed([AllRoles.MARKETING.MANAGER], 'read')) {
      setValue('counsellor', { label: userName, value: userId });
    }
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
      setValue('permanent_address', appDetalData?.address[1]?.current_address_1);
      setValue('permanent_city', appDetalData?.address[1]?.current_city);
      setValue('permanent_post_code', appDetalData?.address[1]?.current_post_code);
      setValue('permanent_state', appDetalData?.address[1]?.permanent_state);
      if (appDetalData?.date_of_birth) {
        setValue('date_of_birth', moment(appDetalData?.date_of_birth, 'YYYY-MM-DD'));
      }
      if (appDetalData?.passport_expiry) {
        setValue('passport_expiry', moment(appDetalData?.passport_expiry, 'YYYY-MM-DD'));
      }

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
                        aid: appDetalData?.name,
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
          value: userId,
          label: userName,
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

      if (appDetalData?.documents?.length > 0) {
        if (appDetalData?.documents.find((x) => x.item == 'Passport Photo with White Background')) {
          let doc = appDetalData?.documents.find((x) => x.item == 'Passport Photo with White Background');
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
                      aid: '',
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
                      aid: '',
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
                      aid: '',
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
                      aid: '',
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

      if (appDetalData?.education && appDetalData?.education.length > 0) {
        setValue('education', appDetalData?.education);
      }
      if (appDetalData?.parent_info && appDetalData?.parent_info.length > 0) {
        setValue('parent_info', appDetalData?.parent_info);
      }
    }
  }, [appDetalData]);

  const onFinish = async (val) => {
    setLoad(true);
    const firstPay = {
      type: val?.type?.value,
      applicant_name: val?.applicant_name,
      icpassport: val?.icpassport,
      contact_no: val?.contact_no,
      email: val?.email,
    };
    let noexempt = [];
    let exempt = [];
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

    addStudentApp(firstPay)
      .then(async (resp) => {
        let appName = resp['data']?.data.name;
        let certificate = '';
        let documents = [];
        let educate = [];
        let modtranscript = '';

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
          let file = await uploadFile(val.certificate, 'Proof of English Language Proficiency (IELTS/TOEFL)');
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
          status: 'Active',
          workflow_state: 'Incomplete document',
          type: val?.type?.value,
          first_pref_incentive: firstI,
          second_pref_incentive: secondI,
          third_pref_incentive: thirdI,
          applicant_name: val?.applicant_name.trim(),
          application_source: val?.application_source.value,
          source_name: val?.application_source ? val?.application_source.label : '',
          owner: val?.agent_user ? val?.agent_user?.value : '',
          agent_id: val?.agent_user ? val?.agent_user?.value : '',
          icpassport: val?.icpassport,
          contact_no: val?.contact_no,
          email: val?.email,
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
          remarks: '',
          find_us: 'Social network',
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

          education: educate,
          counsellor: val?.counsellor?.value ? val?.counsellor?.value : '',
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
        };

        addStudentApp(payLoad, appName)
          .then((resp2) => {
            message.success('Application Successfully Created');
            setLoad(false);
            setTimeout(() => history.push('/marketing/applications'), 1000);
          })
          .catch((e) => {
            const { response } = e;
            setLoad(false);
            console.log('error', response);
            message.error('Something went wrong');
          });
      })
      .catch((e) => {
        const { response } = e;
        setLoad(false);
        console.log('error', response);
        message.error('There is some error in the Api');
      });
  };

  const onError = (errors, e) => {
    if (Object.keys(errors).length > 0) {
      message.error('There are some Validation Errors');
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onFinish, onError)} scrollToFirstError>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Add New Application" />
        </Col>
        <Col span={24}>
          <Spin indicator={antIcon} size="large" spinning={load}>
            <Card bordered={false} className="uni-card">
              <ApplicationForm
                mode="add"
                setLoad={setLoad}
                control={control}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                setAgentUser={setAgentUser}
                agentUser={agentUser}
                widthCol="1 0 400px"
                clearErrors={clearErrors}
                setError={setError}
                watch={watch}
                incentArray={{
                  firstIncent: firstIncent,
                  setFirstIncent: setFirstIncent,
                  secondIncent: secondIncent,
                  setSecondIncent: setSecondIncent,
                  thirdIncent: thirdIncent,
                  setThirdIncent: setThirdIncent,
                }}
              />
            </Card>
          </Spin>
        </Col>
      </Row>
    </Form>
  );
};
