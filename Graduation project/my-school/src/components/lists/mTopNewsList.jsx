/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Title from "../articles/title";
import style from "../../styles/styles";
import TopNewsCard from "../cards/mTopNewsCard";

import { Newspaper } from "../../assets/icons/newspaper";
import { topNews } from "../../assets/staticData/topNews";

const MainTopNewsList = (props) => {
  return (
    <section className={`${style.flexCenter} flex-col flex-wrap sm:mb-10 mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        <Title className={`p-20`} title_1="MainTop" title_2="NewsList">
          <Newspaper
            width={"32px"}
            height={"32px"}
            strokeColor={"green"}
            style="p-2"
          />
        </Title>
        <div className="flex flex-wrap justify-evenly">
          {topNews.map((_new) => {
            return (
              <TopNewsCard
                key={_new.id}
                title={_new.title}
                date={_new.date}
                shortText={_new.shortText}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

MainTopNewsList.propTypes = {};

export default MainTopNewsList;
