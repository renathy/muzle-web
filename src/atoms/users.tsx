import { atom } from "recoil";

interface User {
  id: number;
  name: string;
  nickname: string;
  role: string;
  tenant_id: string;
}

interface UserState {
  init: boolean;
  users: User[];
}

const userAtom = atom({
  key: 'userState',
  default: {
    init: false,
    users: []
  } as UserState,
});

export default userAtom;