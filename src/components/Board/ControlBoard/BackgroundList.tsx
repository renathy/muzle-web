import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Background } from "../Constant";
import { Context } from "../ContextProvider";

const styles = {
  image: {
    paddingTop: '75%'
  }
}

const BackgroundList: React.FC = () => {

  const { state, setState } = React.useContext(Context);
  const { data, background } = state;
  const { backgrounds } = data;
  const [range, setRange] = React.useState(0);
  const [point, setPoint] = React.useState(0);

  React.useEffect(() => {
    setPoint(0);
    setRange(Math.max(backgrounds.length - 2, 0));
  }, [backgrounds]);

  const prev = () => {
    setPoint(Math.max(0, point - 1));
  };

  const next = () => {
    setPoint(Math.min(point + 1, range));
  };

  const handleBackgroundChange = (bg: Background) => {
    setState({
      ...state,
      background: bg
    });
  };

  return (
    <div>
      {/* Control */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">
          {backgrounds.length}
        </span>
        <div>
          {point > 0 &&
            <button
              className="p-2 rounded-full hover:bg-gray-700 active:opacity-80 focus:outline-none"
              onClick={prev}
            >
              <IoIosArrowBack />
            </button>
          }
          {point < range &&
            <button
              className="p-2 rounded-full hover:bg-gray-700 active:opacity-80 focus:outline-none"
              onClick={next}
            >
              <IoIosArrowForward />
            </button>
          }
        </div>
      </div>
      {/* Image */}
      <div className="flex">
        {[0, 1].map(index =>
          <div className="w-1/2 cursor-pointer" key={index}>
            {backgrounds[point + index] && background &&
              <div
                onClick={() => handleBackgroundChange(backgrounds[point + index])}
                className={background.key === backgrounds[point + index].key ? 'p-1 border border-gray-300' : 'p-1 border border-transparent hover:border-gray-500 active:border-gray-400'}
              >
                <div className="relative" style={styles.image}>
                  <img
                    src={backgrounds[point + index].thumb}
                    alt=""
                    className="rounded-sm overflow-hidden absolute w-full h-full object-cover top-0 left-0"
                  />
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default BackgroundList;