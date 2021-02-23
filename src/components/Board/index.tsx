import React from "react";
import ContextProvider from "./ContextProvider";
import Container from "./container";

const Board: React.FC<any> = ({ data }) => {
  return (
    <ContextProvider>
      <Container data={data} />
    </ContextProvider>
  );
};

export default Board;
