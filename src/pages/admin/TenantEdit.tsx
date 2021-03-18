import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import AdminLayout from "components/AdminLayout";
import api from "api";

const AdminTenantEdit: React.FC = () => {

  const history = useHistory();
  const { id }: any = useParams();
  const [init, setInit] = React.useState(false);
  const [tenant, setTenant] = React.useState<any>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [submitStatus, setSubmitStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });
  const [deleteStatus, setDeleteStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });

  React.useEffect(() => {
    if (!init) {
      const load = async () => {
        const response = await api.get(`api/admin/tenants/${id}`);
        if (response.status === 200) {
          setInit(true);
          setTenant(response.data.tenant);
        }
      };
      load();
    }
  }, [init, id]);

  const submit = async () => {
    if (formRef.current) {

      setSubmitStatus({
        code: 'submit',
        messages: ['Submitting ...']
      });

      const data = new FormData(formRef.current);
      const response = await api.patch(`api/admin/tenants/${id}`, {
        name: data.get('name'),
        code: data.get('code')
      });

      if (response.status === 200) {
        setTenant(response.data.tenant);
        setSubmitStatus({
          code: 'success',
          messages: ['Successfully updated!']
        });
      } else {
        setSubmitStatus({
          code: 'failed',
          messages: Object.values(response.data.errors)
        });
      }

    }
  };

  const deleteTenant = async () => {

    setDeleteStatus({
      code: 'submit',
      messages: ['Deleting ...']
    });

    const response = await api.delete(`api/admin/tenants/${id}`);
    if (response.status === 200) {
      history.push('/admin/tenants')
    } else {
      setDeleteStatus({
        code: 'failed',
        messages: Object.values(response.data.errors)
      });
    }

  };

  return (
    <AdminLayout>
      {!init ?
        <div className="bg-white rounded-sm px-4 py-2 shadow1">
          Loading ...
        </div>
        :
        <div className="space-y-4">
          <div>
            <Link className="buttonSecondary" to="/admin/tenants">
              Back to Tenants
            </Link>

          </div>
          <form className="bg-white rounded-sm p-4 space-y-4 shadow1" ref={formRef}>
            {submitStatus.code === 'submit' &&
              <div className="px-4 py-2 text-sm text-white bg-purple-600 rounded-md">
                {submitStatus.messages[0]}
              </div>
            }
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
              <input className="formInputText" type="text" name="name" defaultValue={tenant && tenant.name} />
            </label>
            <label className="formInput">
              <span>Code</span>
              <input className="formInputText" type="text" name="code" defaultValue={tenant && tenant.code} />
            </label>
            <button className="formSubmit" disabled={submitStatus.code === 'submit'} onClick={submit}>
              Submit
            </button>
          </form>

          <div className="bg-white rounded-sm p-4 space-y-4 shadow1">
            {deleteStatus.code === 'submit' &&
              <div className="px-4 py-2 text-sm text-white bg-purple-900 rounded-md">
                {deleteStatus.messages[0]}
              </div>
            }
            {deleteStatus.code === 'success' &&
              <div className="px-4 py-2 text-sm text-white bg-green-600 rounded-md">
                {deleteStatus.messages[0]}
              </div>
            }
            {deleteStatus.code === 'failed' &&
              <ul className="list-disc px-8 py-4 text-sm text-white bg-red-600 rounded-md space-y-1">
                {deleteStatus.messages.map(message =>
                  <li key={message}>{message}</li>
                )}
              </ul>
            }
            <button className="buttonSecondary" onClick={deleteTenant}>
              Delete Tenant
            </button>
          </div>
        </div>
      }
    </AdminLayout>
  );
};

export default AdminTenantEdit;