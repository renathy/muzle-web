import React from "react";
import { Context } from "../ContextProvider";
import { Nav } from "../Constant";
import Navigation from "./Navigation";
import ControlTab from "./ControlTab";
import ObjectTab from "./ObjectTab";

const Board: React.FC = () => {

  const { state } = React.useContext(Context);
  const { nav } = state;

  return (
    <div>
      <div className="mb-4">
        <Navigation />
      </div>
      <div className="p-2 space-y-4">
        {nav === Nav.Image &&
          <ObjectTab />
        }
        {nav === Nav.Control &&
          <ControlTab />
        }
      </div>
    </div>
  );
}

export default Board;