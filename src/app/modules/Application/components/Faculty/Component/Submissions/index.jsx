import React from 'react';
import { Row, Typography, Col, Card, Space, List, Avatar } from "antd";
import { baseUrl } from '../../../../../../../configs/constants';

const { Title, Text } = Typography;
const data = [
  {
    key: '1',
    submission_date: 'Mon, 9 Jun',
    content: [
      {
        innerkey: '1',
        name: 'Lori Ramirez',
        info: 'Assignment 1 · 10:31 am',
        user_image: '/files/14.jpg',
      },
      {
        innerkey: '2',
        name: 'Joey Biden',
        info: 'Assignment 1 · 9.08 am',
        user_image: '/files/14.jpg',
      }
    ]
  },
  {
    key: '2',
    submission_date: 'Sun, 8 Jun',
    content: [
      {
        innerkey: '1',
        name: 'Shakira Stella',
        info: 'Assignment 1 · 11.04 pm',
        user_image: '/files/14.jpg',
      }
    ]
  },
  {
    key: '3',
    submission_date: 'Sat, 7 Jun',
    content: [
      {
        innerkey: '1',
        name: 'Shakira Stella',
        info: 'Assignment 1 · 11.04 pm',
        user_image: '/files/14.jpg',
      }
    ]
  },
];

export default (props) => {
  const {facultySubmissionList} = props
  return (
    <Card bordered={false} className="uni-card main-card-hover" style={{height:'450px'}}>
      <Space size={20} direction="vertical" className="w-100">
        <Title level={4} className="c-default mb-0">
          Submissions
        </Title>

        <List
          itemLayout="horizontal"
          className="icon-list"
          dataSource={facultySubmissionList && facultySubmissionList}
          renderItem={(item, ind) => (
            <List.Item key={ind} className="w-100" style={{flexDirection:'column'}}>
              <Title level={4} className="c-default w-100 smallFont12">{item?.submission_date}</Title>
              {item?.content && item?.content.map((resp, i) => (
                <Card bordered={false} style={{ background: '#202020', marginBottom:'10px' }} className="inner-card w-100">
                  <Space size={17} className="w-100">
                    <Avatar size={40} src={resp?.user_image && `${baseUrl}${resp?.user_image}`} />
                    <Space size={0} direction="vertical">
                      <Text className="c-gray">{resp?.student_name}</Text>
                      <Text className="titlename">{resp?.type}</Text>
                    </Space>
                  </Space>
                </Card>
              ))}
            </List.Item>
          )}
        />
      </Space>
    </Card>
  )
}