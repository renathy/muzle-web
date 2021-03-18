import React from "react";
import { Context } from "../ContextProvider";

const objectWrapper =
  "w-1/2 h-16 py-2 px-2 flex items-center justify-center border border-transparent hover:border-gray-500 cursor-pointer rounded-sm";

const ShapeTab: React.FC = () => {
  const { state, setState } = React.useContext(Context);

  const dragStart = (event: any, type: String, color: String) => {
    const objectSize = event.target.getBoundingClientRect();    
    setState({
      ...state,
      dragItem: {
        type,
        object: {
          color,
        },
        offsetX: event.clientX - objectSize.left,
        offsetY: event.clientY - objectSize.top,

        width: objectSize.width, //for circle only
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

  return (
    <div className="flex flex-wrap">
      <div
        className={objectWrapper}
        draggable
        onDragStart={(e) => dragStart(e, "line", "#00E7FF")}
        onDragEnd={dragEnd}
      >
        <img src="/img/arrowblue.png" alt="" className="max-w-full max-h-full" />        
      </div>
      <div
        className={objectWrapper}
        draggable
        onDragStart={(e) => dragStart(e, "line", "#DC2626")}
        onDragEnd={dragEnd}
      >
        <img src="/img/arrowred.png" alt="" className="max-w-full max-h-full" />        
      </div>
      <div
        className={objectWrapper}
        draggable
        onDragStart={(e) => dragStart(e, "circle", "#22D3EE")}
        onDragEnd={dragEnd}
      >
        <div className="w-4 h-4 rounded-full bg-indigo-200"></div>
      </div>
      <div
        className={objectWrapper}
        draggable
        onDragStart={(e) => dragStart(e, "circle", "#DC2626")}
        onDragEnd={dragEnd}
      >
        <div className="w-4 h-4 rounded-full bg-red-600"></div>
      </div>
    </div>
  );
};

export default ShapeTab;
