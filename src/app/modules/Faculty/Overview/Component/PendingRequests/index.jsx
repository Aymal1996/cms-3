import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import PendingRequestCard from '../../../../../molecules/PendingRequestCard';
import HeadingChip from '../../../../../molecules/HeadingChip';

export default (props) => {
  const { staff_pending, staff_un, pending_list } = props;

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title={'Staff Issues'} />
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={staff_pending ? staff_pending.rows : []}
              title="Pending Issues"
              count={staff_pending?.count > 0 ? staff_pending?.count : 0}
              link="lecturers/requests/"
              label="Staff Issues"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>

          <Col flex="1 1 300px">
            <PendingRequestCard
              data={[]}
              title="Pending Requests"
              count={0}
              link="lecturers/requests/"
              label="Staff Requests"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>

          <Col flex="1 1 300px">
            <PendingRequestCard
              data={staff_un ? staff_un.rows : []}
              title="Unassigned Staff"
              count={staff_un?.count > 0 ? staff_un?.count : 0}
              link="lecturers/unassigned/"
              label="Unassigned Staff"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <HeadingChip title={'Student Issues'} />
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          <Col flex="1 1 300px">
            <PendingRequestCard
              data={pending_list?.issues ? pending_list?.issues : []}
              title="Pending Issues"
              count={pending_list?.issues_count > 0 ? pending_list?.issues_count : 0}
              link="lecturers/requests/"
              label="Staff Issues"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'student_id'}
              nameKey={'student_name'}
            />
          </Col>

          <Col flex="1 1 300px">
            <PendingRequestCard
              data={pending_list?.complaints ? pending_list?.complaints : []}
              title="Pending Requests"
              count={pending_list?.complaints_count > 0 ? pending_list?.complaints_count : 0}
              link="lecturers/requests/"
              label="Staff Requests"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'student_id'}
              nameKey={'student_name'}
            />
          </Col>

          <Col flex="1 1 300px">
            <PendingRequestCard
              data={pending_list?.requests ? pending_list?.requests : []}
              title="Unassigned Staff"
              count={pending_list?.requests_count > 0 ? pending_list?.requests_count : 0}
              link="lecturers/unassigned/"
              label="Unassigned Staff"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'student_id'}
              nameKey={'student_name'}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
