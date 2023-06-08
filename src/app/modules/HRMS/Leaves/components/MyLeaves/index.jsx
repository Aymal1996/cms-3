import React, { useState, useEffect } from 'react';
import { Card, Tabs, Spin, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { getMyLeaves, getMyAvailableLeaves, getCarryForwardStatus  } from '../../ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import ListCard from 'Molecules/ListCard';
import ApplyLeave from './Component/ApplyLeave';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';
import LeaveApplication from '../LeaveApplication';
import { LoadingOutlined } from '@ant-design/icons';
import { updateCarryForward, updateCarryForwardReject } from '../../ducks/services';
import { createRequest, getApproverLead, getRequest } from '../../../Requests/ducks/services';
import moment from 'moment';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined spin />;

const ListCol = [
  {
    title: 'Leave Type',
    dataIndex: 'leave_type',
    key: 'leave_type',
    sorter: true, 
  },
  {
    title: 'Carried Forward',
    dataIndex: 'carry_forwarded_leaves',
    key: 'carry_forwarded_leaves',
    align: 'center',
    sorter: true,
    render: (text) => <span>{text} Days</span>
  },
  {
    title: 'Entitlement',
    dataIndex: 'total_leaves',
    key: 'total_leaves',
    sorter: true,
    align: 'center',
    render: (text) => <span>{text} Days</span>
  },
  {
    title: 'Taken',
    dataIndex: 'taken_leaves',
    key: 'taken_leaves',
    sorter: true,
    align: 'center',
    render: (text) => <span>{text} Days</span>
  },
  {
    title: 'Available',
    dataIndex: 'available_leaves',
    key: 'available_leaves',
    align: 'center',
    sorter: true,
    render: (text) => <span className="c-success">{text} Days</span>
  },
]

export default (props) => {

  const dispatch = useDispatch();
  const [addVisible, setAddVisible] = useState(false)
  const myTaskData = useSelector(state => state.leaves.myTaskData);
  const myAvailableLeaves = useSelector(state => state.leaves.myAvailableLeaves);
  const cfStatus = useSelector(state => state.leaves.cforwardstatus);
  const [rowDetails, setRowDetail] = useState(false);
  const [mode, setMode] = useState('');
  const [selectedRecord, setRecord] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const [load, setLoad] = useState(false);
  
  const userdetail = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];
  
  useEffect(() => {
    updateTimesheet('Pending', 1, 10, '', '')
  }, []);


  const updateTimesheet = (status, page, limit, sort, sortby) => {
    dispatch(getMyLeaves(userdetail?.name, status, page, limit, sort, sortby));
    dispatch(getCarryForwardStatus(userdetail?.name));
    dispatch(getMyAvailableLeaves(userdetail?.name));
  }

  const btnList = [
    {
      text: '+ Apply Leave',
      classes: 'green-btn',
      action: () => { setAddVisible(true); setActiveKey('1'); setMode('add') },
    },
  ];

  const updateApi = () => {
    setRecord(null);
    dispatch(getMyLeaves(userdetail.name,'Pending', 1, 10, '', ''));
    dispatch(getMyAvailableLeaves(userdetail?.name));
  }

  const carryForward = async () => {
    setLoad(true)
    const req = await getRequest('Carry Froward Leave Extension');
      if (req) {
        console.log('Data', req)
      } else {
        return false;
      }
      
      let approvetemp = [];
      let appr = await getApproverLead(userdetail.name);
      req?.data?.message?.approvers.map(x => {
        let aid = '';
        if (x.approvers == 'Manager') {
          aid = appr.manager_id;
        } else if (x.approvers == 'Supervisor') {
          aid = appr.supervisor_id;
        } else if(x.approvers == 'Supervisor') {
          aid = appr.supervisor_id;
        }

        approvetemp.push({
            approvers: x.approvers,
            approver_detail: x.approver_detail || '',
            approver_id: aid,
            status:"Pending",
            remarks:""
        })
      })

      let body1 = {
          form_name: req.data.message.form_name,
          sender: req.data.message.sender,
          category: req.data.message.category,
          approvers: approvetemp,
          status:"Pending",
          form_fields: [
          { 
            field_label: "Requester",
            field_type: "Text",
            field_value:userdetail.full_name
          },
          {
            field_label: "Requester ID",
            field_type: "Text",
            field_value:userdetail.name
          },    
          {
            field_label: "Requester Team",
            field_type: "Text",
            field_value:userdetail.team_name || ''
          },
          {
            field_label: "Date",
            field_type: "Date",
            field_value: moment().format('YYYY-MM-DD')
          },
          {
            field_label: "Request For",
            field_type: "Text",
            field_value: userdetail?.full_name
          },
          {
            field_label: "Staff ID",
            field_type: "Text",
            field_value: userdetail.name
          },
          {
            field_label: "Company",
            field_type: "Text",
            field_value:userdetail?.company || ''
          },
          {
            field_label: "Request For Team",
            field_type: "Text",
            field_value:userdetail?.team_name || ''
          },
          {
            field_label: "Carry Forward Leave",
            field_type: "Text",
            field_value:"Annual Leave"
          },
          
        ]
      }
      console.log('------------', body1)
      
          updateCarryForward(userdetail.name).then(ax => {
            console.log('checking body')
            if(ax?.data?.message?.success == "True") {
              body1.form_fields.push({
                field_label: "Cut Off Date Extension",
                field_type: "Text",
                field_value:`${ax?.data?.message?.cut_off_days} Days`
              })
              createRequest(body1).then(resi => {
                setLoad(false);
                updateTimesheet('Pending', 1, 10, '', '');
                message.success('Carry Forward Request Generated')
              })
            } else {
              setLoad(false);
              message.error(ax.data.message.message)
            }
            
          }).catch(e => {
            setLoad(false);
            message.error('Something went wrong')
            console.log('e',e)
          })
  }

  return (
    <>
      {!addVisible && <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />}
      <Card bordered={false} className='uni-card'>
        <Tabs activeKey={activeKey} type="card" className='custom-tabs' onChange={(e) => setActiveKey(e)}>
          <TabPane key={'1'} tab='Leave Application'>
            {!rowDetails && !addVisible &&
              <LeaveApplication id={userdetail.name} updateApi={updateTimesheet} ListData={myAvailableLeaves?.summary} data={myTaskData} />
            }
            {addVisible && <ApplyLeave id={userdetail.name} fullName={userdetail.fullName} updateApi={updateApi} mode={mode} data={selectedRecord} setAddVisible={setAddVisible} />}
          </TabPane>

          <TabPane key={'2'} tab='Availability'>
              <Spin indicator={antIcon} size="large" spinning={load}>
                <ListCard 
                  title='Leave Availability' 
                  ListCol={ListCol} 
                  ListData={myAvailableLeaves?.availibility} 
                  pagination={false}
                  extraBtn={cfStatus[0]?.carry_forward_expiry_status == 'Yes' ? 'Carry Forward Extension (60 Days)' : cfStatus[0]?.carry_forward_expiry_status == 'Pending' ? 'Carry Forward Request Pending' : null}
                  extraAction={cfStatus[0]?.carry_forward_expiry_status == 'Yes' ? carryForward : null}
                  btnClass={cfStatus[0]?.carry_forward_expiry_status == 'Yes' ? 'green-btn' : 'black-btn'}
                  // extraBtn={'Carry Forward Extension (60 Days)'}
                  // extraAction={carryForward}
                  // btnClass={'green-btn'}
                />
              </Spin>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};