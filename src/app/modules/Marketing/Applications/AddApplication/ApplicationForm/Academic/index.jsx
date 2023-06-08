import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Space, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';
import { useFieldArray } from 'react-hook-form';
import ArrayForm from '../ArrayForm';
import { onBeforeUploadFile } from '../../../../../../../features/utility';
import { getProgramIncentive } from '../../../../../AQA/Incentives/ducks/services';
import { programIncentive } from '../../../ducks/services';
import { SelectField } from '../../../../../../atoms/FormElement';
import Incentives from './Incentives';
import { emptyMod, getAllModulesProgram, getAgentUser } from '../../../ducks/actions';
import { getProgramSemesters, emptySem } from '../../../../../Application/ducks/actions';

const _ = require('lodash');
const { Title, Text } = Typography;

const initEd = {
  academic_qualification: '',
  country_education: '',
  transcript: '',
  certificate: '',
};

const mType = [
  {
    label: 'Regular',
    vlaue: 'Regular',
  },
  {
    label: 'Retake',
    vlaue: 'Retake',
  },
];

export default (props) => {
  const {
    control,
    errors,
    getValues,
    setValue,
    mode,
    widthCol,
    incentArray,
    data,
    setError,
    setAgentUser,
    agentUser,
    clearErrors,
    watch,
  } = props;
  const { firstIncent, setFirstIncent, secondIncent, setSecondIncent, thirdIncent, setThirdIncent } = incentArray;
  const [programList, setProgramList] = useState([]);
  const dispatch = useDispatch();
  const [iProgram1, setIProgram1] = useState({ amount: 0, incentives: [] });
  const [iProgram2, setIProgram2] = useState({ amount: 0, incentives: [] });
  const [iProgram3, setIProgram3] = useState({ amount: 0, incentives: [] });
  const [trans, setTrans] = useState(false);
  const countryDropData = useSelector((state) => state.applicationForm.countryData);
  const engDropData = useSelector((state) => state.applicationForm.engQualificationData);
  const sourcesData = useSelector((state) => state.applicationForm.sources);
  const modulesList = useSelector((state) => state.applicationForm.modules);
  const intakeList = useSelector((state) => state.incentives.intakeList);
  const semesterList = useSelector((state) => state.global.semesters);
  const agentUsersList = useSelector((state) => state.applicationForm.agentUsers);

  const {
    fields: fields1,
    append: append1,
    remove: remove1,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: 'modules',
  });

  const watchType = watch('type');

  const onIntakeChange = (e) => {
    setValue('first_pref', '');
    setValue('second_pref', '');
    setValue('third_pref', '');
    getProgramIncentive({ term_start: e.label }).then((res) => {
      const temp = [];
      res.data.message.map((x) => {
        temp.push({ label: x.program_name, value: x.program });
      });
      setProgramList(temp);
    });
  };

  useEffect(() => {
    append1(initEd);
    return () => {
      dispatch(emptyMod());
      dispatch(emptySem());
    };
  }, []);

  useEffect(() => {
    if (modulesList && modulesList.length > 0) {
      setValue('modules', modulesList);
      if (data && data?.application_module_exemption && data?.application_module_exemption.length > 0) {
        let temp = [];
        modulesList.map((x) => {
          let a = data?.application_module_exemption.find((y) => y.module == x.module);
          if (a) {
          }
          temp.push({
            ...x,
            overall_grade: a ? a.overall_grade : '',
            total_grade_point: a ? a.total_grade_point : '',
            student_total_point: a ? a.student_total_point : '',
            grade: a ? a.grade : '',
            earned_point: a ? a.earned_point : '',
            fromsource: a ? { label: a.structure_name, value: a.structure_name, period: a.period } : '',
            grading_system_description: a ? a.grading_system_description : '',
            selected: a ? ['Active'] : [],
          });
        });
        setValue('modules', temp);
      }
    }
  }, [modulesList]);

  useEffect(() => {
    if (watchType && watchType?.value == 'Transfer Student') {
      setTrans(true);
    } else {
      setTrans(false);
    }
  }, [watchType]);

  useEffect(() => {
    if (data && Object.entries(data).length > 0 && mode != 'add') {
      if (data.application_intake) {
        onIntakeChange({ value: data.application_intake });
      }
      if (data?.first_pref) {
        let body = {
          intake: data.application_intake,
          program: data.first_pref,
          nationality: data.nationality || '',
        };
        dispatch(getAllModulesProgram(data?.first_pref));
        dispatch(getProgramSemesters(data?.first_pref));
        programIncentive(body)
          .then((res) => {
            setIProgram1({
              incentives: res.data.message.incentives,
              amount: res.data.message.program_fee,
            });
          })
          .catch((e) => {
            console.log('Something went wrong');
          });
      }
      if (data?.second_pref) {
        let body = {
          intake: data.application_intake,
          program: data.second_pref,
          nationality: data.nationality || '',
        };
        programIncentive(body)
          .then((res) => {
            setIProgram2({
              incentives: res.data.message.incentives,
              amount: res.data.message.program_fee,
            });
          })
          .catch((e) => {
            console.log('Something went wrong');
          });
      }
      if (data?.third_pref) {
        let body = {
          intake: data.application_intake,
          program: data.third_pref,
          nationality: data.nationality || '',
        };
        programIncentive(body)
          .then((res) => {
            setIProgram3({
              incentives: res.data.message.incentives,
              amount: res.data.message.program_fee,
            });
          })
          .catch((e) => {
            console.log('Something went wrong');
          });
      }
    }
  }, [data]);

  const onProgram1 = (e) => {
    const prefrence2 = getValues('second_pref').value;
    const prefrence3 = getValues('third_pref').value;
    console.log('prefrence1', e.value, prefrence2, prefrence3);
    if (e.value == prefrence2 || e.value == prefrence3) {
      setError('first_pref', { type: 'custom', message: 'Please select another programme' });
      setValue('first_pref', '');
    } else {
      clearErrors('first_pref');
    }

    if (trans == true) {
      dispatch(getAllModulesProgram(e.value));
      dispatch(getProgramSemesters(e.value));
    }

    let body = {
      intake: getValues('application_intake').value,
      program: e.value,
      nationality: getValues('nationality').value || '',
    };
    programIncentive(body)
      .then((res) => {
        setIProgram1({
          incentives: res.data.message.incentives,
          amount: res.data.message.program_fee,
        });
      })
      .catch((e) => {
        console.log('Something went wrong');
      });
  };

  const onProgram2 = (e) => {
    const prefrence1 = getValues('first_pref').value;
    const prefrence3 = getValues('third_pref').value;
    if (e.value == prefrence1 || e.value == prefrence3) {
      setError('second_pref', { type: 'custom', message: 'Please select another programme' });
      setValue('second_pref', '');
    } else {
      clearErrors('second_pref');
    }

    let body = {
      intake: getValues('application_intake').value,
      program: e.value,
      nationality: getValues('nationality').value || '',
    };
    programIncentive(body)
      .then((res) => {
        setIProgram2({
          incentives: res.data.message.incentives,
          amount: res.data.message.program_fee,
        });
      })
      .catch((e) => {
        console.log('Something went wrong');
      });
  };

  const onProgram3 = (e) => {
    const prefrence1 = getValues('first_pref').value;
    const prefrence2 = getValues('second_pref').value;
    if (e.value == prefrence1 || e.value == prefrence2) {
      setError('third_pref', { type: 'custom', message: 'Please select another programme' });
      setValue('third_pref', '');
    } else {
      clearErrors('third_pref');
    }
    let body = {
      intake: getValues('application_intake').value,
      program: e.value,
      nationality: getValues('nationality').value || '',
    };
    programIncentive(body)
      .then((res) => {
        setIProgram3({
          incentives: res.data.message.incentives,
          amount: res.data.message.program_fee,
        });
      })
      .catch((e) => {
        console.log('Something went wrong');
      });
  };

  const onSourcesChange = (e) => {
    if (e?.label == 'Agent') {
      dispatch(getAgentUser());
      setAgentUser(true);
    }
  };

  const academicFields = [
    {
      type: 'select',
      label: 'Sources',
      name: 'application_source',
      twocol: false,
      static: mode == 'view' ? true : false,
      placeholder: 'Please select',
      options: sourcesData?.map((x) => ({ label: x.source_name, value: x.name })),
      req: mode == 'edit' ? true : false,
      reqmessage: 'Source Required',
      onChange: onSourcesChange,
    },
    {
      type: 'select',
      label: 'Agent User',
      name: 'agent_user',
      twocol: false,
      hidden: !agentUser,
      static: mode == 'view' ? true : false,
      placeholder: 'Please select',
      options: agentUsersList?.map((x) => ({
        label: x?.first_name + ' ' + (x?.last_name ? x?.last_name : ''),
        value: x.name,
      })),
      req: mode == 'edit' && agentUser == true ? true : false,
      reqmessage: 'Agent Required',
    },

    {
      type: 'select',
      label: 'Intake',
      name: 'application_intake',
      twocol: false,
      static: mode == 'view' ? true : false,
      placeholder: 'Please select',
      options: _.map(intakeList, (x) => ({ label: x.term_start, value: x.name })),
      req: mode == 'edit' ? true : false,
      reqmessage: 'Intake Required',
      onChange: onIntakeChange,
    },
  ];

  const academicFields2 = [
    {
      type: 'select',
      label: 'Enrolled Semester',
      name: 'enrolled_semester',
      twocol: false,
      colWidth: widthCol,
      hidden: !trans,
      placeholder: 'Please select',
      options: _.map(semesterList, (x) => ({ label: x.structure_name, value: x.name, period: x.period })),
      static: mode == 'view' ? true : false,
      req: mode == 'edit' && trans == true ? true : false,
      reqmessage: 'Required',
    },
    {
      type: 'array',
      name: 'modules',
      twocol: false,
      static: mode == 'view' ? true : false,
      subheader: 'Modules List',
      fields: fields2,
      noLabel: true,
      hidden: !trans,
      noCard: true,
      remove: remove2,
      child: [
        {
          subheader: '',
          type: 'input',
          name: 'module',
          label: '',
          static: true,
          req: false,
          twocol: false,
          hidden: true,
        },
        {
          type: 'input',
          name: 'module_code',
          label: '',
          static: true,
          req: false,
          twocol: false,
          hidden: true,
        },
        {
          type: 'input',
          name: 'structure',
          label: '',
          static: true,
          req: false,
          twocol: false,
          hidden: true,
        },
        {
          type: 'input',
          name: 'period',
          label: '',
          static: true,
          req: false,
          twocol: false,
          hidden: true,
        },
        {
          type: 'checkbox',
          name: 'selected',
          label: '.',
          static: false,
          req: false,
          twocol: false,
          class: 'side-check',
          colWidth: '0 1 20px',
          options: [{ label: '', value: 'Active' }],
        },
        {
          type: 'input',
          name: 'semester',
          label: 'Source Semester',
          static: true,
          req: false,
          twocol: false,
          colWidth: '0 1 150px',
        },
        {
          type: 'input',
          name: 'module_name',
          label: 'Module Name',
          static: true,
          req: false,
          twocol: false,
          colWidth: '1 0 200px',
        },
        // {
        //   type: 'select',
        //   name: 'module_current_status',
        //   label: 'Type',
        //   static: mode == 'view' ?  true : false,
        //   placeholder: 'Select',
        //   req: false,
        //   twocol: false,
        //   colWidth: '1 0 100px',
        //   options: mType,
        // },
        {
          type: 'select',
          name: 'fromsource',
          label: 'Studied Semester',
          static: mode == 'view' ? true : false,
          placeholder: 'Select',
          req: false,
          twocol: false,
          customVal: true,
          colWidth: '0 1 160px',
          options: _.map(semesterList, (x) => ({ label: x.structure_name, value: x.name, period: x.period })),
          watching: 'selected',
        },
        {
          type: 'input',
          name: 'earned_point',
          label: 'Earned',
          static: mode == 'view' ? true : false,
          req: false,
          twocol: false,
          number: true,
          arrow: false,
          colWidth: '0 1 60px',
          watching: 'selected',
        },
        {
          type: 'input',
          name: 'total_grade_point',
          label: 'GPA',
          static: mode == 'view' ? true : false,
          req: false,
          number: true,
          arrow: false,
          twocol: false,
          colWidth: '0 1 60px',
          watching: 'selected',
        },
        {
          type: 'input',
          name: 'student_total_point',
          label: 'Total',
          static: mode == 'view' ? true : false,
          req: false,
          number: true,
          arrow: false,
          twocol: false,
          colWidth: '0 1 60px',
          watching: 'selected',
        },
        {
          type: 'input',
          name: 'overall_grade',
          label: 'Overall %',
          static: mode == 'view' ? true : false,
          req: false,
          twocol: false,
          colWidth: '0 1 80px',
          watching: 'selected',
        },
        {
          type: 'input',
          name: 'grade',
          label: 'Grade',
          static: mode == 'view' ? true : false,
          req: false,
          twocol: false,
          colWidth: '0 1 60px',
          watching: 'selected',
        },
        {
          type: 'input',
          name: 'grading_system_description',
          label: 'Remarks',
          static: mode == 'view' ? true : false,
          req: false,
          twocol: false,
          colWidth: '1 0 100px',
          watching: 'selected',
        },
      ],
    },
    {
      type: 'upload',
      name: 'application_module_exemption_proof',
      label: 'Upload Module Excemption Proof (Only PDF and upto 10MB)',
      placeholder: 'Please Upload file',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' && trans == true ? true : false,
      req: false,
      hidden: !trans,
    },
    // Education

    {
      type: 'array',
      name: 'education',
      twocol: false,
      static: mode == 'view' ? true : false,
      subheader: 'Education Level',
      fields: fields1,
      append: append1,
      remove: remove1,
      child: [
        {
          subheader: 'Education Level',
          type: 'select',
          name: 'education_name',
          label: 'Academic Qualification',
          placeholder: 'Please Select',
          static: mode == 'view' ? true : false,
          req: mode == 'edit' ? true : false,
          options: [
            { value: 'A-Levels', label: 'A-Levels' },
            { value: 'Associate Degree', label: 'Associate Degree' },
          ],
          twocol: false,
          colWidth: widthCol,
        },
        {
          type: 'select',
          name: 'country',
          label: 'Country of Education',
          options: countryDropData?.map((x) => ({ label: x.name, value: x.name })),
          placeholder: 'Please Select',
          static: mode == 'view' ? true : false,
          req: mode == 'edit' ? true : false,
          reqmessage: 'Required',
          twocol: false,
          colWidth: widthCol,
        },
        {
          type: 'upload',
          name: 'academic_transcript',
          label: 'Attach Transcript (Only PDF and upto 10MB)',
          placeholder: 'Please Upload File',
          static: mode == 'view' ? true : false,
          req: mode == 'edit' ? true : false,
          reqmessage: 'required',
          twocol: false,
          accept: '.pdf',
          colWidth: widthCol,
          docdetail: { item: 'Academic Transcript', id: data?.name, app: true },
          onChange: (e, i) => onBeforeUploadFile(e, 'pdf', `academic_transcript`, setValue, i, 'education'),
        },
        {
          type: 'upload',
          name: 'academic_certificate',
          label: 'Academic Certificate (Only PDF and upto 10MB)',
          placeholder: 'Please Upload File',
          static: mode == 'view' ? true : false,
          req: mode == 'edit' ? true : false,
          reqmessage: 'required',
          twocol: false,
          colWidth: widthCol,
          docdetail: { item: 'Academic Certificate', id: data?.name, app: true },
          onChange: (e, i) => onBeforeUploadFile(e, 'pdf', 'academic_certificate', setValue, i, 'education'),
        },
      ],
    },

    {
      subheader: 'English Proficiency',
      subheadlevel: 5,
      type: 'select',
      label: 'English Language Qualification',
      name: 'english_language_qualification',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please select',
      options: engDropData?.map((x) => ({ label: x.name, value: x.name })),
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Required',
    },
    {
      type: 'input',
      name: 'score',
      label: 'Score',
      twocol: false,
      colWidth: widthCol,
      placeholder: 'Please state',
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Required',
    },
    {
      type: 'upload',
      name: 'certificate',
      label: 'Certificate (Only PDF and upto 10MB)',
      placeholder: 'Upload',
      twocol: false,
      static: mode == 'view' ? true : false,
      req: mode == 'edit' ? true : false,
      reqmessage: 'Required',
      onChange: (e) => onBeforeUploadFile(e, 'pdf', 'certificate', setValue),
    },
    {
      subheader: 'Additional Documents',
      subheadlevel: 5,
      type: 'upload',
      name: 'resume',
      label: 'Resume/CV (Only PDF and upto 10MB)',
      placeholder: 'Please Upload file',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: false,
      reqmessage: 'Required',
    },
    {
      type: 'upload',
      name: 'portfolio',
      label: 'Portfolio (Only PDF and upto 10MB)',
      placeholder: 'Please Upload file',
      twocol: false,
      colWidth: widthCol,
      static: mode == 'view' ? true : false,
      req: false,
      reqmessage: 'Required',
    },
  ];

  return (
    <Row gutter={[20, 30]} align="bottom">
      {academicFields.map((item, idx) => (
        <Fragment key={idx}>
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      <Col span={24}>
        <SelectField
          isRequired={mode == 'edit' ? true : false}
          fieldname={`first_pref`}
          label="1st Preference"
          class="mb-0 w-100"
          initValue={''}
          onChange={onProgram1}
          control={control}
          iProps={{ placeholder: 'Select one', isDisabled: mode == 'view' ? true : false }}
          selectOption={programList}
          rules={{ required: { value: mode == 'edit' ? true : false, message: 'Required' } }}
          validate={errors.first_pref && 'error'}
          validMessage={errors.first_pref && errors.first_pref.message}
        />
      </Col>
      {iProgram1.incentives.length > 0 && (
        <Col span={24}>
          <Incentives
            mode={mode}
            incentives={iProgram1.incentives}
            data={data?.first_pref_incentive}
            amount={iProgram1.amount}
            incent={firstIncent}
            setIncent={setFirstIncent}
            nationality={getValues('nationality')?.value}
          />
        </Col>
      )}
      <Col span={24} className={trans == true ? 'd-none' : ''}>
        <SelectField
          isRequired={mode == 'edit' && trans == false ? true : false}
          fieldname={`second_pref`}
          label="2nd preference"
          class={`mb-0 w-100 ${trans == true ? 'd-none' : ''}`}
          initValue={''}
          onChange={onProgram2}
          control={control}
          iProps={{ placeholder: 'Select one', isDisabled: mode == 'view' ? true : false }}
          selectOption={programList}
          rules={{ required: { value: mode == 'edit' && trans == false ? true : false, message: 'Required' } }}
          validate={errors.second_pref && 'error'}
          validMessage={errors.second_pref && errors.second_pref.message}
        />
      </Col>
      {iProgram2.incentives.length > 0 && (
        <Col span={24}>
          <Incentives
            mode={mode}
            incentives={iProgram2.incentives}
            data={data?.second_pref_incentive}
            amount={iProgram2.amount}
            incent={secondIncent}
            setIncent={setSecondIncent}
            nationality={getValues('nationality')?.value}
          />
        </Col>
      )}
      <Col span={24} className={trans == true ? 'd-none' : ''}>
        <SelectField
          isRequired={mode == 'edit' && trans == false ? true : false}
          fieldname={`third_pref`}
          label="3rd preference"
          class={`mb-0 w-100 ${trans == true ? 'd-none' : ''}`}
          initValue={''}
          onChange={onProgram3}
          control={control}
          iProps={{ placeholder: 'Select one', isDisabled: mode == 'view' ? true : false }}
          selectOption={programList}
          rules={{ required: { value: mode == 'edit' && trans == false ? true : false, message: 'Required' } }}
          validate={errors.third_pref && 'error'}
          validMessage={errors.third_pref && errors.third_pref.message}
        />
      </Col>
      {iProgram3.incentives.length > 0 && (
        <Col span={24}>
          <Incentives
            mode={mode}
            incentives={iProgram3.incentives}
            data={data?.third_pref_incentive}
            amount={iProgram3.amount}
            incent={thirdIncent}
            setIncent={setThirdIncent}
            nationality={getValues('nationality')?.value}
          />
        </Col>
      )}

      {academicFields2.map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && !item.hidden && (
            <Col span={24}>
              <Title level={item?.subheadlevel ? item?.subheadlevel : 4} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' && !item.hidden ? (
            <Col span={item.twocol ? 12 : 24}>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <ArrayForm fields={item.fields} remove={item.remove} item={item} control={control} errors={errors} />
                </Col>
                {item.static != true && item.append && (
                  <Col span={24}>
                    <Button
                      htmlType="button"
                      type="dashed"
                      size="large"
                      className="w-100"
                      onClick={() => item.append(initEd)}
                    >
                      + Add Academic Qualification
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          ) : (
            <FormGroup item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
    </Row>
  );
};
