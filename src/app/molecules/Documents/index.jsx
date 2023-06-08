import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { uniquiFileName, getSignedURL } from '../../../features/utility';
import UploadDocuments from '../../modules/Registry/Students/components/UploadDocuments';
import { Popup } from 'Atoms/Popup';
import { DownloadIcon } from 'Atoms/CustomIcons';
import { apiMethod, baseUrl } from '../../../configs/constants';
import axios from '../../../services/axiosInterceptor';
import { prevDoc } from '../../modules/StudentFile/ducks/services';
import ListCard from '../ListCard';

export default (props) => {
  const { alldocs, updateApi, id, setLoading } = props;
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [docz, setDocz] = useState([])

  useEffect(() => {
    if (alldocs) {
      let docArr = [];
      alldocs.map((x) => {
        if (x.document) {
          docArr.push({
            xid: x?.document_id,
            item: x.document_name,
            url: x.document,
          });
        }
      });
      setDocz(docArr);
    }
  }, [alldocs]);

  const previewDoc = async (docname, url) => {
    setLoading(true);
    let fileurl = '';
    if (docname != 'Orientation Program' && docname != 'Student Manual Book & Refund Policy') {
      await prevDoc(id, docname, url)
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
      ellipsis: true,
      sorter: (a, b) => a.item.length - b.item.length,
    },

    {
      title: 'View/Download',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 150,
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => previewDoc(record.item, text)}
          htmlType="button"
          className="p-0"
          icon={<DownloadIcon className="c-success" />}
        />
      ),
    },
  ];

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
      doctype: 'Students',
      student_id: id,
      files: docArray,
    };

    let upurl = `${apiMethod}/registry.api.save_uploaded_documents`;

    try {
      await axios.post(upurl, body);
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

  const popup = {
    closable: false,
    visibility: visible,
    content: <UploadDocuments onClose={() => setVisible(false)} onSubmit={onUploadDocs} load={load} />,
    width: 900,
    onCancel: () => setVisible(false),
  };

  return (
    <>
      <ListCard
        title="Documents"
        ListCol={ListCol}
        ListData={docz}
        pagination={true}
        scrolling={500}
        extraBtn={'Upload Documents'}
        extraAction={() => setVisible(true)}
        btnClass="green-btn"
      />
      <Popup {...popup} /> 
    </>
  );
};
