import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROOT } from "../configs/routeNames";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../assets/styles/antd.less";
import "../assets/styles/styles.scss";
import { TranslateProvider } from 'Translate';

import Pages from "./Pages";
import { TabTitle } from "../utils/GeneralFunction";

const Root = () => {
  const company = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].company_title ?? 'Raisd';
  TabTitle(company)
  
  return (
    <TranslateProvider>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={ROOT} component={Pages} />
      </Switch>
    </Router>
  </Provider>
    </TranslateProvider>
  )
};
export default Root;
