import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card, Typography, Button, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormGroup from '../../../../../molecules/FormGroup';
import { getMaterilContent } from '../../ducks/services';
import { showMaterialForm } from '../../ducks/actions';
const assetFields = [
  {
    name: 'material_name',
    label: 'Material Name',
    placeholder: 'Type material name',
    type: 'input',
    twocol: false,
  },
  {
    name: 'author',
    label: 'Author Name',
    placeholder: 'Type author name',
    type: 'input',
    twocol: false,
  },
  {
    name: 'revision_no',
    label: 'Revision Number',
    placeholder: 'Type revision number',
    type: 'input',
    twocol: true,
  },
  {
    name: 'revision_by',
    label: 'Revised by',
    type: 'input',
    twocol: true,
  },
  {
    name: 'university',
    label: 'University',
    type: 'select',
    twocol: true,
  },
  {
    name: 'material_type',
    label: 'Material Type or Upload Document',
    type: 'select',
    twocol: true,
  },
  {
    name: 'tags',
    label: 'Tags',
    placeholder: 'tags',
    type: 'select',
    multiple: true,
    disabled: true,
    twocol: false,
  },
];
export default () => {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const { control, errors, setValue } = useForm();

  useEffect(() => {
    getMaterilContent(id).then((response) => {
      console.log({ response });
      if (response?.data?.message) {
        let data = response?.data?.message;
        setValue('material_name', data?.material_name);
        setValue('author', data?.author);
        setValue('revision_no', data?.revision_no);
        setValue('revision_by', data?.revision_by);
        setValue('university', { label: data?.university, value: data?.university });
        setValue('material_type', { label: data?.material_type, value: data?.material_type });
        setValue(
          'assigned_module',
          data?.assigned_modules.map((value) => ({ label: value.module_name, value: value.module_name })),
        );
        setValue(
          'tags',
          data?.tags.map((value) => ({ label: value.tag_name, value: value.tag_name })),
        );
      }
    });
  }, [id]);

  return (
    <Form scrollToFirstError layout="vertical">
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Title className="mb-0" level={4}>
            Material Summary
          </Title>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            {assetFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup static={true} item={item} control={control} errors={errors} />
              </Fragment>
            ))}
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
