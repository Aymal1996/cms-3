import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SelectField } from '../../../../../atoms/FormElement';
import { getTimeTableFilter, timetableList } from '../../ducks/actions';

const { Title } = Typography;

const categrories = [
  { label: 'All Category', value: 'all_category' },
  { label: 'Slot availity', value: 'slot_availaible' },
  { label: 'Faculty', value: 'faculty_code' },
  { label: 'Programme', value: 'program_code' },
  { label: 'Module', value: 'module_list' },
  { label: 'Classroom Type', value: 'classroom_type' },
  { label: 'Learning Mode', value: 'learning' },
  { label: 'Block', value: 'block' },
  { label: 'Level', value: 'level' },
];

export default (props) => {
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectTimeTableList: field } = useSelector((state) => state.facultyProgramme);

  const onSubmit = (val) => {
    props.onSearch(val);
  };

  const getList = (res) => {
    dispatch(getTimeTableFilter(res.value, id));
  };

  const getValue = (obj) => {
    return {
      label: Object.values(obj)[0].replace('_', ' '),
      value: Object.values(obj)[0].replace('_', ' '),
    };
  };

  const clearFields = () => {
    setValue('category', categrories[0]);
    setValue('category_type', '');
    dispatch(timetableList(id));
  };

  return (
    <Space size={15} direction="vertical" className="w-100">
      <Title level={5} className="c-gray mb-0">
        Category:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <SelectField
          fieldname="category"
          label=""
          class="mb-0 w-100"
          initValue={categrories[0]}
          control={control}
          iProps={{ placeholder: 'Please select' }}
          selectOption={categrories}
          onChange={getList}
        />
        <SelectField
          fieldname="category_type"
          label=""
          class="mb-0 w-100"
          initValue={Array.isArray(field) && getValue(field[0])}
          control={control}
          iProps={{ placeholder: 'Please select from category' }}
          selectOption={Array.isArray(field) && field?.map((item) => getValue(item))}
        />

        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Search
          </Button>
          <Button size="large" onClick={clearFields} type="secondary" htmlType="button">
            Clear
          </Button>
        </Space>
      </Form>
    </Space>
  );
};
