import React, { Fragment, useState } from 'react';
import {Row, Col, Collapse, Button, Typography } from 'antd';
import { useFieldArray } from 'react-hook-form';
import { InputField, SelectField, CheckboxGroup } from 'Atoms/FormElement';
import { scholarPercent, renewalDuration } from '../../../../../../../../configs/constantData';

const { Panel } = Collapse;
const { Text } = Typography;
const _ = require("lodash");

const checkoption = [
    { label: 'Registration Fee', value: 'waive_registration_fee' },
    { label: 'Resource Fee', value: 'waive_resource_fee' },
    { label: 'Administration Fee', value: 'waive_administration_fee' }, 
    { label: 'Security Deposit', value: 'waive_security_deposit_fee' },
    { label: 'Wing of Creativity Book Fee', value: 'waive_woc_fee' }
]

const initQ = {
    name:'',
    structure_name:'Scheme',
    scheme_name: '',
    scholarship_type: '',
    renewal_condition: '',
    wave: [],
}
 
export default (props) => {

    const [iconPos, setIconPos] = useState(false);
    const { control, errors, setDeleted, t } = props;
    const [panelActive, setPanelActive] = useState(["1"]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "schemes_structure",
      });

    const callback = (key) => {
        setPanelActive(key);
    };

    const onRemove = (e, index) => {
        if (e.doctype) {
            let delDept = []
            delDept= [...deleted];
            delDept.push(e.name);
            setDeleted(delDept);
        }
        remove(index)
    };

    const semesterHeader = (heading, item, index) => (
        <Row gutter={20} onClick={() => setIconPos(!iconPos)}>
              <Col flex="auto">{heading +' '+ (index+1)}</Col>
              <Col flex="100px"><Button type="link" onClick={() => onRemove(item, index)}>Remove</Button></Col>
              <Col flex="100px"><Button type="link">{iconPos ? 'Hide' : 'Show'}</Button></Col>
          </Row>
    )

    const onAdd = () => {
        append(initQ)
        let leng = `${fields.length + 1}`;
        setPanelActive([leng]);
      }

    return (
        
        <Row gutter={[20, 30]} align='bottom'>
            <Col span={24}>
                <Collapse activeKey={panelActive} forceRender accordion={true} onChange={callback} className='black-card' expandIconPosition='right' bordered={false}>
                    {fields?.map((item,index) => ( 
                    <Fragment key={item.id}>
                        
                        <Panel forceRender={true} header={semesterHeader('Scheme',item,index)}>
                            <Row gutter={[20,30]} align='bottom'>
                                <InputField 
                                    fieldname={`schemes_structure[${index}].name`}
                                    label=''
                                    control={control}
                                    class='d-none mb-0'
                                    initValue={item?.name}
                                    iProps={{ size: 'large'}}
                                />
                                <Col span={12}>
                                    <InputField
                                        fieldname={`schemes_structure[${index}].scheme_name`}
                                        label='Scheme Name'
                                        control={control}
                                        class='mb-0'
                                        initValue={item?.scheme_name}
                                        iProps={{ placeholder: 'Please state', size: 'large'}}
                                    />
                                </Col>
                                <Col span={12}>
                                    <SelectField
                                        fieldname={`schemes_structure[${index}].scholarship_type`}
                                        label='Scholarship Type'
                                        control={control}
                                        class='mb-0'
                                        initValue={item?.scholarship_type}
                                        iProps={{ placeholder: 'Please state' }}
                                        selectOption={scholarPercent}
                                    />
                                </Col>
                                <Col span={24}>
                                    <SelectField
                                        fieldname={`schemes_structure[${index}].renewal_condition`}
                                        label='Renewal Condition'
                                        control={control}
                                        class='mb-0'
                                        initValue={item?.renewal_condition}
                                        iProps={{ placeholder: 'Please state' }}
                                        selectOption={renewalDuration}
                                    />
                                </Col>
                            <Col span={24}>
                                <Text className='c-gray smallFont12'>Wave</Text>
                                <CheckboxGroup
                                    fieldname={`schemes_structure[${index}].wave`}
                                    label={''}
                                    class={`mb-0 fullWidth-checbox`}
                                    control={control}
                                    initValue={item?.wave}
                                    option={checkoption}
                                    />
                                </Col>
                            </Row>
                        </Panel>
                    </Fragment>
                    ))}
                </Collapse>
            </Col>
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={onAdd}>+ Add other Scheme</Button>
            </Col>
        </Row>
    )
}