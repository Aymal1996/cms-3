import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Typography, Space, Button, Collapse, Divider } from 'antd';
import { DateField, InputField, SelectField } from '../../../../../atoms/FormElement';
import { useDispatch, useSelector } from 'react-redux';
import SmallStatusCard from '../../../../../atoms/SmallStatusCard';
import { UpOutlined } from '@ant-design/icons';
import { WarningIcon } from '../../../../../atoms/CustomIcons';
import { useHistory } from 'react-router-dom';
import { getFormFields } from '../../ducks/actions';
import { Fragment } from 'react';
import moment from 'moment';
import { getWarnLetter } from '../../../Employment/ducks/action';
import {allowed} from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { title, control, errors, setValue, dvalue } = props;
    const formList1 = useSelector(state => state.hrmsrequests.formList)
    const [forming, setForming] = useState();
    const [formList, setFormList] = useState([]);
    const letters = useSelector(state => state.employment.warnLetter);
    const [letterList, setLetterList] = useState([]);
    const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];

    useEffect(() => {
        dispatch(getFormFields());
        dispatch(getWarnLetter());
    }, []);

    const onChangeForm = (e) => {
        if(e) {
            setForming(e);
        }
    }

    useEffect(() => {
        if (letters && letters.length) {
          let temp = [];
          letters.map(x => {
            temp.push({
              value: x.name,
              label: x.writing_letter_name,
            });
          })
          setLetterList(temp);
        }
      }, [letters]);

    useEffect(() => {
        if (formList1 && formList1.length > 0) {
            let temp = [];
            formList1.map(x => {
                if(x?.category != '')  {
                    if(x?.category == 'Show Cause Letter' && allowed([Roles.REQUESTS_MANAGER], 'read')) {
                        temp.push(x)
                    }
                } else {
                    temp.push(x)
                }
            })
            setFormList(temp);
        }
    }, [formList1]);

    useEffect(() => {
        if (formList.length > 0 && dvalue) {
            let e = formList.find(x => x.category == dvalue.category);
            if (e) {
                let x = {label: e.form_name, value: e.name, fields: e.form_field, category: e.category, approvers: e.approvers, sender: e.sender}
                setValue('formName', x);
                setForming(x);
            }
        }
    }, [formList]);

    const panelHeader = () => {
        return <Space size={30}>
          <SmallStatusCard
            status={'Incomplete'}
            icon={<WarningIcon className='fontSize20' />}
            iColor={'b-error'}
          />
          <Space direction='vertical' size={5}>
            <Text className="smallFont12 c-white op-6">Receiver</Text>
            <Title level={5} className='c-gray lineHeight20 mb-0'>Please select request form below</Title>
          </Space>
        </Space>
    }
   
    const panelRight = (isActive) => {
      return <div>
      <Space size={4}>
        <Title level={5} className='defaultFont mb-0'>{isActive ? 'Hide' : 'View Details'} </Title>
        <UpOutlined rotate={isActive ? 0 : 180}/>
      </Space>
      </div>
    }

    return (
    <Card bordered={false} className="uni-card h-auto">
        <Row gutter={[30, 20]}>
            <Col span={24}>
                <Title level={4} className='mb-0'>{title}</Title>
            </Col>
            <Col span={24}>
            <Collapse accordion className='reqPanel' bordered={false} defaultActiveKey={'1'} 
            expandIcon={({isActive}) => panelRight(isActive)}
            expandIconPosition='right'>
                <Panel className='ch-black mt-0' header={panelHeader()} key={'1'} forceRender={true}>
                    <SelectField 
                    isRequired={true}
                    fieldname={'formName'}
                    label={'Request Form'}
                    class='labeldefaultFont'
                    control={control}
                    onChange={onChangeForm}
                    rules={{required: 'Please Select Form'}}
                    selectOption={formList?.map(e => ({label: e.form_name, value: e.name, fields: e.form_field, category: e.category, approver: e.approvers, sender: e.sender}))}
                    initValue={''}
                    validate={errors.formName && 'error'}
                    validMessage={errors.formName && errors.formName.message}
                    />
                {forming && forming?.fields.length > 0 &&  
                <>
                    <InputField 
                        fieldname={'Requester ID'}
                        label={'Requester ID'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ readOnly: true }}
                        initValue={user.name}
                    />
                    <InputField 
                        fieldname={'Requester'}
                        label={'Requester'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ readOnly: true }}
                        initValue={user.full_name}
                    />
                    <InputField 
                        fieldname={'Requester Team'}
                        label={'Requester Team'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ readOnly: true }}
                        initValue={user.team_name}
                    />
                    <DateField 
                        fieldname={'Date'}
                        label={'Date'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ disabled: true, format: 'Do MMMM YYYY' }}
                        initValue={moment()}
                    />
                    <Divider />
                    
                    <InputField 
                        isRequired={true}
                        fieldname={'Staff ID'}
                        label={'Staff ID'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ readOnly: false }}
                        initValue={dvalue ? dvalue.code : ''}
                        rules={{required: 'Please state'}}
                        validate={errors['Staff ID'] && 'error'}
                    />
                    
                    <InputField 
                        fieldname={'Request For'}
                        label={'Request For'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ placeholder: 'please state' }}
                        initValue={dvalue ? dvalue.name : ''}
                    />
                    {forming.category == 'Show Cause Letter' &&
                    <>
                    <InputField 
                        fieldname={'Request For Team'}
                        label={'Request For Team'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ placeholder: 'Enter Team' }}
                        initValue={dvalue ? dvalue.team : ''}
                    />
                    <InputField 
                        fieldname={'Company'}
                        label={'Company'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ placeholder: 'Enter company' }}
                        initValue={dvalue ? dvalue.company : ''}
                    />
                    <SelectField 
                        isRequired={true}
                        fieldname={'Warning Letter Type'}
                        label={'Warning Letter Type'}
                        class='labeldefaultFont'
                        control={control}
                        iProps={{ placeholder: 'Enter Team' }}
                        initValue={''}
                        selectOption={letterList}
                        rules={{required: 'Please select'}}
                        validate={errors['Warning Letter'] && 'error'}
                    />
                    </>}
                </>}

                    {forming?.fields.map((item,index) => (
                        <Fragment key={index}>
                        {item.field_type == 'Date' ?
                            <DateField 
                            isRequired={true}
                            fieldname={item?.field_name}
                            label={item.field_name}
                            class='labeldefaultFont'
                            control={control}
                            iProps={{placeholder: 'Select Request Form'}}
                            rules={{required: 'Please state'}}
                            initValue={item?.field_name ? item?.field_name : ''}
                            validate={errors[item?.field_name] && 'error'}
                            />
                        :
                            <InputField 
                            // isRequired={true}
                            fieldname={item?.field_name}
                            label={item.field_name}
                            class='labeldefaultFont'
                            control={control}
                            iProps={{placeholder: 'Please state',
                            readOnly: item?.field_name == 'Requester' ? user : false
                            }}
                            // rules={{required: 'Please state'}}
                            initValue={''}
                            // validate={errors[item?.field_name] && 'error'}
                            />
                        }
                        </Fragment>
                    ))}
                </Panel>
            </Collapse>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} justify='end'>
                    <Col span={9}>
                        <Button size='large' type='primary' htmlType='button' className='w-100 black-btn' onClick={() => history.push(`/hrms/requests`)}>Cancel</Button>
                    </Col>
                    <Col span={9}>
                        <Button size='large' type='primary' htmlType='submit' className='w-100 green-btn'>Save Changes</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card>
    )
    
}