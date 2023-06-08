import React, { useState, useEffect } from 'react';
import ListCard from 'Molecules/ListCard';
import DetailsComponent from 'Molecules/DetailsComponent';
import moment from 'moment';
import { Row, Col, Card, Progress } from 'antd';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';

export default ({ details, updateApi, progressData }) => {

  const { title, key, heading, data, column, nodetail, detailTitle, onAction1, onAction2 } = details;
  const [rowDetails, setRowDetail] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const annualLeaves = progressData?.find(element => element?.leave_type === 'Annual Leave')
  const replacementLeaves = progressData?.find(element => element?.leave_type === 'Replacement Leave')

  const pendingAnnual = annualLeaves?.employee_remaining;
  const approvedAnnual = annualLeaves?.employee_entitlement;
  const percentageAnnual = pendingAnnual/approvedAnnual *100;

  const pendingReplacement = replacementLeaves?.employee_remaining;
  const approvedReplacement = replacementLeaves?.employee_entitlement;
  const percentageReplacement = pendingReplacement/approvedReplacement *100;

  const btnList = [
    {
      text: '+ Add New Timesheet',
      classes: 'green-btn',
      action: () => { setAddVisible(true); setActiveKey('1') },
    },
  ];

  const onClickRow = (record) => {

    return {
      onClick: (e) => {
        console.log('helloworld', typeof e.target, e.target.tagName)
        if (e.target.tagName == 'SPAN') {
          if(e.target.innerHTML == 'Approve') {
            onAction1(record?.name)
          } else{
            onAction2(record?.name)
          }
        } else {
          setRowDetail(true)
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
              label: 'Start',
              value: record?.start_date ? moment(record.start_date).format('Do MMMM YYYY') : ''
            },
            {
              label: 'End',
              value: record?.end_date ? moment(record.end_date).format('Do MMMM YYYY') : ''
            },
            {
              label: 'Period',
              value: record?.leave_period
            },
            {
              label: 'Type',
              value: record?.leave_type
            },
            {
              label: 'Status',
              value: record?.status,
              classi: record?.application_status == 'Pending' ? 'c-pending' : record?.status == 'Approved' ? 'c-success' : 'c-error'
            },
            {
              label: 'Approver',
              value: record?.approvers_list,
              status: 'hidden'
            },
          ];
          setRowData(temp)
        }
      },
    };
  }

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination)
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      updateApi(key, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey);
    } else {
      updateApi(key, pagination.current, pagination.pageSize, '', '');
    }
  }

  const allowBtn = () => {
    const approvers = rowData?.find(x => x.label == 'Approver');
    let showBtn = false;
    let i = 0;
    if (approvers) {
      do {
        if (approvers?.value[i]?.status == 'Pending') {
          if (approvers?.value[i]?.approver_id == id) {
            showBtn = true;
            break
          } else {
            break
          }
        }
        i++
      } while (i <= approvers?.value?.length);
    }
    return showBtn
  }

  return (
    <>
      {!rowDetails ?
        <>
          {key == 'Pending' && (
            <Row gutter={[20, 20]}>
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
          btn1title={allowBtn() || allowed([Roles.LEAVES_TEAMS, Roles.LEAVES], 'write') ? 'Approve' : null}
          btn2title={allowBtn() || allowed([Roles.LEAVES_TEAMS, Roles.LEAVES], 'write') ? 'Reject' : null}
          onAction1={allowBtn() || allowed([Roles.LEAVES_TEAMS, Roles.LEAVES], 'write') ? onAction1 : null}
          onAction2={allowBtn() || allowed([Roles.LEAVES_TEAMS, Roles.LEAVES], 'write') ? onAction2 : null}
          btnClass1='green-btn'
          btnClass2='red-btn'
        />
      }
    </>
  )
}