import React from 'react';
import { Row, Col, Card, Descriptions, Typography, Button } from 'antd';
import DocumentLinks from '../DocumentLinks';
import { documentation } from '../../../../configs/constantData';

const { Text, Title } = Typography;

export default (props) => {
  const { alldocs, deleteDoc, callApi, appData, setLoading, setVisible, doctype } = props;
  let count = 0;

  return (
    <Card bordered={false} className={`uni-card`}>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Row justify={'space-between'}>
            <Col>
              <Title level={4} className={`c-default mb-0`}>
                Documents
              </Title>
            </Col>
            {setVisible && (
              <Col>
                <Button
                  htmlType="button"
                  type="primary"
                  size="large"
                  className="green-btn"
                  onClick={() => setVisible(true)}
                >
                  Upload Documents
                </Button>
              </Col>
            )}
          </Row>
        </Col>
        {documentation.map((x) => {
          return (
            <Col span={24}>
              <Descriptions
                title={
                  <Title level={4} className="mb-0">
                    {x.title}
                  </Title>
                }
                column={1}
                layout="vertical"
                bordered
              >
                {x.docs.map((y, i) => (
                  <Descriptions.Item label={`${y.noindex != true ? `${count + (i + 1)}.` : ''} ${y.title}`}>
                    <DocumentLinks
                      docname={y.docname}
                      appData={appData}
                      updateApi={callApi}
                      alldocs={alldocs}
                      deleteDoc={deleteDoc}
                      setLoading={setLoading}
                      doctype={doctype}
                    />
                  </Descriptions.Item>
                ))}
              </Descriptions>
              {console.log(
                '======',
                (count +=
                  x.docs.length -
                  (x.docs.filter((x) => x.noindex == true).length > 0
                    ? x.docs.filter((x) => x.noindex == true).length
                    : 0)),
              )}
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};
