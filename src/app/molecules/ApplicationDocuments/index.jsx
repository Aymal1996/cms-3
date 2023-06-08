import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { DownloadIcon, ApplicationsIcon } from 'Atoms/CustomIcons';
import ListCard from '../ListCard';
import { prevDoc } from '../../modules/StudentFile/ducks/services';
import { Popup } from 'Atoms/Popup';
import UploadDocuments from '../../modules/Registry/Students/components/UploadDocuments';
import { apiMethod } from '../../../configs/constants';
import { getSignedURL, uniquiFileName } from '../../../features/utility';
import axios from '../../../services/axiosInterceptor';
import { useLocation } from 'react-router';
import ApproveRejectDocs from '../ApproveRejectDocs';

const doclist = [
  { title: 'Application Form', docname: 'Application Form' },
  { title: 'Thesis Proposal', docname: 'Thesis Proposal' },
  { title: 'Academic Course Outline', docname: 'Academic Course Outline' },
  { title: 'Certified Recommendation Letter', docname: 'Certified Recommendation Letter' },
  { title: 'Visa Approval Letter (VAL)', docname: 'Visa Approval Letter (VAL)' },
  {
    title: 'Proof of English Language Proficiency (IELTS/TOEFL)',
    docname: 'Proof of English Language Proficiency (IELTS/TOEFL)',
  },
  { title: 'Passport Photo with White Background', docname: 'Passport Photo with White Background' },
  { title: 'IC/Passport (Scanned)', docname: 'IC/Passport (Scanned)' },
];

export default (props) => {
  const { docs, id, setLoading, updateApi } = props;
  const [alldocs, setAllDocs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [selected, setSelected] = useState('');
  const [load, setLoad] = useState(false);
  const location = useLocation();
  const urlname = location.pathname.split('/')[1];

  const previewDoc = async (docname, url) => {
    setLoading(true);
    let fileurl = '';
    if (docname != 'Orientation Program' && docname != 'Student Manual Book & Refund Policy') {
      await prevDoc(id, docname, url, true)
        .then((res) => {
          fileurl = res.data.message;
          setLoading(false);
          window.open(fileurl, '_blank');
        })
        .catch((err) => {
          setLoading(false);
          message.error('Something went worng');
          console.log('something went worng');
        });
    } else {
      setLoading(false);
      window.open(`${baseUrl}${url}`, '_blank');
    }
  };

  const ListCol = [
    {
      title: 'Document Name',
      dataIndex: 'item',
      key: 'item',
      width: 300,
      sorter: (a, b) => a.item.length - b.item.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record) => (
        <span className={text == 'Approved' ? 'c-success' : text == 'Rejected' ? 'c-error' : ''}>
          {text != 'Pending' ? text : ''}
        </span>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: 'View/Update',
      dataIndex: 'attached_document',
      key: 'attached_document',
      align: 'right',
      width: 150,
      render: (text, record) => (
        <>
          {(urlname == 'eligibility' || urlname == 'visa') && (record?.status != 'Approved' && record?.status != 'Rejected') && (
            <Button
              type="link"
              onClick={() => {
                setSelected(record);
                setVisible1(true);
              }}
              htmlType="button"
              className="p-0"
              icon={<ApplicationsIcon className="c-gray" />}
            />
          )}
          <Button
            type="link"
            onClick={() => previewDoc(record.item, text)}
            htmlType="button"
            className="p-0"
            icon={<DownloadIcon className="c-success" />}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (docs) {
      let docArr = [];
      docs.map((x) => {
        if (x.attached_document) {
          docArr.push(x);
        }
      });
      setAllDocs(docArr);
    }
  }, [docs]);

  const onUploadDocs = async (val) => {
    setLoad(true);
    let docArray = [];

    await Promise.all(
      val.documents.map(async (x) => {
        if (x?.document) {
          let modifiedName = uniquiFileName(x?.document?.file?.originFileObj.name, x.type.value);
          let surl = await getSignedURL(modifiedName, x.type.value, x?.document?.file?.originFileObj);
          docArray.push({
            item: x.type.value,
            file_url: surl?.filepath,
            document_date: x.document_date,
          });
        }
      }),
    );

    let body = {
      doctype: 'Application',
      application_id: id,
      files: docArray,
    };

    let upurl = `${apiMethod}/registry.api.save_application_uploaded_documents`;
    try {
      await axios.put(upurl, body);
      setLoad(false);
      message.success('Document Uploaded');
      setTimeout(() => {
        updateApi();
        setVisible(false);
      }, 1000);
    } catch (e) {
      const { response } = e;
      console.log('response', response);
      message.error(response?.data?.status?.message ?? 'Something went wrong');
      setLoad(false);
    }
  };

  const onStatusDocs = async (status, docid, remarks) => {
    const body = {
      status: status,
      name: docid,
      remarks: remarks,
    };
    let upurl = `${apiMethod}/registry.api.update_application_uploaded_documents`;
    try {
      await axios.put(upurl, body);
      setLoad(false);
      message.success('Document Successfully Updated');
      setTimeout(() => {
        updateApi();
        setVisible1(false);
      }, 1000);
    } catch (e) {
      const { response } = e;
      console.log('response', response);
      message.error(response?.data?.status?.message ?? 'Something went wrong');
      setLoad(false);
    }
  };

  const popup = {
    closable: false,
    visibility: visible,
    content: (
      <UploadDocuments onClose={() => setVisible(false)} onSubmit={onUploadDocs} load={load} doclist={doclist} />
    ),
    width: 900,
    onCancel: () => setVisible(false),
  };

  const popup1 = {
    closable: false,
    visibility: visible1,
    content: (
      <ApproveRejectDocs onClose={() => setVisible1(false)} onSubmit={onStatusDocs} load={load} doc={selected} />
    ),
    width: 650,
    onCancel: () => setVisible1(false),
  };

  return (
    <>
      <ListCard
        title="Application Documents"
        ListCol={ListCol}
        ListData={alldocs}
        pagination={true}
        scrolling={500}
        extraBtn={urlname != 'eligibility' ? 'Upload Documents' : null}
        extraAction={() => setVisible(true)}
        btnClass="green-btn"
      />
      <Popup {...popup} />
      <Popup {...popup1} />
    </>
  );
};
