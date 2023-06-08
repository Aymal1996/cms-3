import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import PlaceHolderImage from '../../../../../assets/img/empty_module.png';
import Information from './Information';
import { getInstitution } from '../../Faculty/ducks/actions';
import { useDispatch } from 'react-redux';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { control, errors, getValues, setValue, handleSubmit, reset } = useForm();
    const [ tags, setTags ] = useState([])
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const i18n = useTranslate();
    const { t } = i18n;

    const sideData = {
        image: PlaceHolderImage,
        text: "Please fill up the details on the right. Once finished, click 'Save Draft' or 'Add Module' to proceed."
    }

    const onDraft = () => {
        const val = getValues();
        if(val.name && val.code) {
          onFinish(val, 'Draft');
        } else {
          message.error('Please Enter Code and Module Name')
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
            title: 'Add Module',
            type: 'submit',
            class: 'green-btn',
        }
    ]
	
    useEffect(() => {
        dispatch(getInstitution())
    }, []);


    const onFinish = async (val, vstatus) => {
		
        props.setLoading(true);
		// Module Outline 
	    let outline = [];
        val?.outlines && val?.outlines.length > 0 && val.outlines?.map(item => {
            outline.push({
                type: item.outlineType.label,
                weight: item.weightage.label
            });
        })
		 
		// check weightage 100%
        let checkWeight = [];
        val?.outlines && val?.outlines.length > 0 && val.outlines?.map(item => {
          checkWeight.push({
            weight: Number(item.weightage.label.replace('%', '')),
            type: item.outlineType.label
          });
        });
    
        let sum = checkWeight.reduce((a, b) => +a + +b.weight, 0);
             
        if(val?.outlines && val?.outlines.length > 0 && sum != 100){
          message.error('Total Weightage must be equal to 100%');
          props.setLoading(false);  
          return false;
        }
		
		// materials 
        let material_data = [];
        val?.materials && val?.materials.length > 0 && val.materials?.map(item => {
            material_data.push({
                week: item.weeks.label,
                material_type: item.materialType.label,	
                week_name: item.week_name,
            })
        })

        // Prerequisite
        let preqreq = [];
        val?.prequel && val?.prequel.length > 0 && val?.prequel.map(x => {
            preqreq.push({
                module: x.value,
            })
        })

        let body = {
            module_code: val.code,
            module_name: val.name,
            type: val.type ? val.type.label : '',
            credit: val.credit,
            hours: val.hours,
			learning_mode: val.learningMode ? val.learningMode.label : '',
			class_room_type: val.classroomType ? val.classroomType.label : '',
			class_per_week: val.classperWeek,
            fee_currency: val.currency ? val.currency.label : '',
            module_fee: val.fee,
            status: typeof(vstatus) == 'string' ? vstatus: 'Active',
			module_outline: outline,
			add_module_materials: material_data,
            programmes: [],
            module_prerequisites: preqreq
        }

        const url = `${apiMethod}/aqa.api.add_module`;
        try {
            await axios.post(url, body);
            props.setLoading(false);
            message.success('Module Successfully Created');
            reset();
            setTags(Object.assign([]));
            setTimeout(() => history.push('/aqa/modules'), 1000);
        } catch (e) {
            const {response} = e;
            message.error('Something went wrong');
            props.setLoading(false);
        }
    }

    return (
        <Form 
        layout="vertical" 
        scrollToFirstError={true}
        onFinish={handleSubmit(onFinish)}
        >
            <Breadcrumb separator=">" className='mb-1'>
                <Breadcrumb.Item href="/aqa/modules">Module</Breadcrumb.Item>
                <Breadcrumb.Item>Add New Modules</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <HeadingChip title={t('AQA.Module.title2')}  />
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
                            <Information 
                            control={control} 
                            errors={errors}
                            setValue={setValue}
                            tags={tags}
                            setTags={setTags}
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