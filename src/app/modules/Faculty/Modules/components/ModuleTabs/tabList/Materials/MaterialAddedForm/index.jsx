import React, { useState } from 'react';
import { Form, Row, Col, Badge, Tag, Button, Typography, Space } from 'antd';
import { useForm } from 'react-hook-form';
import {CloseCircleFilled} from '@ant-design/icons';
import StaffFilter from '../../../../StaffFilter';

const { Title } = Typography;

const caseCol = (col) => {
    switch(col) {
        case 'Lecture' : return 'processing'
        case 'Quiz' : return 'success'
        case 'Assignment' : return 'warning'
        case 'Exam' : return 'error'
        default: break;
    }
}

const sortAlphaNum = (a, b) => a['week'].localeCompare(b.week, 'en', { numeric: true })

export default (props) => {

    const { index, tag, data, setData, added, setAdded } = props;
    const { handleSubmit, control } = useForm();

    const onFinish = (val) => {
        let temp = [...data];
        // let temp2 = [...added];
        let str = val.search.split(',')
        temp.map(x => {
            if (x.name == tag.name) {
                x['material_id'] = str[0];
                x['material_name'] = str[1];
            }
        })
        temp.sort(sortAlphaNum);
        setData(temp);
    }

    const onDel = (nameid) => {

        let temp = [...data];
        temp.map(x => {
            if (x.name == nameid) {
                x['material_id'] = "";
                x['material_name'] = "";
            }
        })
        setData(temp);
    }

    return (

        <Form onFinish={onFinish} layout='vertical'>
            <Row gutter={[20, 10]} align='bottom'>
                {tag?.week != data[index - 1]?.week && 
                <Col span={24}>
                    <Title level={5} className={`c-default mb-0`}>{tag?.week}</Title>
                </Col>}
                {!tag?.material_id && <>
                <Col span={21}>
                    <StaffFilter 
                        title='Material'
                        api={'method'} 
                        endpoint='faculty.modules_api.get_materials?str='
                        param={`&type=${tag?.material_type}`}
                        key1='name'
                        key2='material_name'
                        key3='material_type'
                        dot={true}
                    />
                </Col>
                <Col span={3}><Button size='large' htmlType='submit' type='primary' className='green-btn w-100'>Add</Button></Col>
                </>}
                <Col span={24}>
                    <Row gutter={[20,10]}>
                        <Col span={21}>
                            <Tag closable={false} className="program-list">
                                <span className='p-name w-100'>
                                    <Badge className='bgDot c-gray' status={caseCol(tag?.material_type)} text={tag?.week_name} />
                                </span>
                            </Tag>
                        </Col>
                        {tag?.material_id &&
                        <Col span={24}>
                            <Tag closable closeIcon={<CloseCircleFilled />} className="program-list" onClose={() => onDel(tag?.name)}>
                                <span className='p-name w-100'>
                                    <Badge className='bgDot c-gray' status={caseCol(tag?.material_type)} text={tag?.material_name} />
                                </span>
                            </Tag>
                        </Col>}
                    </Row>
                </Col>
            </Row>
        </Form>
    )
}