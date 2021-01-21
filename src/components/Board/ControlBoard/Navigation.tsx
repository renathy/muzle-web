import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaCogs } from "react-icons/fa";
import { Context } from "../ContextProvider";
import { Nav } from "../Constant";

const navOptions = [
  {
    name: Nav.Image,
    Icon: BiImageAdd
  },
  {
    name: Nav.Control,
    Icon: FaCogs
  },
];

const Navigation: React.FC = () => {

  const {state, setState} = React.useContext(Context);

  const handleChange = (name: Nav) => {
    setState({
      ...state,
      nav: name
    });
  };

  return (
    <div className="flex">
      {navOptions.map(({name, Icon}) =>
        <div className={name === state.nav ? 'bg-gray-800' : 'text-gray-500 hover:text-gray-300'} key={name}>
          <div
            onClick={() => handleChange(name)}
            className="w-12 h-12 flex items-center justify-center text-2xl cursor-pointer"
          >
            <Icon />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;