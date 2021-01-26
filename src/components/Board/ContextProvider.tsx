import React from "react";
import { fabric } from "fabric";
import data from "data";
import { Background, Nav, GameData } from "./Constant";

export interface BoardState {
  canvas: fabric.Canvas | null;
  nav: Nav;
  background: Background | null;
  dragItem: any;
  width: number;
  height: number;
  data: GameData;
  showHelper: Boolean;
}

export interface BoardContext {
  state: any;
  setState(state: any): void;
}

export const Context = React.createContext<BoardContext>({
  state: null,
  setState: () => { },
});

const ContextProvider: React.FC<any> = ({ children }: any) => {
  const [state, setState] = React.useState<BoardState>({
    canvas: null,
    nav: Nav.Image,
    background: data.backgrounds[0],
    dragItem: {},
    width: 800,
    height: 600,
    data,
    showHelper: false
  });

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
