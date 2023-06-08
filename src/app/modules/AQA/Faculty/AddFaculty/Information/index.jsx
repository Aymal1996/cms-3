import React, { useEffect } from 'react';
import {Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import {InputField } from '../../../../../atoms/FormElement';
import AttachProgram from '../../../../components/AttachProgram';
import { getProgrmList } from '../../ducks/actions';
import { useDispatch } from 'react-redux';

const { TabPane } = Tabs;
const { Title } = Typography;


export default (props) => {

    const dispatch = useDispatch();
    const { control, errors, tags, setTags, mode, deleted, setDeleted, t } = props;

    useEffect(() => {
        dispatch(getProgrmList());
    }, []);

    return (
    <Card bordered={false} className="uni-card h-auto">
        
        <Row gutter={[30, 20]}>
            <Col span={24}>
                <Title level={4}>Faculty Information</Title>
            </Col>
            <Col span={24}>
                <Tabs defaultActiveKey="1" type="card" className='custom-tabs -space30'>
                    <TabPane tab="Summary" key="1">
                        <Space size={30} direction="vertical" className='w-100'>
                        <InputField 
                            isRequired={true}
                            fieldname='name'
                            label='Faculty Name'
                            control={control}
                            class='mb-0'
                            iProps={{ placeholder: 'Please state', size: 'large'}}
                            rules={{
                                required: 'Faculty Name Required',
                                }}
                            initValue=''
                            validate={errors.name && 'error'}
                            validMessage={errors.name && errors.name.message}
                        />
                        <InputField 
                            isRequired={true}
                            fieldname='code'
                            label='Faculty Code'
                            control={control}
                            class='mb-0'
                            iProps={{ placeholder: 'Please state', size: 'large'}}
                            rules={{required: 'Enter Faculty Code'}}
                            initValue=''
                            validate={errors.code && 'error'}
                            validMessage={errors.code && errors.code.message}
                        />
                        
                        </Space>
                    </TabPane>  
                    <TabPane tab="Programmes" key="2">
                        <Row gutter={20}>
                            <Col span={24}>
                                <AttachProgram deleted={deleted}
                            setDeleted={setDeleted} tags={tags} setTags={setTags} />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Col>
            {mode == 'edit' &&
                <Col span={24}>
                    <Row gutter={20} justify='end'>
                        <Col>
                            <Button size='large' type='primary' htmlType='submit' className='green-btn'>Save Changes</Button>
                        </Col>
                    </Row>
                </Col>
            }
        </Row>
    </Card>
    )
}