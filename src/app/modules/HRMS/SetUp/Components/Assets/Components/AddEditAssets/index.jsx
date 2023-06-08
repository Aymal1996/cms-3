import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { addSingleAsset, updateSingleAsset, deleteSingleAsset, deleteAssetFinance } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import Roles from '../../../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../../../routing/config/utils';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, asset } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  const custodians = useSelector((state) => state.setup.employeeList);
  const assetFields = [
    {
      name: 'assets_name',
      label: 'Asset name',
      req: true,
      placeholder: 'Type asset Name',
      type: 'input',
      twocol: false,
      reqmessage: 'Asset required',
    },
    {
      name: 'assets_id',
      label: 'Asset ID',
      req: true,
      placeholder: 'Type asset id',
      type: 'input',
      twocol: false,
      reqmessage: 'Asset ID required',
    },
    {
      name: 'custodian',
      label: 'Custodian',
      req: true,
      placeholder: 'Select',
      type: 'select',
      twocol: false,
      reqmessage: 'Custodian required',
      options: custodians.map((value) => ({ label: value.employee_name, value: value.name })),
    },
  ];

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      assets_name: values.assets_name,
      assets_id: values.assets_id,
      custodian: values.custodian.value,
      status: 'With Company',
    };

    asset.assets_name.length == 0
      ? addSingleAsset(payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => {
            message.error('something went woring');
            setLoad(false);
          })
      : updateSingleAsset(asset.assets_id, { ...payload, status: asset.status })
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteNationality = () => {
    setLoad(true);
    deleteSingleAsset(asset.name)
      .then((response) => {
        setLoad(false);
        if (response.data.message.success == true) {
          deleteAssetFinance(asset.name).then(x => {
            message.success(response.data.message.message);
            onClose();
          })
        } else {
          message.error(response.data.message.message);
        }
        
      })
      .catch((error) => {
        message.error('Asset Deleted Unsccessfully');
        onClose();
      });
  };
  useEffect(() => {
    if (asset.assets_name.length > 0) {
      setValue('assets_name', asset.assets_name);
      setValue('assets_id', asset.assets_id);
      setValue('custodian', { label: asset.custodian_name, value: asset.custodian });
    } else {
      reset();
    }
  }, [asset]);
  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3} className="mb-0">
              {title}
            </Title>
          </Col>

          <Col span={24}>
            <Row gutter={[20, 30]}>
              {assetFields.map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {asset.assets_name.length == 0 ? (
                <>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                      Close
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Add
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  {allowed([Roles.SETUP], 'delete') && (
                    <Col span={12}>
                      <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                        Delete
                      </Button>
                    </Col>
                  )}
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Save
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
