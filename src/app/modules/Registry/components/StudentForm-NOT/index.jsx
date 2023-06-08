import React, { useEffect } from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import * as TabCards from './tabList';
import {
  getCountry,
  getRace,
  getGender,
  getAppType,
  getEngQualification,
  getProgName,
  getMarital,
  getProgramSemesters,
} from '../../../Application/ducks/actions';
import { getModules } from '../../../AQA/Programme/ducks/actions';
import { useTranslate } from 'Translate';

const { TabPane } = Tabs;

export default (props) => {
  const dispatch = useDispatch();
  const i18n = useTranslate();
  const { t } = i18n;
  useEffect(() => {
    dispatch(getCountry());
    dispatch(getRace());
    dispatch(getMarital());
    dispatch(getGender());
    dispatch(getAppType());
    dispatch(getEngQualification());
    dispatch(getProgName());
    dispatch(getModules());
  }, []);

  useEffect(() => {
    if (props?.data?.students_programs && props?.data?.students_programs.length > 0) {
      dispatch(getProgramSemesters(props?.data?.students_programs.find(x => x?.program?.program_status == 'Active').program?.program));
    }
  }, [props.data]);

  const tabs = [
    {
      name: 'Personal',
      Comp: 'Personal',
      title: 'Personal Details',
    },
    {
      name: 'Qualifications',
      Comp: 'Qualifications',
      title: 'Academic Qualifications',
    },
    {
      name: 'Programme',
      Comp: 'Programme',
      title: 'Programme Details',
    },
    {
      name: 'Payment',
      Comp: 'Payment',
      title: 'Payment Details',
    },
    {
      name: 'Performance',
      Comp: 'Performance',
      title: 'Academic Performance',
    },
    {
      name: 'Timetable',
      Comp: 'Timetable',
      title: 'Timetable',
    },
    {
      name: 'Scholarship',
      Comp: 'Scholarship',
      title: 'Scholarship',
    },
    {
      name: 'Transcript',
      Comp: 'Transcript',
      title: 'Transcript',
    },
  ];

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs custom-tabs2 -space30">
            {tabs.map((item, index) => {
              const Cardi = TabCards[item.Comp];
              return (
                <TabPane tab={item.name} key={index + 1} forceRender={true}>
                  <Cardi title={item.title} data={props.data} updateParent={props.updateParent} t={t} />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};
