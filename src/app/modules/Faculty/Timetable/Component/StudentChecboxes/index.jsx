import React, { useState, useEffect } from 'react';
import { Card, Checkbox, Divider, Typography } from 'antd';

const { Title, Text } = Typography;
const CheckboxGroup = Checkbox.Group;

export default (props) => {

  const { title, checkedList, setCheckedList, options } = props;
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  useEffect(() => {
      if(options.length < 1) {
        setIndeterminate(false)
      }
  }, [options]);

  const onCheckAllChange = (e) => {
      if (e.target.checked) {
        setCheckedList(options)      
      } else {
        setCheckedList([])      
      }
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
        <Card bordered={false}  className='uni-card b-black'>
            <Title level={4} className='mb-0 c-default'>{title}</Title>
            <Checkbox className='fullWidth-checbox check-list w-100' indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>Select All</Checkbox>
            <Divider />
            <CheckboxGroup className='fullWidth-checbox check-list w-100' options={options} value={checkedList} onChange={onChange} />
        </Card>
  );
};
