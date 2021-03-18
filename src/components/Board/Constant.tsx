export interface Background {
  id: number;
  name: string;
  src: string;
  thumb_src: string;
}

export interface Image {
  id: number;
  name: string;
  src: string;
  category_id: number;
}

export interface Category {
  id: number;
  name: string;
  src: string;
  images: Image[];
}

export interface Game {
  name: string;
  description: string;
  helper: string;
}

export interface GameData {
  game: Game;
  backgrounds: Background[];
  categories: Category[];
}

export enum Nav {
  Image,
  Shape,
  Text,
  Control,
}
