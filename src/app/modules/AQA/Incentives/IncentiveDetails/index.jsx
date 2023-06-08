import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import UpdateSection from 'Molecules/UpdateSection';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { getIncentiveDetails, getIncentiveStudentList } from '../ducks/actions';
import IncentiveForm from '../components/IncentiveForm';
import moment from 'moment';
import { addUpdateIncentive, duplicateIncentive } from '../ducks/services';
import OutstandingList from '../../../../molecules/OutstandingList';

const StudentCol = [
  {
    title: 'ID',
    dataIndex: 'student_id',
    key: 'student_id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'student_name',
    key: 'student_name',
    sorter: true,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: true,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: true,
    width: 180,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'right',
    render: (text) => {
      let clname = '';
      if (text == 'Active') {
        clname = 'c-success';
      } else if (text == 'Inactive') {
        clname = 'c-error';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { control, errors, getValues, setValue, handleSubmit, watch } = useForm();
    const [deleted, setDeleted] = useState([]);
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const commentsApi = useSelector((state) => state.global.comments);
    const incentiveApi = useSelector((state) => state.incentives.incentiveData);
    const studentListData = useSelector((state) => state.incentives.studentList);
    const intakeList = useSelector(state => state.incentives.intakeList);

    const sideData = [
        {
          type: 'tag',
          title: 'Incentive',
          subChild: true,
          subChildTitle: incentiveApi && incentiveApi?.incentive_name,
          highlight: true,
        },
        {
          type: 'titleValue',
          title: 'Fee Discount Amount',
          level: isHDScreen ? 4 : 5,
          value: incentiveApi && incentiveApi?.tution_fee_covered,
          highlight: true,
        },
        {
          type: 'titleValue',
          title: 'Start Date',
          level: isHDScreen ? 4 : 5,
          value: incentiveApi?.incentive_start_date ?  moment(incentiveApi?.incentive_start_date).format('Do MMMM YYYY') : '-',
        },
        {
            type: 'titleValue',
            title: 'End Date',
            level: isHDScreen ? 4 : 5,
            value: incentiveApi.incentive_end_date ? moment(incentiveApi.incentive_end_date).format('Do MMMM YYYY') : '-',
            noLine: true
        },
        
    ];
    
    const onDuplicate = () => {
      props.setLoading(true);
      duplicateIncentive(id).then(res => {
        props.setLoading(true);
        message.success('Duplicate Incentive Created');
        setTimeout(() => history.push('/marketing/incentives'), 1000)
      })
    };

    const studentApi = (page, limit, sort, sortby) => {
      dispatch(getIncentiveStudentList(id, page, limit, sort, sortby))
    }

    const onDraft = () => {
      const val = getValues();
      if(val.incentive_name) {
        onFinish(val, 'Draft');
      } else {
        message.error('Please Enter Incentive Name')
      }
    }

    const bottomList = [
        {
            title: 'Create Duplicate',
            type: 'button',
            class: 'green-btn',
            action: onDuplicate,
        },
    ];
    const bottomList2 = [
      {
          title: 'Save as Draft',
          type: 'button',
          class: 'black-btn',
          action: onDraft,
      },
    ];

  useEffect(() => {
      dispatch(getIncentiveDetails(id));
      dispatch(getIncentiveStudentList(id, 1, 10, '', ''));
      dispatch(getComments('Incentives', `${id}`));
    return () => {
      dispatch(emptyComments());
    };
  }, []);

  useEffect(() => {
    if(Object.entries(incentiveApi).length > 0 && intakeList.length) {
      setValue('incentive_name', incentiveApi?.incentive_name);
      setValue('recipient_limit', incentiveApi?.recipient_limit);
      setValue('academic_duration', incentiveApi?.academic_duration ? {label: incentiveApi?.academic_duration, value: incentiveApi?.academic_duration}: '');
      setValue('incentive_end_date', incentiveApi?.incentive_end_date ? moment(incentiveApi?.incentive_end_date, 'YYYY-MM-DD'): '');
      setValue('incentive_start_date', incentiveApi?.incentive_start_date ? moment(incentiveApi?.incentive_start_date, 'YYYY-MM-DD'): '');
      setValue('nationality', incentiveApi?.nationality ? {label: incentiveApi?.nationality, value: incentiveApi?.nationality}: {label: 'All', value: ''});
      setValue('renewal_condition', incentiveApi?.renewal_condition ? {label: incentiveApi?.renewal_condition, value: incentiveApi?.renewal_condition}: '');
      setValue('student_recipient_type', incentiveApi?.student_recipient_type ? {label: incentiveApi?.student_recipient_type, value: incentiveApi?.student_recipient_type}: '');
      setValue('tution_fee_covered', incentiveApi?.tution_fee_covered);
      setValue('renewal_percentages', incentiveApi?.renewal_percentages);
      setValue('incentive_recipient_limit', incentiveApi?.incentive_recipient_limit);
      let additions= [];
      if (incentiveApi?.stacking_incentive != 0) {
        additions.push('stacking_incentive');
      }
      if (incentiveApi?.allow_enroll != 0) {
        additions.push('allow_enroll');
      }
      if (incentiveApi?.incentive_transferrable != 0) {
        additions.push('incentive_transferrable');
      }
      setValue('addition_details', additions);
      let inatakes = [];
      if(incentiveApi?.incentive_intakes.length > 0) {
        var result = incentiveApi?.incentive_intakes.reduce(function (r, a) {
          if (a.parent) {
              r[a["intake"]] = r[a["intake"]] || [];
              if (a.name) {
                  r[a["intake"]].push(a);
              } else {
                  r[a["intake"]] = a;
              }
          }
          return r;
        }, Object.create(null));
        let temp = [];
        Object.entries(result).forEach(([key,val])=> {
          let a = {};
          console.log('======', intakeList, key)
          a['intake'] = key;
          a['intake_name'] = val[0].intake_name;
          a['intake_term'] = intakeList.find(x => x.name == key) ? intakeList.find(x => x.name == key)?.term_start : 'Null';
          let b = [];
          val.forEach(x => {
            b.push({
              all_programs: x.all_programs,
              name: x.name,
              program: x.program,
              program_name: x.program_name,
              include_exclude: x.include_exclude
            })
          })
          a['attached_program'] = b;
          temp.push(a);
        })
        console.log('checking temp', temp);
        setValue('intakes', temp)
      }
    }
  }, [incentiveApi, intakeList]);


  const onFinish = (val, vstatus) => {
    props.setLoading(true);
      let intakes_array = [];
      val.intakes && val.intakes.map(x => {
          x.attached_program.map(y => {
              let a = {
                  intake: x.intake_name.value,
                  include_exclude: y.include_exclude.value
              }
              if (y.program.value == 'All') {
                  a['all_programs'] = 1;
              } else {
                  a['program'] = y.program.value
              }
              intakes_array.push(a);
          }) 
      })

      let body = {    
          name: incentiveApi.name,
          incentive_name: val.incentive_name,
          status: typeof(vstatus) == 'string' ? vstatus: 'Active',
          incentive_start_date: val.incentive_start_date,
          incentive_end_date: val.incentive_end_date,
          student_recipient_type: val?.student_recipient_type ? val.student_recipient_type.value : '',
          nationality: val.nationality ? val.nationality.value : '',
          academic_duration: val.academic_duration ? val.academic_duration.value : '',
          tution_fee_covered: val.tution_fee_covered,
          renewal_condition: val.renewal_condition ? val.renewal_condition.value : '',
          renewal_percentages: val.renewal_percentages,
          stacking_incentive: val.addition_details ? val.addition_details.find(x => x == 'stacking_incentive') ? 1 : 0 : 0,
          allow_enroll: val.addition_details ? val.addition_details.find(x => x == 'allow_enroll') ? 1 : 0 : 0,
          incentive_transferrable: val.addition_details ? val.addition_details.find(x => x == 'incentive_transferrable') ? 1 : 0 : 0,
          incentive_intakes: intakes_array,
          incentive_recipient_limit: val?.incentive_recipient_limit
      }
      console.log('body weight', body)
      
      addUpdateIncentive(body).then(res => {
          message.success('Incentive Successfully Created');
          props.setLoading(false);
          setTimeout(() => history.push('/marketing/incentives'), 1000);
      }).catch(err => {
          props.setLoading(false);
          message.error('Something went wrong'); 
      })
  };

  

  const updateComment = () => {
    dispatch(getComments('Institution Faculty', `${id}`));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/Incentives">Incentives</Breadcrumb.Item>
        <Breadcrumb.Item>Incentive Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Incentive Details'} />
        </Col>
        <Col span={24}>
        <div className='twocol-3070'>
          <div className='side-detail'>
              {isHDScreen ?
              <SideDetails data={sideData} type="button" bottom={incentiveApi?.status != 'Draft' ? bottomList : bottomList2 } />
              :
              <SideDetailResponsive data={sideData} type='button' bottom={incentiveApi?.status != 'Draft' ? bottomList : bottomList2} />
              }
          </div>
          <div className='side-form'>
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                    <IncentiveForm
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      watch={watch}
                      deleted={deleted}
                      setDeleted={setDeleted}
                      static={incentiveApi?.status == 'Draft' ? false : true}
                      mode="edit"
                    />
                  </Form>
                </Col>
                <Col span={24}>
                <Col span={24} className="clickRow">
                  <OutstandingList
                    column={StudentCol}
                    data={studentListData?.rows}
                    count={studentListData?.count}
                    id='student_id'
                    heading={'Student List'}
                    updateApi={studentApi}
                    link={'/registry/students/finance/'}
                    />
                  </Col>
                </Col>
                <Col span={24}>
                  <UpdateSection
                    data={commentsApi}
                    code={id}
                    module={'Incentives'}
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
