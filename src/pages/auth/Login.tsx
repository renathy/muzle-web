import React from "react";
import { useHistory } from 'react-router-dom';
import authAtom from "atoms/auth";
import tenantAtom from "atoms/tenants";
import { useSetRecoilState, useRecoilState } from "recoil";
import AuthLayout from "components/AuthLayout";
import api from "api";

const Login: React.FC = () => {

  const history = useHistory();
  const setAuthState = useSetRecoilState(authAtom);
  const [tenantState, setTenantState] = useRecoilState(tenantAtom);
  const [checking, setChecking] = React.useState(false);
  const tenantRef = React.useRef<HTMLSelectElement>(null);
  const nicknameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!tenantState.init) {
      const load = async () => {
        const response = await api.get('api/public/tenants');
        if (response.status === 200) {
          setTenantState({
            init: true,
            tenants: response.data.tenants
          });
        }
      };
      load();
    }
  }, [tenantState, setTenantState]);

  const submit = async () => {

    setChecking(true);

    const response = await api.post('api/auth/login', {
      tenant: tenantRef.current ? parseInt(tenantRef.current.value) : -1,
      nickname: nicknameRef.current?.value,
      password: passwordRef.current?.value,
    });
    if (response.status === 200) {

      const { access_token, user } = response.data;

      // token
      api.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
      });
      localStorage.setItem('token', access_token);

      // user
      setAuthState({
        init: true,
        user
      });

      // redirect
      setTimeout(() => {
        if (user.role === 'admin') {
          history.push("/admin");
        } else {
          history.push("/user");
        }
      }, 1000);
    } else {
      setChecking(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-4">
        <h1 className="mb-4 text-xl text-center">
          Ienāc sistēmā
      </h1>
        {tenantState.init &&
          <label className="formInput">
            <select className="formInputText" name="tenant" ref={tenantRef}>
              {tenantState.tenants.map(tenant =>
                <option value={tenant.id} key={tenant.id}>
                  {tenant.name}
                </option>
              )}
            </select>
          </label>
        }
        <label className="block text-sm">
          <span className="text-gray-700">Vārds</span>
          <input type="text" className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" ref={nicknameRef} />
        </label>
        <label className="block mt-4 text-sm">
          <span className="text-gray-700 ">Parole</span>
          <input type="password" className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" ref={passwordRef} />
        </label>
        <button
          className="block w-full py-2 mt-4 text-sm text-center text-white rounded-lg cursor-pointer bg-purple-600 active:bg-purple-700 focus:outline-none"
          onClick={submit}
          disabled={checking}
        >
          {checking ? 'Pārbauda ...' : 'Ienākt'}
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;