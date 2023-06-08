import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, Typography, Space, Spin, message } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from 'Atoms/FormElement';
import { categoryList, categoryList2, transType, feeCategory } from '../../../../../../configs/constantData';
import FormGroup from 'Molecules/FormGroup';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getGrantDrop, getScholarshipDrop } from '../../ducks/actions';
import moment from 'moment';
import ListCard from 'Molecules/ListCard';
import {
  addEditTransaction,
  applicantBreakdown,
  applicantExist,
  getStudentName,
  getStudentOutstandingBalanceBreakdown,
} from '../../ducks/services';
import { emptyTrans, getFinanceTransactionDetail } from '../../../ducks/actions';
import { formatCurrency } from '../../../../../../features/utility';
import QRCode from 'react-qr-code';
import { getRequestByCat } from '../../../Applicants/ducks/services';
import { createRequest } from '../../../../AQA/Requests/ducks/services';
import { useLocation, useHistory } from 'react-router-dom';
import { addStudentApp } from '../../../../Marketing/Applications/ducks/services';

const { Title, Text } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  const ListCol = [
    {
      title: 'Invoice No.',
      dataIndex: 'invoice_no',
      key: 'invoice_no',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoice_date',
      key: 'invoice_date',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : text),
    },
    {
      title: 'Item',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => (record.category ? text : record.item),
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : text),
    },
    {
      title: 'Actual Amount',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Discount Type',
      dataIndex: 'discount_type',
      key: 'discount_type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => (
        <span className="c-error">
          {company_currency} {text ? formatCurrency(text.toString()) : 0}
        </span>
      ),
    },
  ];

  const dispatch = useDispatch();
  const history = useHistory();
  const { data, setData } = props;
  const [load, setLoad] = useState(false);
  const [qrValue, setQRValue] = useState('');
  const [categorySelect, setCategorySelect] = useState('Student Outstanding');
  const [staticF, setStaticF] = useState(false);
  const { control, errors, handleSubmit, setValue } = useForm({});
  const scholarshipList = useSelector((state) => state.transaction.scholarshipDrop);
  const grantList = useSelector((state) => state.transaction.grantDrop);
  const [scholarships, setScholarships] = useState([]);
  const [grants, setGrants] = useState([]);
  const [studentTransHistory, setStudentTransHistory] = useState('');
  const reqid = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const location = useLocation();
  const tranactionDetail = useSelector((state) => state.finance.transactionDetail);

  useEffect(() => {
    dispatch(getScholarshipDrop());
    dispatch(getGrantDrop());
    return () => dispatch(emptyTrans());
  }, []);

  useEffect(() => {
    if (location?.state) {
      setValue('transaction_date', moment());
      setValue('transaction_ref', location?.state?.ref);
      setValue('transaction_type', { label: 'Income', value: 'Income' });
      setValue('transaction_amount', location?.state?.balance);
      if (location?.state?.aid) {
        setCategorySelect('Applicant Outstanding');
        setValue('transaction_category', {
          label: 'Applicant Outstanding',
          value: 'Applicant Outstanding',
        });
        setValue('applicant_id', location?.state?.aid);
        onApplicantID({ target: { value: location?.state?.aid } });
      } else if (location?.state?.sid) {
        setCategorySelect('Student Outstanding');
        setValue('transaction_category', {
          label: 'Student Outstanding',
          value: 'Student Outstanding',
        });
        setValue('student_id', location?.state?.sid);
        onStudentID({ target: { value: location?.state?.sid } });
      }
    }
  }, [location?.state]);

  useEffect(() => {
    if (data.data?.name) {
      dispatch(getFinanceTransactionDetail(data.data.name));
    }
  }, [data.data]);

  useEffect(() => {
    if (tranactionDetail && Object.keys(tranactionDetail).length) {
      setCategorySelect(tranactionDetail.transaction_category, tranactionDetail);
      setValue(
        'transaction_date',
        tranactionDetail.transaction_date ? moment(tranactionDetail.transaction_date, 'YYYY-MM-DD') : '',
      );
      setValue('transaction_ref', tranactionDetail.ref_no);
      setValue('transaction_type', {
        label: tranactionDetail.transaction_type,
        value: tranactionDetail.transaction_type,
      });
      setValue('transaction_category', {
        label: tranactionDetail.transaction_category,
        value: tranactionDetail.transaction_category,
      });
      setValue('transaction_amount', tranactionDetail.amount);
      if (tranactionDetail.transaction_category == 'Scholarship Payment') {
        setValue('scholarship', { label: tranactionDetail.scholarship, value: tranactionDetail.scholarship });
        setValue('student_id', tranactionDetail.student_id);
      } else if (tranactionDetail.transaction_category == 'Grant Payment') {
        setValue('grant', { label: tranactionDetail.grant_name, value: tranactionDetail.grant_id });
        setValue('staff_id', tranactionDetail.staff_id);
      } else if ('Applicant Outstanding') {
        setValue('applicant_id', tranactionDetail.applicant_id);
        setValue('student_name', tranactionDetail.applicant_name);
      } else {
        setValue('student_id', tranactionDetail.student_id);
        setValue('student_name', tranactionDetail.student_name);
      }
    }
  }, [tranactionDetail]);

  const onCatChange = (e) => {
    setCategorySelect(e.value);
    if (e.value == 'Scholarship Payment') {
      setValue('student_id', '-');
      setStaticF(true);
    } else {
      setStaticF(false);
    }
  };

  const onStudentID = (id) => {
    setLoad(true);
    const student_id = id.target.value;
    getStudentName(student_id)
      .then((res) => {
        if (res.data.message.success == false) {
          message.error(`Student ${res.data.message.message}`);
        } else {
          setValue('student_name', res.data?.message?.student_name);
          getStudentOutstandingBalanceBreakdown(student_id).then((res) => {
            let temp = [];
            res.data.message.data.map((x) => {
              temp.push({ ...x, key: x.name });
            });
            setStudentTransHistory({ ...res.data.message, data: temp });
          });
        }
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
      });
  };

  const onApplicantID = (id) => {
    setLoad(true);
    applicantExist(id.target.value)
      .then((res) => {
        if (res.data.message.success == false) {
          message.error(res.data.message.message);
        } else {
          setValue('student_name', res.data?.message?.applicant_name);
          applicantBreakdown({ applicant_id: id.target.value }).then((res) => {
            let alldata = {};
            let temp = [];
            res.data.message.data.map((x) => {
              temp.push({ ...x, key: x.invoice_no });
            });
            alldata = { ...res.data.message, data: temp };
            setStudentTransHistory(alldata);
            if (location?.state) {
              setSelectedRowKeys([location.state.ref]);
            }
            set;
          });
        }
        setLoad(false);
      })
      .catch((e) => {
        console.log('error', e);
        setLoad(false);
      });
  };

  const onBtnClick = () => {
    setValue('transaction_ref', Date.now());
  };

  const formFields = [
    {
      name: 'transaction_date',
      label: 'Transaction Date',
      req: true,
      placeholder: 'Please state',
      type: 'date',
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'date required',
      format: 'Do MMMM YYYY',
    },
    {
      name: 'transaction_ref',
      label: 'Reference No.',
      req: true,
      placeholder: 'Please state',
      type: 'input',
      // number: true,
      // arrow: false,
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'Reference Number required',
      addOnButton: data.type == 'Cash' ? 'Generate' : null,
      onBtnClick: onBtnClick,
    },
    {
      name: 'transaction_type',
      label: 'Transaction Type',
      req: true,
      placeholder: 'Please select',
      type: 'select',
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'Type required',
      options: transType,
    },
    {
      name: 'transaction_category',
      label: 'Transaction Category',
      req: true,
      placeholder: 'Please select',
      type: 'select',
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'Category required',
      options: data.type == 'Cash' ? categoryList2 : categoryList,
      onChange: onCatChange,
    },
    {
      name: 'student_id',
      label: 'Student ID',
      req: categorySelect != 'Student Outstanding' ? false : true,
      placeholder: 'Please State',
      type: 'input',
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'Student ID required',
      hidden: categorySelect == 'Grant Payment' || categorySelect == 'Applicant Outstanding' ? true : false,
      static: staticF,
      onBlur: !staticF ? onStudentID : null,
    },
    {
      name: 'applicant_id',
      label: 'Applicant ID',
      req: categorySelect != 'Applicant Outstanding' ? false : true,
      placeholder: 'Please State',
      type: 'input',
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'Applicant ID required',
      hidden: categorySelect == 'Applicant Outstanding' ? false : true,
      onBlur: onApplicantID,
    },
    {
      name: 'staff_id',
      label: 'Staff ID',
      req: false,
      placeholder: 'Please State',
      type: 'input',
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'Staff ID required',
      hidden: categorySelect != 'Grant Payment' ? true : false,
    },
    {
      name: 'student_name',
      label: 'Student Name',
      req: false,
      placeholder: 'Please State',
      type: 'input',
      twocol: false,
      colWidth: '1 0 370px',
      reqmessage: 'Student Name required',
      hidden: categorySelect == 'Grant Payment' || categorySelect == 'Scholarship Payment' ? true : false,
      initValue: 'test',
    },
    // {
    //     name: 'fee_type',
    //     label: 'Fee Item',
    //     req: (categorySelect == 'Grant Payment' || categorySelect == 'Scholarship Payment') ? false : true,
    //     placeholder: 'Please select',
    //     type: 'select',
    //     twocol: false,
    //     colWidth: '1 0 370px',
    //     reqmessage: 'Category required',
    //     options: feeCategory,
    //     hidden: (categorySelect == 'Grant Payment' || categorySelect == 'Scholarship Payment') ? true : false,
    // },
    {
      name: 'scholarship',
      label: 'Scholarship Name',
      req: categorySelect == 'Scholarship Payment' ? true : false,
      placeholder: 'Please select',
      type: 'select',
      twocol: false,
      colWidth: '1 0 370px',
      options: scholarships,
      hidden: categorySelect != 'Scholarship Payment' ? true : false,
    },
    {
      name: 'grant',
      label: 'Grant Name',
      req: categorySelect == 'Grant Payment' ? true : false,
      placeholder: 'Please select',
      type: 'select',
      twocol: false,
      colWidth: '1 0 370px',
      options: grants,
      hidden: categorySelect != 'Grant Payment' ? true : false,
    },
  ];

  const onFinish = (val) => {
    setLoad(true);
    let ref = selectedRowKeys.length == 1 ? selectedRowKeys[0] : val.transaction_ref;
    let bodyData = {
      transaction_date: val.transaction_date,
      ref_no: ref,
      transaction_type: val.transaction_type.label,
      transaction_category: val.transaction_category.value,
      amount: val.transaction_amount,
      status:
        val.transaction_category.value == 'Grant Payment' || val.transaction_category.value == 'Scholarship Payment'
          ? 'Pending'
          : 'Verified',
      cash_online: data.type,
    };

    if (data?.data) {
      // Edit Transaction
      bodyData['name'] = data?.data?.name;
    }

    if (val.transaction_category.value == 'Grant Payment') {
      bodyData['staff_id'] = val.staff_id;
      bodyData['grant_id'] = val.grant.value;
    } else if (val.transaction_category.value == 'Scholarship Payment') {
      bodyData['student_id'] = val.student_id;
      bodyData['scholarship'] = val.scholarship.value;
    } else if (val.transaction_category.value == 'Applicant Outstanding') {
      bodyData['applicant_id'] = val.applicant_id;
      bodyData['applicant_name'] = val.student_name;
    } else {
      bodyData['student_id'] = val.student_id;
      bodyData['student_name'] = val.student_name;
    }

    let rows = [];
    selectedRowKeys.map((x) => {
      let a = studentTransHistory?.data?.find((y) => y.key == x);
      if (a) {
        rows.push(a);
      }
    });

    let body = {
      data: bodyData,
      trans_child_data: rows,
    };

    let requestBody = {};
    if (val.transaction_category.value == 'Scholarship Payment' || val.transaction_category.value == 'Grant Payment') {
      let cat = val.transaction_category.value == 'Scholarship Payment' ? 'Scholarship' : 'Grant';
      getRequestByCat(cat).then((res) => {
        let formData = res.data.message;
        let fields = [
          { field_label: 'Transaction No', field_value: val.transaction_ref },
          { field_label: 'Transaction Type', field_value: val.transaction_type.label },
          { field_label: 'Transaction Category', field_value: val.transaction_category.value },
          { field_label: 'Transaction Date', field_value: val.transaction_date },
          { field_label: 'Transaction Amount', field_value: `${company_currency} ${val.transaction_amount}` },

          { field_label: 'Requester ID', field_value: reqid },
          { field_label: 'Request For', field_value: reqid },
          { field_label: 'Date', field_value: moment().format('Do MMMM YYYY') },
        ];

        if (cat == 'Scholarship') {
          fields.push({ field_label: 'Scholarship Id', field_value: val.scholarship.value });
          fields.push({ field_label: 'Scholarship Name', field_value: val.scholarship.label });
        } else {
          fields.push({ field_label: 'Grant Id', field_value: val.grant.value });
          fields.push({ field_label: 'Grant Name', field_value: val.grant.label });
          fields.push({ field_label: 'Lecturer Name', field_value: val.staff_id });
        }

        let dept = [];
        formData.approvers.map((it) => {
          dept.push({
            department: it.approver_detail,
            status: 'Pending',
          });
        });

        requestBody = {
          form_name: res.data.message.name,
          status: 'Pending',
          form_fields: fields,
          departments: dept,
          category: cat,
        };
        addEditTransaction(body)
          .then((res) => {
            if (res.data.message.success == false) {
              message.error(res.data.message.message);
              setLoad(false);
            } else {
              console.log('ressss', res.data.message);
              requestBody.form_fields.push({
                field_label: 'Transaction ID',
                field_value: res.data.message.transaction_id,
              });
              createRequest(requestBody)
                .then((res2) => {
                  setLoad(false);
                  message.success('Transaction Request Generated');
                  setData({
                    data: null,
                    visible: false,
                    type: '',
                  });
                })
                .catch((e) => {
                  setLoad(false);
                  message.error('Some went wrong');
                  console.log('error', e);
                });
            }
          })
          .catch((err) => {
            setLoad(false);
            message.error('Some went wrong');
            console.log('error', err);
          });
      });
    } else {
      addEditTransaction(body)
        .then((res) => {
          if (res.data.message.success == false) {
            message.error(res.data.message.message);
            setLoad(false);
          } else {
            if (val.transaction_category.value == 'Student Outstanding') {
              setLoad(false);
              setQRValue('http://www.example.com/'); // set response value getting from api it will generate qrcode
              setData({
                data: null,
                type: '',
              });
            } else if (val.transaction_category.value == 'Applicant Outstanding') {
              setLoad(false);
              setData({
                data: null,
                visible: false,
                type: '',
              });
            } else {
              message.success('Transaction Request Generated');
              setLoad(false);
              setData({
                data: null,
                visible: false,
                type: '',
              });
            }
          }
        })
        .catch((err) => {
          setLoad(false);
          message.error('Some went wrong');
          console.log('error', err);
        });
    }
  };

  useEffect(() => {
    if (scholarshipList && scholarshipList.length > 0) {
      let temp = [];
      scholarshipList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: x.scholarship_name, value: x.name });
        } else {
          temp.push({ label: x.scholarship_name, value: x.name });
        }
      });
      setScholarships(temp);
    }
  }, [scholarshipList]);

  useEffect(() => {
    if (grantList && grantList.length > 0) {
      let temp = [];
      grantList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: x.grant_name, value: x.name });
        } else {
          temp.push({ label: x.grant_name, value: x.name });
        }
      });
      setGrants(temp);
    }
  }, [grantList]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    let totalamount = 0;
    if (newSelectedRowKeys.length > 0) {
      newSelectedRowKeys.map((x) => {
        let am = studentTransHistory?.data.find((y) => y.key == x).amount;
        totalamount = totalamount + Number(am);
      });
    }
    setValue('transaction_amount', totalamount);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Space direction="vertical" className="w-100">
              <Button
                type="link"
                className="c-gray-linkbtn p-0"
                onClick={() => {
                  setData({ data: null, visible: false, type: '' });
                  history.replace(`/finance/transactions/`, {});
                }}
                htmlType="button"
              >
                <LeftOutlined /> Back
              </Button>
              <Title level={3} className="mb-0 c-white">
                {tranactionDetail ? 'Transaction Details' : 'Create New Transaction'}
              </Title>
            </Space>
          </Col>
          <Col span={24}>
            <Card bordered={false} className="uni-card">
              <Row gutter={[20, 20]}>
                {formFields.map((item, index) => (
                  <Fragment key={index}>
                    <FormGroup item={item} control={control} errors={errors} />
                  </Fragment>
                ))}
                {(categorySelect == 'Student Outstanding' || categorySelect == 'Applicant Outstanding') &&
                studentTransHistory ? (
                  <Col span={24}>
                    <Space direction="vertical" size={20} className="w-100">
                      <Card bordered={false} className="red-card">
                        <Space size={4} direction="vertical">
                          <Text className="c-white">Outstanding Balance</Text>
                          <Title level={3} className=" c-white mb-0">
                            {company_currency}{' '}
                            {studentTransHistory.total_outstanding_balance
                              ? formatCurrency(studentTransHistory.total_outstanding_balance.toString())
                              : 0}{' '}
                          </Title>
                        </Space>
                      </Card>
                      <ListCard
                        title={'Outstanding Balance Breakdown'}
                        ListCol={ListCol}
                        ListData={studentTransHistory?.data}
                        rowSelection={rowSelection}
                        pagination={false}
                        listClass="b-black"
                      />
                    </Space>
                  </Col>
                ) : null}
                <Col span={24}>
                  <InputField
                    isRequired={true}
                    fieldname="transaction_amount"
                    label="Transaction Amount"
                    control={control}
                    class="mb-0 no-arrow"
                    iProps={{
                      readOnly: location?.state?.ref ? true : false,
                      placeholder: '0.00',
                      size: 'large',
                      type: 'number',
                      min: 1,
                    }}
                    initValue=""
                    rules={{ required: { value: true, message: 'Amount required' } }}
                    validate={errors.transaction_amount && 'error'}
                    validMessage={errors.transaction_amount && errors.transaction_amount.message}
                  />
                </Col>
                <Col span={24}>
                  <Row gutter={[20, 20]} justify="end">
                    <Col flex="0 1 200px">
                      <Button
                        type="primary"
                        size="large"
                        htmlType="button"
                        className="w-100 black-btn"
                        onClick={() => setData({ data: null, visible: false, type: '' })}
                      >
                        Cancel
                      </Button>
                    </Col>
                    {categorySelect == 'Student Outstanding' && !data?.data?.status && data.type == 'Online' && (
                      <Col flex="0 1 200px">
                        <Button type="primary" size="large" htmlType="submit" className="w-100 green-btn">
                          Generate Link
                        </Button>
                      </Col>
                    )}
                    {(categorySelect == 'Scholarship Payment' || categorySelect == 'Grant Payment') &&
                      !data?.data?.status && (
                        <Col flex="0 1 200px">
                          <Button type="primary" size="large" htmlType="submit" className="w-100 green-btn">
                            Save and Send for Verification
                          </Button>
                        </Col>
                      )}
                    {data?.data?.status == 'Verified' && (
                      <Col flex="0 1 200px">
                        <Button type="primary" size="large" htmlType="submit" className="w-100 gray-btn" disabled>
                          Verified
                        </Button>
                      </Col>
                    )}
                    {(data?.data?.status == 'Pending' || categorySelect == 'Cash Transfer') &&
                      data.type == 'Online' && (
                        <Col flex="0 1 200px">
                          <Button type="primary" size="large" htmlType="submit" className="w-100 green-btn">
                            Save Changes
                          </Button>
                        </Col>
                      )}
                    {data.type == 'Cash' && !data?.data?.status && (
                      <Col flex="0 1 200px">
                        <Button type="primary" size="large" htmlType="submit" className="w-100 green-btn">
                          Save & Print Receipt
                        </Button>
                      </Col>
                    )}
                    {categorySelect == 'Applicant Outstanding' && !data?.data?.status && data.type == 'Online' && (
                      <Col flex="0 1 200px">
                        <Button type="primary" size="large" htmlType="submit" className="w-100 green-btn">
                          Submit
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Col>
                {qrValue && (
                  <Col span={24}>
                    <Row gutter={20} justify="center">
                      <Col>
                        <Space direction="vertical" size={20} className="w-100 text-center">
                          <div style={{ background: 'white', padding: '16px' }}>
                            <QRCode value={qrValue} size={180} />
                          </div>
                          <Text>{qrValue}</Text>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
