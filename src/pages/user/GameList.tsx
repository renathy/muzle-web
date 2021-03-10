import React from "react";
import { useHistory } from "react-router-dom";
import api from "api";
import gameAtom, { Game } from "atoms/games";
import { useRecoilState } from "recoil";
import UserLayout from "components/UserLayout";

const UserWelcome: React.FC = () => {

  const history = useHistory();
  const [gameState, setGameState] = useRecoilState(gameAtom);

  React.useEffect(() => {
    if (!gameState.init) {
      const load = async () => {
        const response = await api.get('api/user/games');
        if (response.status === 200) {
          setGameState({
            init: true,
            games: response.data.games
          });
        }
      };
      load();
    }
  }, [gameState, setGameState]);

  const toGame = (game: Game) => {
    history.push(`/user/games/${game.id}`)
  };

  return (
    <UserLayout>
      {!gameState.init ?
        <div className="bg-white rounded-sm px-4 py-2 shadow1">
          Loading ...
        </div>
        :
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
                <tr
                  className="text-gray-700 hover:text-purple-600 cursor-pointer active:bg-gray-100 select-none"
                  key={game.id}
                  onClick={() => toGame(game)}
                >
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
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </UserLayout>
  );
};

export default UserWelcome;