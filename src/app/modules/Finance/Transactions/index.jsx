import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, List, Avatar, Space } from 'antd';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import CashTransaction from './components/CashTransaction';
import OnlineTransaction from './components/OnlineTransaction';
import { useSelector, useDispatch } from 'react-redux';
import AddTransaction from './components/AddTransaction';
import { Line } from '@ant-design/charts';
import { getAllBalances, getCountryRank } from './ducks/actions';
import { useLocation } from 'react-router-dom';
import { formatCurrency } from '../../../../features/utility';

const { Title } = Typography;

const COLOR_PLATE = ['#02A574', '#7C7C7C'];

export default (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState({ data: null, visible: false, type: '' });
  const [cData, setCData] = useState([]);
  const countryData = useSelector((state) => state.transaction.countryRank);
  const allBalance = useSelector((state) => state.transaction.allBalances);
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  useEffect(() => {
    dispatch(getCountryRank());
    dispatch(getAllBalances());
    if (location.state) {
      setData({
        data: null,
        visible: true,
        type: 'Online',
      });
    }
  }, []);

  useEffect(() => {
    if (allBalance && allBalance.year) {
      let temp = [];
      allBalance.year.map((x) => {
        let val = x.value;
        if (x.value === 0) {
          val = null;
        }
        temp.push({
          category: x.category,
          month: x.month,
          value: val,
        });
      });
      setCData(temp);
    }
  }, [allBalance]);

  const tabs = [
    {
      visible: true,
      title: 'Online Transaction',
      key: 'Online',
      Comp: OnlineTransaction,
      iProps: {
        setData: setData,
      },
    },
    {
      visible: true,
      title: 'Cash Transaction',
      key: 'Cash',
      Comp: CashTransaction,
      iProps: {
        setData: setData,
      },
    },
  ];

  const config = {
    data: cData,
    xField: 'month',
    yField: 'value',
    seriesField: 'category',
    legend: false,
    yAxis: {
      alignTick: false,

      grid: {
        line: {
          style: {
            stroke: '#7c7c7c',
            lineWidth: 1,
            strokeOpacity: 0.5,
          },
        },
      },
      label: {
        formatter: (v) => v + '.0m',
      },
    },

    xAxis: {
      tickLine: {
        style: {
          strokeOpacity: 0,
        },
      },
      line: {
        style: {
          strokeOpacity: 0,
        },
      },
      position: 'top',
    },
    color: COLOR_PLATE,
    point: {
      size: 5,
      shape: 'circle',
      style: ({ category }) => {
        return category === 'Gross'
          ? { fill: '#171717', lineWidth: 3, stroke: '#7C7C7C' }
          : { fill: '#171717', lineWidth: 3, stroke: '#02A574' };
      },
    },
    lineStyle: {
      lineWidth: 2,
    },
    tooltip: {
      showMarkers: false,
    },
  };

  return (
    <Row gutter={[20, 30]}>
      {!data.visible ? (
        <>
          <Col span={24}>
            <Card bordered={false} className="uni-card">
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <Space direction="vertical" className="w-100" size={20}>
                    <Title level={4} className="mb-0 c-default">
                      Account Balance
                    </Title>
                  </Space>
                </Col>
                {allBalance &&
                  allBalance.net_total &&
                  allBalance.net_total.map((x, i) => (
                    <Col span={12} key={i}>
                      <Card bordered={false} className="small-card8 b-black">
                        <Row gutter={[20, 30]}>
                          {x.map((y, j) => (
                            <Col span={y.total ? 24 : 12} key={j}>
                              <Space direction="vertical" size={10} className="w-100">
                                <Title level={5} className="mb-0 c-default">
                                  {y.title}
                                </Title>
                                <Title level={y.total ? 3 : 4} className={`mb-0 ${y.color}`}>
                                  {company_currency} {y.amount && formatCurrency(y.amount.toString())}{' '}
                                  <span className={`${y.total ? 'fontSize18Medium' : ''}`}>({y.percent})</span>
                                </Title>
                              </Space>
                            </Col>
                          ))}
                        </Row>
                      </Card>
                    </Col>
                  ))}

                <Col span={24}>
                  <Line {...config} />
                </Col>
                <Col span={24}>
                  <Space direction="vertical" className="w-100" size={20}>
                    <Title level={4} className="mb-0 c-default">
                      Outstanding & Pending Payments
                    </Title>
                    <Row gutter={[20, 20]}>
                      {allBalance &&
                        allBalance?.paymentCards &&
                        allBalance?.paymentCards.map((x) => (
                          <Col span={6}>
                            <Card bordered={false} className="small-card8 b-black">
                              <Space direction="vertical" size={10} className="w-100">
                                <Title level={5} className="mb-0 c-white">
                                  {x.title}
                                  <span className="d-block">{x.title2}</span>
                                </Title>
                                <Title level={4} className={`mb-0 ${x.color}`}>
                                  {company_currency} {x.amount && formatCurrency(x.amount.toString())}
                                </Title>
                              </Space>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Title level={3} className="mb-0 c-white">
                  Payment Ranking
                </Title>
              </Col>
              <Col span={12}>
                <Card bordered={false} className="uni-card">
                  <Space direction="vertical" size={20} className="w-100">
                    <Title className="mb-0 c-success" level={4}>
                      Top Ranking Countries
                    </Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={countryData?.high ? countryData?.high.slice(0, 5) : []}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size={26} src={item.flag} />}
                            title={`${index + 1}. ${item.title}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} className="uni-card">
                  <Space direction="vertical" size={20} className="w-100">
                    <Title className="mb-0 c-error" level={4}>
                      Low Ranking Countries
                    </Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={countryData?.low ? countryData?.low.slice(0, 5) : []}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size={26} src={item.flag} />}
                            title={`${index + 1}. ${item.title}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Space>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <CardListSwitchLayout tabs={tabs} active={'Online'} />
          </Col>
        </>
      ) : (
        <Col span={24}>
          <AddTransaction data={data} setData={setData} />
        </Col>
      )}
    </Row>
  );
};
