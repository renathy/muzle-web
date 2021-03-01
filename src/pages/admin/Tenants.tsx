import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "components/AdminLayout";
import api from "api";
import tenantAtom from "atoms/tenants";
import { useRecoilState } from "recoil";

const AdminTenants: React.FC = () => {

  const [tenantState, setTenantState] = useRecoilState(tenantAtom);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [waiting, setWating] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });

  React.useEffect(() => {
    if (!tenantState.init) {
      const load = async () => {
        const response = await api.get('api/admin/tenants');
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
    if (formRef.current) {

      setWating(true);
      setSubmitStatus({
        code: '',
        messages: []
      });

      var data = new FormData(formRef.current);
      const response = await api.post('api/admin/tenants', data);

      if (response.status === 200) {
        setTenantState({
          ...tenantState,
          tenants: [
            ...tenantState.tenants,
            response.data.tenant
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
      {!tenantState.init ?
        <div className="bg-white rounded-sm px-4 py-2 shadow1">
          Loading ...
        </div>
        :
        <div className="space-y-4">
          {/* list */}
          <div className="w-full overflow-x-auto shadow1">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Code</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {tenantState.tenants.map(tenant =>
                  <tr className="text-gray-700" key={tenant.id}>
                    <td className="px-4 py-3">
                      {tenant.name}
                    </td>
                    <td className="px-4 py-3">
                      {tenant.code}
                    </td>
                    <td width="80">
                      <Link to={`/admin/tenants/${tenant.id}`} className="buttonSecondary">
                        Edit
                      </Link>
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
              <span>Code</span>
              <input className="formInputText" type="text" name="code" />
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

export default AdminTenants;