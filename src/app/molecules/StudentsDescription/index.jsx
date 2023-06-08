import React from 'react';
import { Col, Row, Pagination, Space, Typography, Divider } from 'antd';
import StudentDescription from '../../atoms/StudentDescription';
import FacultyDescription from '../../atoms/FacultyDescription';

export default (props) => {
  const { onSearch, Search, studentData, page, onChangePage, searchProps } = props;
  console.log({ studentData });
  const { Title } = Typography;
  return (
    <Row gutter={[24, 20]}>
      {onSearch && (
        <Col span={24}>
          <Search onSearch={onSearch} {...searchProps} />
        </Col>
      )}
      {studentData?.count ? (
        <Col span={24}>
          <Title className="mb-0" level={3}>{`${studentData?.count} Students`}</Title>
        </Col>
      ) : null}
      <Col span={24}>
        <Space size={10} direction="vertical" className="w-100">
          {studentData?.rows?.map((value, index) => (
            <>
              {/* <StudentDescription data={value} key={index} /> */}
              <FacultyDescription data={value} key={index} />
              <Divider className="m-0" />
            </>
          ))}
          <div className="w-100 text-right mt-2">
            <Pagination
              pageSize={6}
              current={page}
              hideOnSinglePage={false}
              showSizeChanger={false}
              onChange={onChangePage}
              total={studentData?.count}
            />
          </div>
        </Space>
      </Col>
    </Row>
  );
};
