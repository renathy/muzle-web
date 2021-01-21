export interface Background {
  key: string;
  image: string;
  thumb: string;
};

export interface Image {
  cat: string;
  image: string;
  name: string;
};

export interface Category {
  name: string;
  image: string;
};

export interface GameData {
  name: string;
  backgrounds: Background[];
  categories: Category[];
  images: Image[];
};

export enum Nav {
  Image,
  Control
};