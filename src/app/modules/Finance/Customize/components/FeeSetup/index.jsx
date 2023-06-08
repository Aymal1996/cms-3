import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Button, message, Typography, Form, Divider, Card, Image, Space } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useSelector, useDispatch } from 'react-redux';
import { InputField } from 'Atoms/FormElement';
import { useForm, useFieldArray } from 'react-hook-form';
import { getCountryforFee, getRegistrationFee, getSorting } from '../../../ducks/actions';
import { setRegistationFee } from '../../../ducks/services';
import FeeSorting from './FeeSorting';
import { baseUrl } from '../../../../../../configs/constants';

const { Text } = Typography;

export default () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const data = useSelector((state) => state.finance.fees);
  const countryList = useSelector((state) => state.finance.countryList);
  const { control, errors, setValue, handleSubmit } = useForm();
  const userProfile = localStorage.getItem('userImage');

  const { fields } = useFieldArray({
    control,
    name: `registration_fee`,
  });

  useEffect(() => {
    dispatch(getRegistrationFee());
    dispatch(getCountryforFee());
    dispatch(getSorting());
  }, []);

  useEffect(() => {
    if (data) {
      setValue('default_amount', data?.default_amount);
      setValue('administrator_fee', data?.administrator_fee);
      setValue('security_deposit', data?.security_deposit);
      setValue('wing_of_creativity', data?.wing_of_creativity);
    }
    if (data && countryList.length > 0) {
      let temp = [];
      countryList.map((x) => {
        let a = data?.cms_registration_fee.find((y) => y.amount > 0 && y.country == x);
        if (a) {
          temp.push(a);
        } else {
          temp.push({ country: x, amount: 0 });
        }
      });
      setValue('registration_fee', temp);
    }
  }, [countryList, data]);

  const onFinish = (val) => {
    let body = {
      default_amount: val?.default_amount || 0,
      administrator_fee: val?.administrator_fee || 0,
      security_deposit: val?.security_deposit || 0,
      wing_of_creativity: val?.wing_of_creativity || 0,
      registration_fee: val?.registration_fee,
    };
    setRegistationFee(body)
      .then((res) => {
        message.success('Registration Fees Set Successfully');
        dispatch(getRegistrationFee());
      })
      .catch((e) => {
        const { response } = e;
        console.log('err', response);
        message.error('Something went wrong');
      });
  };

  return (
    <>
      {!visible ? (
        <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <HeadingChip title="Fee Structure" />
            </Col>
            <Col span={24}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <Text>Registration Fee</Text>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false} className="req-card">
                        <Row gutter={[20, 0]} align="middle">
                          <Col flex={'auto'} className="align-items-center">
                            <Space>
                              <Image
                                width={20}
                                height={20}
                                preview={false}
                                src={userProfile ? `${baseUrl}${userProfile}` : ''}
                              />
                              <Text>Default</Text>
                            </Space>
                          </Col>
                          <Col>
                            <InputField
                              required={true}
                              fieldname={'default_amount'}
                              label={''}
                              control={control}
                              class={`mb-0`}
                              iProps={{ prefix: 'RM', type: 'number', size: 'large' }}
                              initValue={0}
                              validate={errors.default_amount && 'error'}
                            />
                          </Col>
                          <Col span={24}>
                            <Divider className="mt-1 mb-1" />
                          </Col>
                          {fields.map((item, index) => (
                            <Fragment key={index}>
                              <Col flex={'auto'} className="align-items-center">
                                <Space>
                                  <Image
                                    width={'auto'}
                                    height={20}
                                    preview={false}
                                    src={`https://countryflagsapi.com/png/${item.country.toLowerCase()}`}
                                  />
                                  <InputField
                                    required={false}
                                    fieldname={`registration_fee[${index}].country`}
                                    label={''}
                                    control={control}
                                    class={`mb-0 transparentField`}
                                    iProps={{ size: 'large', readOnly: true }}
                                    initValue={item.country}
                                  />
                                </Space>
                              </Col>
                              <Col>
                                <InputField
                                  required={true}
                                  fieldname={`registration_fee[${index}].amount`}
                                  label={''}
                                  control={control}
                                  class={`mb-0`}
                                  iProps={{ prefix: 'RM', type: 'number', size: 'large' }}
                                  initValue={item.amount}
                                />
                              </Col>
                              {fields.length > index + 1 && (
                                <Col span={24}>
                                  <Divider className="mt-1 mb-1" />
                                </Col>
                              )}
                            </Fragment>
                          ))}
                        </Row>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Row gutter={[20, 0]} align="middle">
                        <Col flex={'auto'} className="align-items-center">
                          <Text>Administration Fee</Text>
                        </Col>
                        <Col>
                          <InputField
                            required={true}
                            fieldname={'administrator_fee'}
                            label={''}
                            control={control}
                            class={`mb-0`}
                            iProps={{ prefix: 'RM', type: 'number', size: 'large' }}
                            initValue={0}
                          />
                        </Col>
                        <Col span={24}>
                          <Divider className="mt-1 mb-1" />
                        </Col>

                        <Col flex={'auto'} className="align-items-center">
                          <Text>Wing of Creativity</Text>
                        </Col>
                        <Col>
                          <InputField
                            required={true}
                            fieldname={'wing_of_creativity'}
                            label={''}
                            control={control}
                            class={`mb-0`}
                            iProps={{ prefix: 'RM', type: 'number', size: 'large' }}
                            initValue={0}
                          />
                        </Col>
                        <Col span={24}>
                          <Divider className="mt-1 mb-1" />
                        </Col>

                        <Col flex={'auto'} className="align-items-center">
                          <Text>Security Deposit</Text>
                        </Col>
                        <Col>
                          <InputField
                            required={true}
                            fieldname={'security_deposit'}
                            label={''}
                            control={control}
                            class={`mb-0`}
                            iProps={{ prefix: 'RM', type: 'number', size: 'large' }}
                            initValue={0}
                          />
                        </Col>
                        {/* <Col span={24}><Divider className='mt-1 mb-1'/></Col> */}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[20, 20]} justify="end">
                <Col>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="button"
                    className="w-200px"
                    onClick={() => setVisible(true)}
                  >
                    Sort Priority
                  </Button>
                </Col>
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn w-200px">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      ) : (
        <FeeSorting setVisible={setVisible} />
      )}
    </>
  );
};
