import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectField } from "../../../atoms/FormElement";
import { Row, Col, Space, Tag, Button, message } from "antd";
import {CloseCircleFilled} from '@ant-design/icons';

export default (props) => {

    const [selected, setSelected] = useState();
    const [options, setOptions] = useState([]);
    const departmentApi = useSelector(state => state.forms.approvalList);
    const { control, tags, setTags, deleted, setDeleted } = props;    

    const onAdd = () => {


        if (selected) {
        let temp = [];
        temp = [...options];
        const newtags= [...tags];
            let check = newtags.findIndex(z => z.department == selected.value)
            if (check == -1) {
                let a = options.findIndex(y => y.value == selected.value);
                if (a) {
                    temp[a].isDisabled = true;
                    setOptions(temp);
                }

                let obj = {}
                obj['department'] = selected.value;
                // obj['department'] = selected.label;
                newtags.push(obj);
                setSelected("");
                setTags(newtags);
            } else {
                message.error('Already Exist')
            }
        }
    }

    const onRemove = e => {
        let temp = [];
        temp = [...options];
        if (e.doctype) {
            let delDept = []
            delDept= [...deleted];
            delDept.push(e.department);
            setDeleted(delDept);
        }
        let a = options.findIndex(y => y.value == e.department);
        if (a) {
            temp[a].isDisabled = false;
            setOptions(temp);
        }
        const current = tags.filter(tag => tag.department !== e.department);
        if (current) {
            setTags(current);
        }
    };

    useEffect(() => {
        if(departmentApi.length >0) {
            let temp = [];
            departmentApi?.map(item =>( 
                temp.push({ label: item.name, value: item.name, isDisabled: false })
            ))
            setOptions(temp);
        }
    }, [departmentApi]);

    
    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <Row gutter={20} align='bottom'>
                    <Col flex='auto'>
                <SelectField
                    class='mb-0'
                    fieldname='departments_list'
                    label='Department'
                    control={control}
                    iProps={{placeholder: 'Please Add Department'}}
                    selectOption={options}
                    onChange={(e) => setSelected(e)}
                />
                </Col>
                <Col flex='80px'>
                <Button type='primary' htmlType='button' size='large' className='green-btn' onClick={onAdd}>Add</Button>
                </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Space size={20} direction='vertical' className='w-100'>
                {tags.map((tag, index) => (
                <React.Fragment key={index}>
                    <Tag closable closeIcon={<CloseCircleFilled />} className="program-list" key={tag.department} onClose={() => onRemove(tag)}>
                        <span className='p-name w-100'>
                            <span className="p-detail">{tag.department}</span>
                        </span>
                    </Tag>
                </React.Fragment>
                ))}
                </Space>
            </Col>
        </Row>
    )
}