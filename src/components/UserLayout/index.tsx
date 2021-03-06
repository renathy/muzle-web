import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import navList from "./navList";
import UserMenu from "./UserMenu";

const UserLayout: React.FC = ({ children }) => {

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
      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 h-16 bg-yellow-900 text-white shadow1">
          <div className="container max-w-screen-lg mx-auto flex items-center h-full">
            {/* logo */}
            <Link to="/user">
              <img className="h-8" src="/logo.png" alt="" />
            </Link>
            {/* navs */}
            <div className="pl-8 space-x-2 h-full flex">
              {navList.map(nav =>
                <Link className="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800" to={nav.path} key={nav.title}>
                  {nav.title}
                </Link>
              )}
            </div>
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

export default UserLayout;