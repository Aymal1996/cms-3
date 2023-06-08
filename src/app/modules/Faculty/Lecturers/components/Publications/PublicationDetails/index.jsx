import React from 'react';
import { Button, Col, Descriptions, Row, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
export default (props) => {
  const { backbtnTitle, mainTitle, setLoadDetail, data } = props;
  const { Title, Link } = Typography;

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Space direction="vertical" size={20}>
          {backbtnTitle && (
            <Button
              type="link"
              className="c-gray-linkbtn p-0 mt-1"
              onClick={() => {
                setLoadDetail(false);
              }}
              htmlType="button"
            >
              <LeftOutlined />
              {backbtnTitle}
            </Button>
          )}
          <Title level={4} className="c-default mb-0">
            {data?.publication_name}
          </Title>
        </Space>
      </Col>
      <Col span={24}>
        <Descriptions className="reqData" bordered colon={false} column={1}>
          <Descriptions.Item label="Date">{moment(data?.published_date).format('Do MMMM YYYY')}</Descriptions.Item>
          <Descriptions.Item label="ORCID">{data?.orcid_no}</Descriptions.Item>
          <Descriptions.Item label="Article Title">{data?.publication_name}</Descriptions.Item>
          <Descriptions.Item label="Journal Name">{data?.journal_name}</Descriptions.Item>
          <Descriptions.Item label="Co-author Name">{data?.co_author_name}</Descriptions.Item>
          <Descriptions.Item label="Absract">{data?.abstract}</Descriptions.Item>
          <Descriptions.Item label="Keywords">{data?.keywords}</Descriptions.Item>
          <Descriptions.Item label="Journal Indexing">{data?.journal_indexing}</Descriptions.Item>
          <Descriptions.Item label="Journal DOI">{data?.doi_no}</Descriptions.Item>
          <Descriptions.Item label="Journal URL">
            <Link href={data?.journal_url}>File</Link>
          </Descriptions.Item>
          <Descriptions.Item label="Journal Download">{data?.publication_name}</Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};
