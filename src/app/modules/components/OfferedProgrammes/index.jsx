import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { InputField, SelectField, CheckboxGroup } from "../../../atoms/FormElement";
import { Row, Col, Typography, Button, Card } from "antd";
import { useFieldArray } from "react-hook-form";

const { Title, Text } = Typography;

const initQ = {
    program: '',
    include_exclude: '',
    name: ''
}

const includeExclude = [
    {
        label: 'Include', 
        value: 'Include', 
    },
    {
        label: 'Exclude', 
        value: 'Exclude', 
    }
]
export default (props) => {

    const { control, programmeDropData } = props;    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "offered_program",
      });

        
    return (
        <Row gutter={[20, 20]}>
            <Col span={24}><Title level={5} className='mb-0'>Offered Programmes</Title></Col>
            <Col span={24}>
                {fields.map((item, index) => (
                    <Card className='offeredCard' key={item.id}>
                        <Row gutter={[20,30]} align='bottom'>
                            <Col span={6}>
                                <SelectField
                                    fieldname={`offered_program[${index}].include_exclude`}
                                    label=''
                                    class='mb-0 w-100'
                                    initValue={item.include_exclude ? {label: item.include_exclude, value: item.include_exclude} : ''}
                                    control={control}
                                    iProps={{ placeholder: 'Select one'}}
                                    selectOption={includeExclude}
                                />
                            </Col>
                            <Col span={18}>
                                <SelectField
                                    fieldname={`offered_program[${index}].program`}
                                    label=''
                                    class='mb-0 w-100'
                                    initValue={item.program ? {label: item.program_name, value: item.program}: ''}
                                    control={control}
                                    iProps={{ placeholder: 'Select one'}}
                                    selectOption={
                                        programmeDropData &&
                                        programmeDropData.map((e) => {
                                            return { value: e.name, label: e.program_name };
                                        })
                                    }
                                />
                            </Col>
                            <Col span={12} style={{display:'none'}}>
                                <InputField 
                                    fieldname={`offered_program[${index}].name`}
                                    label=''
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please state', size: 'large'}}
                                    initValue={item.name}
                                />
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Col>
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}>+ Add other category</Button>
            </Col>
        </Row>
    )
}