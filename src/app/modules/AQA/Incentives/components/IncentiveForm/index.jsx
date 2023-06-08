import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';
import { useFieldArray } from 'react-hook-form';
import { academicDuration, renewalDuration, studentType } from '../../../../../../configs/constantData';
import { getApplicationTypeDrop, getCountryDrop } from '../../../../Marketing/Applications/ducks/actions';
import { getCurrentYearIntakes } from '../../ducks/actions';
import IncentiveArray from '../IncentiveArray';
import { nameCheck } from '../../ducks/services';

const _ = require('lodash');
const { Title } = Typography;
const marks = {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    60: '60',
    70: '70',
    80: '80',
    90: '90',
    100: '100',
}

const initQ = {
    intake_name: '',
    attached_program: [],
}

export default (props) => {

    const dispatch = useDispatch();
    const { control, errors, mode, setValue, watch } = props;
    const country = useSelector(state => state.applicationForm.countryData);
    const appTypeDropData = useSelector((state) => state.applicationForm.appTypeData);
    const [nationList, setNationList] = useState([]);

    const tution = watch('tution_fee_covered');
    const renewal = watch('renewal_percentages');
    const { fields, append, remove } = useFieldArray({
        control,
        name: "intakes",
    });

    useEffect(() => {
        dispatch(getCountryDrop())
        dispatch(getApplicationTypeDrop());
        dispatch(getCurrentYearIntakes());
        if (mode == 'add') {
            append(initQ);
        }
    }, []);

    useEffect(() => {
        if(country && country.length > 0) {
            let temp = [];
            country.map((x, i) => {
                if (i == 0) {
                    temp.push({label: 'All', value: ''})
                }
                temp.push({label: x.name, value: x.name})
            })
            setNationList(temp);
        }
    }, [country]);

    const onNameExist = (e) => {
        nameCheck(e.target.value).then(res => {
          if (res.data.message.success == false) {
            message.error(res.data.message.message)
          } else {
            console.log('check response', res.data.message.message);
          }
        })
    }
    const incentiveFields = [
        {
        type: 'input',
        label: 'Incentive Name',
        name: 'incentive_name',
        twocol: false,
        placeholder: 'Please state',
        req: true,
        // nospecial:true,
        onBlur: props.static == false && onNameExist,
        reqmessage: 'Incentive Name Required',
        static: props.static,
        },
        {
        type: 'input',
        label: "Incentive's Recipient Limit",
        name: 'incentive_recipient_limit',
        twocol: false,
        placeholder: 'Please state',
        number: true,
        req: true,
        reqmessage: "Incentive's Recipient Limit Required",
        static: props.static,
        },
        {
        type: 'date',
        label: 'Incentive Start Date',
        name: 'incentive_start_date',
        twocol: true,
        req: true,
        format: 'DD MMMM YYYY',
        placeholder: 'Please select date',
        reqmessage: 'Start Date Required',
        static: props.static,
        },
        {
            type: 'date',
            label: 'Incentive End Date',
            name: 'incentive_end_date',
            twocol: true,
            req: false,
            format: 'DD MMMM YYYY',
            placeholder: 'Please select date',
            reqmessage: 'En Date Required',
            static: props.static,
        },
        {
            subheader: 'Recipient Details',
            type: 'select',
            label: 'Student Recipient Type',
            name: 'student_recipient_type',
            twocol: true,
            options: appTypeDropData?.map((x) => ({ label: x.name, value: x.name })),
            req: true,
            placeholder: 'Please select',
            reqmessage: "Recipient Type Required",
            static: props.static,
        },
        {
            type: 'select',
            label: 'Nationality',
            name: 'nationality',
            twocol: true,
            req: true,
            options: nationList,
            placeholder: 'Please select',
            reqmessage: "Nationality Required",
            static: props.static,
        },
    ]

    const incentiveFields2 = [
        {
            subheader: 'Incentive Fee Details',
            type: 'select',
            label: 'Academic Duration',
            name: 'academic_duration',
            twocol: true,
            req: true,
            options: academicDuration,
            placeholder: 'Please select',
            reqmessage: "Academic Duration Required",
            static: props.static,
        },
        {
            type: 'slider',
            name: 'tution_fee_covered',
            label: 'Tuition fee covered by Limkokwing University',
            twocol: false,
            req: true,
            iProps: { min: 0, max: 100, step: 10, marks: marks, disabled: props.static },
            value: tution,
            reqmessage: 'Tution Fee Required',
        },
        {
            type: 'select',
            label: 'Renewal Condition',
            name: 'renewal_condition',
            twocol: false,
            req: false,
            options: renewalDuration,
            placeholder: 'Please select',
            reqmessage: "Renewal Condition Required",
            static: props.static,
        },
        {
            type: 'slider',
            name: 'renewal_percentages',
            label: 'Renewal Percentage',
            twocol: false,
            req: false,
            iProps: { min: 0, max: 100, step: 10, dots: true, marks: marks, disabled: props.static },
            value: renewal,
            reqmessage: 'Renewal Percentage Required',
            static: props.static,
        },
        {
            subheader: 'Additional Details',
            name: 'addition_details',
            label: '',
            req: false,
            type: 'checkbox',
            // class: 'graycheckbox',
            twocol: false,
            reqmessage: '',
            static: props.static,
            options: [{ label: 'Stacking Incentive', value: 'stacking_incentive' },{ label: 'Allow enroll if have outstanding', value: 'allow_enroll' },{ label: 'Incentive transferable if student change course', value: 'incentive_transferrable' },],
        },
    ]

    return (
        <Card bordered={false} className="uni-card h-auto">
            <Row gutter={[20, 30]} align="bottom">
                <Col span={24}>
                    <Title level={4} className='mb-0 c-default'>General Details</Title>
                </Col>
                {incentiveFields.map((item, idx) => (
                    <Fragment key={idx}>
                    {item?.subheader && (
                        <Col span={24}>
                        <Title level={item?.subheadlevel ? item?.subheadlevel : 4} className="mb-0 c-default">
                            {item.subheader}
                        </Title>
                        </Col>
                    )}
                    <FormGroup item={item} control={control} errors={errors} />
                    </Fragment>
                ))}
                <Col span={24}>
                    <Row gutter={[20,20]}>
                    <Col span={24}><Title level={4} className='mb-0 c-default'>Applicable Programmes</Title></Col>
                    <Col span={24}>
                        {fields.map((item, index) => (
                            <Card bordered={true} className='border-card2' key={item.id}>
                                <IncentiveArray control={control} errors={errors} setValue={setValue} premove={remove} static={props.static} pitem={item} pindex={index} mode={mode} />
                            </Card>
                        ))}
                    </Col>
                    {props.static == false &&
                    <Col span={24}>
                        <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}>+ Add other category</Button>
                    </Col>}
                    </Row>
                </Col>
                {incentiveFields2.map((item, idx) => (
                    <Fragment key={idx}>
                    {item?.subheader && (
                        <Col span={24}>
                        <Title level={item?.subheadlevel ? item?.subheadlevel : 4} className="mb-0 c-default">
                            {item.subheader}
                        </Title>
                        </Col>
                    )}
                    <FormGroup item={item} control={control} errors={errors} />
                    </Fragment>
                ))}
                {mode == 'edit' && props.static == false &&
                <Col span={24}>
                    <Row gutter={20} justify='end'>
                        <Col>
                            <Button size='large' type='primary' htmlType='submit' className='green-btn'>Send for Approval</Button>
                        </Col>
                    </Row>
                </Col>
                }
            </Row>
        </Card>
    );
};
