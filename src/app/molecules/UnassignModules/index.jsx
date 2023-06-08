import React, { Fragment } from 'react';
import { Card, Space, Typography, List, Avatar } from 'antd';
import FigureChips from '../../atoms/FigureChips';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default (props) => {
  const { data, title, count, link, label, status, innerlink, idKey, nameKey } = props;
  const countStatus = {
    title: label,
    status: status,
  };

  return (
    <Card bordered={false} className={`uni-card dashboard-card main-card-hover ${status ? '' : 'no-listspace'}`}>
      <Space size={4} direction="vertical" className="w-100">
        {title && (
          <Title level={5} className="c-default mb-0">
            {title}
          </Title>
        )}
        <FigureChips data={countStatus} link={link} />
      </Space>
    </Card>
  );
};
