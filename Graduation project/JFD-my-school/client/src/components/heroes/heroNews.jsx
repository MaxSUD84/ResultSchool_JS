/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Style
import style from "../../styles/styles";
// Component
import Title from "../elems/title";
import TopNewsCard from "../cards/mTopNewsCard";
// Icons
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
// Hooks
import { useStatic } from "../../hooks/useStatic";
// Config
import cfg from "../../config.json";

const HeroNews = (props) => {
  const { news } = useStatic();

  const [selectedNews, setSelectedNews] = useState({});

  const [position, setPosition] = useState(0);
  const windowSize = 3;
  const shortArr = news.slice(position, position + windowSize);

  useEffect(() => {
    if (shortArr.length && !selectedNews.id) {
      setSelectedNews(shortArr[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerShiftLeft = () => {
    setPosition((p) => (p ? p - 1 : 0));
  };

  const handlerShiftRigth = (max) => {
    setPosition((p) => (p < max - windowSize - 1 ? p + 1 : max - windowSize));
  };

  const handlerChooseNews = (id) => {
    // console.log(id, shortArr.length);
    if (!shortArr.length || !id) return {};
    const elem = shortArr.find((n) => n.id === id);
    setSelectedNews(elem);
  };

  if (!news.length && !shortArr.length) return;

  return (
    <section className={`flex-col ${style.flexCenterCol} mb-2`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        {/* <h1 className={`${style.heading2} items-start`}>Hero</h1> */}
        <Title title_1="Новости и" title_2="события" styleType={0} />
        <div className="space-y-0 justify-center items-center mb-3">
          <div className={`flex-col ${style.flexCenterCol} space-y-1 `}>
            <img
              src={
                selectedNews?.img?.startsWith("http")
                  ? "https://fakeimg.pl/1230x400/?text=Hero images&font=lobster"
                  : cfg.apiEndpoint + selectedNews.img
              }
            />
            <h2 className={`${style.heading0}`}>
              {selectedNews.title + " "}
              <p className={`${style.paragraph} flex justify-end mb-1`}>
                {selectedNews.date}
              </p>
            </h2>
            <p className={`${style.paragraph0}`}>{selectedNews.shortText}</p>
          </div>
        </div>
      </div>
      {/* *** Слайдер новостей *** */}
      <div
        className={`${style.boxWidth} flex flex-row justify-center ${style.paddingX} py-2`}
      >
        <div
          className={`flex flex-col justify-center items-center ${style.padding}`}
        >
          <FaArrowAltCircleLeft
            className="w-8 h-8 text-primary-2"
            onClick={() => handlerShiftLeft()}
          />
        </div>
        {shortArr.map((_new) => (
          <TopNewsCard key={_new.id} onClick={handlerChooseNews} {..._new} />
        ))}
        <div
          className={`flex flex-col justify-center items-center ${style.padding}`}
        >
          <FaArrowAltCircleRight
            className="w-8 h-8 text-primary-2"
            onClick={() => handlerShiftRigth(news.length)}
          />
        </div>
      </div>
      <div
        className={` ${style.boxWidth} ${style.paddingX} h-[2px] w-[100%] bg-primary-1`}
      />
    </section>
  );
};

HeroNews.propTypes = {};

export default HeroNews;
