import React, { useState, useEffect } from 'react';
import { Row, Col, Menu, Card, Button, Divider } from 'antd';
import {
  DashboardIcon2,
  FacultyIcon,
  ProgrammeIcon,
  FormsIcon,
  LetterIcon,
  CalendarIcon,
  ScholarshipIcon,
  OverviewIcon,
  ApplicationsIcon,
  StudentsIcon,
  RequestIcon,
  ModuleIcon,
  UserIcon,
  ClockIcon,
  ReportsIcon,
  SetupIcon,
  MaterialsIcon,
  PublicationsIcon,
  GrantsIcon,
  ClassroomIcon,
  TransactionIcon,
  PolicyIcon,
  AdvancementIcon,
  TaskIcon,
  StaffIcon,
  IncentiveIcon,
} from 'Atoms/CustomIcons';
import { Link, useLocation } from 'react-router-dom';
import RoutingList from '../../../routing/config/RoutingList';
import { allowedRoutes } from '../../../routing/config/utils';
import { getRequestListingPending } from '../../modules/AQA/Requests/ducks/actions';
import { studentsStatus } from '../../modules/Registry/Students/ducks/actions';
import { RightOutlined } from '@ant-design/icons';

const IconList = {
  DashboardIcon2,
  ApplicationsIcon,
  FacultyIcon,
  ProgrammeIcon,
  RequestIcon,
  FormsIcon,
  LetterIcon,
  CalendarIcon,
  ReportsIcon,
  ScholarshipIcon,
  IncentiveIcon,
  OverviewIcon,
  UserIcon,
  ModuleIcon,
  StudentsIcon,
  ClockIcon,
  SetupIcon,
  MaterialsIcon,
  PublicationsIcon,
  GrantsIcon,
  ClassroomIcon,
  TransactionIcon,
  PolicyIcon,
  AdvancementIcon,
  TaskIcon,
  StaffIcon,
};

export default (props) => {
  const [menuList, setMenuList] = useState([]);
  const location = useLocation().pathname;
  const selected = location.split('/').length > 2 ? `/${location.split('/')[1]}/${location.split('/')[2]}` : location;

  useEffect(() => {
    ModifyJson(allowedRoutes(RoutingList));
  }, []);

  const ModifyJson = (data) => {
    var result = data.reduce(function (r, a) {
      if (a.parent) {
        r[a['menu']] = r[a['menu']] || [];
        if (a.submenu) {
          r[a['menu']].push(a);
        } else {
          r[a['menu']] = a;
        }
      }
      return r;
    }, Object.create(null));

    setMenuList(result);
  };

  return (
    <Card bordered={false} className="navBar navBarResponse">
      <Row gutter={[20, 15]}>
        <Col span={24}>
          <Button icon={<RightOutlined />} size="middle" className="c-graybtn small-btn" onClick={props.setShowFeed} />
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
        <Col span={24}>
          <Card bordered={false} className="transparent-card" style={{ height: 'calc(100vh - 220px)' }}>
            <Menu mode="inline" theme="dark" defaultSelectedKeys={[selected]} className="main-menu">
              {Object.entries(menuList).map(([key, val], index) => (
                <>
                  {Array.isArray(val) ? (
                    <>
                      <Divider />
                      {val.map((item, i) => {
                        const IconComp = IconList[item?.icon];
                        console.log('item?.icon', item?.icon);
                        return (
                          <Menu.Item key={item?.path} className="menu-item" icon={<IconComp />}>
                            <Link to={item?.path}>{item?.submenu}</Link>
                          </Menu.Item>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <Menu.Item key={val.path} className="menu-item" icon={<DashboardIcon2 />}>
                        <Link to={val.path}>{val.menu}</Link>
                      </Menu.Item>
                    </>
                  )}
                </>
              ))}
            </Menu>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
