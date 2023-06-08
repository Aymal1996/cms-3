import React from "react";
import { SelectField } from "Atoms/FormElement";
import { Row, Col, Button } from "antd";
import {CloseCircleFilled} from '@ant-design/icons';

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

    const { control, errors, programList, item, pindex, remove, index, mode } = props;    

    return (
        <Row gutter={[20,20]} align='middle'>
            <Col flex='auto'>
                <Row gutter={[20,20]}>
                <Col span={6}>
                    <SelectField
                        fieldname={`intakes[${pindex}].attached_program[${index}].include_exclude`}
                        label=''
                        class='mb-0 w-100'
                        initValue={item?.include_exclude ? {label: item.include_exclude, value: item.include_exclude} : ''}
                        control={control}
                        iProps={{ placeholder: 'Select one', isDisabled: props.static}}
                        selectOption={includeExclude}
                        rules={{required: true}}
                        validate={
                            Object.entries(errors).length > 0 &&
                            errors?.intakes?.length > 0 &&
                            errors?.intakes[pindex]?.attached_program.length > 0 &&
                            errors?.intakes[pindex]?.attached_program[index].include_exclude &&
                            "error"
                        }
                    />
                </Col>
                <Col span={18}>
                    <SelectField
                        fieldname={`intakes[${pindex}].attached_program[${index}].program`}
                        label=''
                        class='mb-0 w-100'
                        initValue={item.program ? {label: item.program_name, value: item.program}: item.all_programs == 1 ? {label: 'All Programmes', value: 'All'} : ''}
                        control={control}
                        iProps={{ placeholder: 'Select one', isDisabled: props.static}}
                        selectOption={programList}
                        // rules={{required: true}}
                        // validate={
                        //     Object.entries(errors).length > 0 &&
                        //     errors?.intakes?.length > 0 &&
                        //     errors?.intakes[pindex]?.attached_program.length > 0 &&
                        //     errors?.intakes[pindex]?.attached_program[index].program &&
                        //     "error"
                        // }
                    />
                </Col>
                </Row>
            </Col>
            {props.static == false &&
            <Col flex='40px'>
                <Button type='link' size="large" className='cross-iconbtn mb-10PX' htmlType='button' icon={<CloseCircleFilled className='fontSize20'/>} onClick={() => remove(index)} />
            </Col>}
        </Row>
    )
}