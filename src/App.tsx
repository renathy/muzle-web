import React from "react";
import { Switch, Route, matchPath, useLocation, useHistory } from 'react-router-dom';
import authAtom from "atoms/auth";
import { useRecoilState } from "recoil";
import api from "api";
import routes from "./routes";
import NoMatch from "pages/public/NoMatch";

const App: React.FC = () => {

  const location = useLocation();
  const history = useHistory();
  const [authState, setAuthState] = useRecoilState(authAtom);

  React.useEffect(() => {
    if (!authState.init) {
      const checkToken = async () => {
        const response = await api.post('/auth/me');
        const user = response.status === 200 ? response.data : null;

        // verify url scope
        for (let i = 0; i < routes.length; i++) {
          if (matchPath(location.pathname, routes[i])) {
            if (routes[i].scope !== user.role) {
              if (user.role === 'admin') {
                history.push("/admin");
              } else {
                history.push("/user");
              }
            }
            break;
          }
        }

        // set login status
        setTimeout(() => {
          setAuthState({
            init: true,
            user,
          });
        }, 1000);
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
