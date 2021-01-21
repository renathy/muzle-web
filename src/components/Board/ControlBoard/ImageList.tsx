import React from "react";
import { BsList } from "react-icons/bs";
import { Category, Image } from "../Constant";
import { Context } from "../ContextProvider";

const ImageList: React.FC = () => {

  const { state, setState } = React.useContext(Context);
  const { data } = state;
  const { images, categories } = data;
  const [category, setCategory] = React.useState<Category | null>(null);
  const [categoryImages, setCategoryImages] = React.useState<Image[]>([]);

  const dragStart = (event:any, image:Image) => {
    const imageSize = event.target.childNodes[0].getBoundingClientRect();
    const imageOffset = event.target.childNodes[0].getBoundingClientRect();
    setState({
      ...state,
      dragItem: {
        image,
        offsetX: event.clientX - imageOffset.left,
        offsetY: event.clientY - imageOffset.top,
        width: imageSize.width,
        height: imageSize.height
      }
    });
  };

  const dragEnd = () => {
    setState({
      ...state,
      dragItem: {
        image: null,
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0
      }
    });
  };

  const showCategories = () => {
    setCategory(null);
  };

  React.useEffect(() => {
    const filtered = images.filter((img:Image) => img.cat === category?.name);
    setCategoryImages(filtered);
  }, [category, images]);

  return (
    <div>
      {/* Top */}
      <div className="flex items-center justify-between">
        <span className="text-sm">
          {categories.length} {categoryImages.length > 0 && `/ ${categoryImages.length}`}
        </span>
        <button
          onClick={showCategories}
          className="p-2 rounded-full hover:bg-gray-700 active:opacity-80 focus:outline-none"
        >
          <BsList />
        </button>
      </div>

      {/* Categories */}
      {category === null &&
        <div className="flex flex-wrap">
          {categories.map((cat:Category) =>
            <div
              key={cat.name}
              onClick={() => setCategory(cat)}
              className="w-1/3 h-16 p-2 flex items-center justify-center border border-transparent hover:border-gray-500 active:border-gray-300 cursor-pointer rounded-sm"
            >
              <img src={cat.image} alt="" className="max-w-full max-h-full"/>
            </div>
          )}
        </div>
      }

      {/* CategoryImage list */}
      {category && categoryImages.length > 0 &&
        <div className="flex flex-wrap">
          {categoryImages.map(img =>
            <div
              draggable
              key={img.name}
              onDragStart={e => dragStart(e, img)}
              onDragEnd={dragEnd}
              className="w-1/3 h-16 p-2 flex items-center justify-center border border-transparent hover:border-gray-500 active:border-gray-300 cursor-pointer rounded-sm"
            >
              <img src={img.image} alt="" className="max-w-full max-h-full pointer-events-none"/>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default ImageList;