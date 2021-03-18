import React from "react";
import { Context } from "../ContextProvider";
import { Nav } from "../Constant";
import Navigation from "./Navigation";
import ImageTab from "./ImageTab";
import ShapeTab from "./ShapeTab";
import TextTab from "./TextTab";
import ControlTab from "./ControlTab";

const Board: React.FC = () => {
  const { state } = React.useContext(Context);
  const { nav } = state;

  return (
    <div className="select-none">
      <div className="mb-4">
        <Navigation />
      </div>
      <div className="p-2 space-y-4">
        {nav === Nav.Image && <ImageTab />}
        {nav === Nav.Shape && <ShapeTab />}
        {nav === Nav.Text && <TextTab />}
        {nav === Nav.Control && <ControlTab />}
      </div>
    </div>
  );
};

export default Board;
