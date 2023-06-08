import React, {useState, useEffect } from 'react';
import HeadingChip from '../../../../molecules/HeadingChip';
import { Typography, Col,Upload, Button,Input, Form, Row,Select,Card, message, Anchor,Space, Spin } from 'antd';
import {LeftOutlined, LoadingOutlined,PlusCircleFilled } from '@ant-design/icons';
import { SelectField,  InputField,TimeField,DateField,} from '../../../../atoms/FormElement';
import ListCard from '../../../../molecules/ListCard';
import { apiMethod,baseUrl} from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { CloseCircleFilled } from '@ant-design/icons';
import { DownloadIcon, SearchIcon} from '../../../../atoms/CustomIcons';
import { useForm,Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getExamDetails,getInviligators,getLecturehall} from '../ducks/actions';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';
import moment from 'moment';

export default (props) => {
   const { id } = useParams();
   const { Link } = Anchor;
   const dispatch = useDispatch();
   const history = useHistory();
   const examdata = useSelector((state) => state.exams.examsdetails);
   const invigilators = useSelector((state) => state.exams.allinvigilators);
   const getlecturehall = useSelector((state) => state.exams.getlecturehall);
   
   const { control, errors, handleSubmit, setValue, getValues, reset } = useForm();

   const [load, setLoad] = useState(false);
  
   const [options, setOptions] = useState([]);
   const [venue, setVenue] = useState([]);
   
   const [staff, setStaff] = useState([]);
   const [staffAPI, setStaffAPI] = useState([]);
   const [deleted, setDeleted] = useState([]);
   const [invselected, setInvselected] = useState('Type staff name');

   const {Title,Text} = Typography;

   const title = 'Exam Details';
   const title2 = 'Exam Invigilators';
   const title3 = 'Ecologically Sustainable Design';


   const style = {
    paddingLeft: "-36px",
    paddingRight: "0px",
  };

  useEffect(() => {
      dispatch(getExamDetails(id));
      dispatch(getInviligators());
      dispatch(getLecturehall());
  }, []);

  useEffect(() => { 
    if (Object.keys(examdata).length > 0) {
      setValue('programme', examdata.program_name);
      setValue('faculty', examdata.faculty_name);
      setValue('exam_venue', { label: examdata.exam_venue, value: examdata.exam_venue });
      setValue('date', examdata?.date ? moment(examdata?.date, 'YYYY-MM-DD') : '');
      setValue('time_from', examdata?.time_from ? moment(examdata?.time_from, 'h:mm:ss') : '');
      setValue('time_to', examdata?.time_to ? moment(examdata?.time_to, 'hh:mm:ss') : '');
    }
  }, [examdata]);
  
 
   
     useEffect(() => {
      if(getlecturehall) {
          let v = [];
          getlecturehall?.map(item =>( 
            v.push({ label: item.exam_hall_name, value: item.name})
          ))
          setVenue(v);
      }
   }, [getlecturehall]);     


  /* invigilators select options */
    useEffect(() => {
        if(invigilators) {
            let temp = [];
            invigilators?.map(item =>( 
                temp.push({ label: item.employee_name, value: item.name, defaultvalue: item.select_faculty, type:'temp' })
            ))
            setOptions(temp);
        }
     }, [invigilators]);  

    
     useEffect(() => {
      if(examdata?.invigilators) {
          let temp2 = [];
          examdata?.invigilators?.map(item =>( 
              temp2.push({ invigilator: item.invigilator, invigilator_name: item.invigilator_name, faculty: item.faculty,id:item.name,type:'api' })
          ))
          if(staff){
          setStaffAPI(temp2);
          }
      }
    }, [examdata?.invigilators]); 




    const tempSelected = (e) => {
     var array = [...options]; 
     var temp = array.find((d)=> d.value === e);     
     setStaff(temp); 
    }

   const onAdd = () => {

      if(staff) {
       var array = [...staffAPI]; 
       const index = array.findIndex(item=>item.invigilator === staff.value); 
       if(index > -1){
        message.error('Already selected');
        return false;
       }

      else{      
        setStaffAPI([...staffAPI,{ invigilator: staff.value, invigilator_name: staff.label, faculty: staff.defaultvalue, type:staff.type }]);
      }
      setInvselected(null);
      
        }   
    }


    const removeInv = (id) => {
      var array = [...staffAPI];
      const delStaff = array.find((d)=> d.invigilator === id);
        let newArr= [];
        if(delStaff.type =='api'){
          setDeleted([...deleted,{ name: delStaff.id}]);
           newArr = array.filter(d => d.invigilator !== id);
          setStaffAPI(newArr);
        }else{
          newArr = array.filter(d => d.invigilator !== id);
          setStaffAPI(newArr);
        }
    
     }

    const deleteExam = () => {
      const value='';  
      onFinish(value, 'deleteExam');
    }
  
    const ListCol = [
    {
      title: 'Staff Name',
      dataIndex: 'invigilator_name',
      key: 'invigilator_name',
      ellipsis: true,
      width:600,
      sorter: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      ellipsis: true,
      key: 'faculty',
      width:350,
      sorter: true,
    },
  
    {
      title: 'Action',
      dataIndex: 'invigilator',
      key: 'invigilator',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => removeInv(record.invigilator)} >
          <CloseCircleFilled />
        </Button>
      ),

    },
	
  ];

  const onFinish = async (value,status) => {
    setLoad(true);
    let url;
    let message_staus;
    let payload;

    if(typeof(status) == 'string'){
      payload = {
      name: id,
      };
      url = `${apiMethod}/faculty.exam.remove_exam`;
      message_staus = 'Exams Successfully Deleted';
    }
    
   else{
    let fileurl='';
    if (value.attachments) {
      let modifiedName = uniquiFileName(value.attachments?.file?.originFileObj.name)
      let res = await getSingleUpload(modifiedName, 'image',  value.attachments?.file?.originFileObj);
      fileurl = res?.file_url;
    }

      payload = {
      name: id,
      exam_venue: value?.exam_venue.label,
	  exam_venue_name: value?.exam_venue.value,
      date:  moment(value.date).format('YYYY-MM-DD'),
      time_from: moment(value.time_from).format('HH:mm:ss'),
      time_to: moment(value.time_to).format('HH:mm:ss'),
      exam_paper: fileurl,
      invigilators:staffAPI,
      deleted_invigilators:deleted
    };
    url = `${apiMethod}/faculty.exam.update_exam`;
    message_staus = 'Exams Successfully Updated';
    }

    setLoad(false);
    await axios.post(url, payload)
        .then(function (response) {
          var msg = response.data.message;
          if(msg?.success === false){
            message.error(msg?.message);
            return false;
          }else{
          message.success('Exam successfully updated');
          setTimeout(() => history.push('/faculty/exams'), 1000);
          }   
        })
        .catch(function (error) {
            console.log(error);
            setLoad(false);
        });
}


   const antIcon = <LoadingOutlined spin />; 
    return (
        <>
       <Spin indicator={antIcon} size="large" spinning={load}>
       
       <Row gutter={[20, 30]} style={{ marginBottom: "15px" }}>
        <Col span={24}>
          <Space direction='vertical' size={20}>
		     <Button type="link" className="c-gray-linkbtn p-0 mt-1" onClick={() => history.goBack()} htmlType="button">
                <LeftOutlined /> Back
              </Button>		
          </Space>
         </Col>

         </Row>
     
       
       <Row gutter={[20, 30]} style={{ marginBottom: "15px" }}>
        <Col span={24}>
        <Space direction='vertical' size={20}>
         <HeadingChip title="Edit Exam Timetable"/>
         </Space>
        </Col>
       </Row>
    
  
  <Card bordered={false}>
   
    <Form layout="vertical" onFinish={handleSubmit(onFinish)}>

     <Row gutter={[30, 24]}>

       <Col span={24}> 
            {examdata?.module_name}
            </Col>  

		      <Col span={12}>
            <InputField 
                fieldname='programme'
                isRequired={true}
                label='Programme'
                control={control}
                className=''
                rules={{
                  required: 'Programme Name Required',
                  }}
              initValue=''
              validate={errors.programme && 'error'}
              validMessage={errors.programme && errors.programme.message}
                iProps={{readOnly: true, placeholder: 'Please type programme name', size: 'large', type: 'text'}}
                initValue=''
            />
           </Col>

           <Col span={12}>
            <InputField 
                fieldname='faculty'
                isRequired={true}
                label='Faculty'
                control={control}
                class='mb-0'
                rules={{
                  required: 'faculty Name Required',
                  }}
              initValue=''
              validate={errors.faculty && 'error'}
              validMessage={errors.faculty && errors.faculty.message}
                iProps={{readOnly: true, placeholder: 'Please type faculty name', size: 'large', type: 'text'}}
                initValue=''
            />
           </Col>

          
           <Col span={24}> 
            {title}
            </Col>   

           <Col span={8}>
            <SelectField 
              fieldname='exam_venue'
              isRequired={true}
              label='Exam Venue'
              control={control}
              class='mb-0'
              iProps={{ placeholder: 'Please select'}}
              rules={{
                required: 'Venue Required',
                }}
             validate={errors.exam_venue && 'error'}
             validMessage={errors.exam_venue && errors.exam_venue.message}
              initValue=''
              selectOption={venue}
            />
          </Col>


          <Col span={8}>
          <DateField 
                fieldname='date'
                isRequired={true}
                label='Date'
                control={control}
                class='mb-0'
                
                rules={{
                  required: 'Exam Date Required',
                  }}
                  initValue=''
                  validate={errors.date && 'error'}
                  validMessage={errors.date && errors.date.message}
                iProps={{ placeholder: 'Please Select date', size: 'large', format: "YYYY-MM-DD"}}
              
            />
          </Col>

          <Col span={4}>
          <TimeField
              fieldname="time_from"
              label="Time From"
              isRequired={true}
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Select time', size: 'large', format: 'h:mm a' }}
              initValue=""
              validate={errors.time_from && 'error'}
              validMessage={errors.time_from && errors.time_from.message}
            />
          </Col>


          <Col span={4}>
          <TimeField
              fieldname="time_to"
              label="Time To"
              isRequired={true}
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Select time', size: 'large', format: 'h:mm a' }}
              initValue=""
              validate={errors.time_to && 'error'}
              validMessage={errors.timeTo && errors.time_to.message}
            />
          </Col>

          <Col span={24}>
              <Text className="c-gray smallFont12" style={{marginBottom:'10px'}}>Exam Paper</Text>
                <Controller
                  name='attachments'
                  control={control}
                  defaultValue=""
                  render={({ value, onChange }) => (
                    <Upload
                      className="uploadWithbtn"
                      showUploadList={false}
                      accept="image/*,.pdf"
                      maxCount={1}
                      customRequest=''
                      onChange={(e) => onChange(e)}
                    >
                      <Input
                        size="large"
                        className="ag-upload-btn"
                        placeholder="Please select file"
                        value={value ? value.fileList[0].name :  examdata?.exam_paper}
                        addonAfter={examdata?.exam_paper ? <DownloadIcon onClick={() => { window.open(`${baseUrl}/${examdata?.exam_paper}`, "_blank")}} className="c-success"/> : <PlusCircleFilled />}
                        
                     />
                    </Upload>
                  )}
                />
              
           </Col>

           <Col span={24}> 
            {title2}
            </Col>   


		<Col span={24}>
        <Row gutter={20} align="bottom">
          
		  <Col flex="auto">
		  
        <Select
				suffixIcon={<SearchIcon className="text-left"/>}
				style={{ width: '100%' }}
				showSearch
				optionFilterProp="children"
				placeholder={"Type staff name"}
				options={options}
				filterOption={(input, option) => {
				  return (
					option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
					option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
				  );

				}}
				onChange= {e => { tempSelected(e); setInvselected(e.value) }}
				size="large"
        value={invselected}
				>
		   </Select> 

          </Col>
		  
          <Col flex="80px">
           <Button type='primary' size='large' htmlType='button' onClick={onAdd} className='w-100 green-btn'> Add </Button>
          </Col>
		 
		</Row>
     
	    </Col>
		
		
		<Col span={24} style={style}>
		   <ListCard
				ListCol={ListCol}
				ListData={staffAPI}
				style={{paddingLeft:'0px'}}
				class=''
				 pagination={{
				  total:staffAPI?.length,
				  current: 1,
				  pageSize: 10,
				}}
			  />
          </Col>
		
	
          <Col span={24}>
            <Row gutter={[20, 20]} justify="end">
              <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button'  onClick={() => deleteExam()} className='w-100 red-btn'>Remove</Button></Col>
              <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className='w-100 green-btn'>Save Changes </Button></Col>
            </Row>
          </Col>

     </Row>
     </Form>
</Card>
    </Spin>
        </>
    )
};