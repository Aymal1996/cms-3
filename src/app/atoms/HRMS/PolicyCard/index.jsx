import React, {Fragment} from 'react';
import { Row, Col, Card, Typography, Space, Tag, Button } from 'antd';
import {CloseCircleFilled} from '@ant-design/icons';
import moment from 'moment';
import Roles from '../../../../routing/config/Roles';
import { allowed } from '../../../../routing/config/utils';

const { Title } = Typography

export default (props) => {

  const { data, onDelete, onView } = props;

  return (
    <Card className='uni-card-small' bordered={false}>
        <Row gutter={20} wrap={false} align="middle">
          <Col flex="auto">
              <Space direction="vertical" size={2}>
                <Title level={4} className="mb-0">{data?.policy_title}</Title>
                <Title level={5} className="c-gray mb-0">{moment(data?.date).format('Do MMMM YYYY')}</Title>
              </Space>
          </Col>
          <Col>
            <Space size={20}>
              {data?.roles?.map((resp,i) => (
                <Fragment key={i}>
                  <Tag className="tag-code">{resp?.user_roles}</Tag>
                </Fragment>
              ))}
              <Button type='primary' htmlType='button' className={data?.policy_status == 'View' ? 'green-btn' : 'gray-btn'} onClick={() => onView(data)}>{data?.policy_status}</Button>
              {allowed([Roles.POLICY], 'delete') ? <Button type='link' size="large" className='cross-iconbtn graycross-icon' htmlType='button' icon={<CloseCircleFilled />} onClick={() => onDelete(data?.name)} />: null}
            </Space>
          </Col>
        </Row>
    </Card>
  )
}