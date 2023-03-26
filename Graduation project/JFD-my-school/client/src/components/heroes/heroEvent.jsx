/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */

import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import cfg from "../../config.json";

// Icons
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// Styles
import style, { layout } from "../../styles/styles";

// Components
import Title from "../elems/title";
import DateSlider from "../elems/dateSlider";

// Utils
import {
  createArrayMonth,
  getTextNameMonth,
} from "../../utils/dateCalculation";

// Hooks
import { useStatic } from "../../hooks/useStatic";

// Function
function getTextDate(Date) {
  return Date
    ? `${Date.getDate()} ${getTextNameMonth(
        Date.getMonth()
      )} ${Date.getFullYear()}`
    : "";
}

const HeroEvent = () => {
  const { events } = useStatic();
  const [monthYear, setMonthYear] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [eventView, setEventView] = useState({});
  const [advDayArray, setAdvDayArray] = useState([]);

  useEffect(() => {
    const dayArray = createArrayMonth(monthYear.month, monthYear.year);
    const _advDayArray = dayArray.map((day) => {
      const tDay = day.timestamp.getDate();
      const tMonth = day.timestamp.getMonth();
      const tYear = day.timestamp.getFullYear();
      let EventInThisDay = events.find((event) => {
        const checkDate = new Date(event.timestamp);
        checkDate.setHours(0, 0, 0);
        //   console.log(checkDate, new Date(tYear, tMonth, tDay));
        return (
          checkDate.toString() ===
          new Date(tYear, tMonth, tDay, 0, 0, 0).toString()
        );
      });
      if (!EventInThisDay) {
        EventInThisDay = {
          id: nanoid(),
          timestamp: new Date(tYear, tMonth, tDay, 0, 0, 0),
          duration: 0,
          event: "",
          location: "",
          shortInfo: "Событий не запланированно",
          img: "https://fakeimg.pl/830x400/?text=Event image&font=roboto",
        };
      }

      return {
        ...day,
        ...EventInThisDay,
      };
    });
    setAdvDayArray(_advDayArray);
  }, [monthYear]);

  // Детализируем первое событие в месяце
  useEffect(() => {
    if (advDayArray.length && JSON.stringify(eventView) === "{}") {
      // *** устанавливаем первое собыие ***
      if (advDayArray.length) {
        let i = 0;
        while (JSON.stringify(eventView) === "{}" && i < advDayArray.length) {
          if (advDayArray[i].event !== "") {
            setEventView(advDayArray[i]);
            break;
          } else if (i + 1 >= advDayArray.length) {
            setEventView(advDayArray.find((D) => D.day === 1));
          }
          i++;
        }
      }
    }
  }, [advDayArray, eventView]);

  const handlerMonthPrev = () => {
    setMonthYear((prev) => ({
      month: prev.month ? prev.month - 1 : 11,
      year: prev.month ? prev.year : prev.year - 1,
    }));
  };

  const handlerMonthNext = () => {
    setMonthYear((prev) => ({
      month: prev.month > 10 ? 0 : prev.month + 1,
      year: prev.month > 10 ? prev.year + 1 : prev.year,
    }));
  };

  const handlerChooseEvent = (id) => {
    // console.log(id, shortArr.length);
    if (!advDayArray.length || !id) return {};
    const elem = advDayArray.find((n) => n.id === id);
    setEventView(elem);
  };

  if (!eventView && advDayArray.length) return "";

  return (
    <section className={`flex-col ${style.flexCenterCol} mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        {/* <h1 className={`${style.heading2} items-start`}>Hero</h1> */}
        <Title title_1="События" title_2="" styleType={2} />
        <div className={`${layout.section} gap-4`}>
          <div className={`${style.flexCenterCol} space-y-1 basis-2/3`}>
            <img
              src={
                eventView?.img?.startsWith("http")
                  ? eventView.img
                  : cfg.apiEndpoint + eventView.img
              }
            />
          </div>
          <div className={`${style.flexEndCol}  basis-1/3`}>
            <h2 className={`${style.heading0} flex justify-end mb-1`}>
              {eventView.event}
            </h2>
            <p className={`${style.paragraph} flex justify-end mb-2`}>
              {getTextDate(new Date(eventView.timestamp))}
            </p>
            <p className={`${style.paragraph0} mb-4`}>{eventView.shortInfo}</p>
            <div className="flex flex-col justify-end">
              {eventView.event !== "" ? (
                <>
                  <p className={`${style.paragraph} font-semibold mb-1`}>
                    Место проведение мероприятия:
                  </p>
                  <div
                    className={`${style.paragraph0} font-semibold flex justify-end`}
                  >
                    {eventView.location}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <DateSlider
          middleLabel={`${getTextNameMonth(monthYear.month)} ${monthYear.year}`}
          handlerLeftClk={handlerMonthPrev}
          handlerRigthClk={handlerMonthNext}
        />

        <div
          className={`${style.boxWidth} ${style.paddingX} flex flex-row justify-center flex-wrap gap-2 h-fit`}
        >
          {advDayArray.map((day) => {
            //   const _key = `key_${Math.random() * 1000}${day.day}`;
            return (
              <div
                key={day.id}
                className={`flex flex-col w-[12.2%] shrink rounded border-spacing-1 ring-2 
            ${
              day.style === 0
                ? "ring-slate-200 bg-zinc-50 opacity-70"
                : day.style === 2
                ? "ring-red-300 bg-red-50"
                : "ring-slate-400 bg-slate-100"
              // eslint-disable-next-line indent
            }`}
                onClick={() => handlerChooseEvent(day.id)}
              >
                <div className="flex justify-end">
                  <p className="text-3xl font-bold text-slate-500 m-2">
                    {day.day}
                  </p>
                </div>
                <div className="flex justify-start flex-wrap">
                  <p className="text-xs font-semibold text-primary-1 p-2 hidden md:inline-block">
                    {day.event}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroEvent;
