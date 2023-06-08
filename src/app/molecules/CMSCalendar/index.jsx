import React, { useEffect, useState, Fragment } from 'react';
import { Card, Row, Col, Calendar, Badge, Typography, Divider, Button, ConfigProvider, Space } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Popup } from 'Atoms/Popup';
import { caseCol } from '../../modules/Faculty/utills/CalendarCases';
import CalendarPopData from '../../modules/Faculty/Classroom/components/CalendarPopData';

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
          array.push(resp)
        }
      })
    })
  }
  return array;
}

// const PopupComp = ({data}) => {
//   let temp = [];
//   data?.forEach(x => {
//     if (temp[x.type]) {
//       temp[x.type] += `${', ' + x?.content}`;
//     } else {
//       temp[x.type] = x?.content;
//     }
//   })
//   return (
//     <Row gutter={[20,20]} justify='start'>
//       <Col span={24} className='text-left'>
//       {Object.entries(temp).map(([key,val], index) => (
//         <Fragment key={index}>
//           <Space direction='vertical' size={5}>
//             <Badge status={'processing'} text={key.toUpperCase()}/>
//             <Text>{val}</Text>
//           </Space>
//           <Divider />
//         </Fragment>
//         ))}
//       </Col>
//     </Row>
//   )
// }

export default (props) => {

  const { updateCal, badges, calenderData, comp, pWidth, extra } = props;
  const [visible, setVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [cDate, setCDate] = useState(null);
  let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  let endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');

  useEffect(() => {
    updateCal(startOfMonth,endOfMonth);
  }, []);

  const popup = {
    closable: true,
    visibility: visible,
    content: <CalendarPopData Comp={comp} cDate={cDate} data={popupData} extra={extra} />,
    width: pWidth,
    onCancel: () => {setVisible(false); setPopupData(null)},
  };

  const onCellSelect = (val) => {
    let cDate = moment(val).format('YYYY-MM-DD');
    let data = getDateData(calenderData, cDate);
    if (data.length > 0) {
      setPopupData(data);
      setCDate(cDate);
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
          <Badge color={caseCol(item.type)} />
        ))}
      </Space>
    );
  }

  const onPanelChange = (value) => {
    startOfMonth = moment(value).startOf('month').format('YYYY-MM-DD');
    endOfMonth   = moment(value).endOf('month').format('YYYY-MM-DD');
    updateCal(startOfMonth,endOfMonth)
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
      <Card bordered={false} className='mini-card mini-card10 b-dark-gray mb-2'>
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
        <Row gutter={20}>
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
            {badges && 
            <Col span={24}>
                <Divider className='mt-0' />
                <Row gutter={20} justify='center'>
                  {badges.map((x, i) => (
                    <Col key={i}>
                        <Badge className='bottom-badge' color={x?.color} text={x.title} />
                    </Col>
                  ))}
                </Row>
            </Col>
            }
        </Row>
      <Popup {...popup} />
      </>
    )
}


