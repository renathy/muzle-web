import React from "react";
import AdminLayout from "components/AdminLayout";
import api from "api";
import backgroundAtom from "atoms/backgrounds";
import { useRecoilState } from "recoil";

const AdminBackgrounds: React.FC = () => {

  const [backgroundState, setBackgroundState] = useRecoilState(backgroundAtom);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [waiting, setWating] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });

  React.useEffect(() => {
    if (!backgroundState.init) {
      const load = async () => {
        const response = await api.get('api/admin/backgrounds');
        if (response.status === 200) {
          setBackgroundState({
            init: true,
            backgrounds: response.data.backgrounds
          });
        }
      };
      load();
    }
  }, [backgroundState, setBackgroundState]);

  const submit = async () => {

    if (formRef.current) {
      setWating(true);
      setSubmitStatus({
        code: '',
        messages: []
      });

      var data = new FormData(formRef.current);

      const response = await api.post('api/admin/backgrounds', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setBackgroundState({
          ...backgroundState,
          backgrounds: [
            ...backgroundState.backgrounds,
            response.data.background
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
      {!backgroundState.init ?
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
                {backgroundState.backgrounds.map(background =>
                  <tr className="text-gray-700" key={background.id}>
                    <td className="px-4 py-3 w-20">
                      <img className="w-12" src={`${process.env.REACT_APP_SERVER}storage/${background.src}`} alt="" />
                    </td>
                    <td className="px-4 py-3">
                      {background.name}
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
              <span>Src</span>
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

export default AdminBackgrounds;