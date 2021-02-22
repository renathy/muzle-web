import { atom } from "recoil";

const layoutAtom = atom({
  key: 'layoutState',
  default: {
    isSideMenuOpen: false
  },
});

export default layoutAtom;