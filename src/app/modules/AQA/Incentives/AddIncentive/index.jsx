import React from 'react';
import {Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import PlaceHolderImage from '../../../../../assets/img/faculty.png';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import IncentiveForm from '../components/IncentiveForm';
import { addUpdateIncentive } from '../ducks/services';
import { useHistory } from 'react-router-dom';

export default (props) => {

    const history = useHistory();
    const { control, errors, getValues, setValue, handleSubmit, watch, reset } = useForm({});
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const sideData = {
        image: PlaceHolderImage,
        text: "Please fill up the details on the right. Once finished, click ‘Send ‘Approval’ to proceed."
    }

    const onDraft = () => {
        const val = getValues();
        if(val.incentive_name) {
            let regex = /^[A-Za-z ]+$/;
            if (regex.test(val.incentive_name)) {
                onSend(val, 'Draft');
            } else {
                message.error('Special Characters not allowed')      
            }
        } else {
          message.error('Please Enter Incentive Name')
        }
    }

    const bottomList = [
        {
            title: 'Save as Draft',
            type: 'button',
            class: 'black-btn',
            action: onDraft
        },
        {
            title: 'Send Approval',
            type: 'submit',
            class: 'green-btn',
        },
    ]

    

    const onSend = (val, vstatus) => {
        props.setLoading(true);
        let intakes_array = [];
        val.intakes.map(x => {
            x.attached_program.map(y => {
                let a = {
                    intake: x.intake_name.value,
                    include_exclude: y.include_exclude.value
                }
                if (y.program.value == 'All') {
                    a['all_programs'] = 1;
                } else {
                    a['program'] = y.program.value
                }
                intakes_array.push(a);
            }) 
        })
        let key = val.incentive_name.replace(/[^a-zA-Z0-9 ]/g, "")
        key = key.replaceAll(' ', '_');
        // key = key.replaceAll('/', '');

        let body = {
            custom_key: key,
            incentive_name: val.incentive_name,
            status: typeof(vstatus) == 'string' ? vstatus: 'Active',
            incentive_start_date: val.incentive_start_date,
            incentive_end_date: val.incentive_end_date,
            student_recipient_type: val?.student_recipient_type ? val.student_recipient_type.value : '',
            nationality: val.nationality ? val.nationality.value : '',
            academic_duration: val.academic_duration ? val.academic_duration.value : '',
            tution_fee_covered: val.tution_fee_covered,
            renewal_condition: val.renewal_condition ? val.renewal_condition.value : '',
            renewal_percentages: val.renewal_percentages,
            stacking_incentive: val.addition_details ? val.addition_details.find(x => x == 'stacking_incentive') ? 1 : 0 : 0,
            allow_enroll: val.addition_details ? val.addition_details.find(x => x == 'allow_enroll') ? 1 : 0 : 0,
            incentive_transferrable: val.addition_details ? val.addition_details.find(x => x == 'incentive_transferrable') ? 1 : 0 : 0,
            incentive_intakes: intakes_array,
            incentive_recipient_limit: val?.incentive_recipient_limit
        }
        console.log('body weight', body)
        
        addUpdateIncentive(body).then(res => {
            message.success('Incentive Successfully Created');
            props.setLoading(false);
            reset();
            setTimeout(() => history.push('/marketing/incentives'), 1000);
        }).catch(err => {

            props.setLoading(false);
            message.error('Something went wrong'); 
        })

    }

    return (
        <Form 
        layout="vertical" 
        scrollToFirstError={true}
        onFinish={handleSubmit(onSend)}
        >
            <Breadcrumb separator=">" className='mb-1'>
                <Breadcrumb.Item href="/aqa/incentives">Incentives</Breadcrumb.Item>
                <Breadcrumb.Item>New Incentive</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <HeadingChip title={'New Incentive'}  />
                </Col>
                <Col span={24}>
                    <div className='twocol-3070'>
                        <div className='side-detail'>
                            {isHDScreen ?
                            <SideDetails data={sideData} cardType='empty' type="button" bottom={bottomList} />
                            :
                            <SideDetailResponsive data={sideData} cardType='empty' type='button' bottom={bottomList} />
                            }
                        </div>
                        <div className='side-form'>
                            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                            <IncentiveForm 
                            control={control} 
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                            mode='add'
                            static={false}
                            />
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </Form>
    )
}