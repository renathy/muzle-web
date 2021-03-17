import React from "react";
import { fabric } from "fabric";
import { Background, Nav, GameData } from "./Constant";
import { isNullOrUndefined } from "util";

export interface BoardState {
  canvas: fabric.Canvas | null;
  nav: Nav;
  background: Background | null;
  dragItem: any;
  width: number;
  height: number;
  data: GameData | null;
  showHelper: Boolean;
}

export interface BoardContext {
  state: any;
  setState(state: any): void;
}

export const Context = React.createContext<any>(null);

const ContextProvider: React.FC<any> = ({ children }: any) => {
  const [state, setState] = React.useState<BoardState>({
    canvas: null,
    nav: Nav.Image,
    background: null,
    dragItem: {},
    width: 900,
    height: 600,
    data: null,
    showHelper: false
  });

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
