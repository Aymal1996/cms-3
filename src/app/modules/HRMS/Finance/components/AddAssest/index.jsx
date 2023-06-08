import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import FormGroup from '../../../../../molecules/FormGroup';
import {
  updateAssets,
  addNewAsset,
  deleteAsset,
  getAllAssets,
  addinSetup,
  deleteAssetSetup,
} from '../../ducks/services';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

const AddAsset = (props) => {
  const { data, onUpdateComplete } = props;
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const { Title } = Typography;
  const [assetList, setAssetList] = useState([]);
  const [formDate, setFromDate] = useState(null);
  const disableDate = (current) => {
    if (formDate) {
      return current && current < moment(formDate, 'YYYY-MM-DD');
    }
  };
  const formAsset = [
    {
      type: 'select',
      label: 'Asset No.',
      name: 'asset_no',
      disabled: data?.asset_no,
      req: true,
      reqmessage: 'Asset Number required',
      twocol: false,
      options: assetList?.map((value) => ({ label: value.assets_id, value: value.name })),
    },
    {
      type: 'date',
      label: 'Start Date',
      name: 'start_date',
      req: true,
      reqmessage: 'date required',
      twocol: true,
      onChange: (e) => {
        console.log({ e });
        setFromDate(e);
        setValue('end_date', null);
      },
    },
    {
      type: 'date',
      label: 'End Date',
      name: 'end_date',
      req: true,
      reqmessage: 'date required',
      twocol: true,
      disabledDate: disableDate,
    },
    {
      type: 'input',
      label: 'Description',
      name: 'description',
      placeholder: 'Description',
      req: true,
      reqmessage: 'Description required',
      twocol: false,
    },
  ];

  useEffect(() => {
    getAllAssets().then((response) => setAssetList(response?.data.message));
  }, []);

  useEffect(() => {
    if (data?.asset_no) {
      setValue('asset_no', { label: data?.asset_id, value: data?.asset_no });
      setValue('description', data?.description);
      setValue('start_date', data.start_date ? moment(data.start_date, 'YYYY-MM-DD') : '');
      setValue('end_date', data.end_date ? moment(data.end_date, 'YYYY-MM-DD') : '');
      setFromDate(data.start_date);
    }
  }, [data]);

  const onSubmitHandler = (values) => {
    const payload = {
      asset_no: values?.asset_no.value,
      start_date: moment(values?.start_date).format('YYYY-MM-DD'),
      end_date: moment(values?.end_date).format('YYYY-MM-DD'),
      description: values?.description,
      possession_status: 'In Staff Possession',
    };
    setLoad(true);
    data?.name
      ? updateAssets(data?.name, payload)
          .then((response) => {
            if (response.status === 200) {
              message.success(`Asset ${data?.asset_no} update successfully`);
              setLoad(false);
              onUpdateComplete();
            }
          })
          .catch((error) => {
            message.error('something went wrong');
            setLoad(false);
          })
      : addNewAsset({ employee_id: id, assets: { ...payload } })
          .then((response) => {
            if (response.data.message.success == true) {
              addinSetup(values?.asset_no.value)
                .then((res) => {
                  message.success(response.data.message.message);
                })
                .catch((error) => {
                  message.error('something went wrong');
                  setLoad(false);
                });
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onUpdateComplete();
          })
          .catch((error) => {
            message.error('something went wrong');
            setLoad(false);
          });
  };

  const onDeleteHandler = () => {
    setLoad(true);
    deleteAsset(data.name, { status: '', possession_status: 'With Company' }).then((response) => {
      deleteAssetSetup(data?.asset_no).then((response) => {
        message.success(response.data.message.message);
      });
      message.success(`Asset ${data.name} Deleted Seccussfully`);
      setLoad(false);
      onUpdateComplete();
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[24, 30]} align="bottom">
          <Col span={24}>
            <Title level={4} className="mb-0">
              Asset Details
            </Title>
          </Col>
          {formAsset.map((value, key) => (
            <FormGroup key={key} item={value} control={control} errors={errors} />
          ))}
          <Col span={24}>
            <Row gutter={24} justify="end">
              {data?.asset_no ? (
                <>
                  {allowed([Roles.HRMSFINANCE], 'delete') && (
                    <Col>
                      <Button onClick={onDeleteHandler} size="large" type="primary" className="red-btn">
                        Delete Asset
                      </Button>
                    </Col>
                  )}
                  {allowed([Roles.HRMSFINANCE], 'write') && (
                    <Col>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn">
                        Save Changes
                      </Button>
                    </Col>
                  )}
                </>
              ) : (
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Add Asset
                  </Button>
                </Col>
              )}
              {/* <Col>
              <Button size="large" type="primary" htmlType="submit" className="red-btn">
                Delete Account
              </Button>
            </Col>
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn">
                Save Changes
              </Button>
            </Col> */}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AddAsset;
