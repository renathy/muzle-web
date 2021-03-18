import React from "react";
import { BsList } from "react-icons/bs";
import { Category, Image } from "../../Constant";
import { Context } from "../../ContextProvider";

const buttonClass = "w-1/3 h-16 p-2 flex items-center justify-center border border-transparent hover:border-gray-500 active:border-gray-300 cursor-pointer rounded-sm";

const ImageList: React.FC = () => {
  const { state, setState } = React.useContext(Context);
  const { data } = state;
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [category, setCategory] = React.useState<Category | null>(null);

  React.useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  const dragStart = (event: any, image: Image) => {
    const imageSize = event.target.childNodes[0].getBoundingClientRect();
    setState({
      ...state,
      dragItem: {
        type: "image",
        object: image,
        offsetX: event.clientX - imageSize.left,
        offsetY: event.clientY - imageSize.top,
        width: imageSize.width,
        height: imageSize.height,
      },
    });
  };

  const dragEnd = () => {
    setState({
      ...state,
      dragItem: {
        type: null,
        object: null,
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
      },
    });
  };

  const showCategories = () => {
    setCategory(null);
  };

  return (
    <div>
      {/* Top */}
      <div className="flex items-center justify-between">
        <span className="text-sm">
          {categories.length}
        </span>
        <button
          onClick={showCategories}
          className="p-2 rounded-full hover:bg-gray-700 active:opacity-80 focus:outline-none"
        >
          <BsList />
        </button>
      </div>

      {/* Categories */}
      {category === null && (
        <div className="flex flex-wrap">
          {categories.map((cat: Category) => (
            <div
              key={cat.name}
              onClick={() => setCategory(cat)}
              className={buttonClass}
            >
              <img src={`${process.env.REACT_APP_SERVER}storage/${cat.src}`} alt="" className="max-w-full max-h-full" />
            </div>
          ))}
        </div>
      )}

      {/* CategoryImage list */}
      {category && (
        <div className="flex flex-wrap">
          {category.images.map((img) => (
            <div
              draggable
              key={img.name}
              onDragStart={(e) => dragStart(e, img)}
              onDragEnd={dragEnd}
              className={buttonClass}
            >
              <img
                src={`${process.env.REACT_APP_SERVER}storage/${img.src}`}
                alt=""
                className="max-w-full max-h-full pointer-events-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageList;
