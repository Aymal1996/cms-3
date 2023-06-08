import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectField } from "../../../atoms/FormElement";
import { Row, Col, Space, Tag, Card, Button, Switch, Typography } from "antd";
import { useForm } from "react-hook-form";
import { showDuration } from "../../AQA/utils/dateCalc";
import {CloseCircleFilled} from '@ant-design/icons';

const { Title } = Typography;

export default (props) => {

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState();
    const programApi = useSelector(state => state.faculty.programmes);
    const { tags, setTags, deleted, setDeleted } = props;    
    const { control } = useForm();
    

    const onAdd = () => {
        if (selected) {
        let temp = [];
        temp = [...options];
        const newtags= [...tags];
            let check = newtags.findIndex(z => z.program == selected.value)
            console.log('value check', check);
            if (check == -1) {
                let a = options.findIndex(y => y.value == selected.value);
                if (a) {
                    temp[a].isDisabled = true;
                    setOptions(temp);
                }

                let obj = {}
                obj['program'] = selected.value;
                obj['name'] = selected.label;
                obj['ineffective_date'] = selected.expired;
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
            let delProg = []
            delProg= [...deleted];
            delProg.push(e.program);
            setDeleted(delProg);
        }
        let a = options.findIndex(y => y.value == e.program);
        if (a != -1) {
            temp[a].isDisabled = false;
            setOptions(temp);
        }
        const current = tags.filter(tag => tag.program !== e.program);
        if (current) {
            setTags(current);
        }
    };

    const onStatus = (val, item) => {
        const newtags= [...tags];
        let idx = newtags.findIndex(x => x.program == item.program);
        newtags[idx].status = val ? 'Active' : 'Inactive';
        setTags(newtags);
    }

    useEffect(() => {
        if(programApi) {
            let temp = [];
            programApi.map(item =>( 
                temp.push({ label: item.program_name, value: item.name, isDisabled: false, expired: item.ineffective_date  })
            ))
            setOptions(temp);
        }
    }, [programApi]);

    
    return (
        <Row gutter={[20, 10]}>
            <Col span={24}><Title level={4} className='mb-1'>{deleted ? 'Add ' : 'Attached '}Programme</Title></Col>
            {deleted && <>
            <Col span={24}>
                <Row gutter={20}>
                    <Col flex='auto'>
                <SelectField
                    class='mb-0'
                    fieldname='porgram'
                    label=''
                    control={control}
                    iProps={{placeholder: 'Type Program name'}}
                    selectOption={options}
                    onChange={(e) => setSelected(e)}
                />
                </Col>
                <Col flex='80px'>
                <Button type='primary' htmlType='button' size='large' className='green-btn' onClick={onAdd}>Add</Button>
                </Col>
                </Row>
            </Col>
            </>}
            <Col span={24}>
                <Space size={20} direction='vertical' className='w-100'>
                {tags.map((tag, index) => (
                    <Tag closable={deleted ? true : false} closeIcon={deleted ? <CloseCircleFilled /> : null} className="program-list" key={tag.program} onClose={() => deleted ? onRemove(tag) : null}>
                        <Card bordered={false} className='transparent-card'>
                        <Row gutter={20} align='middle'>
                            <Col flex="auto">
                                <span className='p-name w-100'>
                                    <span className="p-detail">{tag.name}</span>
                                    {tag?.ineffective_date && <span className="p-date">{showDuration(tag?.ineffective_date)}</span>}
                                </span>
                            </Col>
                            {tag.status && 
                                <Col flex='40px'>
                                    <Switch checked={tag.status == 'Active'} onChange={(e) => onStatus(e, tag)} />
                                </Col>
                            }
                        </Row>
                        </Card>
                        
                    </Tag>
                ))}
                </Space>
            </Col>
        </Row>
    )
}