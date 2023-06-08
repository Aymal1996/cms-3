import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeList, showWarningLetter } from './ducks/actions';
import {
  Teams,
  LeaveTypes,
  LeaveEntitlements,
  UserRoles,
  WorkingHours,
  JobPositions,
  EducationFields,
  Institutions,
  Nationalities,
  Holidays,
  Religions,
  Races,
  Projects,
  WarningLetter,
  LetterTemplate,
  Approvers,
  Assets,
  RequestForms,
  Departments,
  Skills,
  TerminatedEmployes
} from './Components';
import AddEditWarningLetter from './Components/WarningLetter/Components/AddEditWarningLetter';

export default (props) => {
  const [activeID, setActiveID] = useState(null);
  const [tabComp, setTabComp] = useState(null);
  const dispatch = useDispatch();
  const warningLetterData = useSelector((state) => state.setup.viewWarninLette);
  const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;

  dispatch(getEmployeeList(company));
  const data = [
    {
      tabTitle: 'User Roles',
      comp: <UserRoles />,
      permission: true,
    },
    {
      tabTitle: 'Departments',
      comp: <Departments />,
      permission: true,
    },
    {
      tabTitle: 'Teams',
      comp: <Teams />,
      permission: false,
    },
    {
      tabTitle: 'Skills',
      comp: <Skills />,
      permission: true,
    },
    {
      tabTitle: 'Leave Types',
      comp: <LeaveTypes />,
      permission: true,
    },
    {
      tabTitle: 'Leave Entitlements',
      comp: <LeaveEntitlements />,
      permission: true,
    },
    {
      tabTitle: 'Projects',
      comp: <Projects />,
      permission: true,
    },
    {
      tabTitle: 'Races',
      comp: <Races />,
      permission: true,
    },
    {
      tabTitle: 'Nationalities',
      comp: <Nationalities />,
      permission: true,
    },
    {
      tabTitle: 'Job Positions',
      comp: <JobPositions />,
      permission: true,
    },
    {
      tabTitle: 'Working Hours',
      comp: <WorkingHours />,
      permission: true,
    },
    {
      tabTitle: 'Holidays',
      comp: <Holidays />,
      permission: true,
    },
    {
      tabTitle: 'Education Fields',
      comp: <EducationFields />,
      permission: true,
    },
    {
      tabTitle: 'Institutions',
      comp: <Institutions />,
      permission: true,
    },
    {
      tabTitle: 'Religions',
      comp: <Religions />,
      permission: true,
    },
    
    {
      tabTitle: 'Warning Letter',
      comp: <WarningLetter />,
      permission: true,
    },
    {
      tabTitle: 'Letter Template',
      comp: <LetterTemplate />,
      permission: true,
    },
    {
      tabTitle: 'Approvers',
      comp: <Approvers />,
      permission: true,
    },
    {
      tabTitle: 'Assets',
      comp: <Assets />,
      permission: true,
    },
    {
      tabTitle: 'Request Forms',
      comp: <RequestForms setLoading={props.setLoading} />,
      permission: true,
    },
    {
      tabTitle: 'Notification Terminate',
      comp: <TerminatedEmployes />,
      permission: true,
    },
    
  ];

  const loadComp = (data, id) => {
    dispatch(showWarningLetter({ name: '', warning_letter_template: '', visible: false }));
    setTabComp(data?.comp);
    setActiveID(id);
  };

  return (
    <>
      <Row gutter={[20, 50]}>
        {!warningLetterData?.visible ? (
          <>
            <Col span={24}>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <HeadingChip title="Setup" />
                </Col>
                {data && (
                  <>
                    {data?.map((resp, i) => (
                      <Fragment key={i}>
                        <Col span={6}>
                          <Card
                            className={activeID === i ? 'uni-card-small-active' : 'uni-card-small'}
                            bordered={false}
                            onClick={() => loadComp(resp, i)}
                          >
                            {resp?.tabTitle}
                          </Card>
                        </Col>
                      </Fragment>
                    ))}
                  </>
                )}
              </Row>
            </Col>
            <Col span={24}>{tabComp}</Col>
          </>
        ) : (
          <Col span={24}>
            <AddEditWarningLetter letterData={warningLetterData} />
          </Col>
        )}
      </Row>
    </>
  );
};
