import React, { useState, useEffect } from 'react';
import ListCard from 'Molecules/ListCard';
import DetailsComponent from 'Molecules/DetailsComponent';
import { Row, Col, Card, Progress } from 'antd';
import moment from 'moment';

export default ({details, updateApi, progressData}) => {

  const { title, key, heading, data, column, nodetail, detailTitle, onAction2 } = details;
  const [rowDetails, setRowDetail] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [approverID, setApproverID] = useState('');

  const annualLeaves = progressData?.find(element => element?.leave_type === 'Annual Leave')
  const replacementLeaves = progressData?.find(element => element?.leave_type === 'Replacement Leave')

  const pendingAnnual = annualLeaves?.employee_remaining;
  const approvedAnnual = annualLeaves?.employee_entitlement;
  const percentageAnnual = pendingAnnual/approvedAnnual *100;

  const pendingReplacement = replacementLeaves?.employee_remaining;
  const approvedReplacement = replacementLeaves?.employee_entitlement;
  const percentageReplacement = pendingReplacement/approvedReplacement *100;

  console.log('annualLeaves', progressData)

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowDetail(true)
        setApproverID(record?.approver_id)
        let temp = [
          {
            label: 'Name',
            value: record?.name
          },
          {
            label: 'Date Applied',
            value: record?.creation ? moment(record.creation).format('Do MMMM YYYY') : ''
          },
          {
            label: 'Leave Start',
            value: record?.start_date ? moment(record.start_date).format('Do MMMM YYYY') : ''
          },
          {
            label: 'Leave End',
            value: record?.end_date ? moment(record.end_date).format('Do MMMM YYYY') : ''
          },
          {
            label: 'Leave Period',
            value: record?.leave_period
          },
          {
            label: 'Leave Type',
            value: record?.leave_type
          },
          {
            label: 'Reason',
            value: record?.reason
          },
          // {
          //   label: 'Attachment',
          //   value: record?.tasks
          // },
          {
            label: 'Status',
            value: record?.application_status,
            classi: record?.application_status =='Pending' ? 'c-pending' : record?.application_status == 'Approved' ? 'c-success' : 'c-error' 
          },
        ];
        setRowData(temp)
      },
    };
  }

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo',pagination)
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      updateApi(key, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey);
    } else {
      updateApi(key, pagination.current, pagination.pageSize, '', '');
    }
  }

    return (
        <>
        {!rowDetails ?
            <>
              {key == 'Pending' && (
                <Row gutter={[20,20]}>
                  <Col span={12} className='text-center'>
                    <Card bordered={false} className='uni-card'>
                      <Progress 
                        type="circle" 
                        className='c-progress' 
                        width={200}
                        percent={percentageAnnual} 
                        format={() => <><div className="percent-text">{pendingAnnual}</div> <div className="percent-numb">Annual Leaves</div></>}
                        />
                    </Card>  
                  </Col>
                  <Col span={12} className='text-center'>
                    <Card bordered={false} className='uni-card'>
                      <Progress 
                        type="circle" 
                        className='c-progress' 
                        width={200}
                        percent={percentageReplacement} 
                        format={() => <><div className="percent-text">{pendingReplacement}</div> <div className="percent-numb">Replacement Leaves</div></>}
                        />
                    </Card>  
                  </Col>
                </Row> 
              )}
              <ListCard 
                title={heading}
                onRow={!nodetail ? onClickRow : null}
                ListCol={column} 
                ListData={data?.rows} 
                pagination={{
                  total: data?.count,
                  current: page,
                  pageSize: limit
                }}
                onChange={onTableChange}
                classes={`${!nodetail ? 'clickRow' : ''}`}
                scrolling={500}
                listClass="nospace-card"
                headclass='mt-1'
              />
            </>
            :
            <DetailsComponent 
              setRowDetail={setRowDetail} 
              mainTitle={detailTitle}
              backbtnTitle={heading}
              data={rowData}
              onAction2={onAction2}
              btn2title={'Cancel Application'}
              btnClass2='red-btn'
              updateApi={updateApi}
            />
            }
        </>
    )
}