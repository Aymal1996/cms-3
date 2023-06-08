import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import CardwithSwitch from '../../atoms/CardwithSwitch';
import { PlusCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

export default (props) => {
  const history = useHistory();
  const { data, text, onChange, mode } = props;

  return (
    <div className='flexibleRow'>
      {data?.map((item) => (
        <div className='requestPanel'>
          <CardwithSwitch
            status={item.status}
            name={item.name}
            count={item.field_count}
            text={text}
            onChange={(e) => onChange(e, item.name)}
          />
        </div>
      ))}
      {mode == 'active' && (
        <div className='requestPanel'>
          <Button
            ghost
            type="dashed"
            className="cardouline-btn"
            onClick={() => history.push('forms/addnew')}
            icon={<PlusCircleFilled />}
          >
            Add Form
          </Button>
        </div>
      )}
    </div>
  );
  _;
};
