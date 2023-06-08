import React, { useState, useEffect } from 'react';
import { Input, Form, Row, Col, Button } from 'antd';

export default ({data, currentID, onAction, getValues}) => {

    const permit = JSON.parse(localStorage.getItem('access'));
    const [rejectEnable, setRejectEnable] = useState(false);
    const [approverPermit, setApproverPermit] = useState({
      pos : null,
      ind : null,
      // other: null,
    })
  
    useEffect(() => {
      if (data) {
        setApproverPermit({
          pos : data.approvers.find(y => permit.role_list.find(z => Object.keys(z) == y.approver_detail)),
          // ind : data.approvers.find(y => y.approver_detail == currentID),
          ind : data.approvers.find(y => y.approver_id == currentID),
        })
      }
      
    }, [data]);
  
    useEffect(() => {
      if (approverPermit) {
        console.log('checking permit', approverPermit);
      }
    }, [approverPermit]);
    
  
    const onFinish = (val) => {
      onAction('Reject', data, val.remarks, approverPermit.pos, approverPermit.ind);
    }
    
    return (
        <>
          {rejectEnable ?
          <>
            <Col span={24}>
              <Form onFinish={onFinish} layout='vertical' className='w-100'>
                <Row gutter={[20,20]}>
                  <Col span={24}>
                    <Form.Item label='Remarks' name='remarks' className='mb-0 w-100'>
                      <Input.TextArea 
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Button type='primary' htmlType='button' className='w-100 green-btn' size='large' onClick={() => onAction('Approve', data, null, approverPermit.pos, approverPermit.ind)}>Approve</Button>
                  </Col>
                  <Col span={12}>
                    <Button type='primary' htmlType='submit' className='w-100 red-btn' size='large'>Reject</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </>
          :
          <>
          {(approverPermit.pos && approverPermit.pos?.status == 'Pending' || approverPermit.ind && approverPermit.ind?.status == 'Pending') && 
          <>
          {approverPermit.ind && approverPermit.ind?.approvers == 'Individual' ?
          <Col>
            <Button type='primary' htmlType='button' size='large' onClick={() => onAction('Approve', data, null, approverPermit.pos, approverPermit.ind)}>Submit</Button>
          </Col>
          :
          <>
            <Col span={12}>
              <Button type='primary' htmlType='button' className='w-100 green-btn' size='large' onClick={() => onAction('Approve', data, null, approverPermit.pos, approverPermit.ind)}>Approve</Button>
            </Col>
            <Col span={12}>
              <Button type='primary' htmlType='button' className='w-100 red-btn' size='large' onClick={() => setRejectEnable(true)}>Reject</Button>
            </Col>
            </>}
            </>}
          </>}
        </>
    )
  }