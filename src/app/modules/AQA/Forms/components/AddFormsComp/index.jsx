import React, { useEffect, useState } from "react";
import { Row, Col, Button, Typography, Card, Space } from "antd";
import { InputField } from "../../../../../atoms/FormElement";
import {getApprovals, getFormsFields} from '../../ducks/actions';
import AttachDepartment from "../../../../components/AttachDepartment";
import { useDispatch } from "react-redux";
import Fields from '../Fields';

const {Title, Text} = Typography;

export default (props) => {

    
    
    const dispatch = useDispatch();
    const { control, errors, setValue, mode, tags, setTags, deleted, setDeleted, deletedF, setDeletedF, t} = props;

    useEffect(() => {
        dispatch(getApprovals());
        dispatch(getFormsFields());
    }, []);

    return (
        <Card bordered={false} className='uni-card'>
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <Title level={4} className='mb-0'>Form Details</Title>
                </Col>
                <Col span={24}>
                    <InputField 
                        fieldname='form_name'
                        label='Form Name'
                        control={control}
                        class='mb-0'
                        iProps={{ placeholder: 'Please state', size: 'large'}}
                        initValue=''
                        rules={{ required: 'Name required' }}
                        validate={errors.form_name && 'error'}
                        validMessage={errors.form_name && errors.form_name.message}
                    />
                </Col>
                <Col span={24}>
                    <Title level={4} className='mb-0'>Deprtments</Title>
                </Col>
                <Col span={24}>
                    <AttachDepartment 
                    control={control} 
                    tags={tags}
                    setTags={setTags}
                    deleted={deleted}
                    setDeleted={setDeleted}
                    />
                </Col>
                <Col span={24}>
                    <Space size={10} direction='vertical'>
                    <Title level={4} className='mb-0'>Form Fields</Title>
                    <Text className='c-gray'>The fields can be reordered by dragging and dropping the fields to the desired order.</Text>
                    </Space>
                </Col>
                <Col span={24}>
                    <Fields mode={mode} setDeleted={setDeletedF} deleted={deletedF} control={control} errors={errors} />
                </Col>
                {mode == 'edit' &&
                    <Col span={24}>
                        <Row gutter={24} justify='end'>
                        <Col>
                        <Button size='large' type='primary' htmlType='submit' className='green-btn'>Save Changes</Button>
                        </Col></Row>
                    </Col>
                }
            </Row>
        </Card>
    )
}