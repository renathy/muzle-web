import { atom } from "recoil";

export interface Game {
  id: number;
  name: string;
  description: string;
}

interface GameState {
  init: boolean;
  games: Game[];
}

const gameAtom = atom({
  key: 'gameState',
  default: {
    init: false,
    games: []
  } as GameState,
});

export default gameAtom;