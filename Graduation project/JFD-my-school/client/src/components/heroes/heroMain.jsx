/* eslint-disable no-unused-vars */
// import React from "react";
import PropTypes from "prop-types";
// Components
import Title from "../elems/title";
// Styles
import style from "../../styles/styles";
// Config
import cfg from "../../config.json";
// Others
// import markdown from "../../My-School.md";

const HeroMain = (props) => {
  return (
    <section className={`flex-col ${style.flexCenterCol} mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        {/* <h1 className={`${style.heading2} items-start`}>Hero</h1> */}
        <Title title_1="Описание проекта" title_2="" styleType={2} />
        <div className="space-y-0 justify-center items-center">
          <div className={`flex-col ${style.flexCenterCol} space-y-1 `}>
            <img
              src={`${cfg.apiEndpoint}api/static/others/classroom_detail_high.jpg`}
            />
            <h2 className={`${style.heading2}`}>Моя школа</h2>
            <div className="text-lg font-normal">
              <p>
                Дипломныый проект Голодова Максима. Сайт школы - это веб-сайт
                школы с возможностями электронного дневника. Имеет три уровня
                доступа (общедоступный, ученик, учитель). Реализован функционал
                предметных журналов, выставления оценок. Назначения домашних
                заданий. Получение оценок и просмотр домашних заданий.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroMain.propTypes = {};

export default HeroMain;
