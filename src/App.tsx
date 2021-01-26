import React from "react";
import Board from "components/Board";
import data from "./data";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img className="block h-8 w-20" src="logo.png" alt="Muzle" />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <img className="h-8 w-8 rounded-full" src="user.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <header className="flex-shrink-0 h-16 bg-gray-900 text-white flex items-center px-8">
        <h1 className="text-xl">Playground for Children</h1>
      </header> */}
      <main className="flex-grow overflow-auto">
        <Board data={data} />
      </main>
    </div>
  );
};

export default App;
