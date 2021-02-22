import { FunctionComponent } from 'react';
import Login from 'pages/auth/Login';
import AdminDashboard from 'pages/admin/Dashboard';
import AdminTenants from 'pages/admin/Tenants';
import AdminUsers from 'pages/admin/Users';
import AdminGames from 'pages/admin/Games';
import AdminCategories from 'pages/admin/Categories';
import AdminImages from 'pages/admin/Images';
import AdminBackgrounds from 'pages/admin/Backgrounds';
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
    title: 'Dashboard',
    scope: 'admin',
    component: AdminDashboard,
  },
  {
    path: '/admin/tenants',
    title: 'Tenants',
    scope: 'admin',
    component: AdminTenants,
  },
  {
    path: '/admin/users',
    title: 'Users',
    scope: 'admin',
    component: AdminUsers,
  },
  {
    path: '/admin/games',
    title: 'Games',
    scope: 'admin',
    component: AdminGames,
  },
  {
    path: '/admin/categories',
    title: 'Categories',
    scope: 'admin',
    component: AdminCategories,
  },
  {
    path: '/admin/images',
    title: 'Images',
    scope: 'admin',
    component: AdminImages,
  },
  {
    path: '/admin/backgrounds',
    title: 'Backgrounds',
    scope: 'admin',
    component: AdminBackgrounds,
  },
  {
    path: '/user',
    title: 'Welcome',
    scope: 'user',
    component: UserWelcome,
  },
];

export default routes;