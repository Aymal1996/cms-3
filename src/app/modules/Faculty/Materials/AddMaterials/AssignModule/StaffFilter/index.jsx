import React, { useState } from 'react';
import { Select, Form } from 'antd';
import { SearchIcon } from '../../../../../../atoms/CustomIcons';
import { apiMethod, apiresource } from '../../../../../../../configs/constants';
import axios from '../../../../../../../services/axiosInterceptor';
import { Controller } from 'react-hook-form';

const { Option } = Select;

export default (props) => {
  const { control, title } = props;
  const [data, setData] = useState([]);

  let timeout;
  let currentValue;

  function getData(value, callback) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    function callingFunc() {
      let url = `${apiMethod}/faculty.materials.get_modules?str=${value}`;
      axios.get(url).then((d) => {
        if (currentValue === value) {
          const {
            data: { message },
          } = d;
          const data = [];
          message.forEach((r) => {
            data.push({
              value: r.module_name,
              code: r.name,
              mod: r.module_code,
            });
          });
          callback(data);
        }
      });
    }

    timeout = setTimeout(callingFunc, 300);
  }

  const handleSearch = (val) => {
    if (val) {
      getData(val, (data) => setData(data));
    } else {
      setData([]);
    }
  };

  return (
    <Form.Item label={'Search Module'} className={'mb-0'}>
      <Controller
        name={`search`}
        control={control}
        defaultValue={''}
        render={({ value, onChange, onSearch }) => (
          <Select
            value={value}
            onChange={(e) => {
              onChange(e);
              props.onChange && props.onChange(e);
            }}
            onSearch={(e) => handleSearch(e)}
            placeholder={`Type ${title}`}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
            showSearch
            size="large"
          >
            {data.map((d) => (
              <Option key={[d.value, d.code, d.mod]}>
                <span>{d.value}</span>
              </Option>
            ))}
          </Select>
        )}
      />
    </Form.Item>
  );
};
