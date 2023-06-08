import React, { Fragment } from 'react';
import { Typography, Space, Button, Tag } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../configs/constantData';

const { Text } = Typography;

export default (props) => {

  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    return (
        <Space size={10} direction={isHDScreen ? "vertical" : props.type == 'button' ? 'horizontal' : 'vertical'} className={`${!isHDScreen ? `mt-1 ${props.type == 'button' ? 'justify-right' : ''}` : ''} w-100`}>
            {props.type == 'button' && (
              <>
                {props.bottom.map((item, index) => (
                  <Fragment key={index}>
                    {item.type === 'submit' ? (
                      <Button size="large" type="primary" htmlType="submit" className={`w-100 ${item.class}`}>
                        {item.title}
                      </Button>
                    ) : (
                      <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                        className={`w-100 ${item.class}`}
                        onClick={item.action}
                      >
                        {item.title}
                      </Button>
                    )}
                  </Fragment>
                ))}
              </>
            )}
            {props.type == 'info' && (
              <>
                {props.bottom.map((item, index) => (
                  <Fragment key={index}>
                    <Tag className="info-tag w-100">
                      <span className="info-icon">{item.icon}</span>
                      <Text>{item.text}</Text>
                    </Tag>
                  </Fragment>
                ))}
              </>
            )}
          </Space>
    )
}