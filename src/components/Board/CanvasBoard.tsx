import React from "react";
import { fabric } from "fabric";
import { Context } from "./ContextProvider";

const CanvasBoard: React.FC = () => {

  const { state, setState } = React.useContext(Context);
  const { canvas, background, dragItem, width, height } = state;

  React.useEffect(() => {
    const c = new fabric.Canvas('canvas', {
      width: 0,
      height: 0,
    });
    setState({
      ...state,
      canvas: c
    });
  }, []);

  React.useEffect(() => {
    if (canvas && background) {
      canvas.setWidth(width);
      canvas.setHeight(height);
      fabric.Image.fromURL(background.image, (img) => {
        if (img.width && img.height) {
          const xR = width / img.width;
          const yR = height / img.height;
          const mR = Math.max(xR, yR);
          canvas.setBackgroundImage(background.image, canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top',
            scaleX: mR,
            scaleY: mR
          });
        }
      });
    }
  }, [canvas, width, height, background]);

  const handleDrop = (event: any) => {
    if (canvas && dragItem.type) {
      const canvasOffset = event.target.getBoundingClientRect();
      var x = event.clientX - (canvasOffset.left + dragItem.offsetX);
      var y = event.clientY - (canvasOffset.top + dragItem.offsetY);

      if (dragItem.type === 'image') {
        fabric.Image.fromURL(dragItem.object.image, function (img) {
          if (img.width) {
            const scale = dragItem.width / img.width;
            img.set({
              left: x,
              top: y,
              scaleX: scale,
              scaleY: scale,
            });
            canvas.add(img).renderAll.bind(canvas);
          }
        });
      }

      if (dragItem.type === 'line') {

      }

      if (dragItem.type === 'circle') {

      }
    }
  };

  return (
    <div onDrop={event => handleDrop(event)}>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default CanvasBoard;