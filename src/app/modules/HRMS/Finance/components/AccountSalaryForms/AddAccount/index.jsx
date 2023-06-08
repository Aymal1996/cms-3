import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { addAccount } from './FormFileds';
import FormGroup from '../../../../../../molecules/FormGroup';
import { updateAccount, addNewAccount, deleteAccount } from '../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../routing/config/utils';
import Roles from '../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

const AddAccount = (props) => {
  const { selectedAccout, onCloseForm } = props;
  const { id } = useParams();
  const { Title } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (selectedAccout?.account_no) {
      setValue('account_no', selectedAccout.account_no);
      setValue('account_type', { value: selectedAccout.account_type, label: selectedAccout.account_type });
      setValue('branch', selectedAccout.branch);
    }
  }, [selectedAccout]);

  const onSubmitHandler = (values) => {
    const payload = {
      account_no: values?.account_no,
      account_type: values?.account_type.label,
      branch: values?.branch,
    };
    setLoad(true);
    selectedAccout.name
      ? updateAccount(selectedAccout?.name, payload).then((response) => {
          message.success(`${selectedAccout?.name} Updated Seccussfully`);
          setLoad(false);
          onCloseForm('', '');
        })
      : addNewAccount({ employee_id: id, account: { ...payload, status: 'Active' } }).then((response) => {
        setLoad(false);
          if (response.data.message.success === true) {
            message.success(`${response.data.message.message}`);
            onCloseForm('', '');
          } else {
            message.error(`${response.data.message.message}`);
          }

        });
  };

  const onDeleteHandler = () => {
    setLoad(true);

    deleteAccount(selectedAccout.name, { status: 'Inactive' }).then((response) => {
      setLoad(false);
      message.success(`Account ${selectedAccout.name} Deleted Seccussfully`);
      onCloseForm('', '');
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[24, 30]} align="bottom">
          <Col span={24}>
            <Title level={4} className="mb-0">
              Account Details
            </Title>
          </Col>
          {addAccount.map((value, key) => (
            <FormGroup key={key} item={value} control={control} errors={errors} />
          ))}
          <Col span={24}>
            <Row gutter={24} justify="end">
              {selectedAccout?.name ? (
                <>
                {allowed([Roles.HRMSFINANCE], 'write') && 
                  <Col>
                    <Button onClick={onDeleteHandler} size="large" type="primary" className="red-btn">
                      Delete Account
                    </Button>
                  </Col>}
                  {allowed([Roles.HRMSFINANCE], 'delete') && 
                  <Col>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn">
                      Save Changes
                    </Button>
                  </Col>}
                </>
              ) : (
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Add Account
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AddAccount;
