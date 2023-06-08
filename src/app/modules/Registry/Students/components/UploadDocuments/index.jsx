import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Typography, Button, Spin } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
// import { docmentType } from './FormFields';
import { LoadingOutlined } from '@ant-design/icons';
import { onBeforeUploadFile } from '../../../../../../features/utility';
import ArrayForm from '../../../../Marketing/Applications/AddApplication/ApplicationForm/ArrayForm';
import { getdocumentList } from '../../../../StudentFile/ducks/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;
const init = {
  documents: [
    {
      type: '',
      document_date: '',
      document: '',
    },
  ],
};

const documentation = [
  { title: 'Passport Photo with White Background', docname: 'Passport Photo with White Background' },
  { title: 'Offer Letter', docname: 'Offer Letter' },
  { title: 'Acceptance of Offer Letter', docname: 'Acceptance of Offer Letter' },
  { title: 'Scholarship Letter', docname: 'Scholarship Letter' },
  { title: 'Tuition Fee Receipt', docname: 'Tuition Fee Receipt' },
  // { title: 'Programme Approval Letter (KPT & MQA)', docname: 'Programme Approval Letter (KPT & MQA)' },
  { title: 'Financial Evidence', docname: 'Financial Evidence' },
  { title: 'Passport Page with Certified Copy', docname: 'Passport Pages with certified true copy' },
  { title: 'IM14 Form', docname: 'IM14 Form' },
  { title: 'Visa Approval Letter (VAL)', docname: 'Visa Approval Letter (VAL)' },
  { title: 'Personal Bond', docname: 'Personal Bond' },
  { title: 'Visa Sticker Endorsement Receipt', docname: 'Visa Sticker Endorsement Receipt' },
  { title: 'Visa Sticker', docname: 'Visa Sticker' },
  { title: 'IM55 Form', docname: 'IM55 Form' },
  { title: 'Email Reminder (if any)', docname: 'Email Reminder' },
  // { title: 'Cancellation Documents (if any)', docname: 'Cancellation Documents' },
  { title: 'Clearance Form', docname: 'Clearance Form' },
  { title: 'Check out memo', docname: 'Check out memo' },
  { title: 'Exit stamp', docname: 'Exit stamp' },
  { title: 'Police Report', docname: 'Police Report' },
  { title: 'JIM Cancellation', docname: 'JIM Cancellation' },
  { title: 'JIM Tracking', docname: 'JIM Tracking' },
  { title: 'Embassy Email', docname: 'Embassy Email' },
  { title: 'Communication Reach', docname: 'Communication Reach' },
  { title: 'Attendance Report (Every Semester)', docname: 'Attendance' },
  { title: 'Academic Transcript (Every Semester)', docname: 'Academic Transcript' },
  { title: 'Course Advising Form (Every Semester)', docname: 'Course Advising Form' },
  { title: 'Academic Qualification', docname: 'Academic Qualification' },
  { title: 'Completion Letter', docname: 'Completion Letter' },
  { title: 'Official Academic Transcript', docname: 'Official Academic Transcript' },
  { title: 'Certificate', docname: 'Certificate' },
  { title: 'Academic Appeal (if any)', docname: 'Academic Appeal' },
  { title: 'Deferment Form (if any)', docname: 'Deferment Form' },
  { title: 'Termination Letter (if any)', docname: 'Termination Letter' },
  { title: 'Copy of Insurance Policy', docname: 'Copy of Insurance Policy' },
  { title: 'Pre Medical Report', docname: 'Pre Medical Report' },
  { title: 'Release Letter (if any)', docname: 'Release Letter' },
  // { title: 'Orientation Program', docname: 'Orientation Program' },
  {
    title: 'Personal Data Protection Acts (PDPA) - Acceptance',
    docname: 'Personal Data Protection Acts (PDPA) - Acceptance',
  },
  // { title: 'Student Manual Book & Refund Policy', docname: 'Student Manual Book & Refund Policy' },
  { title: 'Warning Letter', docname: 'Warning Letter' },
  { title: 'Barred Letter', docname: 'Barred Letter' },
  {
    title: 'Leave Application (Medical certificate/ Emergency and etc)',
    docname: 'Leave Application (Medical certificate/ Emergency and etc)',
  },
  { title: 'Student Counselling Report', docname: 'Student Counselling Report' },
];

export default (props) => {
  const dispatch = useDispatch();
  const { onClose, onSubmit, load } = props;
  const { control, errors, handleSubmit, reset, setValue } = useForm({ defaultValues: init });
  const listingdocs = useSelector((state) => state.studentfile.docsList);
  // const [docmentType, setDocumentType] = useState([]);

  const formfields = {
    type: 'array',
    name: 'documents',
    double: true,
    noCard: true,
    noLabel: true,
    child: [
      {
        type: 'select',
        name: 'type',
        label: 'Type',
        placeholder: 'Please Select',
        static: false,
        req: true,
        options: props.doclist
          ? props.doclist.map((x) => ({ label: x.docname, value: x.docname }))
          : documentation.map((x) => ({ label: x.docname, value: x.docname })),
        twocol: false,
        colWidth: '0 1 30%',
      },
      {
        type: 'date',
        name: 'document_date',
        label: 'Date',
        placeholder: 'Select',
        static: false,
        req: true,
        format: 'Do MMMM YYYY',
        twocol: false,
        colWidth: '0 1 30%',
      },
      {
        type: 'upload',
        name: 'document',
        label: 'Upload Document',
        placeholder: 'Please Upload File',
        static: false,
        req: true,
        reqmessage: 'required',
        twocol: false,
        accept: '.pdf',
        onChange: (e, i) => onBeforeUploadFile(e, 'pdfimage', `document`, setValue, i, 'documents'),
        colWidth: '0 1 30%',
      },
    ],
  };

  // useEffect(() => {
    // dispatch(getdocumentList())
    // append(init);
  // }, []);

  // useEffect(() => {
  //   if(listingdocs && listingdocs.length > 0) {
  //     let temp = [];
  //     listingdocs.map(x => {
  //       temp.push({
  //         label: x.name, value: x.name
  //       })
  //     })
  //     setDocumentType(temp)
  //   }
  // }, [listingdocs]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  });

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[20, 30]} justify="center">
          <Col span={24}>
            <Title level={3} className="mb-0 c-default">
              Upload Documents
            </Title>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]}>
              <Col span={24}>
                <ArrayForm fields={fields} remove={remove} item={formfields} control={control} errors={errors} noremove={true} />
              </Col>
              <Col span={24}>
                <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append(init)}>
                  + Add Document
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Button
              size="large"
              type="primary"
              htmlType="button"
              className="black-btn w-100"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Close
            </Button>
          </Col>
          <Col span={12}>
            <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
