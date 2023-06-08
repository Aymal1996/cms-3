import React,  { Fragment, useEffect } from 'react';
import { Row, Col, Typography, Card, Button } from 'antd';
import FormGroup from 'Molecules/FormGroup';
import { approveOption, grantDurationList, grantSourceList } from '../../../../../../configs/constantData';
import { getStaffs } from '../../../../../modules/Application/ducks/actions';
import { useSelector, useDispatch } from 'react-redux';

const { Title } = Typography;

export default (props) => {

    const { control, errors, mode } = props;
    const staffList = useSelector(state => state.global.staff);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStaffs());
      }, []);

    const formFields = [
        {
            type: 'input',
            name: 'grant_name',
            label: 'Grant Name',
            req: true,
            placeholder: 'Please state',
            twocol: false,
            reqmessage: 'Grant name required',
            static: mode == 'view' ? true : false,
        },
        {
            name: 'lecturer_id',
            label: 'Lecturer',
            req: true,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            colWidth: '1 0 350px',
            reqmessage: 'Lecturer required',
            options: staffList.map(x => ({label: x.employee_name, value: x.name})),
            static: mode == 'view' ? true : false,
        },
        {
            name: 'grant_date',
            label: 'Grant Date',
            req: true,
            placeholder: 'Please state',
            type: 'date',
            twocol: false,
            colWidth: '1 0 350px',
            reqmessage: 'Date required',
            static: mode == 'view' ? true : false,
            format: 'Do MMMM YYYY'
        },
        {
            name: 'source',
            label: 'Source',
            req: true,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            colWidth: '1 0 350px',
            reqmessage: 'Source required',
            options: grantSourceList,
            static: mode == 'view' ? true : false,
        },
        {
            name: 'duration',
            label: 'Grant Duration',
            req: true,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            colWidth: '1 0 350px',
            reqmessage: 'Druation required',
            options: grantDurationList,
            static: mode == 'view' ? true : false,
        },
        {
            name: 'grant_amount',
            label: 'Grant Amount',
            req: true,
            placeholder: 'Please state',
            type: 'input',
            number: true,
            twocol: false,
            colWidth: '1 0 350px',
            reqmessage: 'Amount required',
            static: mode == 'view' ? true : false,
        },
        {
            name: 'grant_lecturer',
            label: 'Lecturer',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: false,
            colWidth: '1 0 350px',
            static: true,
            hidden: mode != 'view' ? true : false,
        },
        {
            name: 'faculty_verification',
            label: 'Faculty Verification',
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            colWidth: '1 0 350px',
            options: approveOption,
            hidden: mode == 'add' ? true : false,
            static: mode == 'view' ? true : false,
            // addonAfter: grantFinanceStatus
        },
        {
            name: 'finance_verification',
            label: 'Finance Verification',
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            colWidth: '1 0 350px',
            options: approveOption,
            hidden: mode != 'edit' ? true : false,
            static: true,
            // addonAfter: grantFinanceStatus
        },
        {
            type: 'upload',
            name: 'attachments',
            label: 'Grant Attachment',
            placeholder: 'Please Upload File',
            static: mode == 'view' ? true : false,
            req: mode == 'edit' ? true : false,
            reqmessage: 'attachment required',
            twocol: false,
            colWidth: '1 0 350px',
            accept: '.pdf',
        },
    ];

    return (
        <Card bordered={false} className="uni-card h-auto">
            
            <Row gutter={[20, 30]} align="bottom">
                {mode == 'view' ?
                <Col span={24}>
                    <Title level={4} className='c-default mb-0'>Grant Summary</Title>
                </Col> : null}
                {formFields.map((item, idx) => (
                    <Fragment key={idx}>
                        <FormGroup item={item} control={control} errors={errors} />
                    </Fragment>
                ))}
                {mode != 'view' ?
                 <Col span={24}>
                     <Row gutter={[20,20]} justify='end'>
                        {mode == 'add' ? <Col flex='0 1 200px'><Button size="large" type="primary" htmlType="button" className="gray-btn w-100" onClick={props.onDraft}>Save Draft</Button></Col> : null}
                        <Col flex='0 1 200px'><Button size="large" type="primary" htmlType="submit" className="green-btn w-100">{mode == 'edit' ? 'Save Changes' : 'Add Grant'}</Button></Col>
                    </Row>
                </Col>:null}
            </Row>
        </Card>
    )
}