import React, { useState } from 'react';
import { Select, Form, Badge } from 'antd';
import { apiMethod, apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';
import { SearchIcon } from 'Atoms/CustomIcons';

const { Option } = Select;

export default (props) => {

  const { title, api, endpoint, param } = props;
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
          let url = `${api == 'method' ? apiMethod : apiresource}/${endpoint}${value}${param ? param : ''}`;
          axios.get(url).then((d) => {
            if (currentValue === value) {
              const {
                data: { message },
              } = d;
              const data = [];
              message.forEach((r) => {
                data.push({
                  value: r[`${props.key1}`],
                  text: r[`${props.key2}`],
                  extra: r[`${props.key3}`],
                });
              });
              callback(data);
            }
          });
        }
    
        timeout = setTimeout(callingFunc, 300);
    }

    
  
    const handleSearch = val => {
      if (val) {
        getData(val, (data) => setData(data));
      } else {
        setData([]);
      }
    };
  
    const caseCol = (col) => {
      switch(col) {
          case 'Lecture' : return 'processing'
          case 'Quiz' : return 'success'
          case 'Assignment' : return 'warning'
          case 'Final Exam' : return 'error'
          case 'Midterm' : return 'error'
          case 'Exam' : return 'error'
          default: break;
      }
    }
  
    return (
      <div className='select-withicon'>
        <SearchIcon className='searchIcon' />
        <Form.Item name={`search`} label={''} className={'mb-0'}>
            <Select
              onSearch={(e) => handleSearch(e)}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              notFoundContent={null}
              placeholder={`Enter ${title}`}
              showSearch
              size='large'
            >
              {data.map((d) => (
                <Option key={[d.value, d.text, d.extra]}>{props.dot ? <Badge className='bgDot' status={caseCol(d.extra)} text={d.text} /> : <span>{d.text}</span>}</Option>
              ))}
            </Select>
        </Form.Item>    
      </div>
  );
}

