import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import CategoryCard from '../../../../../atoms/CategoryCard';
import Roles from '../../../../../../routing/config/Roles';
import {allowed} from '../../../../../../routing/config/utils';
import { TaskIcon, AdvancementIcon, CalendarIcon, FacultyIcon, ClockIcon, StaffIcon } from '../../../../../atoms/CustomIcons';
import { getEmployeeStatus } from '../../ducks/actions';
import { useSelector, useDispatch } from 'react-redux';

const { Title } = Typography;

export default (props) => {

    const { id } = props;
    const dispatch = useDispatch();
    const categoryData = useSelector(state => state.hrmsrequests.eStatus);
    const cardData = [
      {
        title: 'Tasks',
        icon: <TaskIcon />,
        text: '',
        status: '',
        link: `/hrms/tasks/${id}`
      },
      {
        title: 'Advancement',
        icon: <AdvancementIcon />,
        text: '',
        status: '',
        link: `/hrms/advancement/${id}`
      },
      {
        title: 'Employment',
        icon: <StaffIcon />,
        text: '',
        status: 'c-pending',
        link: `/hrms/employment/${id}`
      },
      {
        title: 'Finance',
        icon: <FacultyIcon />,
        text: '',
        status: '',
        link: `/hrms/finance/${id}`
      },
      {
        title: 'Leaves',
        icon: <CalendarIcon />,
        text: '',
        status: 'c-error',
        link: `/hrms/leaves/${id}`
      },
      {
        title: 'Attendance',
        icon: <ClockIcon />,
        text: '',
        status: '',
        link: `/hrms/attendance/${id}`
      },
    ]

    const [data, setData] = useState(cardData);

    useEffect(() => {
      dispatch(getEmployeeStatus(id));
    }, []);

    useEffect(() => {
      if(categoryData && categoryData.length) {
        let temp = cardData;
        categoryData.map(x => {
          console.log('just check', Object.keys(x)[0]);
          if (Object.keys(x) == 'task_count') {
            if (x.task_count > 0) {
              temp[0].text = `${x.task_count} Issue(s)`;
              temp[0].status = 'c-error'
            }
          } else if (Object.keys(x) == 'leaves_count') {
            if (x.leaves_count > 0) {
              temp[4].text = `${x.leaves_count} Pending Leave Application`;
              temp[4].status = 'c-error'
            }
          } else if (Object.keys(x) == 'attendance_count') {
            if (x.attendance_count > 0) {
              temp[5].text = `${x.attendance_count} Pending Attendance`;
              temp[5].status = 'c-pending'
            }
          } else if (Object.keys(x) == 'advancement_count') {
            if (x.advancement_count) {
              temp[1].text = `${x.advancement_count}`;
              temp[1].status = x.advancement_count.includes('Low') ? 'c-error' : 'c-success'
            }
          } else if (Object.keys(x) == 'employment_count') {
            if (x.employment_count > 0) {
              temp[2].text = `${x.employment_count} Issue(s)`;
              temp[2].status = 'c-error';
            }
          } else if (Object.keys(x) == 'finance_count') {
            if (x.finance_count > 0) {
              temp[3].text = `${x.finance_count} Issue(s)`;
              temp[3].status = 'c-error'
            }
          }
        })
        console.log('ehkk', temp)
        setData(temp)
      }
    }, [categoryData]);
    

    return (
        <Card bordered={false} className="uni-card h-auto w-100">
            <Row gutter={[20, 30]}>
              <Col span={24}><Title level={4} className='mb-0'>Select Category</Title></Col>
              <Col span={24}>
                <Row gutter={[20,20]}>
                  {data?.map((x, i) => {
                    if (x.title != 'Finance' && x.title != 'Employment') {
                      return <Col flex='1 0 250px' key={i}>
                        <CategoryCard data={x} />
                      </Col>
                    } else {
                      if (allowed([Roles.EMPLOYMENT])) {
                        return <Col flex='1 0 250px' key={i}>
                          <CategoryCard data={x} />
                        </Col>
                      }
                    }
                  })}
                </Row>
              </Col>
            </Row>
        </Card>
    )
}