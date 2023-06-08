import React, { useEffect, useState, Fragment } from 'react';
import { Card, Row, Col, Calendar, Badge, Typography, Divider, Button, ConfigProvider, Space } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCalenderData } from 'Modules/Application/ducks/actions';
import { Popup } from 'Atoms/Popup';
import moment from 'moment';

const { Title, Text } = Typography;

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
      dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
      currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

function caseCol(val) {
  switch (val) {
    case 'Annual Leave': return 'success';
    case 'Medical Leave': return 'error';
    case 'Holiday': return 'warning';
    case 'Unpaid Leave': return 'purple';
  }
}

function getDateData(data, cDate) {
  let sDate = null;
  let eDate = null;
  let array = [];
  if (data && data.length) {
    data?.map(resp => {
      sDate = moment(resp?.start_date).format('YYYY-MM-DD');
      eDate = moment(resp?.end_date).format('YYYY-MM-DD');
      getDates(sDate, eDate).map(x=> {
        if(x == cDate) {
          array.push({
            type: resp?.leave_type,
            content: resp?.leave_type ==  'Holiday' ? resp?.holiday : resp?.employee_name,
          })
        }
      })
    })
  }
  return array;
}

const PopupComp = ({data}) => {
  let temp = [];
  data?.forEach(x => {
    if (temp[x.type]) {
      temp[x.type] += `${', ' + x?.content}`;
    } else {
      temp[x.type] = x?.content;
    }
  })
  return (
    <Row gutter={[20,20]} justify='start'>
      <Col span={24} className='text-left'>
      {Object.entries(temp).map(([key,val], index) => (
        <Fragment key={index}>
          <Space direction='vertical' size={5}>
            <Badge status={caseCol(key)} text={key}/>
            <Text>{val}</Text>
          </Space>
          <Divider />
        </Fragment>
        ))}
      </Col>
    </Row>
  )
}

export default (props) => {
  const dispatch = useDispatch();
  const { dashboard } = props;
  const [visible, setVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const calenderData = useSelector(state => state.global.calenderData);
  let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  let endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');

  useEffect(() => {
    dispatch(getCalenderData(startOfMonth,endOfMonth));
  }, []);

  const popup = {
    closable: true,
    visibility: visible,
    // class: 'black-modal',
    content: <PopupComp data={popupData} />,
    width: 536,
    onCancel: () => {setVisible(false); setPopupData(null)},
  };

  const onCellSelect = (val) => {
    let cDate = moment(val).format('YYYY-MM-DD');
    let data = getDateData(calenderData, cDate);
    if (data.length > 0) {
      setPopupData(data);
      setVisible(true);
    }
  }

  const dateCellRender = (value) => {
    let cDate = moment(value).format('YYYY-MM-DD');
    let array = getDateData(calenderData, cDate);

    const unique = [...new Map(array.map(item => [item.type, item])).values()];
    return (
      <Space size={3} className='justify-cetner' wrap>
        {unique.map(item => (
          <Badge status={caseCol(item.type)} />
        ))}
      </Space>
    );
  }

  const onPanelChange = (value) => {
    startOfMonth = moment(value).startOf('month').format('YYYY-MM-DD');
    endOfMonth   = moment(value).endOf('month').format('YYYY-MM-DD');
    dispatch(getCalenderData(startOfMonth,endOfMonth))
  }

  const customHeader = ({value, type, onChange, onTypeChange}) => {
    const nextMonth = () => {      
      let newValue = value.clone();
      let currentmonth = value.month();
      let currentyear = value.year();
      
      if (currentmonth > 11) {
        currentmonth = 0;
        currentyear + 1;
      } else {
        currentmonth = currentmonth + 1
      }
      newValue.month(parseInt(currentmonth, 10));
      onChange(newValue);
    }

    const prevMonth = () => {
      let newValue = value.clone();
      let currentmonth = value.month();
      let currentyear = value.year();
      if (currentmonth < 0) {
        currentmonth = 11;
        currentyear - 1;
      } else {
        currentmonth = currentmonth - 1
      }
      newValue.month(parseInt(currentmonth, 10));
      onChange(newValue);
    }

    const updateValue = (value) => {
      return moment(value).format('MMMM YYYY')
    }

    return (
      <Card bordered={false} className='mini-card mini-card10 b-dark-gray'>
        <Row gutter={20} justify='space-between'>
          <Col><Button onClick={prevMonth} type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<LeftOutlined />} /></Col>
          <Col><Title level={5} className='c-default mb-0'>{updateValue(value)}</Title></Col>
          <Col><Button onClick={nextMonth} type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<RightOutlined />} /></Col>
        </Row>
      </Card>
    );
  }

  

    return (
      <>
      <Row gutter={[20,30]}>
        {!dashboard && <Col span={24}><Title level={3} className='mb-0'>Calendar</Title></Col>}
        <Col span={24}>
          <Card bordered={false} className={`uni-card dashboard-card ${dashboard ? 'main-card-hover' : ''}`}>
              <Row gutter={20}>
                  {dashboard && <Col span={24}>
                      <Title level={4} className='mb-10PX c-default'>Calendar</Title>
                  </Col>}
                  <Col span={24}>
                      <ConfigProvider locale={en_GB}>
                          <Calendar 
                            className='custom-calendar' 
                            dateCellRender={dateCellRender} 
                            disabledDate = {
                                current => {
                                return  moment(current).day() === 0
                              }
                            }
                            onSelect={onCellSelect}
                            onPanelChange={onPanelChange}
                            headerRender={customHeader}
                          />
                      </ConfigProvider>
                  </Col>
                  <Col span={24}>
                      <Divider className='mt-0 mb-10PX' />
                      <Row gutter={20} justify='center'>
                          <Col>
                              <Badge className='bottom-badge' status="success" text='Annual' />
                          </Col>
                          <Col>
                              <Badge className='bottom-badge' status="error" text='Medical' />
                          </Col>
                          <Col>
                              <Badge className='bottom-badge' color="purple" text='Unpaid' />
                          </Col>
                          <Col>
                              <Badge className='bottom-badge' status="warning" text='Holiday' />
                          </Col>
                      </Row>
                  </Col>
              </Row>
          </Card>
        </Col>
      </Row>
      <Popup {...popup} />
      </>
    )
}


