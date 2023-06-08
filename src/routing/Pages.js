import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Row, Col, Card, Typography, Button, Space, Spin, message } from 'antd';
import RoutingList from './config/RoutingList';
import { checkPermission, isLoggedIn } from './config/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Dashboard from '../app/pages/Dashboard';
import QualityAssurance from '../app/pages/QualityAssurance';
import Marketing from '../app/pages/Marketing';
import Registry from '../app/pages/Registry';
import Faculty from '../app/pages/Faculty';
import Eligibility from '../app/pages/Eligibility';
import Finance from '../app/pages/Finance';
import Business from '../app/pages/Business';
import NoPage from '../app/modules/Login/NoPage';
import HRMS from '../app/pages/HRMS';
import minifyIcon from '../assets/img/minimise.png';
import maximiseIcon from '../assets/img/maximise.png';
import closeIcon from '../assets/img/close.png';
import StudentFile from '../app/pages/StudentFile';
import Visa from '../app/pages/Visa';

import { meetingLink } from '../app/modules/Application/ducks/actions';

// Pages
import Login from '../app/pages/Login';

const compList = {
  Dashboard,
  QualityAssurance,
  Marketing,
  Registry,
  Faculty,
  Eligibility,
  Finance,
  HRMS,
  Business,
  StudentFile,
  Visa,
};

const Pages = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isMinify, setMinify] = useState(false);
  const routeComponents = RoutingList.map(({ title, component, path, permission }, key) => (
    <Route
      exact
      path={path}
      key={key}
      render={(props) => {
        if (isLoggedIn()) {
          const MyComponent = compList[title];
          if (!permission) {
            return <MyComponent Comp={component} {...props} />;
          } else {
            if (checkPermission(permission)) {
              return <MyComponent Comp={component} {...props} />;
            } else {
              return <Redirect to="/404" />;
            }
          }
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  ));

  const getMeetingLink = useSelector((state) => state.global.meetingLink);
  const handleMinify = () => {
    setMinify(!isMinify);
  };
  const closeIframe = () => {
    dispatch(
      meetingLink({
        link: '',
      }),
    );
    history.push('/dashboard');
  };
  return (
    <>
      <Switch>
        <Route exact path="/" render={(props) => <Login Comp={'Login'} {...props} />} />
        <Route exact path="/login" render={(props) => <Login Comp={'Login'} {...props} />} />
        <Route exact path="/forgot-password" render={(props) => <Login Comp={'ForgotPassword'} {...props} />} />
        <Route exact path="/update-password" render={(props) => <Login Comp={'OPTPCode'} {...props} />} />
        {routeComponents}
        <Route component={NoPage} />
      </Switch>

      {getMeetingLink && getMeetingLink?.length > 0 && (
        <div className={isMinify ? 'iframe_minify virtual_popup' : 'virtual_popup'}>
          <div className="iframe_btns">
            {isMinify ? (
              <Button type="primary" onClick={handleMinify} className="maximise_btn btn-alt">
                On Going Class
                <img src={maximiseIcon} width="35" />
              </Button>
            ) : (
              <>
                <Button type="link" onClick={handleMinify}>
                  <img src={minifyIcon} width="50" />
                </Button>
                <Button type="link" onClick={closeIframe}>
                  <img src={closeIcon} width="45" />
                </Button>
              </>
            )}
          </div>
          <div className="iframe_div">
            <iframe
              src={getMeetingLink}
              allow="camera;microphone;display-capture;fullscreen;"
              width="100%"
              style={{ border: 0, display: 'block', float: 'left', height: '100%' }}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Pages;
