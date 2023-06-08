import React, {useEffect} from 'react';
import {Row, Col, Card, Button, Typography } from 'antd';
import {InputField, SelectField, CheckboxGroup } from '../../../../../../../atoms/FormElement';
import { useFieldArray } from "react-hook-form";
import { useSelector } from 'react-redux';

const {Title} = Typography;

const initQ = {
    qualification: '',
    cgpa: '',
    credit_value: null,
}

const qualificationList = [
    {
        label: 'O Levels', 
        value: 'O Levels', 
    },
    {
        label: 'A Levels', 
        value: 'A Levels', 
    },
    {
        label: 'Graduation', 
        value: 'Graduation', 
    }
]

const cgpaList = [
    {
        label: 'CGPA', 
        value: 'CGPA', 
    },
    {
        label: 'APAG', 
        value: 'APAG', 
    },
    {
        label: 'WAS', 
        value: 'WAS', 
    }
]

export default (props) => {

    const { control, errors, mode, t } = props;
    const inst_code = useSelector(state => state.faculty.institutions);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "program_requirements",
      });

    return (
        
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <SelectField
                fieldname='institution_name'
                label='Campus'
                class='mb-0 w-100'
                initValue=''
                control={control}
                iProps={{ placeholder: 'Select one'}}
                selectOption={inst_code?.map(e => ({label: e.name, value: e.name}))}
                // rules={{ required: 'Select one' }}
                // validate={errors.institution_name && 'error'}
                // validMessage={errors.institution_name && errors.institution_name.message}
                />
            </Col>
            <Col span={24}>
                <Title level={5} className='mb-0'>Qualifications</Title>
            </Col>
            <Col span={24}>
                {fields.map((item, index) => (
                <Card className='border-card' key={item.id}>
                    <Row gutter={[20,30]} align='bottom'>
            <Col flex={'auto'}><Title level={5} className='mb-0'>Qualification {index + 1}</Title></Col>
            <Col flex='80px'><Button type='link' htmlType='button' className='p-0 h-auto c-gray-linkbtn' onClick={() => remove(index)}>Remove</Button></Col>
            <Col span={24}>
                <SelectField
                    fieldname={`program_requirements[${index}].qualification`}
                    label=''
                    class='mb-0 w-100'
                    initValue={item.qualification ? {label: item.qualification, value: item.qualification}: ''}
                    control={control}
                    iProps={{ placeholder: 'Select one'}}
                    selectOption={qualificationList}
                    // rules={{ required: 'Select one' }}
                    // validate={
                    //     Object.entries(errors).length > 0 &&
                    //     errors?.program_requirements?.length > 0 &&
                    //     errors?.program_requirements[index]?.qualification &&
                    //     "error"
                    //   }
                    //   validMessage={
                    //     Object.entries(errors).length > 0 &&
                    //     errors?.program_requirements?.length > 0 &&
                    //     errors?.program_requirements[index]?.qualification &&
                    //     errors?.program_requirements[index]?.qualification?.message
                    //   }
                />
            </Col>
            <Col span={12}>
                <SelectField
                    fieldname={`program_requirements[${index}].cgpa`}
                    label='CGPA/Credit Value'
                    class='mb-0 w-100'
                    initValue={item.cgpa ? {label: item.cgpa,value: item.cgpa} : ''}
                    control={control}
                    iProps={{ placeholder: 'Select one'}}
                    selectOption={cgpaList}
                    // rules={{ required: 'Select one' }}
                    // validate={
                    //     Object.entries(errors).length > 0 &&
                    //     errors?.program_requirements?.length > 0 &&
                    //     errors?.program_requirements[index]?.cgpa &&
                    //     "error"
                    //   }
                    //   validMessage={
                    //     Object.entries(errors).length > 0 &&
                    //     errors?.program_requirements?.length > 0 &&
                    //     errors?.program_requirements[index]?.cgpa &&
                    //     errors?.program_requirements[index]?.cgpa?.message
                    //   }
                />
            </Col>
            <Col span={12}>
                <InputField 
                    fieldname={`program_requirements[${index}].credit_value`}
                    label=''
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue={item.credit_value}
                    // rules={{ required: 'Value required' }}
                    // validate={
                    //     Object.entries(errors).length > 0 &&
                    //     errors?.program_requirements?.length > 0 &&
                    //     errors?.program_requirements[index]?.credit_value &&
                    //     "error"
                    //   }
                    //   validMessage={
                    //     Object.entries(errors).length > 0 &&
                    //     errors?.program_requirements?.length > 0 &&
                    //     errors?.program_requirements[index]?.credit_value &&
                    //     errors?.program_requirements[index]?.credit_value?.message
                    //   }
                />
            </Col>

            </Row>
            </Card>
            ))}
        </Col>
        <Col span={24}>
            <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}>+ Add other qualifications</Button>
        </Col>
        <Col span={24}>
                <Title level={5} className='mb-0'>Compulsory Modules</Title>
            </Col>
            <Col span={24}>
                <CheckboxGroup
                fieldname="compulsary_modules"
                label=""
                class="fullWidth-checbox"
                control={control}
                initValue=""
                option={[{label: 'English', value: 'English'}, {label: 'Arabic', value: 'Arabic'}]}
              />
            </Col>
        </Row>
    )
}