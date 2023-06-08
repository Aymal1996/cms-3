import React, {useState} from 'react';
import { Button, Row, Col, Typography, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined spin />;
const {TextArea} = Input
const { Title } = Typography;

export default (props) => {

  const { doc, onSubmit, onClose, load, stage } = props;
  const [remarks, setRemarks] = useState('');

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Row gutter={[20, 20]}>
      <Col span={24}>
          <Title level={4} className="mb-0">
            Approve/ Reject Document
          </Title>
        </Col>
        <Col span={24}>
          <Title level={5} className="mb-0">
            {doc?.item}
          </Title>
        </Col>

        <Col span={24}><TextArea placeholder="Remarks" allowClear onChange={(e) => setRemarks(e.target.value)} /></Col>

        <Col span={24}>
          <Row gutter={10} justify='center'>
              <Col><Button type='primary' htmlType='button' className='green-btn' size="large" onClick={() => {onSubmit('Approved', doc.name, remarks); setRemarks('')}}>Approve</Button></Col>
              <Col><Button type='primary' htmlType='button' className='red-btn' size="large" onClick={() => {onSubmit('Rejected', doc.name, remarks); setRemarks('')}}>Reject</Button></Col>
              <Col><Button type='primary' htmlType='button' className='black-btn' size="large" onClick={() => {onClose(); setRemarks('')}}>Cancel</Button></Col>
            </Row>
        </Col>
      </Row>
      </Spin>
  );
};
