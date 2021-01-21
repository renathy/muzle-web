import React from "react";
import { Background, Nav, GameData } from "./Constant";
import data from "data";

export interface BoardState {
  canvas: fabric.Canvas | null;
  nav: Nav;
  background: Background | null;
  dragItem: any;
  width: number;
  height: number;
  data: GameData;
};

export interface BoardContext {
  state: any;
  setState(state:any): void;
};

export const Context = React.createContext<BoardContext>({
  state: null,
  setState: () => {}
});

const ContextProvider: React.FC<any> = ({ children }) => {

  const [state, setState] = React.useState<BoardState>({
    canvas: null,
    nav: Nav.Image,
    background: data.backgrounds[0],
    dragItem: {},
    width: 800,
    height: 600,
    data
  });

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;