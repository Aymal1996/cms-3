import React, { useState } from 'react';
import { Card, Space, Typography, List, Empty } from 'antd';
import FigureChips from 'Atoms/FigureChips';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../configs/constants';
import { Popup } from 'Atoms/Popup';
import FacultyClassPopup from '../FacultyClassPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getFacultyClassList } from '../../modules/Marketing/ducks/actions';

const { Title, Text } = Typography;

export default (props) => {
  const {
    data,
    title,
    count,
    link,
    label,
    status,
    innerlink,
    level,
    spacing,
    reverse,
    idKey,
    nameKey,
    titleClass,
    titleIcon,
    listClass,
    linkAdd,
  } = props;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const facultyClassWeekly = useSelector((state) => state.marketing.facultyClassWeekly);
  console.log('facultyClassWeekly', facultyClassWeekly);
  const countStatus = {
    value: count,
    title: <span style={{ textTransform: 'capitalize' }}>{label}</span>,
    status: status,
  };

  const updateApi = (e) => {
    dispatch(getFacultyClassList(e?.date, e?.parent, e?.module_code));
    // dispatch(getFacultyClassList('2023-03-08', 'TT-250106', 'LUCT-BDD 3923 - 1'));
  };

  const popup = {
    closable: false,
    visibility: visible,
    content: (
      <FacultyClassPopup
        title="Classes"
        onClose={() => setVisible(false)}
        data={facultyClassWeekly}
        updateApi={updateApi}
      />
    ),
    width: 800,
    onCancel: () => setVisible(false),
    class: 'faculty_pop_table',
  };

  const openPopup = (item) => {
    dispatch(getFacultyClassList(item?.date, item?.name, item?.module_code));
    // dispatch(getFacultyClassList('2023-03-08', 'TT-250106', 'LUCT-BDD 3923 - 1'));
    setVisible(true);
  };

  return (
    <>
      <Card bordered={false} className={`uni-card dashboard-card main-card-hover ${status ? '' : 'no-listspace'}`}>
        <Space size={spacing ? spacing : 20} direction="vertical" className="w-100">
          {title && (
            <Title level={level ? level : 5} className="c-default mb-0" style={{ textTransform: 'capitalize' }}>
              {title}
            </Title>
          )}
          {label && (
            <FigureChips
              data={countStatus}
              link={data && data?.length > 0 && `${linkAdd ? `${linkAdd}${link}` : link}`}
            />
          )}
          {data && data?.length > 0 ? (
            <List
              itemLayout="horizontal"
              className={`icon-list ${listClass} ${!label ? 'withoutFigure' : ''}`}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item[idKey]}
                  className="w-100"
                  onClick={() => openPopup(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <Space size={17} className="w-100">
                    <Space size={0} direction="vertical">
                      <Text className={reverse ? 'titlename' : 'c-gray'}>{item[nameKey]}</Text>
                      <Text className={`${reverse ? 'c-gray' : 'titlename'} ${titleClass}`}>{item[idKey]}</Text>
                    </Space>
                  </Space>
                </List.Item>
              )}
            />
          ) : (
            <div style={{ marginTop: '40px' }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </Space>
      </Card>
      <Popup {...popup} />
    </>
  );
};
