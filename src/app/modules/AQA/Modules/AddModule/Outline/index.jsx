import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, message, Form } from 'antd';
import {InputField, SelectField, CheckboxGroup } from '..........atomsFormElement';
import { useForm, useFieldArray } from 'react-hook-form';
import {CloseCircleFilled} from '@ant-designicons';
import {useDispatch, useSelector} from 'react-redux';
import {getDepartments, getApprovals} from '....ducksactions';
import axios from '............servicesaxiosInterceptor';
import { apiMethod, apiresource } from '............configsconstants';

const initQ = {
    name '',
    status '',
    department '',
    remarks false,
}

const options = [
    {
        label 'Approve',
        value 'Approve'
    },
    {
        label 'Reject',
        value 'Reject'
    }
]

export default (props) = {

    const { t } = props;
    const { control, errors, setValue, handleSubmit } = useForm();
    const departmentApi = useSelector(state = state.forms.departmentList);
    const approvalApi = useSelector(state = state.forms.approvalList);
    const [delted, setDelted] = useState([]);
    
    const dispatch = useDispatch();
        
    const { fields, append, remove } = useFieldArray({
        control,
        name `approval_fields`,
      });

      useEffect(() = {
          dispatch(getDepartments());
          dispatch(getApprovals());
      }, []);

      useEffect(() = {
          if (approvalApi.length  0) {
            setValue('approval_fields', approvalApi)
          }
      }, [approvalApi]);

      const onAdd = () = {
        append(initQ)
      }

      const onFinish = async (val) = {
        let body = [];
        val.approval_fields.map(item = {
            let temp = {
                department item.department.label,
                requires_remarks item.requires_remarks[0] == false  1   0,
                status item.status.value
            }
            body.push(temp);
        })
        let url = `${apiresource}AQA Form Approver Department List`
        let url2 = `${apiMethod}aqa.api.add_update_form_approval_dpt`

        try {
            if (approvalApi.length  0) {
                let body2 = {
                    dpt body,
                    delete_list delted
                }
                await axios.post(url2, body2);
            } else {
                await axios.post(url, body);
            }
            message.success('Approval Successfully Updated')
        } catch(e) {
            const {response} = e;
            message.error(e);
        }
      }

      const onRemove = (name, index) = {
          if (name != '') {
            setDelted(delted = [...delted, name]);
          }
          remove(index);
      }

    return (
    Form layout=vertical  onFinish={handleSubmit(onFinish)}
        Row gutter={[20, 20]}
            Col span={24}
            {fields.map((item,index) = (
                React.Fragment key={item.id}
                Row gutter={[20, 20]} wrap={false}
                   Col flex=auto
                        Row gutter={20}
                            InputField
                            fieldname={`approval_fields[${index}.name`}
                            class='d-none mb-0'
                            label=''
                            control={control}
                            iProps={{ size 'large', readOnly true}}
                            initValue={item.name}
                            
                            Col span={8}
                                SelectField
                                fieldname={`approval_fields[${index}.status`}
                                label=''
                                class='mb-0'
                                initValue={item.status  {label item.status, value item.status}  ''}
                                control={control}
                                selectOption={options}
                                rules={{required true}}
                                validate={
                                    Object.entries(errors).length  0 &&
                                    errors.approval_fields.length  0 &&
                                    errors.approval_fields[index].status &&
                                    error
                                }
                                
                            Col
                            Col span={8}
                                SelectField
                                fieldname={`approval_fields[${index}.department`}
                                label=''
                                class='mb-0'
                                initValue={item.department  {label item.department, value item.department}  ''}
                                control={control}
                                selectOption={departmentApi.map(e = ({label e.name, value e.name}))}
                                rules={{required true}}
                                validate={
                                    Object.entries(errors).length  0 &&
                                    errors.approval_fields.length  0 &&
                                    errors.approval_fields[index].department &&
                                    error
                                }
                                
                            Col
                            Col span={8}
                            CheckboxGroup
                                fieldname={`approval_fields[${index}.requires_remarks`}
                                label=
                                class=fullWidth-checbox
                                control={control}
                                initValue={item.requires_remarks == 1  [false]  []}
                                option={[{label 'Requires remarks', value ''}]}
                            
                            Col
                        Row
                    Col
                    Col flex=40px
                        Button type='link' size=large className='cross-iconbtn' htmlType='button' icon={CloseCircleFilled } onClick={() = onRemove(item.name, index)} 
                    Col
                Row
                React.Fragment
            ))}
            Col
            Col span={24}
                Button htmlType='button'type=dashed size='large' className='w-100' onClick={onAdd}+ Add other approvalsButton
            Col
        Row
        Row gutter={20} justify='end'
            Col
            Button type='primary' htmlType='submit' size='large' className='green-btn save-btn'Save ChangesButton
            Col
        Row
    Form
    )
}