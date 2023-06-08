import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Form } from 'antd';
import ListCard from 'Molecules/ListCard';
import { PopupSuccess } from 'Atoms/Popup';
// import ContractForm from '../../../Employment/components/EmployeeForm/tabList/Contract';
import { useDispatch, useSelector } from 'react-redux';
import { getContracts } from '../../dcuks/actions';
import moment from 'moment';

const { Title } = Typography;

const popup = {
  closable: false,
  className: 'black-modal',
  title: 'Successfully Changed Position',
  width: 500,
};

const colName = [
  {
    title: 'Contract Type',
    dataIndex: 'contract_type',
    key: 'contract_type',
    sorter: true,
  },
  {
    title: 'Job Title',
    dataIndex: 'job_title_name',
    key: 'job_title_name',
    sorter: true,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : text),
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : text),
  },
];

const eligibleCol = [
  {
    title: 'Job Title',
    dataIndex: 'job_open',
    key: 'job_open',
    sorter: true,
  },
  {
    title: 'Fit Index',
    dataIndex: 'job_fit',
    key: 'job_fit',
    sorter: true,
    align: 'center',
    render: (text, record) => (
      <span
        className={`${
          text > 80
            ? 'c-success'
            : text > 60
            ? 'c-pending'
            : 'c-error'
        }`}
      >
        {text}
      </span>
    ),
  },
];

const eligible = [
  {
    job_title: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd',
    index_ratio: '68%',
  },
  {
    job_title: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd',
    index_ratio: '68%',
  },
  {
    job_title: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd',
    index_ratio: '68%',
  },
];

export default (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const contractList = useSelector((state) => state.advancement.contractList);
  const figures = useSelector((state) => state.advancement.fitFigures);

  useEffect(() => {
    dispatch(getContracts(id, page, limit, '', ''));
  }, []);

  const onClickRow = (record) => {
    return {
      onClick: () => {
        // setRowData(record);
        // setViewJobOpenings(true);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getContracts(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getContracts(id, pagination.current, pagination.pageSize, '', ''));
    }
  };

  const onPosition = () => PopupSuccess(popup);

  return (
    <Row gutter={[20, 30]} justify="end">
      <Col span={24}>
        <ListCard
          classes="clickRow"
          title="Employment History"
          headclass="mt-1"
          listClass="nospace-card"
          ListCol={colName}
          ListData={contractList?.rows}
          onRow={onClickRow}
          onChange={onTableChange}
          scrolling={500}
          pagination={{
            total: contractList?.count,
            current: page,
            pageSize: limit,
          }}
        />
      </Col>
      <Col span={24}>
        <Title level={4} className='mb-0 c-default'>Eligibility for Open Positions</Title>
      </Col>
      <Col span={24}>
        <ListCard 
          listClass="small-card8 cardpx-0 b-black"
          ListCol={eligibleCol}
          ListData={figures?.skills_match}
          scrolling={500}
          pagination={false}
        />
      </Col>
      {/* <Col>
        <Button size="large" type="primary" className="green-btn" onClick={onPosition}>
          Change Position
        </Button>
      </Col> */}
      {/* <Col span={24}>
        <Button type="link" className="mb-0 p-0 c-gray-linkbtn" icon={<LeftOutlined />} onClick={onViewFormHandler}>
          Employment History
        </Button>
      </Col>
      <Col span={24}>
          <Form layout="vertical" scrollToFirstError={true}>
            <ContractForm control={control} errors={errors} />
          </Form>
      </Col>
      <Col><Button size="large" type="primary" className="red-btn">Terminate Employee</Button></Col>
      <Col><Button size="large" type="primary" className="green-btn">Save Changes</Button></Col> */}
    </Row>
  );
};
