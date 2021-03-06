import React from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import clsx from "clsx";
import navList from "./navList";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";

const AuthLayout: React.FC = ({ children }) => {

  const [mobileMenu, setMobileMenu] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setMobileMenu(false);
      }
    });
  }, [setMobileMenu]);

  return (
    <div className={clsx('flex h-screen bg-gray-50 transition-transform md:transition-none transform', { 'translate-x-64': mobileMenu })}>

      {/* Desktop sidemenu */}
      <aside className="z-20 w-64 h-full overflow-y-auto bg-yellow-900 text-white flex-shrink-0 absolute -left-64 md:relative md:left-0">
        <div className="py-4">
          <div className="flex justify-center py-6">
            <img className="w-32" src="/logo.png" alt="" />
          </div>
          <ul className="mt-6">
            {navList.map(nav =>
              <NavLink key={nav.path} data={nav} />
            )}
          </ul>
        </div>
      </aside>

      {/* Mobile sidemenu */}

      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 h-16 bg-white shadow1">
          <div className="flex items-center h-full px-6">
            {/* Mobile hamburger */}
            <button
              className="h-10 w-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-md md:hidden focus:outline-none"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <AiOutlineMenu />
            </button>
            {/* space */}
            <div className="flex-grow"></div>
            {/* user menu */}
            <UserMenu />
          </div>
        </header>
        <main className="h-full overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;