import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Breadcrumb, message, Space, Typography } from 'antd';
import { useTranslate } from 'Translate';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from 'Molecules/HeadingChip';
import ScholarshipForm from '../components/ScholarshipForm';
import { useForm } from 'react-hook-form';
import ActivationCard from 'Atoms/ActivationCard';
import OutstandingList from 'Molecules/OutstandingList';
import {
  getOutstandingPaymentList,
  getTotalOutstandingPayment,
  getStudentsList,
  getSingleScholorshipData,
} from '../ducks/actions';
import { Popup } from 'Atoms/Popup';
import DeletePopup from 'Molecules/DeletePopup';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import UpdateSection from 'Molecules/UpdateSection';
import moment from 'moment';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { useMediaQuery } from 'react-responsive';
import  SchemeSearch from '../components/SchemeSearch'
import RequestComponent from '../../../components/RequestComponent';
import { formatCurrency } from '../../../../../features/utility';
import { updateScholarship } from '../ducks/services';

const {Text, Title} = Typography;



export default (props) => {
  
  const company_currency = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0]?.company_currency;
  const StudentCol = [
    {
      title: 'Code',
      dataIndex: 'student_id',
      key: 'student_id',
      sorter: (a, b) => a.student_id.length - b.student_id.length,
    },
    {
      title: 'Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: (a, b) => a.student_name.length - b.student_name.length,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      sorter: (a, b) => a.faculty_code - b.faculty_code,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      sorter: (a, b) => a.program_name - b.program_name,
      width: 180,
    },
    {
      title: 'Scheme',
      dataIndex: 'student_scheme',
      key: 'student_scheme',
      sorter: (a, b) => a.student_scheme - b.student_scheme,
    },
    {
      title: 'Status',
      dataIndex: 'scholarship_status',
      key: 'scholarship_status',
      align: 'right',
      render: (text) => {
        let clname = '';
        if (text == 'Active') {
          clname = 'c-success';
        } else if (text == 'Outstanding') {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];
  
  const OutstandingCol = [
    {
      title: 'Code',
      dataIndex: 'student_id',
      key: 'student_id',
      sorter: (a, b) => a.student_id.length - b.student_id.length,
    },
    {
      title: 'Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: (a, b) => a.student_name.length - b.student_name.length,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      sorter: (a, b) => a.faculty_code - b.faculty_code,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      sorter: (a, b) => a.program_name - b.program_name,
      width: 180,
    },
    {
      title: 'Scheme',
      dataIndex: 'student_scheme',
      key: 'student_scheme',
      sorter: (a, b) => a.student_scheme - b.student_scheme,
    },
    {
      title: 'Amount',
      dataIndex: 'students_outstanding',
      key: 'students_outstanding',
      sorter: (a, b) => a.outstanding - b.outstanding,
      render: (text) => <span className="c-error">{company_currency} {text && formatCurrency(text)}</span>,
    },
  ];

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const i18n = useTranslate();
  const { t } = i18n;
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Active');
  const [deleted, setDeleted] = useState([]);
  const { control, errors, setValue, handleSubmit } = useForm();
  const outStandingData = useSelector((state) => state.scholarship.outstandingPayment);
  const outStandingBalance = useSelector((state) => state.scholarship.outstandingTotalPayment);
  const studentListData = useSelector((state) => state.scholarship.studentList);
  const scholorshipSingleData = useSelector((state) => state.scholarship.scholorshipSingleData);
  const commentsApi = useSelector((state) => state.global.comments);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const [schemeDrop, setSchemeDrop] = useState([]);

  const locate = location.pathname.split('/')[1];

  const sideData = [
    {
      type: 'code',
      text: 'Scholarship',
      title: scholorshipSingleData?.scholarship_name,
      highlight: true,
    },
    {
      type: 'reversetitleValue',
      title: 'Schemes',
      level1: isHDScreen ? 3 : 4,
      level2: isHDScreen ? 4 : 5,
      value: scholorshipSingleData?.total_schemes,
    },
    {
      type: 'reversetitleValue',
      title: 'Active Students',
      level1: isHDScreen ? 3 : 4,
      level2: isHDScreen ? 4 : 5,
      value: scholorshipSingleData?.total_students,
    },
    {
      type: 'titleValue',
      title: 'Created',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: scholorshipSingleData?.created ? moment(scholorshipSingleData?.created).format('Do MMMM YYYY') : '',
      noDivider: true,
      highlight: true,
      noLine: true
    },
  ];

  const bottomList = [
    {
      title: 'Delete Scholarship',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <DeletePopup title="Faculty" onClose={() => setVisible(false)} onDelete={() => onDelete()} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onDelete = () => {
    deleteScholarship(id).then(res => {
      message.success('Scholorship Successfully Deleted');
      setVisible(false);
      setTimeout(() => history.push(`/${locate}/scholarships`), 1000);
    }).catch(e => {
      const { response } = e;
      message.error(e);
    })
  };

    useEffect(() => {
        dispatch(getOutstandingPaymentList(id, 1, 5, '', ''));
        dispatch(getTotalOutstandingPayment(id));
        dispatch(getStudentsList(id, 1, 5, '', ''));
        dispatch(getSingleScholorshipData(id));
        dispatch(getComments('Scholarship', `${id}`));
        return () => {dispatch(emptyComments())}        
    }, []);

  useEffect(() => {
    if (scholorshipSingleData && Object.keys(scholorshipSingleData).length > 0) {
      setValue('scholarship_code', scholorshipSingleData?.scholarship_code);
      setValue('scholarship_name', scholorshipSingleData?.scholarship_name);
      setValue('contact_person', scholorshipSingleData?.contact_person);
      setValue('address', scholorshipSingleData?.address);
      setValue('state', scholorshipSingleData?.state);
      setValue('postcode', scholorshipSingleData?.postcode);
      setValue('city', scholorshipSingleData?.city);
      setValue('email', scholorshipSingleData?.email);
      setValue('contact_number', scholorshipSingleData?.contact_number);

      if (scholorshipSingleData?.schemes) {
        let temp = [];
        let temp2 = [];
        scholorshipSingleData.schemes.map(x => {
          temp.push({
            label: x.scheme_name,
            value: x.name,
          })
          
          let wave = [];
          if(x.waive_registration_fee != "0") {
            wave.push('waive_registration_fee')
          }

          if(x.waive_resource_fee != "0") {
            wave.push('waive_resource_fee')
          }

          if(x.waive_administration_fee != "0") {
            wave.push('waive_administration_fee')
          }

          if(x.waive_security_deposit_fee != "0") {
            wave.push('waive_security_deposit_fee')
          }

          if(x.waive_woc_fee != "0") {
            wave.push('waive_woc_fee')
          }

          temp2.push({
            name: x.name,
            scheme_name: x.scheme_name,
            scholarship_type: {label: `${x.scholarship_type}% Scholarship`, value: x.scholarship_type},
            renewal_condition: {label: x.renewal_condition, value: x.renewal_condition},
            wave: wave,
          })
          setSchemeDrop(temp);
        })
        console.log('checking', temp2)
        setValue('schemes_structure', temp2);
      }

      if (scholorshipSingleData?.country) {
        setValue('country', {
          value: scholorshipSingleData?.country,
          label: scholorshipSingleData?.country,
        });
      }
    }
  }, [scholorshipSingleData]);
 
  const onFinish = async (val) => {
    let schemes_array = [];
    val?.schemes_structure?.map((resp) => {
      schemes_array.push({
        name: resp?.name,
        scheme_name: resp?.scheme_name,
        scholarship_type: resp?.scholarship_type.value,
        renewal_condition: resp?.renewal_condition.value,
        waive_registration_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_registration_fee') ? 1 : 0 : 0,
        waive_resource_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_resource_fee') ? 1 : 0 : 0,
        waive_administration_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_administration_fee') ? 1 : 0 : 0,
        waive_security_deposit_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_security_deposit_fee') ? 1 : 0 : 0,
        waive_woc_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_woc_fee') ? 1 : 0 : 0,
      });
    });

    const payload = {
      scholarship_scheme_list: {
        name: id,
        scholarship_code: val?.scholarship_code,
        scholarship_name: val?.scholarship_name,
        contact_person: val?.contact_person,
        address: val?.address,
        state: val?.state,
        postcode: val?.postcode,
        country: val?.country?.value,
        city: val?.city,
        email: val?.email,
        contact_number: val?.contact_number,
        status: status,
        schemes: schemes_array,
        name: scholorshipSingleData?.name,
        scholarship_student_list: [],
      },
      delete_scheme: [],
    };

    updateScholarship(payload).then(res => {
      props.setLoading(false);
      message.success('Scholorship Successfully Updated');
      setTimeout(() => history.push('/registry/scholarships'), 1000);
    }).catch(e => {
      const { response } = e;
      message.error('Something went wrong');
      props.setLoading(false);
    })
  };

  const studentApi = (page, limit, sort, sortby) => {
    dispatch(getStudentsList(id, page, limit, '', ''));
  }

  const outStandingApi = (page, limit, sort, sortby) => {
    dispatch(getOutstandingPaymentList(id, page, limit, '', ''));
  }
  const onSearch = (search) => {
    dispatch(getStudentsList(id, page, limit, '', ''));
  }

  const updateComment = () => {
    dispatch(getComments('Scholarship', `${id}`));
  };

  const PaymentBlock = () => (
      <Card bordered={false} className='red-card'>
        <Space size={20}>
          <Space size={10} direction='vertical'>
            <Text>{outStandingBalance[0]?.total_students} Students</Text>
            <Space size={0} direction='vertical'>
              <Title level={3} className="c-white mb-0">RM: {outStandingBalance[0]?.total_amount}</Title>
              <Text className="op-6">{outStandingBalance[0]?.due_date ? `Due: ${moment(outStandingBalance[0].due_date)}`: ''}</Text>
            </Space>
          </Space>
        </Space>
      </Card>
  )

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href={`/${locate}/scholarships`}>Scholarships</Breadcrumb.Item>
        <Breadcrumb.Item>Scholarships Details</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[30, 24]}>
        <Col span={24}>
          <HeadingChip title="Scholarships Details" />
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
                {scholorshipSingleData?.status == 'Draft' &&
                <Col span={24}>
                  <ActivationCard t={t} title={scholorshipSingleData?.status} status={scholorshipSingleData?.status} />
                </Col>}

                <Col span={24}>
                    <RequestComponent id={id} type='scholarship' />
                </Col>
                <Col span={24}>
                  <OutstandingList
                    column={OutstandingCol}
                    data={outStandingData?.rows}
                    count={outStandingData?.count}
                    id='student_id'
                    ExtraBlocks={outStandingBalance[0]?.total_amount && PaymentBlock}
                    heading={'Outstanding Payments'}
                    updateApi={outStandingApi}
                    link={'/registry/students/finance/'}
                    />
                </Col>

                <Col span={24} className="clickRow">
                  <OutstandingList
                    column={StudentCol}
                    data={studentListData?.data}
                    count={studentListData?.total}
                    id='student_id'
                    field1={schemeDrop}
                    Search={SchemeSearch}
                    onSearch={onSearch}
                    heading={'Student List'}
                    updateApi={studentApi}
                    link={'/registry/students/finance/'}
                    />
                </Col>

                <Col span={24}>
                  <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
                    <ScholarshipForm
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      mode="edit"
                      deleted={deleted}
                      setDeleted={setDeleted}
                      t={t}
                    />
                  </Form>
                </Col>
                <Col span={24}>
                  <UpdateSection data={commentsApi} code={id} module={'Scholarship'} updateComment={updateComment} />
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
