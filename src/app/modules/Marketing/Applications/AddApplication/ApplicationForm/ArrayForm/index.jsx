import React, { Fragment } from 'react';
import { Row, Col, Button, Typography, Card } from 'antd';
import FormGroup from 'Molecules/FormGroup';
import { CloseCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

export default (props) => {
  const { fields, remove, item, control, errors, gap, noremove } = props;

  return (
    <>
      {fields.map((elem, index) => (
        <Card
          bordered={item.noCard == true ? false : true}
          className={`${item.single ? 'transparent-card' : item.noCard == true ? 'no-card-aform' : 'border-card'}`}
          key={elem.id}
        >
          <Row gutter={gap ? gap : [20, 20]} className={`position-relative ${item.double ? 'align-end' : ''}`}>
            {item.child.map((x, i) => (
              <Fragment key={i}>
                {x?.subheader && (
                  <Col span={24}>
                    <Row gutter={20}>
                      <Col flex={'auto'}>
                        <Title level={5} className="mb-0 c-default">{`${x.subheader} ${index + 1}`}</Title>
                      </Col>
                      {item.static != true && remove && (
                        <>
                          {index == 0 && noremove == true ? (
                            <></>
                          ) : (
                            <Col flex="80px">
                              <Button
                                type="link"
                                htmlType="button"
                                className="p-0 h-auto c-gray-linkbtn"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </Col>
                          )}
                        </>
                      )}
                    </Row>
                  </Col>
                )}
                {item.single ? (
                  <Col span={24}>
                    <Row gutter={[20, 20]}>
                      <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                      <Button
                        type="link"
                        htmlType="button"
                        className="p-0 h-auto c-gray-linkbtn right-fixed smallFont12"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </Row>
                  </Col>
                ) : (
                  <>
                    {item.double ? (
                      <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                    ) : (
                      <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                    )}
                  </>
                )}
              </Fragment>
            ))}
            {item.double && (
              <>
                {index == 0 && noremove == true ? (
                  <></>
                ) : (
                  <Col flex="40px">
                    <Button
                      type="link"
                      htmlType="button"
                      size="large"
                      className="h-auto w-auto c-gray-linkbtn mb-10PX"
                      onClick={() => remove(index)}
                      icon={<CloseCircleFilled />}
                    />
                  </Col>
                )}
              </>
            )}
          </Row>
        </Card>
      ))}
    </>
  );
};
