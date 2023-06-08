import React, {useEffect} from 'react';
import { Row, Col } from 'antd';
import { useTranslate } from 'Translate';
import TaskCard from '../../../../../../../atoms/HRMS/TaskCard';
import {getOverallTasks} from '../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const il8n = useTranslate();
  const { t } = il8n;
  const dispatch = useDispatch();
  const overallData = useSelector(state => state.tasks.overallTaskData);

  useEffect(() => {
    dispatch(getOverallTasks());
  }, []);
  return (
    <>
      {overallData && (
            <>
            {overallData?.map((resp, key) => (
                <Col span={8} key={key}>
                  <TaskCard data={resp} link={`/tasks/${resp?.employee_id}`} />
                </Col>
            ))}
            </>
        )}
    </>
  );
};