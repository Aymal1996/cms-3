import React, { Fragment } from 'react';
import { Row, Col, Divider, Space, Pagination, Typography } from 'antd';
import FeedbackReview from '../../atoms/SingleReview';
export default (props) => {
  const { reviewData, page, onChangePage } = props;
  const { Title } = Typography;
  return (
    <Row gutter={[24, 20]}>
      {reviewData?.count > 0 && (
        <Col span={24}>
          <Title className="mb-0" level={3}>{`${reviewData?.count} Students`}</Title>
        </Col>
      )}
      <Col span={24}>
        <Space size={10} direction="vertical" className="w-100">
          {reviewData?.rows?.map((value, index) => (
            <Fragment key={index}>
              <FeedbackReview data={value} />
              <Divider className="m-0" />
            </Fragment>
          ))}
          <div className="w-100 text-right mt-2">
            <Pagination
              pageSize={6}
              current={page}
              hideOnSinglePage={false}
              showSizeChanger={false}
              onChange={onChangePage}
              total={reviewData?.count}
            />
          </div>
        </Space>
      </Col>
    </Row>
  );
};
