import { FunctionComponent } from 'react';
import Login from 'pages/auth/Login';
import LoginAdmin from 'pages/auth/LoginAdmin';
import AdminDashboard from 'pages/admin/Dashboard';
import AdminTenants from 'pages/admin/Tenants';
import AdminTenantEdit from 'pages/admin/TenantEdit';
import AdminUsers from 'pages/admin/Users';
import AdminUserEdit from 'pages/admin/UserEdit';
import AdminGames from 'pages/admin/Games';
import AdminCategories from 'pages/admin/Categories';
import AdminImages from 'pages/admin/Images';
import AdminBackgrounds from 'pages/admin/Backgrounds';
import UserDashboard from 'pages/user/Dashboard';
import UserGameList from 'pages/user/GameList';
import UserGame from 'pages/user/Game';

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
    path: '/login-admin',
    title: 'Login Admin',
    scope: 'auth',
    component: LoginAdmin,
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
    path: '/admin/tenants/:id',
    title: 'Tenant Edit',
    scope: 'admin',
    component: AdminTenantEdit,
  },
  {
    path: '/admin/users',
    title: 'Users',
    scope: 'admin',
    component: AdminUsers,
  },
  {
    path: '/admin/users/:id',
    title: 'Users',
    scope: 'admin',
    component: AdminUserEdit,
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
    title: 'Dashboard',
    scope: 'user',
    component: UserDashboard,
  },
  {
    path: '/user/games',
    title: 'Game LIst',
    scope: 'user',
    component: UserGameList,
  },
  {
    path: '/user/games/:id',
    title: 'Game',
    scope: 'user',
    component: UserGame,
  },
];

export default routes;