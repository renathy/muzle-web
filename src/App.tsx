import React from "react";
import Board from "components/Board";
import data from "./data";

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="flex-shrink-0 h-16 bg-gray-900 text-white flex items-center px-8">
        <h1 className="text-xl">Playground for Children</h1>
      </header>
      <main className="flex-grow overflow-auto">
        <Board data={data} />
      </main>
    </div>
  );
}

export default App;
