import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

interface Props {
  style: any;
  children: any;
}

const CustomScroll: React.FC<Props> = ({ ...props }) => {
  const renderView = ({ style, ...props }: any) => {
    const viewStyle = {
      padding: 15,
    };
    return <div style={{ ...style, ...viewStyle }} {...props} />;
  };

  const renderThumb = ({ style, ...props }: any) => {
    const thumbStyle = {
      backgroundColor: "rgba(255,255,255,.5)",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <Scrollbars
      autoHide
      renderView={renderView}
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  );
};

export default CustomScroll;
