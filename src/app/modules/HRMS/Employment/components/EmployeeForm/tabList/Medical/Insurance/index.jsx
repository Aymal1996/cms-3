import React, { useState } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from 'Molecules/ListCard';
import ListFormComp from 'Molecules/ListFormComp';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { insuranceApi } from '../../../../../ducks/services';
import { uniquiFileName, getSingleUpload, getFileName } from '../../../../../../../../../features/utility';
import { allowed } from '../../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../../routing/config/Roles';
import { baseUrl } from '../../../../../../../../../configs/constants';

const colName = [
  {
    title: 'Type',
    dataIndex: 'insurance_type',
    key: 'insurance_type',
    sorter: true,
  },
  {
    title: 'Insurance No.',
    dataIndex: 'insurance_no',
    key: 'insurance_no',
    sorter: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    sorter: true,
  },
  {
    title: 'End',
    dataIndex: 'expiration_date',
    key: 'expiration_date',
    sorter: true,
    render: text => text ? moment(text).format('DD/MM/YYYY') : ''
  },
];

const instype = [
  {label: 'Group Health Plan', value: 'Group Health Plan'},
  {label: 'Medical Card', value: 'Medical Card'},
  {label: 'Life Insurance', value: 'Life Insurance'},
]

const insuranceFields = [
  {
    type: 'input',
    label: 'Insurance ID',
    name: 'name',
    twocol: false,
    hidden: true,
    req: false,
  },
    {
      type: 'select',
      label: 'Insurance Type',
      name: 'insurance_type',
      twocol: true,
      options: instype,
      req: true,
      reqmessage: 'Please enter type',
    },
    {
      type: 'input',
      label: 'Insurance No.',
      name: 'insurance_no',
      twocol: true,
      placeholder: 'Insurance no',
      req: true,
      reqmessage: 'Please enter insurance no.',
    },
    {
      type: 'date',
      label: 'Expiration Date',
      name: 'expiration_date',
      twocol: true,
      placeholder: 'Insurance expiry date',
      req: true,
      reqmessage: 'Please enter date',
    },
    {
      type: 'upload',
      name: 'upload_document',
      label: 'Upload Document',
      placeholder: 'Upload',
      twocol: true,
      req: false,
    },
    {
      type: 'textarea',
      label: 'Description',
      name: 'description',
      twocol: false,
      req: false,
    },
  ]

  const initq = {
    name: '',
    insurance_type: '',
    insurance_no: '',
    expiration_date: '',
    upload_document: '',
    description: ''
  }

export default (props) => {

    const { data, updateApi, id, setLoad, setVisible, refresh, mode } = props;
    const { control, errors, setValue, reset, handleSubmit } = useForm({ defaultValues: initq});
    const [formVisible, setFormVisible] = useState(false);
    const [recordData, setRecord] = useState(null);

    const onClickRow = (record) => {

      return {
        onClick: () => {
          if(allowed([Roles.EMPLOYMENT], 'write')) {
          setRecord([
            {
              field: 'name',
              value: record.name
            },
            {
              field: 'insurance_type',
              value: record.insurance_type ? {label: record.insurance_type, value: record.insurance_type} : ''
            },
            {
              field: 'insurance_no',
              value: record.insurance_no
            },
            {
              field: 'expiration_date',
              value: record.expiration_date ? moment(record.expiration_date) : ''
            },
            {
              field: 'description',
              value: record.description
            },
            {
              field: 'upload_document',
              value: record?.upload_document ? {fileList: [{uid: '-1', name: getFileName(record?.upload_document), status: 'done', url: `${baseUrl}${record.upload_document}`}]} : ''
            },
          ]);
          setVisible(false);
          setFormVisible(true);
          }
        },
      };
    }

    const onBack = () => {
      console.log('i am here')
      reset();
      setFormVisible(false);
      setRecord(null);
      setVisible(true);
      refresh();
  }
    
    const addNew = () => {
      setVisible(false);
      setFormVisible(true);
    }

    const onDelete = () => {
      setLoad(true);
      const body = {
        status:"Inactive"
      }
      insuranceApi(body, recordData[0].value).then(res => {
        setLoad(false);
        setFormVisible(false);
        setVisible(true);
        updateApi();
        reset();
        refresh();
        setRecord(null);
        message.success('Insurance Successfully Deleted')
      }).catch(e => {
        console.log(e);
        setLoad(false);
        message.error(e);
      })
    }

    const onFinish = async (val) => {

      setLoad(true);
      let doc = '';
      let contactPDF = '';
      if (val.upload_document) {
        if (val.upload_document.fileList[0].uid != '-1') {
          let modifiedName = uniquiFileName(val.upload_document?.file?.originFileObj.name)
          doc = await getSingleUpload(modifiedName, 'image',  val.upload_document?.file?.originFileObj, 'Employee', id);
          contactPDF = doc?.file_url;
        } else {
          contactPDF = val.upload_document.fileList[0].url
        }
      }
      let body = {};
      if (val.name) {
        body = {
          insurance_type: val?.insurance_type.value,
          expiration_date: val?.expiration_date,
          insurance_no: val.insurance_no,
          upload_document: contactPDF ? contactPDF.replace(`${baseUrl}`, '') : '',
          description: val.description,
          status:"Active"
        }
      } else {
        body = {
          employee_id: id,
          employee_medical: {
              insurance_type: val?.insurance_type.value,
              expiration_date: val?.expiration_date,
              insurance_no: val.insurance_no,
              upload_document: contactPDF ? contactPDF.replace(`${baseUrl}`, '') : '',
              description: val.description,
              status:"Active"
          }
        }
        
      }
  
      insuranceApi(body, val.name).then(res => {
        setLoad(false);
        updateApi();
        setRecord(null);
        setVisible(true);
        reset();
        setFormVisible(false);
        refresh();
        message.success('Insurance Successfully Saved')
      }).catch(e => {
        console.log(e);
        setLoad(false);
        message.error(e);
      })
    }

    return (
        <Row gutter={[20,20]}>
          {!formVisible ? 
            <Col span={24}>
                <ListCard
                scrolling={500}
                title="Insurance History"
                onRow={onClickRow}
                ListCol={colName}
                ListData={data?.employee_medical}
                pagination={false}
                
                extraBtn={allowed([Roles.EMPLOYMENT], 'write') ? '+ Add New Insurance' : null}
                extraAction={addNew}
                listClass="nospace-card"
                classes='clickRow'
                />
            </Col>
            :
            <Col span={24}>
              <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
                <ListFormComp 
                control={control}
                errors={errors}
                record={recordData}
                onBack={onBack}
                setValue={setValue}
                mode={mode}
                title={'Insurance Details'}
                fieldsList={insuranceFields}
                backbtnTitle='Insurance History'
                extrabtn={allowed([Roles.EMPLOYMENT], 'delete')  ? {
                  title: 'Delete Insurance',
                  class: 'red-btn',
                  onAction: onDelete,
                }: null}
                />
              </Form>
            </Col>}
        </Row>

    )
} 