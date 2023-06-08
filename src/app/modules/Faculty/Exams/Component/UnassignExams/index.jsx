import React from 'react';
import { Row, Col, Card, Table, Radio, Typography, Space, Button } from 'antd';
import { WarningIcon } from '../../../../../atoms/CustomIcons';
import { useHistory } from 'react-router';

export default (props) => {

const {data} = props;
const {Title,Text} = Typography;
const history = useHistory();

    return (
        <>

<Row gutter={[20, 30]}>

        <Col flex='1 0 300px' className="clickRow" onClick={() => history.push(`/faculty/exams/unassignModules`)} >
            <Card bordered={false} className='red-card'>
              <Space size={20}>
               <WarningIcon className='fontSize40 c-white' />
                <Space size={4} direction='vertical'>
                  <Text className="op-6">Assign Exam Date</Text>
                  <Title level={4} className=" c-white mb-0"> {data.examdate} </Title>
                </Space>
              </Space>
            </Card>
          </Col>

          <Col flex='1 0 300px'  onClick={() => history.push(`/faculty/exams/unassignModules`)}>
            <Card bordered={false} className='red-card'>
              <Space size={20}>
               <WarningIcon className='fontSize40 c-white' />
                <Space size={4} direction='vertical'>
                  <Text className="op-6">Assign Exam Invigilators</Text>
                  <Title level={4} className=" c-white mb-0">{data.invigilator} </Title>
                </Space>
              </Space>
            </Card>
          </Col>

        </Row>
        </>
    )
}