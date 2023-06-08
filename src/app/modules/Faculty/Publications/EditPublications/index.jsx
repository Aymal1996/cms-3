import React, {useState, useEffect } from 'react';
import HeadingChip from '../../../../molecules/HeadingChip';
import ListCard from '../../../../molecules/ListCard';
import { Typography, Col, Button, Form,Upload, Input, Row,Card,message, Space, Spin } from 'antd';
import { CheckCircleFilled,CloseCircleFilled,LeftOutlined, PlusCircleFilled,LoadingOutlined } from '@ant-design/icons';
import { DownloadIcon} from '../../../../atoms/CustomIcons';
import {TextAreaField, SelectField, DateField, InputField } from '../../../../atoms/FormElement';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';
import { apiMethod ,baseUrl} from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import {getPublicationDetails } from '../ducks/actions';
import { getPrograms } from '../ducks/actions';
import { useForm,Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import moment from 'moment';


export default (props) => {
   const { id } = useParams();
   const [load, setLoad] = useState(false);
   const { control, errors, handleSubmit, setValue, getValues, reset} = useForm();
   const [options, setOptions] = useState([]);
   const [ tags, setTags ] = useState([])
   const {Title,Text} = Typography;
   const history = useHistory();
   const publicationData = useSelector((state) => state.publications.publicationsingledata);
   const programelsit = useSelector(state => state.publications.programes);
   const dispatch = useDispatch();

      const Indexing = [
      {label: 'SCOPUS',  value: 'SCOPUS'},
      {label: 'Google Scholar', value: 'Google Scholar'},
      ]

      const pubTypes = [
        {label: 'Journal Article',  value: 'Journal Article'},
        {label: 'Book Section', value: 'Book Section'},
        {label: 'Book', value: 'Book'}
      ]
  
      const pubOn = [
        {label: 'SCOPUS',  value: 'SCOPUS'},
        {label: 'Google Scholar', value: 'Google Scholar'},
        {label: 'SCI', value: 'SCI'},
        {label: 'SSCI', value: 'SSCI'},
        {label: 'CrossRef', value: 'CrossRef'},
      ]

 
    useEffect(() => {
     dispatch(getPublicationDetails(id));
     dispatch(getPrograms());
  }, []);

  useEffect(() => {
    if(programelsit) {
        let temp = [];
        programelsit.map(item =>( 
            temp.push({ label: item.program_name, value: item.name, isDisabled: false, expired: item.ineffective_date  })
        ))
        setOptions(temp);
    }
}, [programelsit]);



  const date = moment(publicationData.published_date);

  useEffect(() => { 
    if (Object.keys(publicationData).length > 0) {
      setValue('publication_name', publicationData.publication_name);
      setValue('author_name', publicationData.author_name);
      setValue('co_author_name', publicationData.co_author_name);
      setValue('program', { label: publicationData?.program, value: publicationData.program });
      setValue('orcid_no', publicationData.orcid_no);
      setValue('doi_no', publicationData.doi_no);
      setValue('publisher',{ label: publicationData?.publisher, value: publicationData?.publisher });
      setValue('publication_type',{ label: publicationData?.publication_type, value: publicationData?.publication_type });
      setValue('journal_indexing', { label: publicationData?.journal_indexing, value: publicationData?.journal_indexing }); 
      setValue('journal_url', publicationData.journal_url);
      setValue('journal_name', publicationData.journal_name);
      setValue('abstract', publicationData.abstract);
      setValue('keywords', publicationData.keywords);
      setValue('attachments', publicationData.attachment);
      setValue('published_date', moment(publicationData?.published_date, 'YYYY-MM-DD'));
    }
  }, [publicationData]);

  const antIcon = <LoadingOutlined spin />; 
  
  const upload = [
    {
      type: 'upload',
      name: 'image',
      label: 'Profile Picture',
      placeholder: 'Upload',
      twocol: false,
      colWidth: '1 0 100%',
      req: true,
      reqmessage: 'Please upload image',
    },
	]
  const onFinish = async (value) => {

    setLoad(true);

    let fileurl= publicationData?.attachment;
   
    if (value.attachments) {
      
      if (typeof value.attachments != 'string'){
        let modifiedName = uniquiFileName(value.attachments?.file?.originFileObj.name)
        let res = await getSingleUpload(modifiedName, 'image',  value.attachments?.file?.originFileObj);
        fileurl = res?.file_url; 
      }
     
    }

    const payload = {
      publication: [
        {
          name: publicationData?.name,
          publication_name: value?.publication_name,
          author_name: value?.author_name,
          co_author_name: value?.co_author_name,
          program: value?.program.value,
          orcid_no: value?.orcid_no,
          doi_no: value?.doi_no,
          journal_indexing: value?.journal_indexing.value,
          journal_url: value?.journal_url,
          journal_name: value?.journal_name,
          abstract: value?.abstract,
          keywords: value?.keywords,
          publisher: value?.publisher.value,
          publication_type: value?.publication_type.value,
          published_date: moment(value.published_date).format('YYYY-MM-DD'),
          status: typeof(stats) == 'string' ? stats : 'Active',
          attachment: fileurl,
          doctype: 'Publications',
        },
      ],
    };

    const url = `${apiMethod}/faculty.publications.add_single_publication`;
    try {
        await axios.post(url, payload);
        props.setLoading(false);
        message.success('Publication Successfully Updated');
        reset();
        setTags(Object.assign([]));
        setTimeout(() => history.push('/faculty/publications/'), 1000);
    } catch (e) {
        const {response} = e;
        message.error('Something went wrong');
        props.setLoading(false);
    }
}

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
         <HeadingChip title="Publication Details"/>
         </Space>
        </Col>

        </Row>
     
    <Card bordered={false} className="uni-card h-auto">     
    
    <Row gutter={[20, 30]}>

    <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
  
    <Row gutter={[20, 30]} >

       <Col span={24}>
           <InputField 
               fieldname='publication_name'
               isRequired={true}
               label='Publication Name'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Publication Name Required',
                 }}
             initValue=''
             validate={errors.publication_name && 'error'}
             validMessage={errors.publication_name && errors.publication_name.message}
             iProps={{ placeholder: 'Please type Publication name', size: 'large', type: 'text'}}
             initValue=''
           />
          </Col>


          <Col span={12}>
           <InputField 
               fieldname='author_name'
               isRequired={true}
               label='Author Name'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Author Name Required',
                 }}
             initValue=''
             validate={errors.publication_name && 'error'}
             validMessage={errors.author_name && errors.publication_name.message}
               iProps={{ placeholder: 'Please type Author name', size: 'large', type: 'text'}}
               initValue=''
           />
          </Col>

          <Col span={12}>
           <InputField 
               fieldname='co_author_name'
               isRequired={true}
               label='Co-author Name'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Co Author Name Required',
                 }}
             initValue=''
             validate={errors.co_author_name && 'error'}
             validMessage={errors.co_author_name && errors.co_author_name.message}
               iProps={{ placeholder: 'Please type Co-author name', size: 'large', type: 'text'}}
               initValue=''
           />
          </Col>


          <Col span={8}>
           <SelectField 
             fieldname='program'
             isRequired={true}
             label='Program'
             control={control}
             class='mb-0'
             iProps={{ placeholder: 'Please select Program'}}
             rules={{
               required: 'Source Required',
               }}
            validate={errors.program && 'error'}
            validMessage={errors.program && errors.program.message}
             initValue=''
             selectOption={options}
           />
         </Col>

         <Col span={8}>
            <SelectField 
              fieldname='publication_type'
              isRequired={true}
              label='Publication Type'
              control={control}
              class='mb-0'
              iProps={{ placeholder: 'Please select Program'}}
              rules={{
                required: 'Source Required',
                }}
             validate={errors.publication_type && 'error'}
             validMessage={errors.publication_type && errors.publication_type.message}
              initValue=''
              selectOption={pubTypes}
            />
          </Col>


          <Col span={8}>
            <SelectField 
              fieldname='publisher'
              isRequired={true}
              label='Publication On'
              control={control}
              class='mb-0'
              iProps={{ placeholder: 'Please select Program'}}
              rules={{
                required: 'Source Required',
                }}
             validate={errors.publisher && 'error'}
             validMessage={errors.publisher && errors.publisher.message}
              initValue=''
              selectOption={pubOn}
            />
          </Col>

   
   
         <Col span={8}>
           <DateField 
               fieldname='published_date'
               isRequired={true}
               label='Published Date'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Published Date Required',
                 }}
                 initValue=''
                 validate={errors.published_date && 'error'}
                 validMessage={errors.published_date && errors.published_date.message}
               iProps={{ placeholder: 'Select publish date', size: 'large', format: "DD-MM-YYYY"}}
           />
         </Col>

         <Col span={8}>
           <InputField 
               fieldname='orcid_no'
               isRequired={true}
               label='ORCID'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Orcid No Required',
                 }}
               validate={errors.orcid_no && 'error'}
               validMessage={errors.orcid_no && errors.orcid_no.message}
               iProps={{ placeholder: 'Please Type Orcid No', size: 'large', type: 'number'}}
               initValue=''
           />
         </Col>

         <Col span={8}>
           <InputField 
               fieldname='journal_name'
               isRequired={true}
               label='Journal Name'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Journal Name No Required',
                 }}
               validate={errors.journal_name && 'error'}
               validMessage={errors.journal_name && errors.journal_name.message}
               iProps={{ placeholder: 'Please Type Journal Name', size: 'large', type: 'text'}}
               initValue=''
           />
         </Col>         


         <Col span={8}>
           <SelectField 
             fieldname='journal_indexing'
             isRequired={true}
             label='Journal Indexing'
             control={control}
             class='mb-0'
             iProps={{ placeholder: 'Please select Indexing'}}
             rules={{
               required: 'Journal Indexing Required',
               }}
            validate={errors.journal_indexing && 'error'}
            validMessage={errors.journal_indexing && errors.journal_indexing.message}
             initValue=''
             selectOption={Indexing}
           />
         </Col>       


         
         <Col span={8}>
           <InputField 
               fieldname='doi_no'
               isRequired={true}
               label='Journal DOI'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Journal Doi No Required',
                 }}
               validate={errors.doi_no && 'error'}
               validMessage={errors.doi_no && errors.doi_no.message}
               iProps={{ placeholder: 'Please Type Journal Doi', size: 'large', type: 'text'}}
               initValue=''
           />
         </Col>


         <Col span={8}>
           <InputField 
               fieldname='journal_url'
               isRequired={true}
               label='Journal Url'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Journal Url No Required',
                 }}
               validate={errors.journal_url && 'error'}
               validMessage={errors.journal_url && errors.journal_url.message}
               iProps={{ placeholder: 'Please Type Journal Url', size: 'large', type: 'text'}}
               initValue=''
           />
         </Col>


         <Col span={24}>
           <TextAreaField 
               fieldname='abstract'
               isRequired={true}
               label='Abstract'
               control={control}
               class='mb-0'
               rules={{
                 required: 'Aabstract Required',
                 }}
             initValue=''
             validate={errors.abstract && 'error'}
             validMessage={errors.abstract && errors.abstract.message}
               iProps={{ placeholder: 'Please type abstract', size: 'large', type: 'text'}}
               initValue=''
           />
          </Col>          


          <Col span={24}>
           <InputField 
               fieldname='keywords'
               isRequired={true}
               label='Keywords'
               control={control}
               class='mb-0'
               rules={{
                 required: 'keywords Required',
                 }}
             initValue=''
             validate={errors.keywords && 'error'}
             validMessage={errors.keywords && errors.keywords.message}
               iProps={{ placeholder: 'Please type keywords', size: 'large', type: 'text'}}
               initValue=''
           />
          </Col>  



          <Col span={24}>
              <Text className="c-gray smallFont12" style={{marginBottom:'10px'}}>Attachment</Text>
                <Controller
                  name='attachments'
                  control={control}
                  defaultValue=""
                  render={({ val, onChange }) => (
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
                        value={val ? value.fileList[0].name : publicationData?.attachment }
                        addonAfter={publicationData?.attachment ? <DownloadIcon onClick={() => { window.open(`${baseUrl}/${publicationData?.attachment}`, "_blank")}} className="c-success"/> : <PlusCircleFilled />}
                        
                     />
                    </Upload>
                  )}
                />
              
           </Col>        


         <Col span={24}>
           <Row gutter={[20, 20]} justify="end">
             <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className='w-100 green-btn'>Save Changes</Button></Col>
           </Row>
         </Col>

     </Row>

     </Form>
   </Row>
   </Card>
   </Spin>
  
       </>
    )
}