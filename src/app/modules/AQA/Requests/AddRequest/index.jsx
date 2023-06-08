import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import RequestForm from './RequestForm';
import moment from 'moment';

const defVal = {
    formName: '',
    form_fields: []
}

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const department = location.pathname.split('/')[1];
    const { control, errors, handleSubmit, reset } = useForm(defVal);
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
    const [depart, setDepart] = useState();

    const i18n = useTranslate();
    const { t } = i18n;

    const caseDepart = (dept) => {
        switch(dept) {
          case 'aqa' :
            return { department: 'AQA', link:'/aqa' };
    
          case 'registry' :
            return { department: 'Registry', link:'/registry' };
    
          case 'faculty' :
            return { department: 'Faculty', link:'/faculty' };
          
          default:
            break;
        }
      }
    
    useEffect(() => {
        setDepart(caseDepart(department))
    }, []);

    const sideData = [
        {
            type: 'image',
            imgurl: '',
            size: 120,
            highlight: true
        },
        {
            type: 'tag',
            title: 'Request',
            noDivider: true,
        },
        {
            type: 'simpletext',
            title: 'Please select the form and attach the student on the right.',
            noDivider: true,
        },
        
    ]

    const onFinish = async (data) => {
        props.setLoading(true);
        let fields = [];
        Object.entries(data).map(([key, val]) => {
            if (key != 'formName') {
                if (key == 'Date') {
                    fields.push({field_label: key, field_type: 'date', field_value : moment(val).format('YYYY MM DD')});
                } else {
                    fields.push({field_label: key, field_type: 'text', field_value : val});
                }
            }
        })
        let dept = [];
        data.formName.departments.map(it => {
            console.log('depart', it.department, depart.department)
            if (it.department == depart.department) {
                dept.push({
                    department: it.department,
                    status: "Approve" 
                })
            } else {
                dept.push({
                    department: it.department,
                    status: "Pending" 
                })
            }
        })

        let body = {
            form_name: data.formName.label,
            status:"Pending",
            form_fields: fields,
            departments: dept
        }
        const url = `${apiMethod}/aqa.api.add_aqa_form_request`;
        try {
            await axios.post(url, body);
            message.success('Request Successfully Created');
            props.setLoading(false);
            reset();
            setTimeout(() => history.push(`${depart?.link}/requests`), 1000);
        } catch (e) {
            const {response} = e;
            props.setLoading(false);
            message.error('Something went wrong'); 
        }
    }

    return (
        <>
        <Breadcrumb separator=">" className='mb-1'>
            <Breadcrumb.Item href={`${depart?.link}/requests`}>Requests</Breadcrumb.Item>
            <Breadcrumb.Item>Add New Request</Breadcrumb.Item>
        </Breadcrumb>
            
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title={'Add New Request'}  />
            </Col>
            <Col span={24}>
                <div className='twocol-3070'>
                    <div className='side-detail'>
                        {isHDScreen ?
                        <SideDetails data={sideData} />
                        :
                        <SideDetailResponsive data={sideData} />
                        }
                    </div>
                    <div className='side-form'>
                        <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                        <Form 
                            scrollToFirstError={true}
                            onFinish={handleSubmit(onFinish)}
                            labelCol={{ flex: '0 1 162px' }}
                            wrapperCol={{ flex: 'auto' }}
                            layout="horizontal"
                            labelAlign="left"
                            >
                            <RequestForm title='Requests' Department={caseDepart(department)} control={control} errors={errors} />
                        </Form>
                        </Card>
                    </div>
                </div>
            </Col>
        </Row>
    </>
    )
    
}