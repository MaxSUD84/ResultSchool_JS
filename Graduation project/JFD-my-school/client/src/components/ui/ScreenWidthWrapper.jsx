// import React from "react";
import PropTypes from "prop-types";

const ScreenWidthWrapper = ({ children }) => {
  return (
    <div className="relative max-w-7xl px-4 sm:px-6 md:px-8 w-full mx-auto">
      {children}
    </div>
  );
};

ScreenWidthWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ScreenWidthWrapper;
