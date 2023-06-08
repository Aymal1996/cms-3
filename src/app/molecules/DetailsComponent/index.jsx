import React from 'react';
import { Typography, Col, Button, Row, Descriptions, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';


const {Title} = Typography;

export default (props) => {
  
  const { 
    setRowDetail, 
    backbtnTitle, 
    btn1title, 
    btn2title, 
    btn3title, 
    onAction1, 
    onAction2, 
    onAction3, 
    data, 
    ApproverID, 
    mainTitle, 
    btnClass1, 
    btnClass2, 
    btnClass3,
    detailClass
  } = props;
  // const userID = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  // console.log('ApproverID', ApproverID)
  return (
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space direction='vertical' size={20}>
            {backbtnTitle && (
              <Button type="link" className='c-gray-linkbtn p-0 mt-1' onClick={() => {setRowDetail(false); props?.setRecord(null)}} htmlType="button"><LeftOutlined />{backbtnTitle}</Button>
            )}
            <Title level={4} className='c-default mb-0'>{mainTitle}</Title>
          </Space>
        </Col>

      <Col span={24}>
        <Descriptions className={`reqData ${detailClass ? detailClass : ''}`} bordered colon={false} column={ 1}>
          {data?.map((fd, index) => {
            if (fd.label != 'Name' && fd?.status != 'hidden') {
              return (
                <Descriptions.Item key={index} label={fd.label}>
                  <span className={fd.classi ? fd.classi : ''} dangerouslySetInnerHTML={{__html: fd.value}} />
                </Descriptions.Item>
              );
            }
          })}
        </Descriptions>

        {data?.map((fd, index) => {
          if (fd?.status == 'hidden') {
            return (
              <>
                <Title level={4} className="c-default mt-2">
                  Approvers Status
                </Title>
                <Descriptions className="reqData" bordered colon={false} column={1}>
                  {fd?.value?.map((res, ind) => (
                    <Descriptions.Item key={ind} label={res?.approver}>
                      <span>{res?.status}</span>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </>
            );
          }
        })}
      </Col>


      <Col span={24}>
        <Row gutter={[20, 20]} justify="end">
          {onAction1 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button' className={`w-100 ${btnClass1 ? btnClass1 : ''}`} onClick={() => {onAction1(data[0].value); setRowDetail(false)}}>{btn1title}</Button></Col>}
          {onAction2 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className={`w-100 ${btnClass2 ? btnClass2 : ''}`} onClick={() => {onAction2(data[0].value); setRowDetail(false)}}>{btn2title}</Button></Col>}
          {onAction3 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className={`w-100 ${btnClass3 ? btnClass3 : ''}`} onClick={() => {onAction3(); setRowDetail(false)}}>{btn3title}</Button></Col>}
        </Row>
      </Col>
  </Row>
  );
};