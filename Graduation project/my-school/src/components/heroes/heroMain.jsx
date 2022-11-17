/* eslint-disable no-unused-vars */
// import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const HeroMain = (props) => {
  return (
    <section className={`${style.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      <div>
        <h1>Hero</h1>
      </div>
    </section>
  );
};

HeroMain.propTypes = {};

export default HeroMain;
