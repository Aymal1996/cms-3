import React, { useEffect, useState } from 'react';
import { Typography, Space, Tag, Button, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import AddIncent from './AddIncent';
import { Popup } from 'Atoms/Popup';

const { Title, Text } = Typography;

export default (props) => {
  const { incentives, amount, nationality, incent, setIncent, data, mode } = props;
  const [visible, setVisible] = useState(false);
  const company_currency =
    localStorage.getItem('userdetails') &&
    JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  // useEffect(() => {
  //   if ((mode == 'edit' && data.length < 1) || mode == 'add') {
  //     let temp = [];
  //     incentives.map((x) => {
  //       if (x.nationality == nationality) {
  //         temp.push(x);
  //       }
  //     });
  //     setIncent(temp);
  //   }
  // }, [incentives]);

  function calc() {
    return incent.reduce((n, { tution_fee_covered }) => n + parseInt(tution_fee_covered), 0);
  }

  const onAdd = (id) => {
    let record = incent.find((x) => x.name == id);
    if (!record) {
      let rec = incentives.find((x) => x.name == id);
      setIncent([rec]);
      setVisible(false);
    } else {
      message.error('Already Added');
    }
  };

  const onDelete = (id) => {
    let a = incent.filter((x) => x.name != id);
    setIncent(a);
  };

  const popup = {
    visibility: visible,
    width: 500,
    closable: true,
    content: <AddIncent data={incentives} onAdd={onAdd} />,
    onCancel: () => setVisible(false),
  };

  return (
    <>
      <Space direction="vertical" size={20} className="w-100">
        <Text className="c-gray smallFont12">Incentives</Text>
        <Space size={50}>
          <Space direction="vertical" size={0}>
            <Title level={3} className="mb-0 c-success">
              {incent.length > 0 ? calc() : 0}%
            </Title>
            <Text>Tution fee incentive applied</Text>
          </Space>
          <Space direction="vertical" size={0}>
            <Space size={10}>
              <Title level={3} className="mb-0 c-success">
                {company_currency} {amount - (amount * calc()) / 100}
              </Title>
              <Title level={4} className="c-gray mb-0">
                /{company_currency} {amount}
              </Title>
            </Space>
            <Text>Total tution fee after discount</Text>
          </Space>
        </Space>
        <Space size={20}>
          {incent.map((item, index) => (
            <Tag
              closable={mode != 'view'}
              className="incentive-card-tag"
              key={item.name}
              onClose={() => onDelete(item.name)}
            >
              <Space direction="vertical" size={15} className="w-100" align="center">
                <Text className="c-white tag-title">{item.incentive_name}</Text>
                <Space direction="vertical" size={0} className="w-100" align="center">
                  <Title level={4} className="mb-0 c-success">
                    {item.tution_fee_covered}%
                  </Title>
                  <Text className="c-gray">Discount</Text>
                </Space>
              </Space>
            </Tag>
          ))}
          {incent.length < 1 && mode != 'view' && (
            <Button
              htmlType="button"
              type="dashed"
              size="large"
              className="addincentive-btn"
              icon={<PlusCircleFilled className="fontSize30" />}
              onClick={() => setVisible(true)}
            ></Button>
          )}
        </Space>
      </Space>
      <Popup {...popup} />
    </>
  );
};
