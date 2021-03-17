import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import AdminLayout from "components/AdminLayout";
import api from "api";

const AdminUserEdit: React.FC = () => {

  const history = useHistory();
  const { id }: any = useParams();
  const [init, setInit] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
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
        const response = await api.get(`api/admin/users/${id}`);
        if (response.status === 200) {
          setInit(true);
          setUser(response.data.user);
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
      const response = await api.patch(`api/admin/users/${id}`, {
        name: data.get('name'),
        nickname: data.get('nickname')
      });

      if (response.status === 200) {
        setUser(response.data.user);
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

  const deleteUser = async () => {

    setDeleteStatus({
      code: 'submit',
      messages: ['Deleting ...']
    });

    const response = await api.delete(`api/admin/users/${id}`);
    if (response.status === 200) {
      history.push('/admin/users')
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
            <Link className="buttonSecondary" to="/admin/users">
              Back to Users
            </Link>

          </div>
          <form className="bg-white rounded-sm p-4 space-y-4 shadow1" ref={formRef}>
            {submitStatus.code === 'submit' &&
              <div className="px-4 py-2 text-sm text-white bg-yellow-600 rounded-md">
                {submitStatus.messages[0]}
              </div>
            }
            {submitStatus.code === 'success' &&
              <div className="px-4 py-2 text-sm text-white bg-yellow-600 rounded-md">
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
              <input className="formInputText" type="text" name="name" defaultValue={user && user.name} />
            </label>
            <label className="formInput">
              <span>Nick Name</span>
              <input className="formInputText" type="text" name="nickname" defaultValue={user && user.nickname} />
            </label>
            <button className="formSubmit" disabled={submitStatus.code === 'submit'} onClick={submit}>
              Submit
            </button>
          </form>

          <div className="bg-white rounded-sm p-4 space-y-4 shadow1">
            {deleteStatus.code === 'submit' &&
              <div className="px-4 py-2 text-sm text-white bg-purple-600 rounded-md">
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
            <button className="buttonSecondary" onClick={deleteUser}>
              Delete User
            </button>
          </div>
        </div>
      }
    </AdminLayout>
  );
};

export default AdminUserEdit;