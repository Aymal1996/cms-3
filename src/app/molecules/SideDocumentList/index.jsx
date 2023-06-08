import React, { useState, useEffect } from 'react';
import { Space, Typography, Collapse, Tag, message } from 'antd';
import { documentation } from '../../../configs/constantData';
import { getFileName } from '../../../features/utility';
import { baseUrl } from '../../../configs/constants';
import { prevDoc } from '../../modules/StudentFile/ducks/services';

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { CheckableTag } = Tag;

export default (props) => {
  const { id, alldocs, setLoading, setPDFFile } = props;
  const [docs, setDocs] = useState([]);
  const [value, setValue] = useState('');

  const previewDoc = async (docname, docid, checked) => {
  const nextSelectedTags = [docid];
  setValue(nextSelectedTags);
  setPDFFile(null);

    setLoading(true);
    let fileurl = '';
    if (docname != 'Orientation Program' && docname != 'Student Manual Book & Refund Policy') {
      await prevDoc(id, docname, docid)
        .then((res) => {
          fileurl = res.data.message;
          setLoading(false);
          setPDFFile(fileurl);
        })
        .catch((err) => {
          setLoading(false);
          message.error('Something went worng');
          console.log('something went worng');
        });
    } else {
      setLoading(false);
      setPDFFile(`${baseUrl}${docid}`);
    }
  };

  useEffect(() => {
    let temp = [];
    documentation.map((x) => {
      temp = [...temp, ...x.docs];
    });
    console.log('=========', temp)
    setDocs(temp);
  }, []);

  const getDocURL = (docname) => {
    let a = alldocs.filter((x) => x.document_name.toLowerCase() == docname.toLowerCase());
    if (a && a.length > 0) {
      return a;
    } else {
      return [];
    }
  };

  return (
    // <Card bordered={false} className={`uni-card side-panel ${props?.classes ? props?.classes : ''}`}>
      // <Layout className="empty-card text-center">
        // <Card bordered={false} className={`detail-cardtop`}>
          <Collapse
            bordered={false}
            accordion
            // activeKey={activeKey}
            // onChange={(e) => setActiveKey(e)}
            // defaultActiveKey={['0']}
            className="doc-collapse"
            expandIconPosition="right"
          >
            {docs?.map((item, index) => {
              let files = getDocURL(item.title);
              return (<Panel
                key={index}
                header={
                  <Title level={5} className="mb-0 c-default text-left">
                    {item.title}
                  </Title>
                }
              >
                <Space direction="vertical" size={10} className='w-100'>
                  {files.map((x, i) => (
                    <CheckableTag
                      className='chattags text-left'
                      key={i}
                      checked={value.indexOf(x.document) > -1}
                      onChange={checked => previewDoc(item.title, x?.document, checked)}
                    >
                      {console.log(x)}
                    {x?.document_date || `Document ${i + 1}`}
                    </CheckableTag>
                  ))}
                </Space>
              </Panel>
            )})}
          </Collapse>
        // </Card>
      // </Layout>
    // </Card>
  );
};
