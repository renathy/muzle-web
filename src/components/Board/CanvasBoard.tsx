import React from "react";
import { fabric } from "fabric";
import { Context } from "./ContextProvider";

const CanvasBoard: React.FC = () => {
  const { state, setState } = React.useContext(Context);
  const { canvas, background, dragItem, width, height } = state;

  React.useEffect(() => {
    if (state.canvas === null) {
      const canvas = new fabric.Canvas("canvas", {
        width: 0,
        height: 0,
      });
      setState({
        ...state,
        canvas
      });
    }
  }, [state, setState]);

  React.useEffect(() => {
    if (canvas && background) {
      canvas.setWidth(width);
      canvas.setHeight(height);
      const backgroundImageUrl = `${process.env.REACT_APP_SERVER}storage/${background.src}`;
      fabric.Image.fromURL(backgroundImageUrl, (img) => {
        if (img.width && img.height) {
          const xR = width / img.width;
          const yR = height / img.height;
          const mR = Math.max(xR, yR);
          canvas.setBackgroundImage(
            backgroundImageUrl,
            canvas.renderAll.bind(canvas),
            {
              originX: "left",
              originY: "top",
              scaleX: mR,
              scaleY: mR,
            }
          );
        }
      });
    }
  }, [canvas, width, height, background]);

  const handleDrop = (event: any) => {
    if (canvas && dragItem.type) {
      const canvasOffset = event.target.getBoundingClientRect();
      const x = event.clientX - (canvasOffset.left + dragItem.offsetX);
      const y = event.clientY - (canvasOffset.top + dragItem.offsetY);

      if (dragItem.type === "image") {
        const imageUrl = `${process.env.REACT_APP_SERVER}storage/${dragItem.object.src}`;
        fabric.Image.fromURL(imageUrl, (img) => {
          if (img.width) {
            const scale = dragItem.width / img.width;
            img.set({
              left: x,
              top: y,
              scaleX: scale,
              scaleY: scale,
            });
            canvas.add(img).renderAll.bind(canvas);
            canvas.setActiveObject(img);
          }
        });
      }

      if (dragItem.type === "line") {
        console.log('drag');

        const lineDefaultWidth = 65;
        const lineDefaultHeight = 16;
        const arrowDefaultHeight = 36;          
        const arrowDefaultWidth = 36;      
        
        const rectangle = new fabric.Rect({
          left: x,
          top: y,
          fill: dragItem.object.color,
          width: lineDefaultWidth,
          height: lineDefaultHeight,
          originY: 'center',
          originX: 'center'
        });

        const triangleLeft = lineDefaultWidth / 2 + x;         

        const triangle = new fabric.Triangle({
          width: arrowDefaultHeight,  //triangle is rotated and height becomes width         
          height: arrowDefaultWidth, //triangle is rotated and height becomes width 
          originX: 'center',
          originY: 'center',
          left: triangleLeft,
          top: y, 
          fill: dragItem.object.color,
          angle: 90
        });

        const  group = new fabric.Group([rectangle, triangle]);

        canvas.add(group);
        canvas.setActiveObject(group);
      }

      if (dragItem.type === "circle") {
        const circle = new fabric.Circle({
          left: x,
          top: y,
          radius: 15, //todo: use dragitem.with, but it should be circle width not wrapper
          fill: dragItem.object.color,
        });
        canvas.add(circle).renderAll.bind(canvas);
        canvas.setActiveObject(circle);
      }
    }
  };

  return (
    <div
      onDrop={(event) => handleDrop(event)}
      className="relative"
    >
      <canvas id="canvas" />
      {state.showHelper &&
        <div className="absolute top-0 left-0 w-full h-full p-2 flex items-center justify-center">
          <img src={state.data.helper} alt="" className="max-w-full max-h-full rounded-md overflow-hidden" />
        </div>
      }
    </div>
  );
};

export default CanvasBoard;
