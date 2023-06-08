import React from 'react';
import {Row, Col, Card, Form, Breadcrumb } from 'antd';
import { useTranslate } from 'Translate';
import PlaceHolderImage from '../../../../../assets/img/scholarship-icon.svg';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import ReportsForm from '../components/ReportsForm';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {

    const { control, errors, setValue,handleSubmit } = useForm();
    const i18n = useTranslate();
    const { t } = i18n; 
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const sideData = {
        image: PlaceHolderImage,
        text: "Please fill up the details on the right. Once finished, click 'Add Report' to proceed."
    }

    const bottomList = [
        {
            title: 'Add Report',
            type: 'submit',
            class: 'green-btn',
        }
    ]

    const onFinish = async (val) => {
    }

    return (
        <>
            <Breadcrumb separator=">" className='mb-1'>
                <Breadcrumb.Item href="/registry/scholarship">Reports</Breadcrumb.Item>
                <Breadcrumb.Item>Report Template</Breadcrumb.Item>
            </Breadcrumb>
            <Form 
                layout="vertical" 
                scrollToFirstError={true}
                onFinish={handleSubmit(onFinish)}
            >
                <Row gutter={[30, 24]}>
                    <Col span={24}>
                        <HeadingChip title='Add New Report Template'  />
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
                                <ReportsForm 
                                    control={control} 
                                    errors={errors}
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
        </>
    )
}