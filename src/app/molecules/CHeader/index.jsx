import React, { useState, useEffect, Fragment } from 'react';
import {
  Row,
  Col,
  Space,
  Button,
  Input,
  Select,
  Avatar,
  Dropdown,
  Typography,
  Menu,
  Card,
  Form,
  message,
  Image,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import userImage from '../../../assets/img/dummy-profile.png';
import { logout } from '../../../features/userSlice';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchIcon, ChangePasswordIcon, UserIcon, LogOutIcon } from 'Atoms/CustomIcons';
import { marketingBool, marketingSearch } from '../../modules/Marketing/ducks/actions';
import { Popup } from 'Atoms/Popup';
import { baseUrl } from '../../../configs/constants';
import PopupPassword from 'Modules/Application/components/PopupPassword';
import SwitchAccount from 'Modules/Application/components/SwitchAccount';
import { getRoles, onClear, emptyStorage } from '../../modules/Application/ducks/actions';
import { useForm } from 'react-hook-form';
import { allowed, allowedCheck } from '../../../routing/config/utils';
import AllRoles from '../../../routing/config/AllRoles';
import Roles from '../../../routing/config/Roles';
import loginLogo from '../../../assets/img/limkokwing-logo.svg';

const { Text } = Typography;

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisisble] = useState(false);
  const [visible2, setVisisble2] = useState(false);
  const [dropdown, setDropdown] = useState();
  const [profileImg, setProfileImg] = useState();
  const userProfile = localStorage.getItem('userImage');
  // const userProfile = JSON.parse(localStorage.getItem('userdetails')).user_image;
  const [moduleName, setModuleName] = useState(null);
  const [applicationName, setApplicationName] = useState('');
  const marketingVal = useSelector((state) => state.marketing.marketingApp);
  const roles = useSelector((state) => state.global.roles);
  const switchAccount = JSON.parse(localStorage.getItem('switch_accounts'));
  const userEmail = JSON.parse(localStorage.getItem('userdetails')).email;
  const appLogo = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0]?.company_logo;
  const location = useLocation();

  useEffect(() => {
    setProfileImg(userProfile ? `${baseUrl}${userProfile}` : userImage);
    dispatch(getRoles());

    const temp = [];
    allowed([AllRoles.MARKETING.APPLICATION], 'read') && temp.push('Marketing');
    allowed([AllRoles.AQA.MODULES], 'read') && temp.push('AQA');
    allowed([AllRoles.FACULTY.MODULES], 'read') && temp.push('Faculty');
    allowed([AllRoles.REGISTRY.STUDENTS], 'read') && temp.push('Registry');
    allowed([AllRoles.FINANCE.STUDENTS], 'read') && temp.push('Finance');
    allowed([AllRoles.ELIGIBILITY.APPLICATION], 'read') && temp.push('Eligibility');
    allowed([Roles.ATTENDANCE_INDIVIDUAL], 'read') && temp.push('Employment');
    setDropdown(temp);
    setModuleName(temp[0]);
    if (location?.state?.search) {
      setApplicationName(location.state.search)
    }
  }, []);

  const logoutHandler = () => {
    // emptyStorage(userEmail)
    //   .then((response) => {})
    //   .catch((e) => {});
    dispatch(logout());
    dispatch(onClear());
    localStorage.clear();
    history.push('/');
    // localStorage.removeItem('userdetails');
  };

  const onSelectChangeHandler = (e) => {
    setModuleName(e);
    // if (e === 'Marketing') {
    //   history.push('/marketing/applications/incomplete-applications');
    // } else {
    //   history.push('/');
    //   setModuleName('Select Department');
    // }
  };

  const onChangeInputField = (e) => {
    console.log('check space', e);
    if(e) {
      setApplicationName(e.target.value);
    }
  };

  useEffect(() => {
    dispatch(marketingSearch(applicationName));
  }, [applicationName]);

  // useEffect(() => {
  //   if (moduleName != 'Marketing') {
  //     dispatch(marketingBool('Select Department'));
  //   }
  // }, [moduleName]);

  // useEffect(() => {
  //   setModuleName(marketingVal);
  // }, [marketingVal]);

  const popup = {
    closable: true,
    visibility: visible,
    content: <PopupPassword title="Change Password" onClose={() => setVisisble(false)} />,
    width: 410,
    onCancel: () => setVisisble(false),
  };

  const popup2 = {
    closable: true,
    visibility: visible2,
    content: <SwitchAccount title="Switch accounts to" data={switchAccount} onClose={() => setVisisble2(false)} />,
    width: 600,
    onCancel: () => setVisisble2(false),
  };

  const menu = (
    <Menu className="pofile-menu">
      <Menu.Item>
        <Button onClick={() => history.push('/profile')} type="link" className="btn-link" icon={<UserIcon />}>
          My Profile
        </Button>
      </Menu.Item>

      <Menu.Item>
        <Button onClick={() => setVisisble(true)} type="link" className="btn-link" icon={<ChangePasswordIcon />}>
          Change Password
        </Button>
      </Menu.Item>

      {switchAccount && switchAccount?.length > 0 && (
        <Menu.Item>
          <Button onClick={() => setVisisble2(true)} type="link" className="btn-link" icon={<UserIcon />}>
            Switch Account
          </Button>
        </Menu.Item>
      )}

      <Menu.Item>
        <Button onClick={logoutHandler} type="link" className="btn-link" icon={<LogOutIcon />}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e?.target?.value) {
      let checkspace = /^\s/.test( e?.target?.value)
      if (checkspace) {
        message.error('Space not allowed in first character')
      } else {
          history.push({
            pathname: '/search',
            state: {
              search: applicationName,
              department: moduleName,
            },
          });
      }
    }
    
  };

  return (
    <>
      <Card bordered={false} className="c-header" style={{ backgroundColor: 'transparent' }}>
        <Row gutter={24} align="middle" justify="end" wrap>
          {!allowedCheck() && (
            <Col xs={24} lg={17}>
              <Space size={20}>
                {dropdown && dropdown?.length && (
                  <Select
                    defaultValue={dropdown[0]}
                    className="custom-select"
                    size="large"
                    style={{ width: 190 }}
                    
                    onChange={onSelectChangeHandler}
                  >
                    {dropdown?.map((e, i) => (
                      <Fragment key={i}>
                        <Option value={e}>{e}</Option>
                      </Fragment>
                    ))}
                  </Select>
                )}
                <Input
                  value={applicationName}
                  size="large"
                  onChange={onChangeInputField}
                  prefix={<SearchIcon />}
                  className="search-input"
                  placeholder="Search..."
                  onKeyDown={handleKeyDown}
                />
              </Space>
            </Col>
          )}
          <Col  xs={24} lg={7} className="text-right">
            <Dropdown className="userDropdown" overlay={menu} placement="bottomRight">
              <Space size={20}>
                <Text style={{ textTransform: 'capitalize' }}>
                  {JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0]?.full_name}
                </Text>
                <Avatar className="userImage" size={60} src={profileImg} />
              </Space>
            </Dropdown>
          </Col>
        </Row>
      </Card>
      <Popup {...popup} />
      <Popup {...popup2} />
    </>
  );
};
