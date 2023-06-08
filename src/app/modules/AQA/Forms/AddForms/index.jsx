import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, message, Breadcrumb } from "antd";
import { useHistory } from "react-router";
import { useTranslate } from 'Translate';
import PlaceHolderImage from "../../../../../assets/img/empty_forms.png";
import AddFormsComp from '../components/AddFormsComp';
import HeadingChip from "../../../../molecules/HeadingChip";

import { useForm } from "react-hook-form";
import { apiMethod } from "../../../../../configs/constants";
import axios from "../../../../../services/axiosInterceptor";
import SideDetails from "../../../../molecules/SideDetails";
import SideDetailResponsive from "../../../../molecules/SideDetailResponsive";
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';


export default (props) => {
  
    const i18n = useTranslate();
    const { t } = i18n;
    const [deleted, setDeleted] = useState([]);
    const [tags, setTags] = useState([]);
    const [deletedF, setDeletedF] = useState([]);
    const history = useHistory();
    const { control, errors, setValue, handleSubmit } = useForm();
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const sideData = {
        image: PlaceHolderImage,
        text: "Please fill up the details on the right. Once finished, click 'Add Form' to proceed."
    }

    const bottomList = [
        {
            title: 'Add Form',
            type: 'submit',
            class: 'green-btn',
        },
    ]

  const onFinish = async (val) => {
    props.setLoading(true);

    if (tags.length < 1) {
        props.setLoading(false);
        message.error('Please Add Department')
        return false;
    }

    let seen = new Set();
    var hasDuplicates = val.form_fields.some((currentObject) => {
        return seen.size === seen.add(currentObject.field_name.value).size;
    });

    if (hasDuplicates) {
        props.setLoading(false);
        message.error('Remove duplicate fields')
        return false;
    }
    let allfields = []
    val.form_fields && val.form_fields.map(x => {
        allfields.push({
            field_name: x.field_name.value,
            field_type: x.field_name.type
        })
    })
    const payLoad = {
        form_name: val.form_name,
        status: "Active",
        form_fields: allfields,
        departments: tags
    }
    let url = `${apiMethod}/aqa.api.add_aqa_form_listing`;
    try {
        await axios.post(url, payLoad);
        props.setLoading(false);
        message.success('Form Successfully Added')
        setTimeout(() => history.push('/aqa/forms'));
    } catch(e) {
        const {response} = e;
        props.setLoading(false);
        console.log('error', response.data.message);
        message.error('Something went wrong');
    }
  }

  return (
    <Form 
    layout="vertical" 
    scrollToFirstError={true}
    onFinish={handleSubmit(onFinish)}
    >
        <Breadcrumb separator=">" className='mb-1'>
            <Breadcrumb.Item href="/aqa/forms">Forms</Breadcrumb.Item>
            <Breadcrumb.Item>Add New Form</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title={t('AQA.Forms.title2')}  />
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
                        <AddFormsComp 
                        control={control} 
                        errors={errors}
                        deleted={deleted}
                        setDeleted={setDeleted}
                        deletedF={deletedF}
                        tags={tags}
                        setTags={setTags}
                        setDeletedF={setDeletedF}
                        mode='add'
                        t={t}
                        />
                        </Card>
                    </div>
                </div>
            </Col>
        </Row>
    </Form>
  );
};