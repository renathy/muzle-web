import { FunctionComponent } from 'react';
import Login from 'pages/auth/Login';
import AdminWelcome from 'pages/admin/Welcome';
import UserWelcome from 'pages/user/Welcome';

interface Route {
  path: string;
  title: string;
  scope: string;
  component: FunctionComponent
}

const routes: Route[] = [
  {
    path: '/login',
    title: 'Login',
    scope: 'auth',
    component: Login,
  },
  {
    path: '/admin',
    title: 'Welcome',
    scope: 'admin',
    component: AdminWelcome,
  },
  {
    path: '/user',
    title: 'Welcome',
    scope: 'user',
    component: UserWelcome,
  },
];

export default routes;