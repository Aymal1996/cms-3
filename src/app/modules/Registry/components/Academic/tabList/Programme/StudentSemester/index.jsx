import React, { useEffect } from 'react';
import { Row, Col, Form, Button, Typography, message } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField, SelectField } from '../../../../../../../atoms/FormElement';
import Subjects from '../Subjects';
import axios from '../../../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../../../configs/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentYearIntakes } from '../../../../../../AQA/Incentives/ducks/actions';

const { Text } = Typography;
const _ = require('lodash');

const sequence = [
  {
    label: 'New Session',
    value: 'New Session',
  },
  {
    label: 'Continuous',
    value: 'Continuous',
  },
];

export default (props) => {
  const dispatch = useDispatch()
  const { item, data, updateParent } = props;
  const { control, errors, setValue, handleSubmit } = useForm();
  const intakeList = useSelector(state => state.incentives.intakeList);

  useEffect(() => {
    dispatch(getCurrentYearIntakes());
  }, []);

  useEffect(() => {
    if (item) {
      setValue('name', item.name);
      setValue('semester_sequence', { label: item.semester_sequence, value: item.semester_sequence });
      setValue('semester', item.semester);
      setValue('subjects', item.subjects);
      setValue('term', item?.intake ? { label: item.intake_name, value: item.intake } : '');
    }
  }, [item]);

  const onFinish = async (val) => {
    let module = [];
    val.subjects.map((x) => {
      module.push({
        // name: x.name,
        // parent: val.name,
        // parentfield: 'modules',
        // parenttype: 'Student Semester',
        module: x.module_name.value,
        status: x.status,
        // semester: val.semester,
        // doctype: 'Student Semester Modules',
      });
    });

    const body = {
      name: val.name,
      // faculty: data.program_details[0].faculty_code,
      // offered_program: data.program_details[0].program_code,
      // student: data.applicant_id,
      // semester: val.semester,
      // current_semester: val.semester == data.current_semester ? 'Yes' : 'No',
      // term: val.term.label,
      // semester_sequence: val.semester_sequence.label,
      // doctype: 'Student Semester',
      modules: module,
    };

    // console.log('chkk', body);
    let url = `${apiMethod}/registry.api.student_add_module_semester`;
    try {
      await axios.post(url, body);
      message.success('Module Updated Successfully');
      updateParent();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 30]} align="bottom">
        <InputField
          fieldname="name"
          label=""
          control={control}
          class="d-none mb-0"
          initValue=""
          iProps={{ size: 'large' }}
        />
        <InputField
          fieldname="semester"
          label=""
          control={control}
          class="d-none mb-0"
          initValue=""
          iProps={{ size: 'large' }}
        />
        <Col span={24}>
          <SelectField
            fieldname="semester_sequence"
            label="Semester Sequence"
            class="mb-0 w-100"
            initValue=""
            control={control}
            iProps={{ placeholder: 'Select one' }}
            selectOption={sequence}
          />
        </Col>
        <Col span={24}>
          <SelectField
            fieldname="term"
            label="Select Term"
            class="mb-0 w-100"
            initValue=""
            control={control}
            iProps={{ placeholder: 'Select one' }}
            selectOption={_.map(intakeList, (x) => ({label: x.term_name, value: x.name}))}
          />
        </Col>
        <Col span={24}>
          <Text>Modules</Text>
        </Col>
        <Col span={24}>
          <Subjects
            control={control}
            errors={errors}
            setValue={setValue}
            period={item.semester}
            code={data && data.find(x => x.program.program_status == 'Active').program.program}
          />
        </Col>
        <Col span={24} className="text-right">
          <Button size="large" type="primary" htmlType="submit" className="green-btn">
            Save Changes
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
