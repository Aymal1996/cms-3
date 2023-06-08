import React, { useState, useEffect } from 'react';
import { Form, Space, Typography, Collapse, Tabs, message } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import SmallStatusCard from '../../../../../atoms/SmallStatusCard';
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import { cancelRequest, updateRequest } from '../../ducks/services';
import { contractApi, sendShowCause, sendWarning } from '../../../Employment/ducks/services';
import { updateCarryForwardApprove, updateCarryForwardReject } from '../../../Leaves/ducks/services';
import RequestPanel from './RequestPanel';


const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

export default (props) => {
  
  const { data, selectedTab, selectedPanel, updateReqApi, id } = props;
  const [ activeTab, setActiveTab ] = useState(selectedTab);
  
  const [ load, setLoad ] = useState(false);

  const panelHeader = (appr, title, status) => {
    let x = '';
    appr.map(y => x += y.approvers == 'Job Position' ? y.approver_detail_label : y.approvers + ' ')
      return <Space size={30}>
        <SmallStatusCard
          status={status == 'Archive' ? appr.find(x => x.status == 'Reject') ? 'Reject' : 'Approved' : 'Pending'}
          icon={
            (status == 'Pending' && <ClockCircleFilled />) ||
            (status == 'Archive' && appr.find(x => x.status == 'Reject') ? <CloseCircleFilled /> : <CheckCircleFilled />)
          }
          iColor={
            (status == 'Pending' && 'b-pending') ||
            (status == 'Archive' && appr.find(x => x.status == 'Reject') ? 'b-error' : 'b-success')
          }
        />
        <Space direction='vertical' size={5}>
          <Text className="smallFont12 c-white op-6">{x}</Text>
          <Title level={5} className='lineHeight20 mb-0'>{title}</Title>
        </Space>
      </Space>
  }
 
  const panelRight = (isActive) => {
    return <div>
    <Space size={4}>
      <Title level={5} className='defaultFont mb-0'>{isActive ? 'Hide' : 'View Details'} </Title>
      <UpOutlined rotate={isActive ? 0 : 180}/>
    </Space>
    </div>
  }

  const onRevert = (requestor, name) => {
    let req =[];
    requestor.map(z => {
      if (z.approver_id == id) {
        req.push({
          approver_id: z.approver_id,
          status: 'Pending',
        })
      } else {
        req.push({
          approver_id: z.approver_id,
          status: z.status
        })
      }
    })

    const payload = {
      status: 'Pending',
      approvers: req,
    };

    updateRequest(name, payload)
      .then((response) => {
          message.success('Request Successfully Revert');
          updateReqApi();
      })
      .catch((error) => message.error(error));
  }

  const onCancel = async (item) => {
    setLoad(true);
    cancelRequest(item)
    .then((response) => {
      setLoad(false);
        message.success('Request Canceled')
        updateReqApi();
    })
    .catch((error) => { setLoad(false); message.error(error) });
  }

  const onApproveReject = (status, item, remarks, pos, ind, val) => {
    setLoad(true);
    console.log('chck', item, status, id, pos, ind, val)
    const { name, approvers, form_fields, category } = item;
    let contractid = null;
    let field = [];
    Object.entries(val).map(([key,val]) => {
      field.push({
        field_label: key,
        field_value: val,
      })
    })
    let dep =[];
    approvers.map(z => {
      if (z.approvers == 'Job Position' && pos?.status == 'Pending') {
        dep.push({
          approvers: z.approvers,
          approver_detail: z.approver_detail,
          approver_id: z.approver_id,
          status: status,
          remarks: remarks
        })
      } else if(z.approvers == 'Individual' && ind?.status == 'Pending') {
        dep.push({
          approvers: z.approvers,
          approver_detail: z.approver_detail,
          approver_id: z.approver_id,
          status: status,
          remarks: remarks
        })
      } else if(z.approver_id == id) {
        dep.push({
          approvers: z.approvers,
          approver_detail: z.approver_detail,
          approver_id: z.approver_id,
          status: status,
          remarks: remarks
        })
      } else {
        dep.push({
          approvers: z.approvers,
          approver_detail: z.approver_detail,
          approver_id: z.approver_id,
          status: z.status
        })
      }
    })

    const payload = {
      approvers: dep,
      form_fields: field
    };

    updateRequest(item.name, payload)
    .then((response) => {
        if (category == 'Email Activation') {
          contractid = form_fields.find(fx => fx.field_label == 'Contract ID').field_value;
          contractApi({email_activation_status: status === 'Approve' ? 'Active' : 'Inactive'}, contractid).then(xs => {
            status === 'Approve'
          ? message.success('Request Approve Successfully')
          : message.success('Request Reject Successfully');
          setLoad(false);
          updateReqApi();
          })
        } if (category == 'Card Activation'){
          console.log('categoty', category);
          contractid = form_fields.find(fx => fx.field_label == 'Contract ID').field_value;
          contractApi({card_activation_status:  status === 'Approve' ? 'Active' : 'Inactive'}, contractid).then(xs => {
            status === 'Approve'
          ? message.success('Request Approve Successfully')
          : message.success('Request Reject Successfully');
          setLoad(false);
          updateReqApi();
          })
        } else if(category == 'Warning Letter Approval') {
          const wbody = {
            employee_id: form_fields.find(fx => fx.field_label == 'Staff ID').field_value,
            warning_letter: form_fields.find(fx => fx.field_label == 'Warning Letter ID').field_value,
            status:"Active"
          }
          if (status === 'Approve')  {
            sendWarning(wbody).then(res => {
              message.success('Request Approve Successfully')
              setLoad(false);
              updateReqApi();
            }).catch(e => {
              console.log(e);
              setLoad(false);
              const {response} = e;
              message.error(response);
            })
          } else {
            message.success('Request Reject Successfully');
            setLoad(false);
            updateReqApi();
          }
        } else if(category == 'Show Cause Letter') {
          const wbody2 = {
            employee_id: form_fields.find(fx => fx.field_label == 'Staff ID').field_value,
            showcause_letter: form_fields.find(fx => fx.field_label == 'Warning Letter Type').field_value,
            status:"Active"
          }
          if (status === 'Approve')  {
            sendShowCause(wbody2).then(res => {
              message.success('Request Approve Successfully')
              setLoad(false);
              updateReqApi();
            }).catch(e => {
              console.log(e);
              setLoad(false);
              const {response} = e;
              message.error(response);
            })
          } else {
            message.success('Request Reject Successfully');
            setLoad(false);
            updateReqApi();
          }
        } else if(category == 'Carry Forward Leave Extension') {
          if (status == 'Approve')  {
              updateCarryForwardApprove(item.requester_id).then(xy => {
                  message.success('Request Approve Successfully')
                  setLoad(false);
                  updateReqApi();
              })
          } else {
            updateCarryForwardReject(item.requester_id).then(xy => {
                message.success('Request Reject Successfully');
                setLoad(false);
                updateReqApi();
              })
          }
        } else {
          message.success(`Request ${status} Successfully`)
          setLoad(false);
          updateReqApi();
        }
      })
      .catch((error) => {
        message.error(error)
        setLoad(false);
      });
  };

  const sendWarn = (field) => {
    setLoad(true);
    let ids = field.find(x => x.field_label == 'Staff ID');
    let letter = field.find(x => x.field_label == 'Warning Letter ID');
    const body = {
        employee_id: ids?.field_value,
        show_cause: letter?.field_value
    }
    sendShowCause(body).then(rest => {
      setLoad(false);
    }).catch(e => {
        setLoad(false);
        message.error("Something went worng");
    })
  }

  
  
  return (
      <Tabs activeKey={activeTab} type="card" className="gray-tabs" onChange={(e) => setActiveTab(e)}>
        {Object.entries(data).map(([key,value]) => (
          <TabPane tab={<span className='SentanceCase'>{key == 'yourrequests' ? 'My Requests' :  key}</span>} key={key}>
            <Collapse accordion className='reqPanel' bordered={false} defaultActiveKey={selectedPanel} 
            expandIcon={({isActive}) => panelRight(isActive)}
            expandIconPosition='right'>
              {value && value.map(item => (
                <Panel className='ch-black' header={panelHeader(item?.approvers, item?.form_label, item?.status)} key={item?.name}>
                  <RequestPanel id={id} sendWarn={sendWarn} item={item} activeTab={activeTab} onApproveReject={onApproveReject} onRevert={onRevert} onCancel={onCancel} load={load} />
                </Panel>
                ))}
            </Collapse>
          </TabPane>
        ))}
      </Tabs>
  );
};
