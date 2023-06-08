import { AQA } from './AQA';
import { Faculty } from './Faculty';
import { Marketing } from './Marketing';
import { Registry } from './Registry';
import { Eligibility } from './Eligibility';
import { Finance } from './Finance';
import { HRMS } from './HRMS';
import { Visa } from './Visa';
import { StudentFile } from './StudentFile';
import Roles from "./Roles";

const titles = {
  DASHBOARD: 'Dashboard',
  BUSINESS: 'Business',
};

export default [
  {
    component: 'NotFound',
    path: '/404',
    title: titles.DASHBOARD,
    menu: '404',
    parent: false,
  },
  {
    component: 'Application',
    path: '/dashboard',
    title: titles.DASHBOARD,
    menu: 'Dashboard',
    icon: 'DashboardIcon2',
    parent: true,
  },
  {
    component: 'Search',
    path: '/search',
    title: titles.DASHBOARD,
    menu: 'search',
    parent: false,
  },
  // {
  //   component: 'Socket',
  //   path: '/websocket',
  //   title: titles.DASHBOARD,
  //   menu: 'socket',
  //   parent: false,
  // },
  ...Marketing,
  ...Finance,
  ...Eligibility,
  ...Registry,
  ...AQA,
  ...Faculty,
  ...HRMS,
  ...Visa,
  ...StudentFile,
  {
    component: 'ActivityLog',
    path: '/intelligence/activitylog',
    title: titles.BUSINESS,
    key: 'intelligence',
    menu: 'Business Intelligence',
    submenu: 'Activity Logs',
    icon: 'PolicyIcon',
    permission: [Roles.SETUP],
    parent: true,
  },
  {
    component: 'MonitoringOperation',
    path: '/intelligence/operations',
    title: titles.BUSINESS,
    key: 'intelligence',
    menu: 'Business Intelligence',
    submenu: 'Monitoring Operation',
    icon: 'ReportsIcon',
    permission: [Roles.SETUP],
    parent: true,
  },
  
];
