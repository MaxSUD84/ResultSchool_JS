/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Components
import Title from "../elems/title";
import CalendarCard from "../cards/calendarCard";
// Styles
import style from "../../styles/styles";
// Icons
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Utils
import { getTextNameMonth } from "../../utils/dateCalculation";
// Hooks
import { useStatic } from "../../hooks/useStatic";

const CalendarEventsList = (props) => {
  const { events } = useStatic();
  const [position, setPosition] = useState(0);
  const windowSize = 5;

  if (!events.length) return;

  const shiftLeft = () => {
    setPosition((p) => (p ? p - 1 : 0));
  };

  const shiftRigth = (max) => {
    setPosition((p) => (p < max - windowSize - 1 ? p + 1 : max - windowSize));
  };

  const shortArr = events.slice(position, position + windowSize);
  const firstMoth = new Date(shortArr.slice(0, 1)[0].timestamp).getMonth();
  const lastMoth = new Date(shortArr.slice(-1)[0].timestamp).getMonth();

  return (
    <section className={`${style.flexCenterCol} flex-wrap mb-6`}>
      {events ? (
        <div className={`${style.boxWidth} flex-col flex-1 ${style.paddingX}`}>
          <Title title_1="Календарь " title_2=" событий" styleType={1}>
            <FaCalendarAlt className="m-2 h-8 w-8 text-slate-400" />
          </Title>
          <div className="flex flex-row justify-between m-2 h-6">
            <div className="ml-3">
              <p className="text-l font-semibold text-primary-2 select-none ">
                {getTextNameMonth(firstMoth) || ""}
              </p>
            </div>
            <div className="mr-3">
              <p className="text-l font-semibold text-primary-2 select-none ">
                {getTextNameMonth(lastMoth) || ""}
              </p>
            </div>
          </div>
          <div className="flex flex-nowrap justify-evenly md:gap-2 gap-1 md:h-36 h-3/12">
            <div
              className={`flex justify-center items-center w-16 rounded-lg shadow-lg border-2 border-sky-200
            bg-gradient-to-r from-stone-50 to-sky-100`}
              onClick={shiftLeft}
            >
              <FaChevronLeft className="w-8 h-8" />
            </div>
            {shortArr.map((event) => {
              return (
                <CalendarCard
                  styleType={0}
                  key={event.id}
                  date={new Date(event.timestamp).getDate()}
                  eventTitle={event.event}
                />
              );
            })}
            <div
              className={`flex justify-center items-center w-16 rounded-lg shadow-lg border-2 border-sky-200
            bg-gradient-to-r from-sky-100 to-stone-50`}
              onClick={() => shiftRigth(events.length)}
            >
              <FaChevronRight className="w-8 h-8" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

CalendarEventsList.propTypes = {};

export default CalendarEventsList;
