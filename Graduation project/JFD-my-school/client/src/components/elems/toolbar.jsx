/* eslint-disable multiline-ternary */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { nanoid } from "nanoid";
import { motion, AnimatePresence } from "framer-motion";
import { Navigate } from "react-router-dom";

// Component
import Title from "../elems/title";

// Static data
import { learnerTabs } from "../../assets/staticData/userStaticData";

// Style
import style from "../../styles/styles";

const Toolbar = ({ class_uuid }) => {
  const [selectedTab, setSelectedTab] = useState(learnerTabs[0]);

  return (
    <section className={`${style.flexCenterCol} mb-6`}>
      <div className={`${style.boxWidth} ${style.paddingX}`}>
        <Title title_1={"Учебная информация"} styleType={2} />
        <div className="flex flex-row gap-2 border-b-3 border-slate-700">
          {learnerTabs.map((tab) => {
            return (
              <div
                key={tab.id}
                className={`
                      rounded-t-md 
                      ring-[1px] ring-primary-2
                      hover:shadow-md hover:shadow-blue-400 hover:bg-blue-50
                      flex flex-row text-lg select-none
                      ${tab === selectedTab ? "bg-green-100" : ""}
                    `}
                onClick={() => setSelectedTab(tab)}
              >
                <div className="md:block hidden m-3">{tab.t.icon}</div>
                <p className="my-3 mr-3 sm:text-sm sm:px-2 font-semibold ">
                  {tab.t.label}
                </p>
              </div>
            );
          })}
        </div>
        <hr className="border my-2 border-slate-400" />
        {/* // Анимация вкладок */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.t.label : "empty"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedTab ? (
              selectedTab.t.label === "Класс" ? (
                <Navigate to={`../${class_uuid}`} />
              ) : (
                selectedTab.s.link
              )
            ) : (
              "😋"
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

Toolbar.propTypes = {
  class_uuid: PropTypes.string.isRequired,
};

export default Toolbar;
