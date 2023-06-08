import React from 'react';
import { Space, Typography } from 'antd';
import { CircleIcon } from '../../../../../../../../atoms/CustomIcons';

const { Text } = Typography;

export const RatingStars = {
  1: (
    <Space direction="vertical" size={10} align="center" className="w-100">
      <div className='circle20'>
        <CircleIcon />
      </div>
      <Text className="c-gray smallfont12">1</Text>
    </Space>
  ),
  2: (
    <Space direction="vertical" size={10} align="center" className="w-100">
      <div className='circle20'>
        <CircleIcon />
      </div>
      <Text className="c-gray smallfont12">2</Text>
    </Space>
  ),
  3: (
    <Space direction="vertical" size={10} align="center" className="w-100">
      <div className='circle20'>
        <CircleIcon />
      </div>
      <Text className="c-gray smallfont12">3</Text>
    </Space>
  ),
  4: (
    <Space direction="vertical" size={10} align="center" className="w-100">
      <div className='circle20'>
        <CircleIcon />
      </div>
      <Text className="c-gray smallfont12">4</Text>
    </Space>
  ),
  5: (
    <Space direction="vertical" size={10} align="center" className="w-100">
      <div className='circle20'>
        <CircleIcon />
      </div>
      <Text className="c-gray smallfont12">5</Text>
    </Space>
  ),
};
