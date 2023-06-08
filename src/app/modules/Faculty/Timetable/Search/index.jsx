import React,  { useState, useEffect } from 'react';
import {Button, Form,Col,Space, Typography } from 'antd';
import { InputField,SelectField } from '../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {getModules,getFaculties,getProgramme} from '../../Exams/ducks/actions';
import {getClassroomTypes} from '../../Timetable/ducks/actions';

const { Title } = Typography;

export default (props) => {

    const { control, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [type, setType] = useState("");
    const [emptyArray, setEmptyArray] = useState("Please select");
    
    const getallfaculties = useSelector((state) => state.exams.getallfaculties);
    const getallmodules = useSelector((state) => state.exams.getallmodules);
    const getallprogramme = useSelector((state) => state.exams.getallprogramme);
    const classroomTypes = useSelector((state) => state.timetable.classroomTypes);

     const category = [
        {label: 'Module',  value: 'Module'},
        {label: 'Programme', value: 'Programme'}, 
        {label: 'Faculty', value: 'Faculty'},
        {label: 'Learning mode', value: 'Learning Mode'},
        {label: 'Class Type', value: 'Class Type'},
	 ]
     const learningMode = [
        {label: 'Physical',  value: 'Physical'},
        {label: 'Online', value: 'Online'}
      ] 

     useEffect(() => {
        dispatch(getModules());
        dispatch(getFaculties());  
        dispatch(getProgramme());
        dispatch(getClassroomTypes());
    }, []);
 

    let options = [];
    if (type === "Module") {
       getallmodules?.map(item =>( 
         options.push({ label: item.module_name, value: item.module_name})
       ))  

    }else if (type === "Faculty") {
        getallfaculties?.map(item =>( 
          options.push({ label: item.faculty_name, value: item.faculty_name})
        ))
    
    }else if (type === "Programme") {
        getallprogramme?.map(item =>( 
          options.push({ label: item.program_name, value: item.program_name})
        ))
    }else if (type === "Class Type") {
        classroomTypes?.map(item =>( 
          options.push({ label: item.name, value: item.name})
        ))
    }else if (type === "Learning Mode") {
        learningMode?.map(item =>( 
          options.push({ label: item.value, value: item.value})
        ))
    }
    
    

    const onSubmit = (val) => {
        props.onSearch(val);
    }


    return (
        <Space size={10} direction='vertical' className='w-100'>
            <Title level={5} className='c-gray mb-0'></Title>
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
            <SelectField 
                                    isRequired=''
                                    fieldname='category'
                                    control={control}
                                    selectOption={category}
                                    class='width-15'
                                    iProps={{ placeholder: 'Please select category'}}
                                    onChange={(e) => setType(e.value)}
                                    
                                />

                                    <SelectField 
                                    isRequired=''
                                    fieldname='category_data'
                                    control={control}
                                    selectOption={options}
                                    class='width-15'
                                    iProps={{ placeholder: 'Please select'}}
                                />
   

                               <Col flex='0 1 100px'> <Button size='large' type='primary' htmlType='submit'>Search</Button></Col>
                               <Col flex='0 1 100px'>  <Button size='large' type='secondary' onClick={() => window.location.reload()} htmlType='submit'>Clear</Button></Col>
            </Form>
        </Space>
    )
}