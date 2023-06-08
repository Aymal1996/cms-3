import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { SelectField } from "Atoms/FormElement";
import { Row, Col, Button, Space } from "antd";
import { useFieldArray } from "react-hook-form";
import OfferedProgrammesArray from "../OfferedProgrammesArray";
import {CloseCircleFilled} from '@ant-design/icons';
import { getProgramIncentive } from "../../ducks/services";

const _ = require('lodash');

const initQ = {
    program: '',
    include_exclude: '',
}

export default (props) => {

    const { control, errors, setValue, premove, pindex, pitem, mode } = props;
    const intakeList = useSelector(state => state.incentives.intakeList);
    const [programList, setProgramList] = useState([])
    const { fields, append, remove } = useFieldArray({
        control,
        name: `intakes[${pindex}].attached_program`,
    });
    
    useEffect(() => {
        if (mode == 'add') {
            append(initQ);
        }
    }, []);

    const onChange = (e) => {
        getProgramIncentive({term_start: e.label}).then(res => {
            const temp = [{label: 'All Programmes', value: 'All'}];
            res.data.message.map(x => {
                temp.push({label: x.program_name, value: x.program})
            })
            setProgramList(temp)
        })
    }

    return (
        <Row gutter={[20, 20]} align='middle'>
            <Col span={24}>
                <SelectField
                    fieldname={`intakes[${pindex}].intake_name`}
                    label='Intake Name'
                    class='mb-0 w-100'
                    initValue={pitem.intake ? pitem.intake_term ? {label: pitem.intake_term, value: pitem.intake} : {label: pitem.intake_name, value: pitem.intake} : ''}
                    control={control}
                    iProps={{ placeholder: 'Select one', isDisabled: props.static}}
                    selectOption={_.map(intakeList, (x) => ({label: x.term_start, value: x.name}))}
                    onChange={onChange}
                    rules={{required: true}}
                    validate={
                        Object.entries(errors).length > 0 &&
                        errors?.intakes?.length > 0 &&
                        errors?.intakes[pindex]?.intake_name &&
                        "error"
                    }
                />
                {props.static == false &&
                <Button type='link' size="large" className='right-fixed cross-iconbtn mb-10PX' htmlType='button' icon={<CloseCircleFilled className='fontSize20'/>} onClick={() => premove(pindex)} />}
            </Col>
            <Col span={24}>
                <Space direction='vertical' size={20} className='w-100'>
                {fields.map((item, index) => (
                    <Fragment key={item.id}>
                        <OfferedProgrammesArray
                        control={control}
                        errors={errors}
                        item={item}
                        remove={remove}
                        index={index}
                        pindex={pindex}
                        programList={programList}
                        static={props.static}
                        />
                    </Fragment>
                ))}
                </Space>
            </Col>
            {props.static == false &&
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}>+ Add program</Button>
            </Col>}
        </Row>
    )
}