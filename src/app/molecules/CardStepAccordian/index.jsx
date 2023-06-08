import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Collapse, Space, Typography, Tabs } from 'antd';
import StatusCard from 'Atoms/StatusCard';
import CardExtension from 'Atoms/CardExtension';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

export default (props) => {
  const { data, page, setLoading, apiData } = props;
  const [activeK, setActiveKey] = useState('0');

  useEffect(() => {
    if (data && data.length > 0) {
      let idx = undefined;
      data.map((x, i) => {
        x.cards.map((y) => {
          if (y.status == 0) {
            if (idx == undefined) {
              idx = i;
            }
          }
        });
      });
      setActiveKey(`${idx}`);
    }
  }, [data]);

  return (
    <>
      {!page ? (
        <>
          {data && data.length > 1 ? (
            <Collapse
              bordered={false}
              accordion
              activeKey={activeK}
              onChange={(e) => setActiveKey(e)}
              defaultActiveKey={['0']}
              className="app-collapse"
              expandIconPosition="right"
            >
              {data?.map((item, index) => (
                <>
                  {item?.title == 'Visa Processing Fee' && apiData?.nationality == 'Malaysia' ? null : (
                    <Panel
                      key={index}
                      header={
                        <Space direction="vertical" size={0}>
                          <Title level={5} className="mb-0 c-gray">
                            Step {index + 1}
                          </Title>
                          <Title level={4} className="mb-0 c-default">
                            {item.title}
                          </Title>
                        </Space>
                      }
                      forceRender
                    >
                      <Row gutter={[20, 20]}>
                        <CardExtension data={item?.cards} page={page} />
                      </Row>
                    </Panel>
                  )}
                </>
              ))}
            </Collapse>
          ) : (
            <>
              {data && data.length > 0 && (
                <>
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <Title level={4} className="mb-0 c-default">
                        {data[0].title}
                      </Title>
                    </Col>
                    {data[0]?.cards?.map((ids, idx) => (
                      <Fragment key={idx}>
                        <Col flex={'1 0 280px'}>
                          <StatusCard
                            title={ids.title}
                            text1={ids.text1}
                            text2={ids.text2}
                            status={idx > 0 && data[0].cards[idx - 1].status == 0 ? 2 : ids.status}
                            date={ids.days}
                            page={page}
                            setLoading={setLoading}
                            apiData={apiData}
                          />
                        </Col>
                      </Fragment>
                    ))}
                  </Row>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {data && data.length > 1 ? (
            <Tabs activeKey={activeK} type="card" className="gray-tabs w-100" onChange={(e) => setActiveKey(e)}>
              {data?.map((item, index) => (
                <>
                  {item?.title == 'Visa Processing Fee' && apiData?.nationality == 'Malaysia' ? null : (
                    <TabPane tab={item.title} key={index} forceRender>
                      <Row gutter={[20, 20]} wrap={false}>
                        <CardExtension data={item?.cards} page={page} />
                      </Row>
                    </TabPane>
                  )}
                </>
              ))}
            </Tabs>
          ) : (
            <>
              {data && data.length > 0 && (
                <>
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <Title level={4} className="mb-0 c-default">
                        {data[0].title}
                      </Title>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[20, 20]} wrap={false}>
                        <CardExtension data={data[0]?.cards} page={page} />
                      </Row>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
