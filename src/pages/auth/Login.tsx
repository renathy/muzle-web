import React from "react";
import { useHistory } from 'react-router-dom';
import authAtom from "atoms/auth";
import { useSetRecoilState } from "recoil";
import AuthLayout from "components/AuthLayout";
import api from "api";

const Login: React.FC = () => {

  const history = useHistory();
  const [checking, setChecking] = React.useState(false);
  const setAuthState = useSetRecoilState(authAtom);
  const nicknameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const submit = async () => {

    setChecking(true);

    const response = await api.post('/auth/login', {
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
      <h1 className="mb-4 text-xl text-center">
        Login
      </h1>
      <label className="block text-sm">
        <span className="text-gray-700">Nickname</span>
        <input type="text" className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" ref={nicknameRef} />
      </label>
      <label className="block mt-4 text-sm">
        <span className="text-gray-700 ">Password</span>
        <input type="password" className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" ref={passwordRef} />
      </label>
      <button
        className="block w-full py-2 mt-4 text-sm text-center text-white rounded-lg cursor-pointer bg-purple-600 active:bg-purple-700 focus:outline-none"
        onClick={submit}
        disabled={checking}
      >
        {checking ? 'Checking ...' : 'Submit'}
      </button>
    </AuthLayout>
  );
};

export default Login;