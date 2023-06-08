import React, {useState, useEffect, Fragment } from 'react';
import HeadingChip from '../../../../molecules/HeadingChip';
import { Typography, Col, Button, Form, Row, Card, message, Space, Spin, Avatar } from 'antd';
import {LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { SelectField, InputField,TimeField } from '../../../../atoms/FormElement';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { useForm,Controller,useFieldArray } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getTimetableDetails,getClassroom, getTimetableStudents, getLecturerTimetable, resetTimetable } from '../ducks/actions';
import moment from 'moment';
import ArrayForm from '../../../Marketing/Applications/AddApplication/ApplicationForm/ArrayForm';
import FormGroup from 'Molecules/FormGroup';
import { Popup } from 'Atoms/Popup';
import AddStudents from '../Component/AddStudents';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

const days = [
  {label: 'Monday',  value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
  {label: 'Saturday', value: 'Saturday'}
]

   export default (props) => {

   const { id } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();
   const [load, setLoad] = useState(false);
   const { control, errors, handleSubmit, setValue, reset } = useForm();
   const [allStuds, setAllStuds] = useState([]);
   const [visible, setVisible] = useState(false);
   const [index, setIndex] = useState(null);
   
   const timeTableData = useSelector((state) => state.timetable.timetableDetails);
   const classrooms = useSelector((state) => state.timetable.classrooms);
   const unstudents = useSelector((state) => state.timetable.unassignedStud)
   const unLecturer = useSelector((state) => state.timetable.lecturerT)
   const [selected, setSelected] = useState(null);

   const { fields } = useFieldArray({
    control,
    name: `timetable`,
  });

  const addStudent = (val, idx) => {
    setSelected(val);
    setIndex(idx)
    setVisible(true);
  }

   const fieldsClass = [
    {
      type: 'input',
      name: 'programme',
      label: 'Programme',
      twocol: false,
      colWidth: '1 0 50%',
      placeholder: 'Please state',
      static: true,
      req:false,
      reqmessage: 'Required',
    },
    {
      type: 'input',
      name: 'faculty',
      label: 'Faculty',
      twocol: false,
      colWidth: '1 0 50%',
      placeholder: 'Please state',
      static: true,
      req:false,
      reqmessage: 'Required',
    },
    {
      type: 'array',
      name: 'timetable',
      twocol: false,
      static: false,
      // subheader: 'Education Level',
      child: [
        {
          type: 'input',
          name: 'module_name',
          label: '',
          twocol: false,
          colWidth: '1 0 50%',
          placeholder: 'Please state',
          static: true,
          req:false,
          hidden: true,
          reqmessage: 'Required',
        },
        {
          subheader: 'Class',
          type: 'select',
          name: 'classroom_name',
          label: 'Classroom',
          placeholder: 'Please Select',
          customVal: true,
          static: false,
          req: false,
          options: _.map(classrooms, (x) => ({label: x.classroom_name, value: x.name, type:x.classroom_type})),
          twocol: false,
          colWidth: '1 0 50%'
        },
        {
          type: 'select',
          name: 'lecturer',
          label: 'Lecturer Name',
          options: _.map(unLecturer, (x) => ({label: x.lecturer_name, value: x.lecturer_id})),
          placeholder: 'Please Select',
          static: false,
          customVal: true,
          req: false,
          reqmessage: 'Required',
          twocol: false,
          colWidth: '1 0 50%'
        },
        {
          type: 'select',
          name: 'day',
          label: 'Days',
          options: days,
          placeholder: 'Please Select',
          static: false,
          req: false,
          reqmessage: 'Required',
          twocol: false,
          colWidth: '1 0 33.3%'
        },
        {
          type: 'time',
          name: 'start_time',
          label: 'Time',
          options: days,
          placeholder: 'Please Select',
          format: 'h:mm a',
          static: false,
          req: false,
          reqmessage: 'Required',
          twocol: false,
          colWidth: '1 0 16.66%'
        },
        {
          type: 'time',
          name: 'end_time',
          label: 'Time',
          options: days,
          placeholder: 'Please Select',
          format: 'h:mm a',
          static: false,
          req: false,
          reqmessage: 'Required',
          twocol: false,
          colWidth: '1 0 16.66%'
        },
        {
          type: 'avatar',
          name: 'students',
          label: 'Students',
          placeholder: 'Please Select',
          static: false,
          req: false,
          twocol: false,
          colWidth: '1 0 33.3%',
          options: [],
          addLabel: 'Add Students',
          addFunc: addStudent
        },
      ],
    }, 
  ];

  useEffect(() => {
    dispatch(getTimetableDetails({"name":id}));
    return () => dispatch(resetTimetable())
 }, []);

  useEffect(() => {
    if(timeTableData && timeTableData.length > 0){
      setValue('programme', timeTableData[0]?.program_name);
      setValue('faculty', timeTableData[0]?.faculty_code);
      dispatch(getClassroom(timeTableData[0]?.classroom_type));
      dispatch(getTimetableStudents(timeTableData[0]?.intake, timeTableData[0]?.module_code))
      dispatch(getLecturerTimetable(timeTableData[0]?.intake, timeTableData[0]?.module_code))
      let temp = [];
      timeTableData.map(x => {
        let stud = []
        x.students.length > 0 ? x.students.map(y => stud.push({label: y.student_name, value: y.student_id, image: y.student_image})) : x.students;
        temp.push({
          classroom_name: { label: x?.classroom_label, value: x?.classroom, type: x?.classroom_type },
          module_name: x.module_name,
          day: x.day,
          start_time: x?.start_time,
          end_time: x?.end_time,
          lecturer: x.lecturer_id ? {value: x.lecturer_id, label: x.lecturer_name} : '',
          students: stud,
        })
      });
      setValue('timetable', temp)
    }
  }, [timeTableData]);

  useEffect(() => {
    if(unstudents && unstudents.length > 0) {
      let temp = [];
      unstudents.map(x => {
        temp.push({
          value: x.student_id, 
          label: x.student_name
        })
      })
      setAllStuds(temp);
    }
  }, [unstudents]);


  // useEffect(() => {
  //   if (classrooms.length > 0) {
  //     let temp = [];
  //     timeTableData.map(x => {
  //       let stud = []
  //       x.students.length > 0 ? x.students.map(y => stud.push({label: y.student_name, value: y.student_id, image: y.student_image})) : x.students;
  //       temp.push({
  //         classroom_name: { label: x?.classroom_label, value: x?.classroom, type: x?.classroom_type },
  //         module_name: x.module_name,
  //         day: x.day,
  //         start_time: x?.start_time,
  //         end_time: x?.end_time,
  //         lecturer: x.lecturer_id ? {value: x.lecturer_id, label: x.lecturer_name} : '',
  //         students: stud,
  //       })
  //     });
  //     setValue('timetable', temp)
  //   }
  // }, [classrooms]);

  const onClose = () => setVisible(false)
 
  const popup = {
    closable: false,
    visibility: visible,
    content: (
      <AddStudents item={selected} index={index} allStuds={allStuds} setAllStuds={setAllStuds} setValue={setValue} onClose={onClose} />
    ),
    width: 900,
    onCancel: () => setVisible(false),
  };

 const onFinish = async (val) => {
  props.setLoading(true);
  // timetable array data 
    let timetableArr = [];
       val.timetable?.map(item => {
          let stud = [];
          item.students.map(y => {
            stud.push({
              student_id: y.value
            })
          })
          let temp = {
                  classroom_name: item.classroom_name.value,
                  day: item.day.value,
                  start_time: item.start_time ? moment(item.start_time).format('HH:mm') : '',
                  end_time: item.end_time ? moment(item.end_time).format('HH:mm') : '',
                  lecturer_id: item.lecturer ? item.lecturer.value : '',
                  students: stud,
              }
      
              timetableArr.push(temp);
          })

      const json = {
        name: id,
        class_timetable: timetableArr,
   
      };
	  
	 
  let url = `${apiMethod}/faculty.timetable_api.update_timetable`;
  try {
    await axios.put(url, json);
    props.setLoading(false);
    message.success('Timetable Successfully Updated');
    setTimeout(() => history.push('/faculty/timetable'), 1000);
  } catch (e) {
    const { response } = e;
    message.error('Something went wrong');
    props.setLoading(false);
  }
};


  const onDelete  = async () => {
    
    props.setLoading(true);
    const tableID = {  name: id    };
    let url = `${apiMethod}/faculty.timetable_api.remove_timetable`;
    try {
      await axios.post(url, tableID);
      props.setLoading(false);
      message.success('Timetable Successfully Deleted');
      setTimeout(() => history.push('/faculty/timetable'), 1000);
    } catch (e) {
      const { response } = e;
      message.error('Something went wrong');
      props.setLoading(false);
    }

    }


   
  
    return (
      <>
        <Spin indicator={antIcon} size="large" spinning={load}>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <Space direction='vertical' size={20}>
                <Space direction='vertical' size={20}>
                    <Button type="link" className="c-gray-linkbtn p-0 mt-1" onClick={() => history.goBack()} htmlType="button">
                    <LeftOutlined /> Back
                  </Button>		
                </Space>
                <HeadingChip title="Edit Timetable"/>
              </Space>
            </Col>

            <Col span={24}>
              <Card bordered={false} className='uni-card'>
                <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
                  <Row gutter={[20, 30]} vgutter={8}>
                    {fieldsClass.map((item, idx) => (
                      <Fragment key={idx}>
                        {item?.subheader && (
                          <Col span={24}>
                            <Title level={item?.subheadlevel ? item?.subheadlevel : 4} className="mb-0 c-default">
                              {item.subheader}
                            </Title>
                          </Col>
                        )}
                        {item.type == 'array' ? (
                          <Col span={item.twocol ? 12 : 24}>
                            <Row gutter={[20, 30]}>
                              <Col span={24}>
                                <ArrayForm fields={fields} item={item} control={control} errors={errors} />
                              </Col>
                            </Row>
                          </Col>
                        ) : (
                          <FormGroup item={item} control={control} errors={errors} />
                        )}
                      </Fragment>
                    ))}
                    <Col span={24}>
                      <Row gutter={[20, 20]} justify="end">
                        <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button'onClick={onDelete} className='w-100 red-btn'>Remove</Button></Col>
                        <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className='w-100 green-btn'>Save Changes </Button></Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
	            </Card>
            </Col>
          </Row>

          <Popup {...popup} />
          {/* <Col span={8}>
            <Avatar.Group
              maxCount={2}
              size="large"
              maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <Avatar style={{ backgroundColor: '#1890ff' }}>M</Avatar>
            </Avatar.Group>
          </Col> */}
        </Spin>
      </>
    )
}