/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Title from "../articles/title";
import style from "../../styles/styles";

import { Newspaper } from "../../assets/icons";
import { mCalendarEvent } from "../../assets/staticData/calendarEvent";
import CalendarCard from "../cards/calendarCard";

const CalendarEventsList = (props) => {
  return (
    <section className={`${style.flexCenter} flex-col flex-wrap sm:mb-10 mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        <Title className={`px-2`} title_1="Last & " title_2=" future events">
          <Newspaper
            width={"32px"}
            height={"32px"}
            strokeColor={"white"}
            style="p-2"
          />
        </Title>
        <div className="flex flex-nowrap justify-evenly">
          {mCalendarEvent.map((event) => {
            return (
              <CalendarCard
                key={event.id}
                date={event.date}
                eventTitle={event.event}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

CalendarEventsList.propTypes = {};

export default CalendarEventsList;
