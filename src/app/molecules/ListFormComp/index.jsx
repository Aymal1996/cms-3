import React, { Fragment, useEffect } from 'react';
import { Row, Col, Typography, Button, Space } from 'antd';
import FormGroup from '../FormGroup';
import { LeftOutlined } from '@ant-design/icons';
import ArrayForm from '../../modules/HRMS/Employment/components/EmployeeForm/tabList/Personal/ArrayForm';

const { Title } = Typography;

export default (props) => {
  const {
    control,
    errors,
    title,
    fieldsList,
    record,
    backbtnTitle,
    extrabtn,
    setValue,
    btnMain,
    onBack,
    mode,
    noButton,
    extraComp,
  } = props;

  useEffect(() => {
    if (record) {
      record.map((x) => {
        if (x.notset != true) {
          setValue(x.field, x.value);
        }
      });
    }
  }, [record]);

  return (
    <Row gutter={[20, 30]}>
      {mode == 'edit' && (
        <Col span={24}>
          <Space direction="vertical" size={20}>
            <Button type="link" className="c-gray-linkbtn p-0 mt-1" onClick={onBack} htmlType="button">
              <LeftOutlined />
              {backbtnTitle}
            </Button>
            {title && (
              <Title level={4} className="c-default mb-0">
                {title}
              </Title>
            )}
          </Space>
        </Col>
      )}
      {fieldsList.map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={item?.subheadlevel ? item?.subheadlevel : 5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' ? (
            <Col span={item.twocol ? 12 : 24}>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <ArrayForm
                    gap={item.gap}
                    fields={item.field}
                    remove={item.remov}
                    item={item}
                    control={control}
                    errors={errors}
                  />
                </Col>
                {item.adding && (
                  <Col span={24}>
                    <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={item.adding}>
                      {item.appendText}
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          ) : (
            <FormGroup item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
      {extraComp && record != null && <Col span={24}>{extraComp}</Col>}
      {noButton != true && (
        <Col span={24}>
          <Row gutter={20} justify="end">
            {extrabtn && record != null && (
              <Col>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  className={extrabtn?.class ? extrabtn?.class : ''}
                  onClick={extrabtn?.onAction}
                >
                  {extrabtn?.title}
                </Button>
              </Col>
            )}
            {btnMain?.nomain != true && (
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={btnMain?.class ? btnMain.class : 'green-btn'}
                >
                  {btnMain?.title ? btnMain.title : 'Save Changes'}
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      )}
    </Row>
  );
};
