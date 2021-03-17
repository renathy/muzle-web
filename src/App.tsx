import React from "react";
import { Switch, Route, matchPath, useLocation, useHistory } from 'react-router-dom';
import authAtom from "atoms/auth";
import { useRecoilState } from "recoil";
import api from "api";
import routes from "./routes";
import NoMatch from "pages/public/NoMatch";

import './i18n';
import { useTranslation, initReactI18next } from "react-i18next";

const App: React.FC = () => {

  const location = useLocation();
  const history = useHistory();
  const [authState, setAuthState] = useRecoilState(authAtom);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!authState.init) {
      const checkToken = async () => {
        const response = await api.post('api/auth/me');

        if (response.status === 200) {
          const user = response.data;

          // verify url scope
          let routeScope = '';
          for (let i = 0; i < routes.length; i++) {
            if (matchPath(location.pathname, routes[i])) {
              routeScope = routes[i].scope;
              break;
            }
          }

          // user role
          let userRole = user.role;
          if (user.role === 'kid' || user.role === 'teacher') {
            userRole = 'user';
          }

          // match role and url
          if (routeScope !== userRole) {
            if (userRole === 'admin') {
              history.push("/admin");
            } else {
              history.push("/user");
            }
          }

          // set login status
          setTimeout(() => {
            setAuthState({
              init: true,
              user,
            });
          }, 1000);
        } else {

          setAuthState({
            ...authState,
            init: true,
          });

          // verify url exist
          let routeScope = '';
          for (let i = 0; i < routes.length; i++) {
            if (matchPath(location.pathname, routes[i])) {
              routeScope = routes[i].scope;
              break;
            }
          }
          if (!routeScope) {
            history.push("/login");
          }
        }

      };
      checkToken();
    }
  }, [authState, setAuthState, history, location]);

  return (
    <div>
      {authState.init ?
        <Switch>
          {routes.map(route =>
            <Route path={route.path} exact key={route.path}>
              <route.component />
            </Route>
          )}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        : <div className="w-screen h-screen flex justify-center items-center">loading...</div>
      }
    </div>
  );
};

export default App;
