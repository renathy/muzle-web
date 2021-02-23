import React from "react";
import { useParams } from "react-router-dom";
import api from "api";
import { Game } from "atoms/games";
import { Background } from "atoms/backgrounds";
import { Category } from "components/Board/Constant";
import UserLayout from "components/UserLayout";
import Board from "components/Board";

interface ParamTypes {
  id: string;
}

const UserGame: React.FC = () => {

  const { id } = useParams<ParamTypes>();
  const [init, setInit] = React.useState(false);
  const [game, setGame] = React.useState<Game | null>(null);
  const [backgrounds, setBackgrounds] = React.useState<Background[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    if (!init) {
      const load = async () => {
        const response = await api.get(`api/user/games/${id}`);
        if (response.status === 200) {
          setGame(response.data.game);
          setBackgrounds(response.data.backgrounds);
          setCategories(response.data.categories);
        }
        setInit(true);
      };
      load();
    }
  }, [init]);


  return (
    <UserLayout>
      {game &&
        <div className="container max-w-screen-lg mx-auto space-y-4">
          <div className="bg-white rounded-sm p-4 shadow1">
            {game.name}
          </div>
          <Board data={{ game, backgrounds, categories }} />
        </div>
      }
    </UserLayout>
  );
};

export default UserGame;