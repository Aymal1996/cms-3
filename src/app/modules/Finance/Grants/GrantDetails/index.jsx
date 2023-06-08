import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Breadcrumb, Space, Typography } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from 'Molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import OutstandingList from 'Molecules/OutstandingList';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import UpdateSection from 'Molecules/UpdateSection';
import moment from 'moment';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { useMediaQuery } from 'react-responsive';
import RequestComponent from '../../../components/RequestComponent';
import { getGrantDetails } from '../../../Faculty/Grants/ducks/actions';
import GrantForm from '../../../Faculty/Grants/components/GrantForm';
import { formatCurrency, getFileName } from '../../../../../features/utility';
import { baseUrl } from '../../../../../configs/constants';
import { getFinanceGrantPaymentHistory, getGrantRequest } from '../../ducks/actions';

const { Title, Text } = Typography;

// const grantHistoryData = {
//     total_amount: '950,000.00',
//     balance: '950,000.00',
//     rows: [
//         {
//             transaction_date: '2021-11-01',
//             ref_no: '00000',
//             category: 'Grant Payment',
//             amount: '10,000',
//             grant_balance: '30,000'
//         },
//     ],
//     count: 20
// }

export default (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  const grantCol = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
    },
    {
      title: 'Ref No.',
      dataIndex: 'transaction_reference',
      key: 'transaction_reference',
    },
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      render: (text) => (
        <span className="c-success">
          {company_currency} {text && formatCurrency(text)}
        </span>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance_amount',
      key: 'balance_amount',
      render: (text) => (
        <span>
          {company_currency} {text && formatCurrency(text)}
        </span>
      ),
    },
  ];

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { control, errors, setValue, handleSubmit } = useForm();
  const grantData = useSelector((state) => state.grants.grantsingledata);
  const commentsApi = useSelector((state) => state.global.comments);
  const grantHistoryData = useSelector((state) => state.finance.grantPaymentHistory);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const locate = location.pathname.split('/')[1];

  useEffect(() => {
    dispatch(getGrantDetails(id));
    dispatch(getComments('Grant', `${id}`));
    dispatch(getFinanceGrantPaymentHistory(id));
    return () => dispatch(emptyComments());
  }, []);

  const sideData = [
    {
      type: 'tag',
      title: 'Grant',
      subChild: true,
      subChildTitle: grantData?.grant_name,
      highlight: true,
    },
    {
      type: 'titleValue',
      title: 'Created',
      level: isHDScreen ? 4 : 5,
      value: grantData?.grant_date ? moment(grantData?.grant_date).format('Do MMMM YYYY') : '',
      highlight: true,
    },
    {
      type: 'titleValue',
      title: 'Grant Duration',
      level: isHDScreen ? 4 : 5,
      value: grantData?.grant_duration,
      highlight: true,
      noDivider: true,
    },
    {
      type: 'titleValue',
      title: 'Amount',
      level: isHDScreen ? 4 : 5,
      value: grantData?.grant_amount,
    },
    {
      type: 'titleValue',
      title: 'Lecturer',
      level: isHDScreen ? 4 : 5,
      value: grantData?.grant_lecturer,
    },
    {
      type: 'titleValue',
      title: 'Source',
      level: isHDScreen ? 4 : 5,
      value: grantData?.source,
      noLine: true,
    },
    // {
    //     type: 'titleValue',
    //     title: 'Created',
    //     space: isHDScreen ? 10 : 4,
    //     level: isHDScreen ? 4 : 5,
    //     value: grantData?.creation ? moment(grantData?.created).format('Do MMMM YYYY') : '',
    //     noDivider: true,
    //     highlight: true,
    //     noLine: true
    // },
  ];

  const PaymentBlock = () => (
    <Row gutter={[20, 20]}>
      <Col span={12}>
        <Card bordered={false} className="red-card">
          <Space size={10} direction="vertical">
            <Title level={5} className="mb-0 c-white">
              Remaining Payments
            </Title>
            <Title level={3} className="c-white mb-0">
              {company_currency}: {grantHistoryData?.remaining_payment}
            </Title>
          </Space>
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false} className="uni-card-small b-black">
          <Space size={10} direction="vertical">
            <Title level={5} className="mb-0 c-white">
              Account Balance
            </Title>
            <Title level={3} className="c-white mb-0">
              {company_currency}: {grantHistoryData?.account_balance}
            </Title>
          </Space>
        </Card>
      </Col>
    </Row>
  );

  useEffect(() => {
    if (grantData && Object.keys(grantData).length > 0) {
      setValue('grant_name', grantData?.grant_name);
      setValue('grant_date', grantData?.grant_date ? moment(grantData?.grant_date, 'Do MMMM YYYY') : '');
      setValue('source', grantData?.source ? { label: grantData?.source, value: grantData?.source } : '');
      setValue(
        'grant_duration',
        grantData?.grant_duration ? { label: grantData?.grant_duration, value: grantData?.grant_duration } : '',
      );
      setValue('grant_amount', grantData?.grant_amount);
      setValue(
        'faculty_verification',
        grantData?.faculty_verification
          ? { label: grantData?.faculty_verification, value: grantData?.faculty_verification }
          : '',
      );
      setValue('grant_lecturer', grantData?.grant_lecturer);
      if (grantData?.attachment) {
        setValue('attachments', {
          fileList: [
            {
              uid: '-1',
              name: getFileName(grantData?.attachment),
              status: 'done',
              url: `${baseUrl}${grantData?.attachment}`,
            },
          ],
        });
      }
    }
  }, [grantData]);

  const onFinish = async (val) => {};

  const updateComment = () => {
    dispatch(getComments('Grant', `${id}`));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href={`/${locate}/grants`}>Grant</Breadcrumb.Item>
        <Breadcrumb.Item>Grant Details</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[30, 24]}>
        <Col span={24}>
          <HeadingChip title="Grant Details" />
        </Col>
        <Col span={24}>
          <div className="twocol-3070">
            <div className="side-detail">
              {isHDScreen ? (
                <SideDetails data={sideData} type="button" />
              ) : (
                <SideDetailResponsive data={sideData} type="button" />
              )}
            </div>
            <div className="side-form">
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <RequestComponent id={id} type="grant" />
                  </Col>
                  <Col span={24}>
                    <OutstandingList
                      column={grantCol}
                      data={grantHistoryData?.data}
                      count={grantHistoryData?.count}
                      ExtraBlocks={grantHistoryData?.remaining_payment && PaymentBlock}
                      heading={'Transaction History'}
                      scroll={500}
                    />
                  </Col>

                  <Col span={24}>
                    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
                      <GrantForm control={control} errors={errors} setValue={setValue} mode="view" />
                    </Form>
                  </Col>
                  <Col span={24}>
                    <UpdateSection data={commentsApi} code={id} module={'Grant'} updateComment={updateComment} />
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
