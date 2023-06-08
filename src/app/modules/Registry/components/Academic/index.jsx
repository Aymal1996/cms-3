import React, { useEffect } from 'react';
import { Row, Col, Card, Tabs, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as TabCards from './tabList';
import { getAppType, getEngQualification, getProgName, getProgramSemesters } from '../../../Application/ducks/actions';
import { getModules } from '../../../AQA/Programme/ducks/actions';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import StudentTemp from '../../Students/StudentTemp';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.students.studentAppData);
  const selectProg = useSelector((state) => state.students.selected);

  useEffect(() => {
    dispatch(getAppType());
    dispatch(getEngQualification());
    dispatch(getProgName());
    dispatch(getModules());
  }, []);

  useEffect(() => {
    if (data?.students_programs && data?.students_programs.length > 0) {
      if (selectProg) {
        dispatch(
          getProgramSemesters(data?.students_programs.find((x) => x.program.program == selectProg).program.program),
        );
      } else {
        dispatch(
          getProgramSemesters(
            data?.students_programs.find((x) => x.program.program_status == 'Active').program.program,
          ),
        );
      }
    }
  }, [data]);

  const tabs = [
    {
      name: 'Programme',
      Comp: 'Programme',
    },
    {
      name: 'Qualifications',
      Comp: 'Qualifications',
    },
    {
      name: 'Timetable',
      Comp: 'Timetable',
    },
    {
      name: 'Performance',
      Comp: 'Performance',
    },
  ];

  return (
    <StudentTemp id={id} request={false} setLoading={props.setLoading}>
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Row gutter={20}>
            <Col flex="auto">
              <Title level={4} className="mb-0">
                Academic Information
              </Title>
            </Col>
            <Col>
              <Button
                icon={<LeftOutlined />}
                size="middle"
                className="c-graybtn small-btn"
                onClick={() => history.goBack()}
              >
                Categories
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs custom-tabs2 -space30">
            {tabs.map((item, index) => {
              const Cardi = TabCards[item.Comp];
              return (
                <TabPane tab={item.name} key={index + 1}>
                  <Cardi data={data} updateParent={props.updateParent} />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </StudentTemp>
  );
};
