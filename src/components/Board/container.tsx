import React from "react";
import { Context } from "./ContextProvider";
import { GameData } from "./Constant";
import CanvasBoard from "./CanvasBoard";
import ControlBoard from "./ControlBoard";
import CustomScroll from "./CustomScroll";

const styles = {
  board: { width: 900, heipht: 600 },
  control: { width: 250, height: 600 },
};

interface Props {
  data: GameData;
}

const Board: React.FC<Props> = ({ data }) => {

  const { state, setState } = React.useContext(Context);

  React.useEffect(() => {
    setState({
      ...state,
      background: data.backgrounds[0],
      data
    });
  }, [data]);

  return (
    <div className="w-max min-w-full min-h-full flex items-center justify-center">
      <div className="inline-block p-8">
        <div className="flex rounded-md overflow-hidden">
          <div style={styles.board} className="flex-shrink-0 bg-gray-200">
            <CanvasBoard />
          </div>
          <div
            style={styles.control}
            className="flex-shrink-0 bg-yellow-50 text-gray-800"
          >
            <CustomScroll style={styles.control}>
              <ControlBoard />
            </CustomScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
