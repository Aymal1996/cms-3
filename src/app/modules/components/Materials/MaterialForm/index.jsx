import React, { useState } from 'react';
import { Col, Button } from 'antd';
import { SelectField, InputField } from 'Atoms/FormElement';
import {CloseCircleFilled} from '@ant-design/icons';
import { weekList, materialType } from '../../../../../configs/constantData';

export default (props) => {

    const { control, errors, index, item, remove, watcher, setValue } = props;
    const [ exam, setExam ] = useState(false);

    const onTypeChange = (val) => {
        if(val.value == 'Exam') {
            setExam(true)
            let a = watcher.filter(x => x.materialType.label == 'Exam')
            let i = watcher.findIndex(x => x.week_name == 'Midterm Exam');
            console.log('hello', a.length, a)
            if (a.length <= 2) {
                if (a.length < 1) {
                    setValue(`materials[${index}].week_name`, 'Midterm Exam')
                } else if (a.length < 2 && i == index) {
                    setValue(`materials[${index}].week_name`, 'Midterm Exam')
                } else {
                    if (i == index) {
                        setValue(`materials[${index}].week_name`, 'Midterm Exam')
                    } else {
                        setValue(`materials[${index}].week_name`, 'Final Exam')
                    }
                }
            } else {
                setValue(`materials[${index}].materialType`, '')
                setValue(`materials[${index}].week_name`, '')
            }
        } else {
            exam == true && setExam(false);
        }
    }

    return (
        <>
            <Col span={5}>
                <SelectField 
                isRequired={true}
                fieldname={`materials[${index}].weeks`}
                label={index == 0 ? 'Weeks' : ''}
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Weeks'}}
                rules={{required: 'Select Week'}}
                initValue={item?.weeks ? { label: item.weeks, value: item.weeks } : ''}
                selectOption={weekList}
                validate={
                    Object.entries(errors).length > 0 &&
                    errors?.materials?.length > 0 &&
                    errors?.materials[index]?.weeks &&
                    "error"
                }
                validMessage={
                    Object.entries(errors).length > 0 &&
                    errors?.materials?.length > 0 &&
                    errors?.materials[index]?.weeks &&
                    errors?.materials[index]?.weeks?.message
                }
                />
            </Col>
                    
            <Col span={5}>
                <SelectField 
                isRequired={true}
                fieldname={`materials[${index}].materialType`}
                label={(index=='') ? 'Material Type' : ''}
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Type'}}
                rules={{required: 'Select Type'}}
                onChange={onTypeChange}
                initValue={item.materialType ? { label: item.materialType, value: materialType } : ''}
                selectOption={materialType}
                validate={
                    Object.entries(errors).length > 0 &&
                    errors?.materials?.length > 0 &&
                    errors?.materials[index]?.materialType &&
                    "error"
                }
                validMessage={
                    Object.entries(errors).length > 0 &&
                    errors?.materials?.length > 0 &&
                    errors?.materials[index]?.materialType &&
                    errors?.materials[index]?.materialType?.message
                }
                />
            </Col>
                    
            <Col span={12}>
                <InputField 
                isRequired={true}
                fieldname={`materials[${index}].week_name`}
                label={index == 0 ? 'Week Name' : ''}
                control={control}
                class='mb-0'
                initValue={item.week_name}
                iProps={{ readOnly: exam,placeholder: 'description', size: 'large'}}
                rules={{ required: 'Week Name Required' }}
                validate={
                    Object.entries(errors).length > 0 &&
                    errors?.materials?.length > 0 &&
                    errors?.materials[index]?.materials &&
                    "error"
                }
                validMessage={
                    Object.entries(errors).length > 0 &&
                    errors?.materials?.length > 0 &&
                    errors?.materials[index]?.materials &&
                    errors?.materials[index]?.materials?.message
                }
                />
            </Col>
                
            <Col flex="40px">
                <Button type='link' size="large" className='cross-iconbtn mb-10PX' htmlType='button' icon={<CloseCircleFilled className='fontSize20'/>} onClick={() => remove(index)} />
            </Col>
        </>
    )
}