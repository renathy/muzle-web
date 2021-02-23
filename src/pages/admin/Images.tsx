import React from "react";
import api from "api";
import imageAtom, { Image } from "atoms/images";
import categoryAtom, { Category } from "atoms/categories";
import { useRecoilState } from "recoil";
import AdminLayout from "components/AdminLayout";

const AdminImages: React.FC = () => {

  const [imageState, setImageState] = useRecoilState(imageAtom);
  const [categoryState, setCategoryState] = useRecoilState(categoryAtom);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [waiting, setWating] = React.useState(false);
  const [category, setCategory] = React.useState<Category | null>(null);
  const [images, setImages] = React.useState<Image[]>([]);
  const [submitStatus, setSubmitStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });

  React.useEffect(() => {
    if (!imageState.init) {
      const load = async () => {
        const response = await api.get('api/admin/images');
        if (response.status === 200) {
          setImageState({
            init: true,
            images: response.data.images
          });
          setCategoryState({
            init: true,
            categories: response.data.categories
          });
        }
      };
      load();
    }
  }, [imageState, setImageState, setCategoryState]);

  React.useEffect(() => {
    if (category) {
      const filtered = imageState.images.filter(image => image.category_id === category.id);
      setImages(filtered);
    }
  }, [imageState, category]);

  const submit = async () => {
    if (formRef.current) {
      setWating(true);
      setSubmitStatus({
        code: '',
        messages: []
      });

      var data = new FormData(formRef.current);
      const response = await api.post('api/admin/images', data);

      if (response.status === 200) {
        setImageState({
          ...imageState,
          images: [
            ...imageState.images,
            ...response.data.images
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
      {(!imageState.init && !categoryState.init) ?
        <div className="bg-white rounded-sm px-4 py-2 shadow1">
          Loading ...
        </div>
        :
        <div className="space-y-4">
          {/* list */}
          <div className="bg-white rounded-sm shadow1 flex">
            <div className="min-w-32 flex-shrink-0 bg-gray-50 divide-y divide-gray-200 border-r">
              {categoryState.categories.map(cat =>
                <div
                  className="p-4 cursor-pointer hover:bg-gray-100 active:bg-gray-200 select-none"
                  key={cat.id}
                  onClick={() => setCategory(cat)}
                >
                  {cat.name}
                </div>
              )}
            </div>
            {category &&
              <div className="flex-grow flex flex-wrap p-4">
                {images.map(image =>
                  <div className="bg-gray-100 rounded-sm w-16 h-16 overflow-hidden m-2" key={image.id}>
                    <img
                      className="w-full h-full object-contain"
                      src={`${process.env.REACT_APP_SERVER}storage/${image.src}`}
                      alt=""
                    />
                  </div>
                )}
              </div>
            }
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
              <span>Category</span>
              <select className="formInputText" name="category_id" >
                {categoryState.categories.map(category =>
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                )}
              </select>
            </label>
            <label className="formInput">
              <span>Images (multiple)</span>
              <input className="formInputText" type="file" name="images[]" multiple />
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

export default AdminImages;