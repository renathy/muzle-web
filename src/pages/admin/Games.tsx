import React from "react";
import api from "api";
import gameAtom from "atoms/games";
import categoryAtom, { Category } from "atoms/categories";
import backgroundAtom, { Background } from "atoms/backgrounds";
import { useRecoilState } from "recoil";
import AdminLayout from "components/AdminLayout";
import { Link } from "react-router-dom";


const AdminGames: React.FC = () => {

  const [gameState, setGameState] = useRecoilState(gameAtom);
  const [categoryState, setCategoryState] = useRecoilState(categoryAtom);
  const [backgroundState, setBackgroundState] = useRecoilState(backgroundAtom);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [backgrounds, setBackgrounds] = React.useState<Background[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [waiting, setWating] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({
    code: '',
    messages: [] as string[]
  });

  React.useEffect(() => {
    if (!gameState.init) {
      const load = async () => {
        const response = await api.get('api/admin/games');
        if (response.status === 200) {
          setGameState({
            init: true,
            games: response.data.games
          });
          setCategoryState({
            init: true,
            categories: response.data.categories
          });
          setBackgroundState({
            init: true,
            backgrounds: response.data.backgrounds
          });
        }
      };
      load();
    }
  }, [gameState, setGameState, setCategoryState, setBackgroundState]);

  const selectBackground = (background: Background) => {
    if (backgrounds.map(bg => bg.id).includes(background.id)) {
      setBackgrounds(backgrounds.filter(bg => bg.id !== background.id));
    } else {
      setBackgrounds([
        ...backgrounds,
        background
      ]);
    }
  };

  const selectCategories = (category: Category) => {
    if (categories.map(bg => bg.id).includes(category.id)) {
      setCategories(categories.filter(bg => bg.id !== category.id));
    } else {
      setCategories([
        ...categories,
        category
      ]);
    }
  };

  const submit = async () => {
    if (formRef.current) {
      setWating(true);
      setSubmitStatus({
        code: '',
        messages: []
      });

      var data = new FormData(formRef.current);
      const response = await api.post('api/admin/games', data);

      if (response.status === 200) {
        setGameState({
          ...gameState,
          games: [
            ...gameState.games,
            response.data.game
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
      {(!gameState.init && !categoryState.init && !backgroundState.init) ?
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
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Categories</th>
                  <th className="px-4 py-3">Backgrounds</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {gameState.games.map(game =>
                  <tr className="text-gray-700" key={game.id}>
                    <td className="px-4 py-3">
                      {game.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {game.description}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {game.categories_count}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {game.backgrounds_count}
                    </td>
                    <td>
                      <Link to={`/admin/games/${game.id}/delete`} className="buttonSecondary">
                        Archive
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

            {/* name */}
            <label className="formInput">
              <span>Name</span>
              <input className="formInputText" type="text" name="name" />
            </label>

            {/* description */}
            <label className="formInput">
              <span>Description</span>
              <input className="formInputText" type="text" name="description" />
            </label>

            {/* backgrounds */}
            <label className="formInput">
              <span>Backgrounds</span>
              <div className="formInputText divide-y p-2">
                <div className="p-2 space-x-2">
                  {backgrounds.map((bg, index) =>
                    <span className="rounded-md bg-gray-300 px-2 py-1" key={bg.id}>
                      {index === 0 && <b>Default</b>} {bg.name}
                      <input type="hidden" name="backgrounds[]" value={bg.id} />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap">
                  {backgroundState.backgrounds.map(background =>
                    <div className="m-2" key={background.id}>
                      <div
                        className="p-2 w-32 h-32 cursor-pointer rounded-md overflow-hidden border border-gray-50 hover:border-indigo-600 active:border-indigo-400"
                        onClick={() => selectBackground(background)}
                      >
                        <img className="w-full h-full object-cover" src={`${process.env.REACT_APP_SERVER}storage/${background.src}`} alt="" />
                      </div>
                      <div className="text-center">{background.name}</div>
                    </div>
                  )}
                </div>
              </div>
            </label>

            {/* categories */}
            <label className="formInput">
              <span>Categories</span>
              <div className="formInputText divide-y p-2">
                <div className="p-2 space-x-2">
                  {categories.map(cat =>
                    <span className="rounded-md bg-gray-300 px-2 py-1" key={cat.id}>
                      {cat.name}
                      <input type="hidden" name="categories[]" value={cat.id} />
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap">
                  {categoryState.categories.map(category =>
                    <div className="m-2" key={category.id}>
                      <div
                        className="p-2 w-32 h-32 cursor-pointer rounded-md overflow-hidden border border-gray-50 hover:border-indigo-600 active:border-indigo-400"
                        onClick={() => selectCategories(category)}
                      >
                        <img className="w-full h-full object-cover" src={`${process.env.REACT_APP_SERVER}storage/${category.src}`} alt="" />
                      </div>
                      <div className="text-center">{category.name}</div>
                    </div>
                  )}
                </div>
              </div>
            </label>

            {/* helper */}
            <label className="formInput">
              <span>Helper</span>
              <input className="formInputText" type="file" name="helper" />
            </label>

            {/* submit */}
            <button className="formSubmit" disabled={waiting} onClick={submit}>
              {waiting ? 'Submitting ...' : 'Submit'}
            </button>

          </form>
        </div>
      }
    </AdminLayout>
  );
};

export default AdminGames;