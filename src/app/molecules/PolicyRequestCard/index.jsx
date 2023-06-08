import React from 'react';
import { Card, Space, Typography, List, Avatar } from 'antd';
//import PolicyIcon from '../../../assets/img/policy-icon.svg';
import moment from 'moment';
import { baseUrl } from '../../../configs/constants';

const { Title, Text } = Typography;

export default (props) => {
  const { data, title, level, spacing } = props;
  const onView = (item) => {
    const attachment = item?.attachment;
    console.log('data', item);
    attachment && window.open(`${baseUrl}${attachment}`, '_blank');
  };
  const defaultImage = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].default_image;
  console.log('defaultImage', defaultImage);
  return (
    <Card bordered={false} className="uni-card dashboard-card main-card-hover">
      <Space size={spacing ? spacing : 20} direction="vertical" className="w-100">
        {title && (
          <Title level={level ? level : 5} className="c-default mb-0" style={{ textTransform: 'capitalize' }}>
            {title}
          </Title>
        )}
        <List
          itemLayout="horizontal"
          className={`icon-list`}
          dataSource={data && data}
          renderItem={(item) => (
            <List.Item key={item.name} className="w-100" onClick={() => onView(item)} style={{ cursor: 'pointer' }}>
              <Space size={17} className="w-100">
                <Avatar size={40} src={baseUrl + defaultImage} />
                <Space size={0} direction="vertical">
                  <Text className="titlename">{item.policy_title}</Text>
                  <Text className="c-gray">{moment(item.date).format('LL')}</Text>
                </Space>
              </Space>
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
};
