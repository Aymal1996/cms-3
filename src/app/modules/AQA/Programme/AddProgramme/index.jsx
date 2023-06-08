import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import PlaceHolderImage from '../../../../../assets/img/empty_module.png';
import { getInstitution } from '../../Faculty/ducks/actions';
import { useDispatch } from 'react-redux';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import AddForm from '../components/AddForm';
import moment from 'moment';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { control, errors, getValues, setValue,handleSubmit, reset } = useForm();
    const [delSem, setDelSem] = useState([]);
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const i18n = useTranslate();
    const { t } = i18n;

    const sideData = {
        image: PlaceHolderImage,
        text: "Please fill up the details. Once finished, click 'Save Draft' or 'Add Programme' to proceed."
    }

    const onDraft = () => {
        const val = getValues();
        if(val.program_name && val.program_code && val.faculty) {
          onFinish(val, 'Draft');
        } else {
          message.error('Please Enter Code, Programme Name and Faculty')
        }
    }

    const bottomList = [
        {
            title: 'Save Draft',
            type: 'button',
            class: 'black-btn',
            action: onDraft
        },
        {
            title: 'Add Programme',
            type: 'submit',
            class: 'green-btn',
        }
    ]

    useEffect(() => {
        dispatch(getInstitution())
    }, []);

    const postApi =  async (payLoad) => {
        
        const url = `${apiMethod}/marketing.new_marketing_api.add_program_license_structure`;
        try {
            await axios.post(url, payLoad);
            message.success('Prgoramme Successfully Created');
            props.setLoading(false);
            reset();
            setTimeout(() => history.push('/aqa/programme'), 1000);
        } catch (e) {
            const {response} = e;
            message.error('Something went wrong');
            props.setLoading(false); 
        }
    }

    

    const onFinish = async (val, vstatus) => {
        props.setLoading(true);
        let programs = [];
        let semester = [];
        let allFeeModule = 0;
        let allCredits = 0;
        let allresourceFee = 0;
        let doc = [];
        if (val.kpt_document) {
            let modifiedName = uniquiFileName(val.kpt_document?.file?.originFileObj.name)
            let res = await getSingleUpload(modifiedName, 'image',  val.kpt_document?.file?.originFileObj, 'Program Licensing', val.program_code);
            doc.push(
                {
                    document_type: val.kpt_letter || 'KPT Letter',
                    document: res?.file_url,
                }
            )
        }
        val.program_requirements?.map(x => {
            programs.push({
                qualification: x.qualification.label,
                cgpa: x.cgpa.label,
                credit_value: x.credit_value
            })
        })

        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        val.semester_structure?.map((e, index) => {
            let subject = [];
            let totalFees = 0;
            let totalCredits = 0;
            let randomCode = "";
            for (var i = 0; i < 5; i++)
                randomCode += possible.charAt(Math.floor(Math.random() * possible.length));
            e?.semester?.map(y => {
                
                let preq = [];
                y.module_prerequisites && y.module_prerequisites.length > 0 && y.module_prerequisites.map(z => {
                    preq.push({
                        module: z.value,
                    })
                })

                totalFees = totalFees + parseFloat(y.module_fees);
                totalCredits = totalCredits + parseFloat(y.credit);
                subject.push({
                    name: y.name,
                    type: y.type, 
                    credit: y.credit,
                    module_fees: y.module_fees,
                    module_prerequisites: preq
                })
            })
            allFeeModule = allFeeModule + totalFees;
            allCredits = allCredits + totalCredits;
            allresourceFee = allresourceFee + parseFloat(e.resource_fees)
            

            semester.push({
                structure_code: `SL-${Math.floor(10000 + Math.random() * 90000)}`,
                program_code: val.program_code,
                structure_name: e.structure_name,
                period: e.period.label,

                resource_fees: e.resource_fees,
                currency: e.currency.label,
                credits: totalCredits,
                module_fees: totalFees,
                semester_subject: subject
            })
        });


    let payLoad = {
        summary: {
            program_code: val.program_code,
            program_name: val.program_name,
            effective_date: val.effective_date ? moment(val.effective_date).format('YYYY-MM-DD'): '' ,
            ineffective_date: val.ineffective_date ? moment(val.ineffective_date).format('YYYY-MM-DD'): '',
            faculty_code: val.faculty.value,
            study_duration: val.study_duration.label,
            program_level: val.study_level.label,
            course_synopsis: val.course_synopsis,
            status: typeof(vstatus) == 'string' ? vstatus: 'Active',
        },
        licensing:{
			institution_name: val.institution_name.label,
			status: typeof(vstatus) == 'string' ? vstatus: 'Active',
            program_code: val.program_code,
            effective_date: val.effective_date ? moment(val.effective_date).format('YYYY-MM-DD'): '' ,
            ineffective_date: val.ineffective_date ? moment(val.ineffective_date).format('YYYY-MM-DD'): '',
			study_duration: val.study_duration.label,
            study_level: val.study_level.label,
            kpt_approval_code: val.kpt_approval_code,
            kpt_approval_date: val.kpt_approval_date ? moment(val.kpt_approval_date).format('YYYY-MM-DD'): '',
            kpt_expiry_date: val.kpt_expiry_date ? moment(val.kpt_expiry_date).format('YYYY-MM-DD'): '',
            kpt_application_date: val.kpt_application_date ? moment(val.kpt_application_date).format('YYYY-MM-DD'): '',
            licensing_documents: doc,

            mqa_status: val.mqa_status.label,
            mqa_validity_start_date: val.mqa_validity_start_date ? moment(val.mqa_validity_start_date).format('YYYY-MM-DD'): '',
            mqa_reference_no: val.mqa_reference_no,
            mqa_serial_no: val.mqa_serial_no,
            mqa_accreditation: val.mqa_accreditation,
            mqa_expiry_date: val.mqa_expiry_date ? moment(val.mqa_expiry_date).format('YYYY-MM-DD'): '',
            mqa_application_date: val.mqa_application_date ? moment(val.mqa_application_date).format('YYYY-MM-DD'): '',
			program_requirements: programs,
   
        },
        semester: semester
	}

        postApi(payLoad);
    }

    

    return (
        <Form 
        layout="vertical" 
        scrollToFirstError={true}
        onFinish={handleSubmit(onFinish)}
        >
        <Breadcrumb separator=">" className='mb-1'>
            <Breadcrumb.Item href="/aqa/programme">Programmes</Breadcrumb.Item>
            <Breadcrumb.Item>Add New Programme</Breadcrumb.Item>
        </Breadcrumb>
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <HeadingChip title={t('AQA.Program.title2')}  />
                </Col>
                <Col span={24}>
                    <div className='twocol-3070-new'>
                        <div className='side-detail'>
                            {isHDScreen ?
                            <SideDetails data={sideData} cardType='empty' type="button" bottom={bottomList} />
                            :
                            <SideDetailResponsive data={sideData} cardType='empty' type='button' bottom={bottomList} />
                            }
                        </div>
                        <div className='side-form'>
                            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                            <AddForm 
                            control={control} 
                            errors={errors}
                            delSem={delSem}
                            setDelSem={setDelSem}
                            getValues={getValues}
                            heading={'Program Information'}
                            setValue={setValue}
                            mode='add'
                            t={t}
                            />
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </Form>
        
    )
    
}