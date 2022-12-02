/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Title from "../articles/title";
import style from "../../styles/styles";
import { newspaper } from "../../assets/icons";

const MainTopNewsList = (props) => {
  return (
    <section className={`${style.flexCenter} flex-col flex-wrap sm:mb-20 mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        <Title
          // className={`${style.paddingX} left-4`}
          title_1="MainTop"
          title_2="NewsList"
        >
          <img
            src={newspaper}
            alt="newspaper"
            className={`w-[36px] h-[36px] object-contain m-4`}
          />
        </Title>
        <div className="bg-primary-500 border-blue-300 text-light">
          bg-primary
        </div>
      </div>
    </section>
  );
};

MainTopNewsList.propTypes = {};

export default MainTopNewsList;
