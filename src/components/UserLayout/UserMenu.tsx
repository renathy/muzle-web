import React from "react";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import api from "api";
import "@szhsin/react-menu/dist/index.css";
import authAtom from "atoms/auth";
import { useRecoilValue } from "recoil";
import { FaUser, FaSignOutAlt } from 'react-icons/fa';


const UserMenu: React.FC = () => {

  const authState = useRecoilValue(authAtom);
  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  const logout = async () => {
    const response = await api.post('api/auth/logout');
    if (response.status === 200) {
      window.location.href = '/login';
    } else {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <React.Fragment>
      <div className="px-2 italic">
        {authState.user?.name}
      </div>
      <button type="button" className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
        ref={ref}
        onClick={() => setOpen(true)}

      >
        <FaUser />
      </button>
     
      <ControlledMenu align="end" anchorRef={ref} isOpen={isOpen} onClose={() => setOpen(false)} >
        <MenuItem styles={{ padding: 0 }}>
          <div
            className="w-full flex"
            style={{ padding: '0.375rem 1.5rem' }}
            onClick={logout}
          >
            <FaSignOutAlt /> Iziet
          </div>
          {/* <div
            className="w-full"
            style={{ padding: '0.375rem 1.5rem' }}
            onClick={logout}
          >
            Profils
          </div> */}
        </MenuItem>
      </ControlledMenu>
    </React.Fragment>
  );
};

export default UserMenu;