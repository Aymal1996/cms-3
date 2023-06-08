import React, {useEffect} from 'react';
import { Typography, Col, Button, Form, Card, Row, message } from 'antd';
import { useTranslate } from 'Translate';
import {TextAreaField, SelectField, DateField, InputField } from '../../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { apiMethod } from '../../../../../../../../../configs/constants';
import axios from '../../../../../../../../../services/axiosInterceptor';
import {getProjectName} from '../../../../../ducks/actions';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const {Title} = Typography;
export default (props) => {
  const { control, errors, handleSubmit, reset } = useForm();
  const il8n = useTranslate();
  const history = useHistory();
  const dispatch = useDispatch();
  const projectName = useSelector(state => state.tasks.myProjectData);
  const { t } = il8n;
  const {newTimeSheet, setNewTimeSheet} = props;

  console.log('projectName', projectName)

  useEffect(() => {
    dispatch(getProjectName());
  }, []);

  const onFinish = async (val) => {
    const json = {
      timesheet: [{
        status: "Pending",
        name_of_project: val?.projectName?.value,
        hours: val?.totalHours,
        date: val?.timesheetDate ? moment(val?.timesheetDate).format('YYYY-MM-DD'): '',
        tasks: val?.task,
      }]
    }
    let url = `${apiMethod}/hrms.task_api.add_single_timesheet`;
    try {
        await axios.post(url, json);
        message.success('TimeSheet Added Successfully');
        setTimeout(() => setNewTimeSheet(false), 1000)
    } catch(e) {
        const { response } = e;
        message.error(e);
    }
  }

  return (
    <>
      <Card bordered={false} className="uni-card h-auto">
        <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Row gutter={[30, 20]}>
              <Col span={24}><Button type="text" onClick={() => setNewTimeSheet(false)} htmlType="button"><LeftOutlined /> Timesheet List</Button></Col> 
              <Col span={24}><Title level={4}>Create New Timesheet</Title></Col>

              <Col span={8}>
                <DateField 
                    fieldname='timesheetDate'
                    label='Timesheet Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                    initValue=''
                />
              </Col>

              <Col span={8}>
                <SelectField 
                  fieldname='projectName'
                  label='Project Name'
                  control={control}
                  class='mb-0'
                  iProps={{ placeholder: 'Please select'}}
                  initValue=''
                  selectOption={
                    projectName &&
                    projectName?.map((e) => {
                        return { value: e.name, label: e.name };
                    })
                  }
                />
              </Col>

              <Col span={8}>
                <InputField 
                    fieldname='totalHours'
                    label='Total Hours'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                />
              </Col>
              <Col span={24}>
                <TextAreaField
                  fieldname='task'
                  label='Task'
                  control={control}
                  class='mb-0'
                  iProps={{ placeholder: 'Please state', size: 'large'}}
                  initValue=''
                />  
              </Col>
              <Col span={24}>
                <Row gutter={[20, 20]} justify="end">
                  <Col span={6}><Button type='primary' htmlType='button' className='w-100 black-btn'>Cancel</Button></Col>
                  <Col span={6}><Button type='primary' htmlType='submit' className='w-100 green-btn'>Save</Button></Col>
                </Row>
              </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};