import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Tag, Typography, Button, Card, Tabs, Space, Form, message } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { CheckboxGroup, InputField } from 'Atoms/FormElement';
import {CloseCircleFilled} from '@ant-design/icons';
import moment from 'moment';
import { updateVersion } from '../../ducks/services';
import { useHistory } from 'react-router-dom';

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const initQ = { name: '', status: '', program_version: '' }

export default (props) => {

    const history = useHistory();
    const { data, updateApi, code, setLoading, updateVer } = props;
    const { control, errors, setValue, getValues, handleSubmit } = useForm({});
    const [ deleted, setDeleted] = useState([]);
    const [currentProg, setCurrentProg] = useState(code);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "version",
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setValue('version', data.filter(x => x.status != 'Archive'))
        }
    }, [data]);

    const onSubmit = (val) => {
        setLoading(true);
        let body = {
            delete_version: deleted,
            programs: []
        };
        val.version.map(x => {
            if (x.name) {
                body.programs.push({
                    name: x.name,
                    status: x.status[0]
                })
            } else {
                body.programs.push({
                    program_code: code,
                    status: x.status[0]
                })
            }
            
        })
        updateVersion(body, code).then(res => {
            setLoading(false);
            message.success('Version Successfully Updated')
            setTimeout(() => history.push(`/aqa/programme/edit/${currentProg}`), 1000);
        }).catch(err => {
            setLoading(false);
            message.error('something went wrong')
        })
    }

    const onCheckChange = (e, index, id) => {
        let arr = getValues().version;
        let current = arr.findIndex((x,i) => x.status[0] == 'Active' && i != index);
        setValue(`version[${current}].status`, ['Inactive']);
        if (id) {
            setCurrentProg(id);
        } else {
            setCurrentProg(code)
        }
    }

    const onDelete = (stat, index, id) => {
        if (stat != 'Active') {
            remove(index);
            if (id) {
                setDeleted([...deleted, {name: id}]);
            }
        } else {
            message.error('Active Version can not be deleted')
        }
    }

    const onRestore = (id) => {
        setLoading(true);
        const body = {
            delete_version: [],
            programs: [
                {
                    name: id,
                    status: 'Inactive'
                }
            ]
        }
        updateVersion(body, code).then(res => {
            setLoading(false);
            updateVer();
            message.success('Version Successfully Restored')
        }).catch(err => {
            setLoading(false);
            message.error('something went wrong')
        })
    }

    return (
        <Card bordered={false} className="uni-card h-auto">
            <Row gutter={[30, 20]}>
                <Col span={24}>
                    <Title level={4} className='mb-0'>Programme Version</Title>
                </Col>
                <Col span={24}>
                    <Text className='c-gray'>You may only select one version at any given time</Text>
                </Col>
                <Col span={24}>
                    <Tabs defaultActiveKey="1" type="card" className="custom-tabs -space30">
                        <TabPane tab={'Active'} key='1' forceRender={true}>
                        <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
                        <Space size={20} direction='vertical' className='w-100 text-right'>
                        {fields.map((item, index) => (
                            <Fragment key={item.id}>
                            <Tag closable={true} closeIcon={<CloseCircleFilled />} className="program-list text-left" key={item.id} onClose={() => onDelete(item.status, index, item.name)}>
                            <span className="p-name w-100">
                                <Row gutter={[20,30]} align='middle'>
                                    <Col flex={'auto'}>
                                    {item?.name &&
                                        <Space direction='vertical' size={4}>
                                            <Title level={5} className='c-default mb-0'>{item?.program_version}</Title>
                                            <Text className='c-gray'>{`${item?.name} . ${moment(item?.effective_date).format('Do MMMM YYYY')} - ${moment(item?.ineffective_date).format('Do MMMM YYYY')}`}</Text>
                                        </Space>}
                                        <InputField 
                                            fieldname={`version[${index}].name`}
                                            label=''
                                            control={control}
                                            class='mb-0 d-none'
                                            iProps={{ placeholder: 'Please state', size: 'large'}}
                                            initValue={item?.name ? item?.name : '' }
                                        />
                                        <InputField 
                                            fieldname={`version[${index}].program_version`}
                                            label=''
                                            control={control}
                                            class={`mb-0 ${item?.name ? 'd-none' : ''}`}
                                            iProps={{ placeholder: 'Type Version Name', size: 'large'}}
                                            initValue={item?.program_version ? item?.program_version : '' }
                                            rules={{ required: 'Required' }}
                                            validate={
                                                Object.entries(errors).length > 0 &&
                                                errors?.version?.length > 0 &&
                                                errors?.version[index]?.program_version &&
                                                "error"
                                            }
                                        />
                                    </Col>
                                    <Col flex={'35px'}>
                                        <CheckboxGroup
                                            onChange={(e) => onCheckChange(e, index, item.name)}
                                            fieldname={`version[${index}].status`}
                                            label=""
                                            class="mb-0 simple-checbox"
                                            control={control}
                                            initValue={item.status == 'Active' ? ['Active'] : ['Inactive']}
                                            option={[{label: '', value: 'Active'}]}
                                        />
                                    </Col>
                                </Row>
                            </span>
                            </Tag>
                            </Fragment>
                        ))}
                        <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}>+ Add Version</Button>
                        <Button type='primary' htmlType='submit' size='large' className='green-btn'>Save Changes</Button>
                        </Space>
                        </Form>
                        </TabPane>
                        <TabPane tab={'Archive'} key='2'>
                        <Space size={20} direction='vertical' className='w-100 text-right'>
                        {data.filter(x => x.status == 'Archive').map((item, index) => (
                            <Fragment key={index}>
                            <Tag closable={true} closeIcon={<Title level={5} className='mb-0 c-default'>Restore</Title>} className="program-list text-left" key={item.name} onClose={() => onRestore(item.name)}>
                            <span className="p-name w-100">
                                <Space direction='vertical' size={4}>
                                    <Title level={5} className='c-default mb-0'>{item?.program_version}</Title>
                                    <Text className='c-gray'>{`${item?.name} . ${moment(item?.effective_date).format('Do MMMM YYYY')} - ${moment(item?.ineffective_date).format('Do MMMM YYYY')}`}</Text>
                                </Space>
                            </span>
                            </Tag>
                            </Fragment>
                        ))}
                        </Space>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Card>
    )
}