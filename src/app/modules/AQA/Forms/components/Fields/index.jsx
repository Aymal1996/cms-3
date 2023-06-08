import React, { useEffect } from 'react';
import {Row, Col, Button } from 'antd';
import {SelectField} from '../../../../../atoms/FormElement';
import { useFieldArray } from 'react-hook-form';
import {CloseCircleFilled} from '@ant-design/icons';
import { useSelector} from 'react-redux';

const initQ = {
    field_name: '',
}

const options = [
    {
        label: 'Approval',
        value: 'Approval'
    },
    {
        label: 'Rejection',
        value: 'Rejection'
    }
]

export default (props) => {

    const { control, errors, setDeleted, deleted, t, mode } = props;
    const fieldList = useSelector(state => state.forms.fieldsData);
        
    const { fields, append, remove } = useFieldArray({
        control,
        name: `form_fields`,
      });

      useEffect(() => {
        if(fieldList.length > 0 && mode != 'edit') {
            let a = fieldList.find(x => x.name == 'Student ID');
            let d = fieldList.find(x => x.name == 'Student');
            let b = fieldList.find(x => x.name == 'Requester');
            let c = fieldList.find(x => x.name == 'Department');
            append({field_name: a});
            append({field_name: d});
            append({field_name: b});
            append({field_name: c});
        }
      }, [fieldList]);

    const onAdd = () => {
        append(initQ)
    }

    const onRemove = (e, index) => {
        if (e.doctype) {
            let delDept = []
            delDept= [...deleted];
            delDept.push(e.name);
            setDeleted(delDept);
        }
        remove(index)
    };

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <Row gutter={[20,20]}>
            {fields.map((item,index) => (
                <Col span={24} key={item.id}>
                <Row gutter={20} wrap={false}>
                    <Col flex="auto">
                        <SelectField
                        fieldname={`form_fields[${index}.field_name`}
                        label=''
                        class='mb-0'
                        initValue={item.field_name ? {label: item.field_name.name, value: item.field_name.name, type: item.field_name.type} : ''}
                        iProps={{ isDisabled: index > 3 ? false : true }}
                        control={control}
                        selectOption={fieldList?.map(e => ({label: e.name, value: e.name, type:e.type }))}
                        rules={{ required: 'Select one' }}
                        validate={
                            Object.entries(errors).length > 0 &&
                            errors?.form_fields?.length > 0 &&
                            errors?.form_fields[index]?.field_name &&
                            "error"
                        }
                        validMessage={
                            Object.entries(errors).length > 0 &&
                            errors?.form_fields?.length > 0 &&
                            errors?.form_fields[index]?.field_name &&
                            errors?.form_fields[index]?.field_name?.message
                        }
                        />
                    </Col>
                    <Col flex="40px">
                        {index > 3 &&
                        <Button type='link' size="large" className='cross-iconbtn' htmlType='button' icon={<CloseCircleFilled />} onClick={() => onRemove(item, index)} />
                        }
                    </Col>
                </Row>
                </Col>
            ))}
            </Row>
            </Col>
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={onAdd}>+ Add field</Button>
            </Col>
        </Row>
    )
}