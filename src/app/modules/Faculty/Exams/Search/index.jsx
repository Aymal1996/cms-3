import React,  { useState, useEffect } from 'react';
import {Button, Form,Col,Space, Typography } from 'antd';
import { InputField,SelectField } from '../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {getModules,getFaculties,getProgramme,getLecturehall } from '../ducks/actions';

export default (props) => {

    const { control, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { Title, Text } = Typography;
    const getallfaculties = useSelector((state) => state.exams.getallfaculties);
    const getallmodules = useSelector((state) => state.exams.getallmodules);
    const getlecturehall = useSelector((state) => state.exams.getlecturehall);
    const getallprogramme = useSelector((state) => state.exams.getallprogramme);

    const [type, setType] = useState("");

    useEffect(() => {
        dispatch(getModules());
        dispatch(getFaculties());  
        dispatch(getProgramme());
        dispatch(getLecturehall());
    }, []);
 
  
    let options = [];
  
    if (type === "Module" || type === "Midterm Exam" || type === "Final Exam") {
       getallmodules.map(item =>( 
         options.push({ label: item.module_name, value: item.module_name})
       ))  

    }else if (type === "Faculty") {
        getallfaculties.map(item =>( 
          options.push({ label: item.faculty_name, value: item.faculty_name})
        ))
    
    }else if (type === "Programme") {
        getallprogramme.map(item =>( 
          options.push({ label: item.program_name, value: item.program_name})
        ))
    }else if (type === "Lecture Hall") {
        getlecturehall.map(item =>( 
          options.push({ label: item.name, value: item.name})
        ))
    }
    

     const category = [
        {label: 'Module',  value: 'Module'},
		{label: 'Midterm Exam', value: 'Midterm Exam'},  
        {label: 'Final Exam', value: 'Final Exam'}, 
        {label: 'Programme', value: 'Programme'}, 
        {label: 'Faculty', value: 'Faculty'},
        {label: 'Lecture Hall', value: 'Lecture Hall'},
	 ]

    const onSubmit = (val) => {
        props.onSearch(val);
    }

    return (
        <Space size={10} direction='vertical' className='w-100'>
            <Title level={5} className='c-gray mb-0'>Category:</Title>
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
            <SelectField 
                                    isRequired=''
                                    fieldname='category'
                                    control={control}
                                    selectOption={category}
                                    class='width-25'
                                    iProps={{ placeholder: 'Please select'}}
                                    onChange={(e) => setType(e.value)}
                                />
                                    <SelectField 
                                    isRequired=''
                                    fieldname='category_data'
                                    control={control}
                                    selectOption={options}
                                    class='width-65'
                                    iProps={{ placeholder: 'Please select from modules'}}
                                />
   

                               <Col flex='0 1 100px'> <Button size='large' type='primary' htmlType='submit'>Search</Button></Col>
                               <Col flex='0 1 100px'>  <Button size='large' type='secondary' onClick={() => window.location.reload()} htmlType='submit'>Clear</Button></Col>
            </Form>
        </Space>
    )
}   