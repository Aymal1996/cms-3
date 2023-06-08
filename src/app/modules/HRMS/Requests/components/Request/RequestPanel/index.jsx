import React, { Fragment } from 'react';
import { Descriptions, Row, Col, Button, Spin, Form, message } from 'antd';
import { InputField } from '../../../../../../atoms/FormElement';
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import ApproveRejectButton from '../ApproveRejectButton';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';


const antIcon = <LoadingOutlined spin />;

export default (props) => {

    const { id, item, activeTab, onApproveReject, onRevert, onCancel, load, sendWarn } = props;
    const { control, getValues, handleSubmit } = useForm();

    const cancelBtn = (fileds, name) => {
        let x = fileds.find(y => y.field_label == "Requester ID" && y.field_value == id)
        if (x) {
            return (
                <Col flex='0 1 200px'>
                <Button type='primary' htmlType='button' size='large' className='w-100' onClick={() => onCancel(name)}>Cancel Requests</Button>
                </Col>
            )
        }
    }

    const revertBtn = (appr, name) => {
        let x = appr.find(y => y?.status == "Pending")
        if (!x) {
            return (
                <Col flex='0 1 200px'>
                <Button type='primary' htmlType='button' size='large' className='w-100' onClick={() => onRevert(appr, name)}>Revert</Button>
                </Col>
            )
        }
    }

    const onFinish = (val) => {}

    

    return (
        <Spin indicator={antIcon} size="large" spinning={load}>
        <Row gutter={[20,20]}>
            <Col span={24}>
                <Form 
                  scrollToFirstError={true}
                  onFinish={handleSubmit(onFinish)}
                  labelCol={{ flex: '0 1 162px' }}
                  wrapperCol={{ flex: 'auto' }}
                  layout="horizontal"
                  labelAlign="left"
                >
                {item?.form_fields.map((fd, i) => (
                    <Fragment key={i}>
                    <InputField
                    fieldname={fd?.field_label}
                    label={fd?.field_label}
                    control={control}
                    className='labeldefaultFont'
                    iProps={{ placeholder: 'Please state', readOnly: fd?.field_value ? true : false}}
                    initValue={fd?.field_value ? fd?.field_value : ''}
                    />
                    {/* <Descriptions.Item key={fd?.field_label} label={fd?.field_label}>{fd?.field_value}</Descriptions.Item> */}
                    </Fragment>
                ))}
                </Form>
                <Descriptions className='reqData' bordered colon={false} column={1}>
                {item?.approvers.map((fx) => {
                    if (fx.approvers != 'Individual') {
                        return <Descriptions.Item className={`icon-size20 ${fx?.status == 'Approve' ? 'icon-green' : 'icon-red'}`} key={fx?.approver_id} label={fx?.approvers == 'Job Position' ? fx?.approver_detail_label : fx?.approvers}>{fx?.status} {fx?.status == 'Approve' ? <CheckCircleFilled /> : <CloseCircleFilled />}</Descriptions.Item>
                    }
                })}
                </Descriptions>
                
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]} className='justify-right'>
                {activeTab == 'pending' && <ApproveRejectButton data={item} currentID={id} onAction={(status, item, remarks, pos, ind) => onApproveReject(status, item, remarks, pos, ind, getValues())} />}
                {activeTab =='archive' && revertBtn(item.approvers, item?.name)}
                {activeTab =='archive' && item.category == 'Show Cause Letter' && 
                <Col>
                    <Button type='primary' htmlType='button' size='large' className='red-btn' onClick={() => sendWarn(item?.form_fields)}>Send Warning</Button>
                </Col>
                }
                {activeTab == 'yourrequests' && cancelBtn(item?.form_fields, item?.name)}
                </Row>
            </Col>
        </Row>
    </Spin>
    )
}