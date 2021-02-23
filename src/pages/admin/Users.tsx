import React from "react";
import api from "api";
import userAtom from "atoms/users";
import tenantAtom from "atoms/tenants";
import { useRecoilState } from "recoil";
import AdminLayout from "components/AdminLayout";

const AdminUsers: React.FC = () => {

  const [userState, setUserState] = useRecoilState(userAtom);
  const [tenantState, setTenantState] = useRecoilState(tenantAtom);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [waiting, setWating] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });

  React.useEffect(() => {
    if (!userState.init) {
      const load = async () => {
        const response = await api.get('api/admin/users');
        if (response.status === 200) {
          setUserState({
            init: true,
            users: response.data.users
          });
          setTenantState({
            init: true,
            tenants: response.data.tenants
          });
        }
      };
      load();
    }
  }, [userState, setUserState, setTenantState]);

  const submit = async () => {
    if (formRef.current) {
      setWating(true);
      setSubmitStatus({
        code: '',
        messages: []
      });

      var data = new FormData(formRef.current);
      const response = await api.post('api/admin/users', data);

      if (response.status === 200) {
        setUserState({
          ...userState,
          users: [
            ...userState.users,
            response.data.user
          ]
        });
        setSubmitStatus({
          code: 'success',
          messages: ['Successfully created!']
        });

        formRef.current.reset();
      } else {
        setSubmitStatus({
          code: 'failed',
          messages: Object.values(response.data.errors)
        });
      }
      setWating(false);
    }
  };

  return (
    <AdminLayout>
      {(!userState.init && !tenantState.init) ?
        <div className="bg-white rounded-sm px-4 py-2 shadow1">
          Loading ...
        </div>
        :
        <div className="space-y-4">
          {/* list */}
          <div className="w-full overflow-x-auto shadow1">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Nickname</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Tenant</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {userState.users.map(user =>
                  <tr className="text-gray-700" key={user.id}>
                    <td className="px-4 py-3">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {user.nickname}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {user.tenant.name}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* form */}
          <form className="bg-white rounded-sm p-4 space-y-4 shadow1" ref={formRef}>
            {submitStatus.code === 'success' &&
              <div className="px-4 py-2 text-sm text-white bg-green-600 rounded-md">
                {submitStatus.messages[0]}
              </div>
            }
            {submitStatus.code === 'failed' &&
              <ul className="list-disc px-8 py-4 text-sm text-white bg-red-600 rounded-md space-y-1">
                {submitStatus.messages.map(message =>
                  <li key={message}>{message}</li>
                )}
              </ul>
            }
            <label className="formInput">
              <span>Name</span>
              <input className="formInputText" type="text" name="name" />
            </label>
            <label className="formInput">
              <span>Nick Name</span>
              <input className="formInputText" type="text" name="nickname" />
            </label>
            <label className="formInput">
              <span>Role</span>
              <select className="formInputText" name="role">
                <option value="teacher">Teacher</option>
                <option value="kid">Kid</option>
              </select>
            </label>
            <label className="formInput">
              <span>Password</span>
              <input className="formInputText" type="password" name="password" />
            </label>
            <label className="formInput">
              <span>Tenant</span>
              <select className="formInputText" name="tenant_id" >
                {tenantState.tenants.map(tenant =>
                  <option value={tenant.id} key={tenant.id}>
                    {tenant.name}
                  </option>
                )}
              </select>
            </label>
            <button className="formSubmit" disabled={waiting} onClick={submit}>
              {waiting ? 'Submitting ...' : 'Submit'}
            </button>
          </form>
        </div>
      }
    </AdminLayout>
  );
};

export default AdminUsers;