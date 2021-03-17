import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Background } from "../../Constant";
import { Context } from "../../ContextProvider";

const styles = {
  image: {
    paddingTop: "75%",
  },
};

const BackgroundList: React.FC = () => {
  const { state, setState } = React.useContext(Context);
  const { data, background } = state;
  const [backgrounds, setBackgrounds] = React.useState<Background[]>([]);
  const [range, setRange] = React.useState(0);
  const [point, setPoint] = React.useState(0);
  const bgPerPage = 3;

  React.useEffect(() => {
    if (data) {
      setBackgrounds(data.backgrounds);
    }
  }, [data]);

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
      background: bg,
    });
  };

  return (
    <div>
      {/* Control */}
      <div className="flex justify-between items-center mb-2 hidden">
        <span className="text-sm italic hidden">{backgrounds.length}</span>       
      </div>
      {/* Image */}
      <div className="flex">
        <div>
          
              <button
                className={"py-2 px-1 rounded-full hover:bg-yellow-100 active:opacity-80 focus:outline-none " + (point > 0 ? 'visible' : 'invisible')}
                onClick={prev}
              >
                <IoIosArrowBack />
              </button>
            
        </div>

        {[0, 1, 2].map((index) => (
          <div className="w-1/3 cursor-pointer" key={index}>
            {backgrounds[point + index] && background && (
              <div
                onClick={() =>
                  handleBackgroundChange(backgrounds[point + index])
                }
                className={
                  background.id === backgrounds[point + index].id
                    ? "p-1 border border-gray-300"
                    : "p-1 border border-transparent hover:border-gray-500 active:border-gray-400"
                }
              >
                <div className="relative" style={styles.image}>
                  <img
                    src={`${process.env.REACT_APP_SERVER}storage/${backgrounds[point + index].thumb_src}`}
                    alt=""
                    className="rounded-sm overflow-hidden absolute w-full h-full object-cover top-0 left-0"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
         <div>
            <button
              className={"px-1 py-2 rounded-full hover:bg-yellow-100 active:opacity-80 focus:outline-none visible"}
              onClick={next}
            >
              <IoIosArrowForward />
            </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundList;
