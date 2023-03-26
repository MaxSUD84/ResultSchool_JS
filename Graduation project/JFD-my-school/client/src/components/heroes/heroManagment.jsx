/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

// Styles
import style from "../../styles/styles";
import styles from "./heroes.module.scss";
// Config
import cfg from "../../config.json";

const HeroManagment = (props) => {
  return (
    <section className={styles.flexCenterCol}>
      <div className={`${styles.boxWidth} ${styles.paddingX} flex-row flex-1`}>
        {/* <h1 className={`${style.heading2} items-start`}>Hero</h1> */}
        <div className={styles.block}>
          <div className={`grid grid-cols-2 gap-4 `}>
            <div className="w-fit justify-center">
              <img
                src={`${cfg.apiEndpoint}api/static/others/DirectorAvatar.jpg`}
              />
            </div>
            <div className="w-auto flex flex-col">
              <h3 className=" flex flex-row text-xl justify-center font-body mb-4">
                Создатель Школы
              </h3>
              <p>
                {`
                Содатель сайта - Голодов Максим (GMV), бывший
                инженер-программист АСУ ТП, ныне руководитель проектов, участник
                команды по созданию систем 'цифровых двойников' технологического
                обрудования и процессов.
              `}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroManagment.propTypes = {};

export default HeroManagment;
