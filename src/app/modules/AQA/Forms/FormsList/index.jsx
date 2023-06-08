import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Tabs, Card, Tag, Space } from 'antd';

import { getFormsFields, getFormsListing } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import FormCards from '../../../../molecules/FormCards';
import AdditionalFields from '../components/AdditionalFields';
import { useTranslate } from 'Translate';
// import { apiresource } from "../../../../../configs/constants";

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('Active');
  const [data, setData] = useState([]);
  const formsList = useSelector((state) => state.forms.formListData);
  const fieldList = useSelector((state) => state.forms.fieldsData);
  const i18n = useTranslate();
  const { t } = i18n;

  useEffect(() => {
    dispatch(getFormsListing(status));
    dispatch(getFormsFields());
  }, []);

  useEffect(() => {
    if (formsList.length > 0) {
      let temp = [];
      formsList.map((e) => {
        temp.push({
          name: e.name,
          form_name: e.form_name,
          field_count: e.field_count,
          status: [status],
        });
      });
      setData(temp);
    } else {
      setData([]);
    }
  }, [formsList]);

  const onChange = (stat, id) => {
    console.log('check', stat, id);
  };

  const StatusCards = (props) => (
    <Card bordered={false} className="transparent-card">
      <FormCards data={data} mode={props.mode} text="fields" onChange={onChange} />
    </Card>
  );

  const callback = (e) => {
    if (e == '1') {
      setStatus('Active');
      dispatch(getFormsListing('Active'));
    } else {
      setStatus('Inactive');
      dispatch(getFormsListing('Inactive'));
    }
  };

  return (
    <Tabs defaultActiveKey="1" type="card" className="tab-bold" onChange={callback}>
      <TabPane tab="Active" key="1">
        <Row gutter={[20, 50]}>
          <Col span={24}>
            <StatusCards mode="active" />
          </Col>
          <Col span={24}>
            <Space size={30} direction="vertical" className="w-100">
              <Title level={3} className="mb-0">
                Form Fields List
              </Title>
              <Card bordered={false} className="uni-card">
                <Row gutter={[20, 30]}>
                  <Col span={24}>
                    <Title level={4} className="mb-0 c-default">
                      Default Fields
                    </Title>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[20, 20]}>
                      {fieldList?.map((e, index) => (
                        <React.Fragment key={index}>
                          <Col span={12}>
                            <Tag className="program-list">
                              <span className="p-name">{e.name}</span>
                            </Tag>
                          </Col>
                        </React.Fragment>
                      ))}
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Title level={4} className="mb-0 c-default">
                      Approval Fields
                    </Title>
                  </Col>
                  <Col span={24}>
                    <AdditionalFields t={t} />
                  </Col>
                </Row>
              </Card>
            </Space>
          </Col>
          <Col span={24}></Col>
        </Row>
      </TabPane>
      <TabPane tab="Inactive" key="2">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <StatusCards mode="inactive" />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};
