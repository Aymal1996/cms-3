import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Menu, Typography, Card, Badge, message } from 'antd';
import loginLogo from '../../../assets/img/limkokwing-logo.svg';
import moment from 'moment';
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
import { allowedCheck, allowedRoutes } from '../../../routing/config/utils';
import { getRequestPending } from '../../modules/AQA/Requests/ducks/actions';
import { studentsStatus } from '../../modules/Registry/Students/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../configs/constants';
import { fire, database } from '../../../features/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const { SubMenu } = Menu;
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
  const collectionRef = collection(database, 'activity');
  const [menuList, setMenuList] = useState([]);
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const subkey = location.split('/')[1];
  // const dataPending = useSelector((state) => state.request.requestListPending);
  const employeeId = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const pendingList = useSelector((state) => state.students.pendingList);
  const selected = location.split('/').length > 2 ? `/${location.split('/')[1]}/${location.split('/')[2]}` : location;
  const appLogo = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0]?.company_logo;
  const company = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0]?.company;
  const emaillP = JSON.parse(localStorage.getItem('userdetails'))?.email;

  useEffect(() => {
    ModifyJson(allowedRoutes(RoutingList));
    // dispatch(getRequestPending('AQA', 1, ''));
    // dispatch(studentsStatus());
  }, []);

  const getCounting = (menu) => {
    // if (menu ==  'Requests') {
    //     return <Badge className='menu-badge' count={dataPending.length} />
    // } else
    if (menu == 'Students') {
      return (
        <Badge
          className="menu-badge"
          count={
            (pendingList?.length > 0 ? pendingList[0]?.pending_offer_letter[0]?.visa_total : 0) +
            (pendingList?.length > 0 ? pendingList[0]?.pending_student_registration[0]?.enrollment_total : 0)
          }
        />
      );
    }
  };

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

  const storeData = (data) => {
    addDoc(collectionRef, {
      timestamp: serverTimestamp(),
      id: employeeId,
      event: 'Routing',
      activity: data.activity,
      company: company,
      portal: 'CMS2',
      email: emaillP,
    })
      .then((res) => {
        // message.success('Data Stored')
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <Card bordered={false} className="navBar">
      <Row gutter={[30, 24]}>
        <Col span={24} className="text-center">
          <Image
            style={{ width: 'auto', height: 'auto', maxWidth: 160, maxHeight: 100 }}
            preview={false}
            src={appLogo ? baseUrl + appLogo : loginLogo}
            alt="Logo"
          />
        </Col>
        <Col span={24}>
          <Card bordered={false} className="transparent-card" style={{ height: 'calc(100vh - 220px)' }}>
            {Object.entries(menuList).map(([key, val], index) => (
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[selected]}
                defaultOpenKeys={subkey == 'dashboard' ? index == 1 && [menuList[key][0].key] : [subkey]}
                className="main-menu"
              >
                {Array.isArray(val) ? (
                  <SubMenu key={val[0].key} title={key} className="submenu-item">
                    {/* <SubMenu key="defaultOpenKeys" title={key} className='submenu-item'> */}
                    {val.map((item, i) => {
                      const IconComp = IconList[item.icon];
                      return (
                        <Menu.Item key={item.path} className="menu-item" icon={<IconComp />}>
                          <Link
                            to={item.path}
                            onClick={() => storeData({ activity: `Page Visit ${item.menu} ${item.submenu}` })}
                          >
                            {item.badge ? (
                              <Row gutter={20}>
                                <Col flex="auto">{item.submenu}</Col>
                                {/* <Col>{getCounting(item.submenu)}</Col> */}
                              </Row>
                            ) : (
                              item.submenu
                            )}
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                ) : (
                  <>
                    {!allowedCheck() && (
                      <>
                        <Menu.Item key={val.path} className="menu-item" icon={<DashboardIcon2 />}>
                          <Link to={val.path}>{val.menu}</Link>
                        </Menu.Item>
                        {val.menu == 'Dashboard' && (
                          <Menu.Item disabled key="campus" className="static-menu">
                            CAMPUS
                          </Menu.Item>
                        )}
                      </>
                    )}
                  </>
                )}
              </Menu>
            ))}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
