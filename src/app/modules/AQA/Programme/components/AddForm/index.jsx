import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import { InputField } from 'Atoms/FormElement';
import { getInstitution, getFaculty, getFacultyList } from '../../../Faculty/ducks/actions';
import { useDispatch } from 'react-redux';
import * as TabCards from './tabList';

import { getCourseGroupType } from '../../../AcademicCalendar/ducks/actions';
import { getAllFaculty } from '../../../../Application/ducks/actions';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const { control, errors, heading, mode, t, stat, onDraft } = props;

  const tabs = [
    {
      name: t('AQA.Program.Tab1'),
      Comp: 'License',
    },
    {
      name: t('AQA.Program.Tab2'),
      Comp: 'Summary',
    },
    {
      name: t('AQA.Program.Tab3'),
      Comp: 'Accreditation',
    },
    {
      name: t('AQA.Program.Tab4'),
      Comp: 'Requirements',
    },
    {
      name: t('AQA.Program.Tab5'),
      Comp: 'Semester',
    },
  ];

  useEffect(() => {
    dispatch(getInstitution());
    dispatch(getAllFaculty());
    dispatch(getCourseGroupType());
  }, []);

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Title level={4}>{heading}</Title>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs -space30">
            {tabs.map((item, index) => {
              const Cardi = TabCards[item.Comp];
              return (
                <TabPane tab={item.name} key={index + 1} forceRender={true}>
                  <Cardi {...props} />
                </TabPane>
              );
            })}
          </Tabs>
          {mode == 'edit' && (
            <Row gutter={24} justify="end">
              <Col>
                <Button size="large" type="primary" htmlType={stat == 'Active' ? "submit" : "button"} className="green-btn save-btn" onClick={() => stat == 'Draft' ? onDraft() : null}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Card>
  );
};
