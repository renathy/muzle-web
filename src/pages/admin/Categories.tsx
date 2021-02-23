import React from "react";
import AdminLayout from "components/AdminLayout";
import api from "api";
import categoryAtom from "atoms/categories";
import { useRecoilState } from "recoil";

const AdminCategories: React.FC = () => {

  const [categoryState, setCategoryState] = useRecoilState(categoryAtom);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [waiting, setWating] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });

  React.useEffect(() => {
    if (!categoryState.init) {
      const load = async () => {
        const response = await api.get('api/admin/categories');
        if (response.status === 200) {
          setCategoryState({
            init: true,
            categories: response.data.categories
          });
        }
      };
      load();
    }
  }, [categoryState, setCategoryState]);

  const submit = async () => {

    if (formRef.current) {
      setWating(true);
      setSubmitStatus({
        code: '',
        messages: []
      });

      var data = new FormData(formRef.current);

      const response = await api.post('api/admin/categories', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setCategoryState({
          ...categoryState,
          categories: [
            ...categoryState.categories,
            response.data.category
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
      {!categoryState.init ?
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
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {categoryState.categories.map(category =>
                  <tr className="text-gray-700" key={category.id}>
                    <td className="px-4 py-3 w-20">
                      <img className="w-12" src={`${process.env.REACT_APP_SERVER}storage/${category.src}`} alt="" />
                    </td>
                    <td className="px-4 py-3">
                      {category.name}
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
              <input className="formInputText" type="file" name="src" />
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

export default AdminCategories;