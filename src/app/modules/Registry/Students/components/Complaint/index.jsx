import React, { useState, useEffect } from 'react';
import { Descriptions, Space, Typography, Collapse, Row, Col, Button, Tabs, message } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import SmallStatusCard from '../../../../../atoms/SmallStatusCard';
import { CheckCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import { updateComplaint } from '../../ducks/services';
import moment from 'moment';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const panelHeader = (name, title, status) => {
    return <Space size={30}>
      <SmallStatusCard
        status={status}
        icon={
          (status == 'Pending' && <ClockCircleFilled />) ||
          (status == 'Closed' && <CheckCircleFilled />)
        }
        iColor={
          (status == 'Pending' && 'b-pending') ||
          (status == 'Closed' && 'b-success')
        }
      />
      <Space direction='vertical' size={5}>
        <Text className="smallFont12 c-white op-6">{name}</Text>
        <Title level={5} className='lineHeight20 mb-0'>{title}</Title>
      </Space>
    </Space>
}

const panelRight = (isActive) => {
  return <div>
  <Space size={4}>
    <Title level={5} className='defaultFont mb-0'>{isActive ? 'Hide' : 'View Details'} </Title>
    <UpOutlined rotate={isActive ? 0 : 180}/>
  </Space>
  </div>
}

export default (props) => {
  
  const { data, selectedTab, selectedPanel,updateComApi } = props;
  const [ activeTab, setActiveTab ] = useState(selectedTab);

  const updateStat = (name, status) => {
    updateComplaint(name, status)
      .then((response) => {
          message.success('Complaint Successfully Updated');
          updateComApi();
      })
      .catch((error) => message.error(error));
  }

  return (
      <Tabs activeKey={activeTab} type="card" className="gray-tabs" onChange={(e) => setActiveTab(e)}>
        {Object.entries(data).map(([key,value]) => (
          <TabPane tab={<span className='SentanceCase'>{key == 'pending' ? 'Pending Complaints' :  key}</span>} key={key}>
            <Collapse accordion className='reqPanel' bordered={false} defaultActiveKey={selectedPanel} 
            expandIcon={({isActive}) => panelRight(isActive)}
            expandIconPosition='right'>
              {value && value.map(item => (
                <Panel className='ch-black' header={panelHeader(item.name, item.issue, item.status)} key={item.name}>
                  <Row gutter={[20,20]}>
                    <Col span={24}>
                      <Descriptions className='reqData' bordered colon={false} column={1}>
                          <Descriptions.Item label={'Code'}>{item?.name}</Descriptions.Item>
                          <Descriptions.Item label={'Date'}>{item?.creation ? moment(item.creation).format('Do MMMM YYYY'): ''}</Descriptions.Item>
                          <Descriptions.Item label={'Complaint'}>{item?.remarks}</Descriptions.Item>
                          {/* <Descriptions.Item label={'Attachments'}>{item?.images}</Descriptions.Item> */}
                      </Descriptions>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[20,20]} className='justify-right'>
                        {activeTab == 'pending' && 
                        <>
                            <Col flex='0 1 200px'>
                                <Button type='primary' htmlType='button' className='w-100 green-btn' size='large'>Contact Student</Button>
                            </Col>
                            <Col flex='0 1 200px'>
                                <Button type='primary' htmlType='button' className='w-100 black-btn' size='large' onClick={() => updateStat(item?.name, 'Closed')}>Close Complaint</Button>
                            </Col>
                        </>
                        }
                        {activeTab == 'archive' && 
                        <Col flex='0 1 200px'>
                            <Button type='primary' htmlType='button' size='large' className='w-100' onClick={() => updateStat(item?.name, 'Pending')}>Revert</Button>
                        </Col>
                        }
                      </Row>
                    </Col>
                  </Row>
                </Panel>
                ))}
            </Collapse>
          </TabPane>
        ))}
      </Tabs>
  );
};
