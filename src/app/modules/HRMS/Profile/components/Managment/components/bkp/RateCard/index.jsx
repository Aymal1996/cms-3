import React, { useState } from 'react';
import { Card, Row, Col, Button, Select, Form } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { RatingStars } from './Rating';
import { Controller } from 'react-hook-form';
import { InputField, RateField } from '../../../../../../../atoms/FormElement';
// import querystring from 'querystring';
import axios from '../../../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../../../configs/constants';

const querystring = require('querystring');
const { Option } = Select;

export default (props) => {

    const { control, index, item, onRemove, array } = props;
    const [data, setData] = useState([]);
    const [value1, setValue1] = useState();
    let timeout;
    let currentValue;

    function getData(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function callingFunc() {
            let url = `${apiMethod}/hrms.api.search_skill?search=${value}&job_title=${props.job}`
            axios.get(url)
                .then(d => {
                    if (currentValue === value) {
                        const { data: { message } } = d;
                        const data = [];
                        message.forEach(r => {
                            console.log('kkk', r)
                            data.push({
                                value: r,
                                text: r,
                            });
                        });
                        callback(data);
                    }
                });
        }

        timeout = setTimeout(callingFunc, 300);
    }

    const handleSearch = value => {
        if (value) {
            getData(value, data => setData(data));
        } else {
            setData([]);
        }
    };

    return (
        <Card bordered={false} className='small-card12 b-black'>
            <Row gutter={[20, 20]}>
                <Col flex='auto'>
                    <InputField
                        fieldname={`${array}[${index}].name`}
                        label=''
                        class='readonly-transparent d-none'
                        initValue={item.name ? item.name : ''}
                        control={control}
                        iProps={{ readOnly: true }}
                    />
                    {item.skill_name ?
                        <InputField
                            fieldname={`${array}[${index}].skill_name`}
                            label=''
                            class='readonly-transparent'
                            initValue={item.skill_name ? item.skill_name : ''}
                            control={control}
                            iProps={{ readOnly: true }}
                        />
                        :
                        <Form.Item
                            label={''}
                            className={'mb-0'}
                        >
                            <Controller
                                name={`${array}[${index}].skill_name`}
                                control={control}
                                defaultValue={''}
                                render={({ value, onChange, onSearch }) => (
                                    <Select
                                        value={value1}
                                        onChange={(e) => { onChange(e); setValue1(e) }}
                                        onSearch={(e) => handleSearch(e)}
                                        placeholder={'Enter skill'}
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        notFoundContent={null}
                                        showSearch
                                    >
                                        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                                    </Select>
                                )}
                            />
                        </Form.Item>}
                </Col>
                <Col flex='20px'>
                    <Button
                        type="link"
                        className="cross-iconbtn graycross-icon p-0"
                        htmlType="button"
                        icon={<CloseCircleFilled />}
                        onClick={() => onRemove(index, item)}
                    />
                </Col>
                <Col span={24}>
                    <Row gutter={[20, 20]} justify='space-between'>
                        <Col flex='0 1 285px'>
                            <RateField
                                class='ratingField blue-rate mb-0'
                                fieldname={`${array}[${index}].self_staff_assessment`}
                                control={control}
                                initValue={item.self_staff_assessment ? item.self_staff_assessment : 0}
                                iProps={{ character: ({ index }) => RatingStars[index + 1] }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}