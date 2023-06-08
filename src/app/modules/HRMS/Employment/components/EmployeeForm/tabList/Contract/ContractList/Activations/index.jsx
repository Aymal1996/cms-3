import React from 'react';
import { Row, Col, Space, Card, Button, Typography, message } from 'antd';
import { PopupSuccess } from 'Atoms/Popup';
import { getRequest, getApproverLead } from '../../../../../../../Requests/ducks/services';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { createRequest } from '../../../../../../../Requests/ducks/services';
import { contractApi, welcome } from '../../../../../../ducks/services';

const { Title, Text } = Typography;

const popup = {
    closable: false,
    className: 'black-modal',
    title: 'Email Activation Sent',
    content: '',
    width: 536,
};

const popup1 = {
    closable: false,
    className: 'black-modal',
    title: 'Card Activation Sent',
    content: '',
    width: 536,
};

const popup2 = {
  closable: false,
  className: 'black-modal',
  title: 'Welcome Email Sent',
  content: '',
  width: 536,
};

export default (props) => {

    const { id, data, setLoad, updateApi, onBack } = props;
    const staffData = useSelector(state => state.advancement.advData)
    const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];
    const details = useSelector((state) => state.employment.empDetails);

    const sendRequest = async (type) => {
      setLoad(true);
      const req = await getRequest(type);
      if (req) {
        console.log('Data', req)
      } else {
        setLoad(false);
        return false;
      }
      
      let approvetemp = [];
      let appr = await getApproverLead(id);
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
            Status:"Pending",
            remarks:""
        })
      })

      let body1 = {
          form_name: req.data.message.form_name,
          sender: req.data.message.sender,
          category: req.data.message.category,
          approvers: approvetemp,
          status: 'Pending',
          form_fields: [
          { 
            field_label: "Requester",
            field_type: "Text",
            field_value:user.full_name
          },
          {
            field_label: "Requester ID",
            field_type: "Text",
            field_value:user.name
          },    
          {
            field_label: "Requester Team",
            field_type: "Text",
            field_value:user.team_name
          },
          {
            field_label: "Date",
            field_type: "Date",
            field_value: moment().format('YYYY-MM-DD')
          },
          {
            field_label: "Request For",
            field_type: "Text",
            field_value: staffData?.employee_name
          },
          {
            field_label: "Staff ID",
            field_type: "Text",
            field_value: id
          },
          {
            field_label: "Company",
            field_type: "Text",
            field_value:staffData?.company || ''
          },
          {
            field_label: "Request For Team",
            field_type: "Text",
            field_value:staffData?.team_name[0] || ''
          },
          {
            field_label: "Contract ID",
            field_type: "Text",
            field_value:data[0]?.value
          },
        ]
      }
      if (type == 'Email Activation') {
        body1.form_fields.push(
          {
            field_label: "New Work Email",
            field_type: "Text",
            field_value:""
          },
          {
            field_label: "Work Email Password",
            field_type: "Text",
            field_value:""
          }
        )
      }
      console.log('checking body',body1,appr.data.message)
          createRequest(body1).then(resi => {
            if (type == 'Email Activation') {
              contractApi({email_activation_status: 'Pending'}, data[0]?.value).then(xs => {
                updateApi();
                setLoad(false);
                PopupSuccess(popup);
                onBack();
              }).catch(e => {
                message.error('Something went wrong');
                setLoad(false);
              })
            } else {
              contractApi({card_activation_status: 'Pending'}, data[0]?.value).then(xs => {
                updateApi();
                setLoad(false);
                PopupSuccess(popup1);
                onBack();
              }).catch(e => {
                message.error('Something went wrong');
                setLoad(false);
              })
            }
              
          }).catch(e => {
            console.log('e',e)
            setLoad(false);
          })
    }

    const sendWelcome = () => {
      welcome(id).then(res => {
        setLoad(false);
        if (res.data.message.status == false) {
          message.error(res.data.message.message)
        } else {
          updateApi();
          PopupSuccess(popup2);
        }
      }).catch(e => {
        setLoad(false);
        const { response } = e;
        console.log('error', response.data)
      })
    }

    return (
        <Row gutter={[20,30]}>
            <Col span={24}><Title level={4} className='mb-0 c-default'>Email & Card Activation</Title></Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Card bordered={false} className='mini-card b-dark-gray'>
                            <Row gutter={[20,20]} align='middle'>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>Email Activation</Title>
                                        <Text className='c-gray smallFont12'>Please ensure all of the fields are filled before sending request</Text>
                                    </Space>
                                </Col>
                                <Col>
                                
                                {data.find(x => x.field == 'email_activation_status').value == 'Pending' ?
                                  <Button htmlType='button' type='primary' size='large' className='black-btn'>Pending Request</Button>
                                  : data.find(x => x.field == 'email_activation_status').value != 'Active' ?
                                    <Button htmlType='button' type='primary' size='large' className='' onClick={() => sendRequest('Email Activation')}>Send Request</Button>
                                    :
                                    <Text>Email Activated</Text>
                                }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Card bordered={false} className='mini-card b-dark-gray'>
                            <Row gutter={[20,20]}>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>Card Activation</Title>
                                        <Text className='c-gray smallFont12'>Please ensure all of the fields are filled before sending request</Text>
                                    </Space>
                                </Col>
                                <Col>
                                {data.find(x => x.field == 'card_activation_status').value == 'Pending' ?
                                  <Button htmlType='button' type='primary' size='large' className='black-btn'>Pending Request</Button>
                                  :
                                  data.find(x => x.field == 'card_activation_status').value != 'Active' ?
                                  <Button htmlType='button' type='primary' size='large' className='' onClick={() => sendRequest('Card Activation')}>Send Request</Button>
                                  :
                                  <Text>Card Activated</Text>
                                }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]}>
                    <Col span={24}>
                        <Card bordered={false} className='mini-card b-dark-gray'>
                            <Row gutter={[20,20]}>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>Welcome Email</Title>
                                        <Text className='c-gray smallFont12'>{details?.welcome_email_sent == 1  ? 'Re-' : ''}Send welcome email to user</Text>
                                    </Space>
                                </Col>
                                <Col>
                                  <Button htmlType='button' type='primary' disabled={details?.is_employee_terminate == 1 ? true: false} size='large' className='green-btn' onClick={() => sendWelcome()}>{details?.welcome_email_sent == 1  ? 'Re-' : ''}Send Welcome Email</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}