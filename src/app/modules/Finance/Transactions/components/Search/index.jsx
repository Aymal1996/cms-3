import React, { useEffect, useState } from 'react';
import {Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField } from 'Atoms/FormElement';
import { useForm } from 'react-hook-form';
import { DateField } from '../../../../../atoms/FormElement';
// import { getStudentIds, getStudentNames } from '../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const { Text } = Typography;

export default (props) => {

  // const dispatch = useDispatch();

    const { control, handleSubmit } = useForm();
    const [selectedCategory, setSelectedCategory] = useState('')
    // const [studentNames, setStudentNames] = useState([])
    // const [studentIds, setStudentIds] = useState([])
    // const studentNameList = useSelector((state) => state.finance.studentNames);
    // const studentIdList = useSelector((state) => state.finance.studentIds);

    // useEffect(() => {
    //     dispatch(getStudentNames());
    //     dispatch(getStudentIds());
    // }, []);

    // useEffect(() => {
    //     if (studentNameList && studentNameList.length > 0) {
    //       let temp = []
    //       studentNameList.map((x, i) => {
    //         if (i == 0) {
    //           temp.push({ label: 'All Student Names', value: '' });
    //           temp.push({ label: x.faculty_name, value: x.faculty_code });
    //         } else {
    //           temp.push({ label: x.faculty_name, value: x.faculty_code });
    //         }
    //       });
    //       setStudentNames(temp);
    //     }
    // }, [studentNameList]);


    // useEffect(() => {
    //     if (studentIdList && studentIdList.length > 0) {
    //       let temp = []
    //       studentIdList.map((x, i) => {
    //         if (i == 0) {
    //           temp.push({ label: 'All Student IDs', value: '' });
    //           temp.push({ label: x.faculty_name, value: x.faculty_code });
    //         } else {
    //           temp.push({ label: x.faculty_name, value: x.faculty_code });
    //         }
    //       });
    //       setStudentIds(temp);
    //     }
    // }, [studentIdList]);


    const category = [
      { label: 'Date Range', value: 'transaction_date' },
      { label: 'Ref No.', value: 'ref_no' },
      { label: 'Type', value: 'transaction_type' },
      { label: 'Transaction', value: 'transaction_category' },
      { label: 'Amount Range', value: 'amount' },
      { label: 'Name', value: 'student_name' },
      { label: 'ID', value: 'student_id' },
    ];

    const transaction = {
      transaction_type: [
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
      ],
      transaction_category: [
        { label: 'Student Outstanding', value: 'student_outstanding' },
        { label: 'Cash Transfer', value: 'cash_transfer' },
        { label: 'Grant Payment', value: 'grant_payment' },
        { label: 'Scholarship Payment', value: 'scholarship_payment' },
        { label: 'Refund', value: 'refund' },
      ],
    };
    const onSubmit = (val) => {
      let searchData = {};
      let { category, category_data } = val;
      delete val.category;
      
      searchData.category = category.value;
      if (category_data) {
        if (category_data.label) {
          let category_data_obj = { category_data: category_data.label };
          searchData = { ...searchData, ...category_data_obj };
        } else {
          searchData = { ...searchData, category_data };
        }
      } else {
        searchData = { ...searchData, ...val };
      }
      props.onSearch(searchData);
    };

    return (
      <Space size={10} direction="vertical" className="w-100">
        <Text className="c-gray">Category:</Text>
        <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
          <SelectField
            isRequired=""
            fieldname="category"
            control={control}
            selectOption={category}
            class="mb-0"
            iProps={{ placeholder: 'Please select' }}
            onChange={(e) => {
              setSelectedCategory(e.value);
            }}
          />

          {selectedCategory == 'transaction_date' && (
            <>
              <DateField
                fieldname="transaction_start_date"
                label=""
                class="mb-0 w-50"
                initValue={''}
                control={control}
                iProps={{ placeholder: 'Start Date', size: 'large' }}
                rules={{
                  setValueAs: (value) => (value ? moment(value).format('YYYY-MM-DD') : ''),
                }}
              />
              <DateField
                fieldname="transaction_end_date"
                label=""
                class="mb-0 w-50"
                initValue={''}
                control={control}
                iProps={{ placeholder: 'End Date', size: 'large' }}
                rules={{
                  setValueAs: (value) => (value ? moment(value).format('YYYY-MM-DD') : ''),
                }}
              />
            </>
          )}

          {selectedCategory == 'amount' && (
            <>
              <InputField
                fieldname="amount_start"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please state', size: 'large' }}
              />
              <InputField
                fieldname="amount_end"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please state', size: 'large' }}
              />
            </>
          )}

          {(selectedCategory == 'student_name' || selectedCategory == 'student_id' || selectedCategory == 'ref_no')&& (
            <InputField
              fieldname="category_data"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please state', size: 'large' }}
            />
          )}

          {(selectedCategory == 'transaction_type' ||
            selectedCategory == 'transaction_category' ||
            selectedCategory == '') && (
            <SelectField
              isRequired=""
              fieldname="category_data"
              control={control}
              selectOption={transaction[selectedCategory]}
              class="mb-0"
              iProps={{ placeholder: 'Please select' }}
            />
          )}

          <Button size="large" type="primary" htmlType="submit">
            Search
          </Button>
          <Button size="large" type="secondary" onClick={() => window.location.reload()} htmlType="button">
            Clear
          </Button>
        </Form>
      </Space>
    );
}   