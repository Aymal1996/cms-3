import React from 'react';
import { PageHeader, Typography, Button } from 'antd';

const { Title } = Typography;

export default (props) => {
  const { routes, title, subTitle, btnList, classes } = props;

  return (
    <PageHeader
      className={`site-page-header ${classes ? classes : ''}`}
      title={
        <Title level={3} className="mb-0">
          {title}
        </Title>
      }
      breadcrumb={routes ? routes : null}
      subTitle={subTitle ? subTitle : null}
      extra={
        btnList &&
        btnList.map((item, index) => (
          <React.Fragment key={index}>
            <Button
              size="large"
              type={item?.type ? item?.type : 'primary'}
              icon={item?.icon ? item?.icon : null}
              className={item?.classes ? item.classes : ''}
              onClick={item.action}
            >
              {item.text}
            </Button>
          </React.Fragment>
        ))
      }
    />
  );
};
