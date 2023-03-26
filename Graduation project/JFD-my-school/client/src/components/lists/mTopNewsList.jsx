/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
// Style
import style from "../../styles/styles";
// Components
import Title from "../elems/title";
import TopNewsCard from "../cards/mTopNewsCard";
// Icons
import { FaNewspaper } from "react-icons/fa";
// Hooks
import { useStatic } from "../../hooks/useStatic";

const MainTopNewsList = (props) => {
  const { news } = useStatic();

  return (
    <section className={`${style.flexCenterCol} flex-wrap mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        <Title title_1="Главные новости" title_2="" styleType={1}>
          <FaNewspaper className="m-2 w-8 h-8 text-slate-400" />
        </Title>
        <div className="flex flex-wrap justify-evenly">
          {news.map((_new) => {
            return <TopNewsCard key={_new.id} {..._new} />;
          })}
        </div>
      </div>
    </section>
  );
};

MainTopNewsList.propTypes = {};

export default MainTopNewsList;
