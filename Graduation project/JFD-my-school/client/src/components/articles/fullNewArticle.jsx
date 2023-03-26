/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const FullNewArticle = ({ typeOrientation, children }) => {
  return (
    <>
      <div className={`grid grid-cols-3 gap-4`}>{children}</div>
      {/* {typeOrientation ? (
      ) : (
        <div className={`${style.flexStart} flex-row-reverse`}>
          <h1>Detail New</h1>
        </div>
      )} */}
    </>
  );
};

FullNewArticle.default = {
  typeOrientation: false
};

FullNewArticle.propTypes = {
  typeOrientation: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default FullNewArticle;
