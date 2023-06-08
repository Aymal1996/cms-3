import React, { Fragment } from 'react';
import { Card, Space, Typography} from 'antd';
import FigureChips from '../../atoms/FigureChips';

const { Title } = Typography;

export default (props) => {

    const {data} = props;

return (
    <Card bordered={false} className='uni-card'>
        <Space size={20} direction='vertical' className='w-100'>
            <div className='card-icon'>{data.icon}</div>
            <Title level={4}>{data.title}</Title>
        
        {data.data.map((item, index) => 
        <Fragment key={index}>
            <FigureChips data={item} link={data.link} />
        </Fragment>)}
        </Space>
    </Card>
)
}