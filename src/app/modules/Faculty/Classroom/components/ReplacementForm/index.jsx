import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Typography, Space, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { SelectField, DateField } from 'Atoms/FormElement';
import ListCard from 'Molecules/ListCard';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { replaceClass } from '../../ducks/services';
import { getClassroom } from '../../../Timetable/ducks/actions';

const { Title, Text } = Typography;

const timing = [
    {label: '09:00am', value: '09:00:00'},
    {label: '10:00am', value: '10:00:00'},
    {label: '11:00am', value: '11:00:00'},
    {label: '12:00pm', value: '12:00:00'},
    {label: '01:00pm', value: '13:00:00'},
    {label: '02:00pm', value: '14:00:00'},
    {label: '03:00pm', value: '15:00:00'},
    {label: '04:00pm', value: '16:00:00'},
    {label: '05:00pm', value: '17:00:00'},
    {label: '06:00pm', value: '18:00:00'},
]

export default (props) => {

    const dispatch = useDispatch();
    const { data, updateApi, setPopVisible } = props;
    const { control, errors, setValue, handleSubmit, reset } = useForm()
    const [visible, setVisible] = useState(false);
    const [rData, setRdata] = useState(null);
    const classrooms = useSelector((state) => state.timetable.classrooms);

    useEffect(() => {
        if (rData != null) {
            dispatch(getClassroom(rData.classroom_type));
        }
    }, [rData]);

    const colName = [
        {
            title: 'Module Name',
            dataIndex: 'module_name',
            key: 'module_name',
        },
        {
            title: 'Classroom',
            dataIndex: 'classroom',
            key: 'classroom',
        },
        {
            title: 'Date',
            dataIndex: 'class_date',
            key: 'class_date',
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
        },
    ]

    const onClickRow = (record) => {
        return {
            onClick: () => {
                setVisible(true);
                setRdata(record)
                // setValue("classroom_name", record?.classroom_name)
                // setValue("classStart", record?.class_date ? moment(record?.class_date, 'YYYY MM DD') : '')
                // setValue("start_time", record.start_time)
                // setValue("end_time", record.end_time)
            }
        };
    };

    const onSubmit = (val) => {

        const body = { 
            timetable_id: rData?.timetable_id,
            class_date: rData?.class_date,
            replacement_date: val?.classStart ? moment(val.classStart).format('YYYY-MM-DD') : '',
            classroom_name: val?.classroom_name ? val.classroom_name.value : '',
            start_time: val?.start_time.value,
            end_time: val?.end_time.value,
            name: rData.name
        }

        replaceClass(body).then(res => {
            if (res.data.message.success == false) {
                message.error(res.data.message.message);
            } else {
                message.success('Class Replace Successfully');
                setRdata(null);
                setTimeout(() => {
                    let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
                    let endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
                    updateApi(startOfMonth, endOfMonth);
                    setVisible(false);
                }, 1500)
            }
        }).catch(e => {
            message.error('Something went wrong')
        })
    }

    return (
        <Row gutter={[20,30]}>
            <Col span={24}><Title level={3} className='mb-0'>Replacement Class</Title></Col>
            <Col span={24} className="clickRow">
                {!visible ?
                <ListCard
                listClass={'nospace-card'}
                classes='transparent-table'
                onRow={onClickRow} 
                ListCol={colName}
                ListData={data}
                pagination={false}
                />
                :
                <Form onFinish={handleSubmit(onSubmit)} className   ='w-100' layout='vertical'>
                    <Row gutter={[20,30]} align='bottom'>
                        <Col flex='auto'>
                            <SelectField
                                fieldname={'classroom_name'}
                                label='Classroom'
                                class='mb-0 w-100'
                                initValue={rData ? {label: rData.classroom, value: rData.classroom_name}: ''}
                                control={control}
                                selectOption={classrooms ? classrooms.map(x => ({label: x.classroom_name, value: x.name})): []}
                                rules={{required: true}}
                                validate={ errors?.classroom_name && "error" }
                            />
                        </Col>
                        <Col flex='auto'>
                            <DateField 
                                fieldname='classStart'
                                label='Class Start'
                                control={control}
                                class='mb-0 w-100'
                                iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                initValue={rData ? moment(rData.class_date, 'YYYY MM DD') : ''}
                                validate={errors.classStart && 'error'}
                            />
                        </Col>
                        <Col flex='auto'>
                            <SelectField
                                fieldname={'start_time'}
                                label='Time'
                                class='mb-0 w-100'
                                initValue={rData && rData.start_time ? {label: moment(rData?.start_time, 'hh:mm:ss').format('hh:mma'), value: rData.start_time}: ''}
                                control={control}
                                selectOption={timing}
                                rules={{required: true}}
                                validate={ errors?.start_time && "error" }
                            />
                        </Col>
                        <Col>
                            <Text>to</Text>
                        </Col>
                        <Col flex='auto'>
                            <SelectField
                                fieldname={'end_time'}
                                label=''
                                class='mb-0 w-100'
                                initValue={rData && rData.end_time ? {label: moment(rData.end_time, 'hh:mm:ss').format('hh:mma'), value: rData.end_time}: ''}
                                control={control}
                                selectOption={timing}
                                rules={{required: true}}
                                validate={ errors?.end_time && "error" }
                            />
                        </Col>
                        <Col span={24}>
                            <Row gutter={20} justify='end'>
                                <Col>
                                    <Button size='large' type='primary' htmlType='button' className='black-btn' onClick={() => {setVisible(false); setRdata(null)}}>Cancel</Button>
                                </Col>
                                <Col>
                                    <Button size='large' type='primary' htmlType='submit' className='green-btn'>Save Changes</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Form>
                }
            </Col>
        </Row>
    )
}