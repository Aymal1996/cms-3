import React, { useState } from 'react';
import { Layout, Row, Col, Card, Typography, Button, Space, Spin } from 'antd';
import { useTranslate } from 'Translate';
import Feeds from '../../molecules/Feeds';
import CHeader from '../../molecules/CHeader';
import Navigation from '../../molecules/Navigation';
import { LoadingOutlined, LeftOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenu } from '../../modules/Application/ducks/actions';
import ResponsiveNav from '../../molecules/ResponsiveNav';
import { allowedAudit, allowedFeed } from '../../../routing/config/utils';

const { Content, Footer, Sider } = Layout;
const { Text } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1650px)' });
  const menuStat = useSelector((state) => state.global.menu);
  const i18n = useTranslate();
  const { t } = i18n;

  return (
    <Spin indicator={antIcon} size="large" spinning={props.load}>
      <Layout style={{ padding: '20px 0 20px 20px' }}>
        <Sider trigger={null} width={!allowedAudit() ? 500 : 240} collapsedWidth={110} collapsible collapsed={menuStat}>
          <Card className="side-card" bordered={false}>
            <Card className="sidePanel" bordered={false}>
              {menuStat ? <ResponsiveNav setShowFeed={() => dispatch(updateMenu(!menuStat))} /> : <Navigation />}
              {!allowedAudit() && (
                <Card bordered={false} className="feedStyle">
                  <Space size={30} direction="vertical">
                    <Row gutter justify="end">
                      <Col>
                        <Button
                          icon={<LeftOutlined />}
                          size="middle"
                          className="c-graybtn small-btn"
                          onClick={() => dispatch(updateMenu(!menuStat))}
                        >
                          {t('Toggle.labelhide')}
                        </Button>
                      </Col>
                    </Row>
                    <Feeds />
                  </Space>
                </Card>
              )}
            </Card>
          </Card>
        </Sider>
        <Layout className="base-layout">
          <CHeader />
          <Content>
            <Card
              bordered={false}
              style={{ overflowX: 'hidden', background: 'transparent', height: 'calc(100vh - 190px)' }}
              bodyStyle={{ padding: 0 }}
            >
              {props.children}
            </Card>
          </Content>
          {/* <Footer style={{width: '100%'}}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Text>2021 {t('Footer.copy')}</Text>
                    </Col>
                    <Col span={12} className="text-right">
                        <Text>© {t('Footer.content')}</Text>
                    </Col>
                </Row>
            </Footer> */}
        </Layout>
      </Layout>
    </Spin>
  );
};
