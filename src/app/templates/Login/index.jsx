import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Image, Space, Spin, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import loginLogo from '../../../assets/img/limkokwing-logo.svg';
import { useTranslate } from 'Translate';
import LanguageSwitcher from '../../molecules/LanguageSwitcher';

const { Title, Text, Paragraph } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const i18n = useTranslate();
  const { t } = i18n;

  return (
    <Spin indicator={antIcon} size="large" spinning={props.load}>
      <LanguageSwitcher></LanguageSwitcher>
      <Layout className="login-layout">
        <Row align="middle" justify="center" gutter={24}>
          <Col flex="0 0 536px">
            <Row gutter={[24, 50]}>
              <Col span={24} className="text-center">
                <Image
                  style={{ width: 190, height: 'auto' }}
                  preview={false}
                  src={loginLogo}
                  alt="Limkokwing University of Creative Technology"
                />
              </Col>
              <Col span={24}>
                <Card bordered={false} className="login-card">
                  <Col span={24}>{props.children}</Col>
                </Card>
              </Col>
              <Col span={24}>
                <Paragraph className="copyright font-300 text-center">
                  {new Date().getFullYear()} {t('Footer.copy')}
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </Spin>
  );
};
