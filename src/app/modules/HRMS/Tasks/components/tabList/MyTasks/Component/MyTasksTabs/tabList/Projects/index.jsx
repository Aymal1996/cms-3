import React, {useEffect} from 'react';
import { Row, Col, Card } from 'antd';
import { useTranslate } from 'Translate';
import {getMyTasks} from '../../../../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';


const data = [
  {
    project: 'Content Management System 2',
  },
  {
    project: 'Human Resource System 2',
  },
  {
    project: 'Limkokwing V9',
  },
  {
    project: 'Student Portal',
  },
];

export default (props) => {
  const il8n = useTranslate();
  const { t } = il8n;
  const dispatch = useDispatch();
  const myTaskData = useSelector(state => state.tasks.myTaskData);
  useEffect(() => {
    dispatch(getMyTasks('HR-EMP-00002'));
  }, []);

  return (
    <Row gutter={[20, 30]} align='bottom'>
      {myTaskData && (
        <>
          {myTaskData?.projects?.map((resp, key) => (
            <Col span={24} key={key}>
              <Card bordered={false} className="project-card">{resp.project}</Card>
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};