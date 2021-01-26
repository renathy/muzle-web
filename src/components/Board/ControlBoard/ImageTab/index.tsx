import React from "react";
import BackgroundList from "./BackgroundList";
import ImageList from "./ImageList";
import Helper from "./Helper";

const ObjectTab: React.FC = () => {
  return (
    <React.Fragment>
      <BackgroundList />
      <ImageList />
      <Helper />
    </React.Fragment>
  );
};

export default ObjectTab;
